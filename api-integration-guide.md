# Naughty Pilot - Stripe Integration Guide

## Overview
This guide explains how to integrate Stripe payments into your Naughty Pilot platform for deposits, subscriptions, and payment processing.

## Setup

### 1. Install Dependencies
```bash
npm install stripe express dotenv
```

### 2. Get Your Stripe Keys
1. Sign up at https://stripe.com
2. Get your API keys from the Dashboard
3. Use test keys for development: `pk_test_...` and `sk_test_...`

### 3. Environment Variables
Create a `.env` file:
```
STRIPE_SECRET_KEY=sk_test_your_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

## Backend Implementation

### Server Setup (Node.js/Express)

```javascript
// server.js
const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const app = express();

app.use(express.json());

// Create Payment Intent for deposits
app.post('/api/create-payment-intent', async (req, res) => {
  try {
    const { amount, customerId } = req.body; // amount in cents
    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      customer: customerId,
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        type: 'deposit',
        userId: req.user.id // from your auth system
      }
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Create Setup Intent for saving payment methods
app.post('/api/create-setup-intent', async (req, res) => {
  try {
    const { customerId } = req.body;
    
    const setupIntent = await stripe.setupIntents.create({
      customer: customerId,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.json({ clientSecret: setupIntent.client_secret });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Create Stripe Customer
app.post('/api/create-customer', async (req, res) => {
  try {
    const { email, name } = req.body;
    
    const customer = await stripe.customers.create({
      email: email,
      name: name,
      metadata: {
        userId: req.user.id
      }
    });

    // Save customer.id to your database
    res.json({ customerId: customer.id });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get Payment Methods
app.get('/api/payment-methods/:customerId', async (req, res) => {
  try {
    const paymentMethods = await stripe.paymentMethods.list({
      customer: req.params.customerId,
      type: 'card',
    });

    res.json({ paymentMethods: paymentMethods.data });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Charge existing payment method
app.post('/api/charge-customer', async (req, res) => {
  try {
    const { customerId, paymentMethodId, amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      customer: customerId,
      payment_method: paymentMethodId,
      off_session: true,
      confirm: true,
      metadata: {
        type: 'campaign_charge',
        userId: req.user.id
      }
    });

    res.json({ success: true, paymentIntent });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Webhook handler
app.post('/api/webhooks/stripe', express.raw({type: 'application/json'}), async (req, res) => {
  const sig = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object;
      // Update user balance in database
      await updateUserBalance(paymentIntent.metadata.userId, paymentIntent.amount);
      break;
    
    case 'payment_intent.payment_failed':
      // Handle failed payment
      console.error('Payment failed:', event.data.object);
      break;
    
    case 'setup_intent.succeeded':
      // Payment method saved successfully
      console.log('Payment method saved:', event.data.object);
      break;
    
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({received: true});
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

## Frontend Integration

### Update dashboard.html

Replace the Stripe key in `dashboard.html`:
```javascript
const stripe = Stripe('pk_test_YOUR_ACTUAL_KEY'); // Replace with your real key
```

### Complete Deposit Flow

```javascript
// In dashboard.html, update depositBtn click handler:
depositBtn.addEventListener('click', async () => {
  const amount = parseFloat(depositAmountInput.value);
  if (amount < 10) {
    alert('Minimum deposit is $10');
    return;
  }

  depositBtn.disabled = true;
  depositBtn.innerHTML = '<div class="spinner"></div> Processing...';

  try {
    // Create payment intent
    const response = await fetch('/api/create-payment-intent', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}` // Your auth token
      },
      body: JSON.stringify({ 
        amount: Math.round(amount * 100), // Convert to cents
        customerId: currentUser.stripeCustomerId 
      })
    });

    const { clientSecret } = await response.json();

    // Confirm payment with Stripe
    const { error } = await stripe.confirmPayment({
      clientSecret,
      confirmParams: {
        return_url: window.location.origin + '/dashboard.html?success=true',
      },
    });

    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    alert('Payment failed: ' + error.message);
    depositBtn.disabled = false;
    depositBtn.innerHTML = 'Deposit Funds';
  }
});
```

### Complete Add Payment Method Flow

```javascript
// Update the payment form submission in dashboard.html:
document.getElementById('payment-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const submitBtn = document.getElementById('submit-payment');
  const buttonText = document.getElementById('button-text');
  const spinner = document.getElementById('spinner');

  submitBtn.disabled = true;
  buttonText.style.display = 'none';
  spinner.style.display = 'inline-block';

  try {
    // Create setup intent
    const response = await fetch('/api/create-setup-intent', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`
      },
      body: JSON.stringify({ 
        customerId: currentUser.stripeCustomerId 
      })
    });

    const { clientSecret } = await response.json();

    // Confirm setup
    const { error } = await stripe.confirmSetup({
      elements,
      confirmParams: {
        return_url: window.location.origin + '/dashboard.html?setup=success',
      },
    });

    if (error) {
      throw new Error(error.message);
    }
  } catch (error) {
    document.getElementById('payment-errors').textContent = error.message;
    document.getElementById('payment-errors').style.display = 'block';
  } finally {
    submitBtn.disabled = false;
    buttonText.style.display = 'inline';
    spinner.style.display = 'none';
  }
});
```

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  stripe_customer_id VARCHAR(255),
  account_balance DECIMAL(10, 2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Transactions Table
```sql
CREATE TABLE transactions (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  stripe_payment_intent_id VARCHAR(255),
  amount DECIMAL(10, 2),
  type VARCHAR(50), -- 'deposit', 'campaign_charge', 'refund'
  status VARCHAR(50), -- 'pending', 'completed', 'failed'
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Payment Methods Table
```sql
CREATE TABLE payment_methods (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  stripe_payment_method_id VARCHAR(255),
  type VARCHAR(50), -- 'card', 'bank_account'
  last4 VARCHAR(4),
  brand VARCHAR(50),
  exp_month INTEGER,
  exp_year INTEGER,
  is_default BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Key Functions to Implement

### 1. Create Customer on Signup
```javascript
async function createStripeCustomer(userId, email, name) {
  const customer = await stripe.customers.create({
    email,
    name,
    metadata: { userId }
  });
  
  // Save customer.id to database
  await db.query(
    'UPDATE users SET stripe_customer_id = $1 WHERE id = $2',
    [customer.id, userId]
  );
  
  return customer.id;
}
```

### 2. Update Balance After Payment
```javascript
async function updateUserBalance(userId, amountInCents) {
  const amount = amountInCents / 100;
  
  await db.query(
    'UPDATE users SET account_balance = account_balance + $1 WHERE id = $2',
    [amount, userId]
  );
  
  // Log transaction
  await db.query(
    'INSERT INTO transactions (user_id, amount, type, status) VALUES ($1, $2, $3, $4)',
    [userId, amount, 'deposit', 'completed']
  );
}
```

### 3. Charge for Campaign Spend
```javascript
async function chargeCampaignSpend(userId, amount) {
  const user = await db.query('SELECT * FROM users WHERE id = $1', [userId]);
  
  // Check if user has sufficient balance
  if (user.account_balance >= amount) {
    // Deduct from balance
    await db.query(
      'UPDATE users SET account_balance = account_balance - $1 WHERE id = $2',
      [amount, userId]
    );
    
    await db.query(
      'INSERT INTO transactions (user_id, amount, type, status) VALUES ($1, $2, $3, $4)',
      [userId, amount, 'campaign_charge', 'completed']
    );
    
    return { success: true };
  } else {
    // Attempt to charge payment method
    const paymentMethods = await db.query(
      'SELECT * FROM payment_methods WHERE user_id = $1 AND is_default = true',
      [userId]
    );
    
    if (!paymentMethods.rows[0]) {
      return { success: false, error: 'No payment method on file' };
    }
    
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100),
        currency: 'usd',
        customer: user.stripe_customer_id,
        payment_method: paymentMethods.rows[0].stripe_payment_method_id,
        off_session: true,
        confirm: true
      });
      
      if (paymentIntent.status === 'succeeded') {
        await updateUserBalance(userId, paymentIntent.amount);
        return { success: true };
      }
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
```

## Testing

### Test Cards
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`
- Auth required: `4000 0025 0000 3155`

Use any future expiry date, any 3-digit CVC, and any postal code.

## Security Checklist

- ✅ Never expose secret key in frontend
- ✅ Validate all amounts on backend
- ✅ Verify webhook signatures
- ✅ Use HTTPS in production
- ✅ Implement rate limiting
- ✅ Log all transactions
- ✅ Handle failed payments gracefully
- ✅ PCI compliance (handled by Stripe)

## Going Live

1. Replace test keys with live keys
2. Set up webhook endpoint in Stripe Dashboard
3. Test thoroughly with small amounts
4. Enable required payment methods
5. Set up email notifications for failed payments
6. Monitor Stripe Dashboard for issues

## Resources

- Stripe Documentation: https://stripe.com/docs
- Stripe Testing: https://stripe.com/docs/testing
- Stripe Dashboard: https://dashboard.stripe.com
