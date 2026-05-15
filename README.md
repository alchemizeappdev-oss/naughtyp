# Naughty Pilot - Premium Adult Traffic Platform

A complete, production-ready web application for adult traffic network with integrated Stripe payments.

## 🚀 Features

### Public Pages
- **Homepage** - Cinematic hero, metrics, solutions preview
- **Traffic Solutions** - Advertiser, publisher, creator services
- **Why Us** - Platform benefits and compliance standards
- **Affiliates** - Partner program with commission structure
- **Company** - About, compliance, contact, terms & privacy
- **Login** - Authentication with password reset
- **Get Started** - Application form for new partners

### Client Portal (Dashboard)
- **Overview** - Account balance, stats, recent activity
- **Campaigns** - Campaign management (ready for integration)
- **Billing** - Payment methods and transaction history
- **Deposits** - Add funds with Stripe integration
- **Invoices** - Download and view past invoices
- **Settings** - Profile and password management

### Admin Dashboard
- **Application Management** - Review partner applications
- **Status Updates** - Approve/reject applications
- **Filtering** - Search by status, role, budget
- **Notes System** - Add review notes to applications

## 💳 Stripe Integration

Full payment processing with:
- Secure card payments via Stripe Elements
- Save payment methods for future use
- Instant balance deposits
- Automatic payment intent creation
- Webhook handling for payment confirmations
- Transaction history and invoicing

## 🎨 Design System

- **Colors**: Luxury black & deep red theme
- **Typography**: Playfair Display (display) + Inter (body)
- **Effects**: Glassmorphism cards, red glow effects, smooth transitions
- **Responsive**: Mobile-first, fully responsive design

## 📁 File Structure

```
/
├── index.html              # Homepage
├── traffic-solutions.html  # Traffic solutions page
├── why-us.html            # Why us page
├── affiliates.html        # Affiliates program page
├── company.html           # Company info page
├── login.html             # Login page
├── get-started.html       # Application form
├── dashboard.html         # Client portal
├── admin.html             # Admin dashboard
├── styles/
│   └── main.css           # Global styles
├── assets/
│   ├── logo.png           # Naughty Pilot logo
│   └── hero-desktop.png   # Homepage hero image
├── api-integration-guide.md  # Stripe integration guide
└── README.md              # This file
```

## 🛠️ Setup Instructions

### 1. Basic Setup (Static Site)
The site works as-is with static HTML. Just open `index.html` in a browser or deploy to any static host:

```bash
# Deploy to Netlify, Vercel, or any static host
# Or run locally with a simple server:
npx serve .
```

### 2. Stripe Integration (Required for Payments)

1. **Get Stripe Account**
   - Sign up at https://stripe.com
   - Get your test API keys from Dashboard

2. **Update Frontend**
   - Open `dashboard.html`
   - Replace `pk_test_YOUR_PUBLISHABLE_KEY` with your actual key (line 397)

3. **Set Up Backend**
   - See `api-integration-guide.md` for complete backend setup
   - Install Node.js dependencies:
   ```bash
   npm install stripe express dotenv
   ```
   - Create `.env` file with your Stripe secret key
   - Run the backend server (see guide for code)

4. **Configure Webhooks**
   - In Stripe Dashboard, add webhook endpoint
   - Point to: `https://yourdomain.com/api/webhooks/stripe`
   - Select events: `payment_intent.succeeded`, `setup_intent.succeeded`

### 3. Database Setup (Required for Full Functionality)

Choose your database solution:

**Option A: Firebase**
```javascript
// Install Firebase
npm install firebase

// Initialize in your app
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = { /* your config */ };
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
```

**Option B: Supabase**
```javascript
// Install Supabase
npm install @supabase/supabase-js

// Initialize
import { createClient } from '@supabase/supabase-js';
const supabase = createClient('YOUR_URL', 'YOUR_KEY');
```

**Option C: Custom Backend**
- PostgreSQL with Node.js/Express
- See `api-integration-guide.md` for schema

## 🔐 Authentication

The site includes UI for authentication but requires backend integration:

**Recommended Options:**
1. **Firebase Auth** - Easy setup, built-in UI
2. **Supabase Auth** - Open-source, PostgreSQL-based
3. **Auth0** - Enterprise-grade
4. **Custom JWT** - Roll your own

Update `login.html` and `dashboard.html` to integrate with your chosen auth provider.

## 📊 Database Collections

### Applications
```javascript
{
  name: string,
  email: string,
  company: string,
  role: 'advertiser' | 'publisher' | 'creator' | 'affiliate',
  website: string,
  trafficGoal: string,
  budget: string,
  message: string,
  status: 'New' | 'Reviewing' | 'Approved' | 'Rejected',
  createdAt: timestamp,
  reviewNotes: string
}
```

### Users
```javascript
{
  email: string,
  name: string,
  stripeCustomerId: string,
  accountBalance: number,
  role: string,
  createdAt: timestamp
}
```

### Transactions
```javascript
{
  userId: string,
  stripePaymentIntentId: string,
  amount: number,
  type: 'deposit' | 'campaign_charge' | 'refund',
  status: 'pending' | 'completed' | 'failed',
  description: string,
  createdAt: timestamp
}
```

## 🚀 Deployment

### Static Hosting (No Backend Yet)
```bash
# Netlify
netlify deploy --prod

# Vercel
vercel --prod

# GitHub Pages
# Push to gh-pages branch
```

### Full Stack (With Backend)
```bash
# Deploy frontend to static host
# Deploy backend to:
# - Heroku
# - Railway
# - AWS EC2/ECS
# - DigitalOcean
# - Fly.io

# Set environment variables on your host:
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
DATABASE_URL=postgres://...
```

## 🧪 Testing

### Test Stripe Payments
Use test cards:
- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 0002
- **3D Secure**: 4000 0025 0000 3155

Use any future expiry, any CVC, any postal code.

### Test Accounts
Create test accounts with different roles:
- Advertiser
- Publisher  
- Creator
- Affiliate

## 📝 Customization

### Branding
- Replace logo: `assets/logo.png`
- Replace hero: `assets/hero-desktop.png`
- Update colors in `styles/main.css` (CSS variables)

### Content
- Edit copy directly in HTML files
- Update metrics in `index.html`
- Modify commission rates in `affiliates.html`

### Features
- Add more payment methods (ACH, crypto)
- Implement campaign creation
- Add analytics dashboard
- Create reporting system

## 🔒 Security Checklist

Before going live:
- [ ] Replace all test API keys with production keys
- [ ] Enable HTTPS (required for Stripe)
- [ ] Set up CORS properly
- [ ] Implement rate limiting
- [ ] Add CSRF protection
- [ ] Validate all inputs server-side
- [ ] Set up proper authentication
- [ ] Configure Content Security Policy
- [ ] Enable webhook signature verification
- [ ] Set up error logging (Sentry, etc.)

## 📞 Support

For implementation help:
1. Check `api-integration-guide.md` for Stripe setup
2. Review Stripe docs: https://stripe.com/docs
3. Test with Stripe test mode first
4. Use browser dev tools for debugging

## 📄 License

Proprietary - Naughty Pilot Platform

## 🎯 Next Steps

1. ✅ Replace Stripe test keys with your keys
2. ✅ Set up backend server (see integration guide)
3. ✅ Connect to database (Firebase/Supabase/PostgreSQL)
4. ✅ Implement authentication
5. ✅ Test payment flow end-to-end
6. ✅ Deploy to production
7. ✅ Set up monitoring and alerts

---

Built with ❤️ for the adult traffic industry
