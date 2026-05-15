import React, { useState, useEffect } from 'react';
import { ArrowRight, Menu, X, ChevronDown } from 'lucide-react';

const NaughtyPilotHero = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [trafficDropdownOpen, setTrafficDropdownOpen] = useState(false);
  const [affiliatesDropdownOpen, setAffiliatesDropdownOpen] = useState(false);
  const [companyDropdownOpen, setCompanyDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050000]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/assets/hero-desktop.png" 
          alt="Naughty Pilot Hero"
          className="w-full h-full object-cover object-[right_center] hidden md:block"
        />
        <img 
          src="/assets/hero-mobile.png" 
          alt="Naughty Pilot Hero Mobile"
          className="w-full h-full object-cover md:hidden"
        />
        
        {/* Gradients & Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050000] via-[#050000]/95 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050000] via-transparent to-transparent" />
        
        {/* Vignette */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(circle at center, transparent 0%, rgba(5,0,0,0.3) 70%, rgba(5,0,0,0.8) 100%)'
        }} />

        {/* Red Radial Glow Behind Headline */}
        <div className="absolute top-1/3 left-0 w-1/2 h-1/2 opacity-40 blur-3xl"
          style={{
            background: 'radial-gradient(circle, rgba(180,0,18,0.35) 0%, transparent 70%)'
          }}
        />

        {/* Central Glow SVG */}
        <svg className="absolute top-1/4 left-1/2 -translate-x-1/2 w-full h-96 opacity-30 hidden md:block" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="blur">
              <feGaussianBlur in="SourceGraphic" stdDeviation="25" />
            </filter>
          </defs>
          <ellipse cx="50%" cy="50%" rx="400" ry="150" fill="#ff1b2d" filter="url(#blur)" />
        </svg>

        {/* Grid Lines - Desktop Only */}
        <div className="absolute inset-0 hidden lg:block pointer-events-none">
          <div className="absolute left-1/4 top-0 bottom-0 w-px bg-white/10" />
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/10" />
          <div className="absolute left-3/4 top-0 bottom-0 w-px bg-white/10" />
        </div>
      </div>

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="/" className="flex items-center">
              <img src="/assets/logo.png" alt="Naughty Pilot" className="h-10 w-auto" />
            </a>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-8">
              <a href="/" className="text-white/80 hover:text-[#ff3045] transition-colors duration-300 text-sm font-medium uppercase tracking-wide">
                Home
              </a>

              {/* Traffic Dropdown */}
              <div className="relative group">
                <button 
                  className="flex items-center gap-1 text-white/80 hover:text-[#ff3045] transition-colors duration-300 text-sm font-medium uppercase tracking-wide"
                  onMouseEnter={() => setTrafficDropdownOpen(true)}
                  onMouseLeave={() => setTrafficDropdownOpen(false)}
                >
                  Traffic
                  <ChevronDown className="w-4 h-4" />
                </button>
                {trafficDropdownOpen && (
                  <div 
                    className="absolute top-full left-0 mt-2 w-56 bg-[#090305]/95 backdrop-blur-md border border-white/10 rounded-lg py-2 shadow-xl"
                    onMouseEnter={() => setTrafficDropdownOpen(true)}
                    onMouseLeave={() => setTrafficDropdownOpen(false)}
                  >
                    <a href="#/traffic/advertiser" className="block px-4 py-2 text-sm text-white/80 hover:text-[#ff3045] hover:bg-white/5 transition-colors">
                      Advertiser Traffic
                    </a>
                    <a href="#/traffic/publisher" className="block px-4 py-2 text-sm text-white/80 hover:text-[#ff3045] hover:bg-white/5 transition-colors">
                      Publisher Monetization
                    </a>
                    <a href="#/traffic/creator" className="block px-4 py-2 text-sm text-white/80 hover:text-[#ff3045] hover:bg-white/5 transition-colors">
                      Creator Growth
                    </a>
                    <a href="#/traffic/realtime" className="block px-4 py-2 text-sm text-white/80 hover:text-[#ff3045] hover:bg-white/5 transition-colors">
                      Real-Time Traffic
                    </a>
                    <a href="#/traffic/scaling" className="block px-4 py-2 text-sm text-white/80 hover:text-[#ff3045] hover:bg-white/5 transition-colors">
                      Campaign Scaling
                    </a>
                  </div>
                )}
              </div>

              <a href="#/why-us" className="text-white/80 hover:text-[#ff3045] transition-colors duration-300 text-sm font-medium uppercase tracking-wide">
                Why Us
              </a>

              {/* Affiliates Dropdown */}
              <div className="relative group">
                <button 
                  className="flex items-center gap-1 text-white/80 hover:text-[#ff3045] transition-colors duration-300 text-sm font-medium uppercase tracking-wide"
                  onMouseEnter={() => setAffiliatesDropdownOpen(true)}
                  onMouseLeave={() => setAffiliatesDropdownOpen(false)}
                >
                  Affiliates
                  <ChevronDown className="w-4 h-4" />
                </button>
                {affiliatesDropdownOpen && (
                  <div 
                    className="absolute top-full left-0 mt-2 w-56 bg-[#090305]/95 backdrop-blur-md border border-white/10 rounded-lg py-2 shadow-xl"
                    onMouseEnter={() => setAffiliatesDropdownOpen(true)}
                    onMouseLeave={() => setAffiliatesDropdownOpen(false)}
                  >
                    <a href="#/affiliates/program" className="block px-4 py-2 text-sm text-white/80 hover:text-[#ff3045] hover:bg-white/5 transition-colors">
                      Partner Program
                    </a>
                    <a href="#/affiliates/payouts" className="block px-4 py-2 text-sm text-white/80 hover:text-[#ff3045] hover:bg-white/5 transition-colors">
                      Payouts
                    </a>
                    <a href="#/affiliates/apply" className="block px-4 py-2 text-sm text-white/80 hover:text-[#ff3045] hover:bg-white/5 transition-colors">
                      Apply as Affiliate
                    </a>
                  </div>
                )}
              </div>

              {/* Company Dropdown */}
              <div className="relative group">
                <button 
                  className="flex items-center gap-1 text-white/80 hover:text-[#ff3045] transition-colors duration-300 text-sm font-medium uppercase tracking-wide"
                  onMouseEnter={() => setCompanyDropdownOpen(true)}
                  onMouseLeave={() => setCompanyDropdownOpen(false)}
                >
                  Company
                  <ChevronDown className="w-4 h-4" />
                </button>
                {companyDropdownOpen && (
                  <div 
                    className="absolute top-full left-0 mt-2 w-56 bg-[#090305]/95 backdrop-blur-md border border-white/10 rounded-lg py-2 shadow-xl"
                    onMouseEnter={() => setCompanyDropdownOpen(true)}
                    onMouseLeave={() => setCompanyDropdownOpen(false)}
                  >
                    <a href="#/company/about" className="block px-4 py-2 text-sm text-white/80 hover:text-[#ff3045] hover:bg-white/5 transition-colors">
                      About
                    </a>
                    <a href="#/company/compliance" className="block px-4 py-2 text-sm text-white/80 hover:text-[#ff3045] hover:bg-white/5 transition-colors">
                      Compliance
                    </a>
                    <a href="#/company/contact" className="block px-4 py-2 text-sm text-white/80 hover:text-[#ff3045] hover:bg-white/5 transition-colors">
                      Contact
                    </a>
                    <a href="#/company/terms" className="block px-4 py-2 text-sm text-white/80 hover:text-[#ff3045] hover:bg-white/5 transition-colors">
                      Terms
                    </a>
                    <a href="#/company/privacy" className="block px-4 py-2 text-sm text-white/80 hover:text-[#ff3045] hover:bg-white/5 transition-colors">
                      Privacy
                    </a>
                  </div>
                )}
              </div>

              <a href="#/login" className="text-white/80 hover:text-[#ff3045] transition-colors duration-300 text-sm font-medium uppercase tracking-wide">
                Login
              </a>
              <a href="#/get-started" className="bg-[#ff3045] text-[#050000] px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-wide hover:shadow-[0_0_30px_rgba(255,48,69,0.45)] transition-all duration-300">
                Get Started
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-white p-2"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-[#050000] flex flex-col items-center justify-center gap-6 p-8"
            style={{
              background: 'radial-gradient(circle at center, rgba(180,0,18,0.2) 0%, #050000 70%)'
            }}
          >
            <a href="/" className="text-white text-2xl font-bold hover:text-[#ff3045] transition-colors">HOME</a>
            <a href="#/traffic-solutions" className="text-white text-2xl font-bold hover:text-[#ff3045] transition-colors">TRAFFIC</a>
            <a href="#/why-us" className="text-white text-2xl font-bold hover:text-[#ff3045] transition-colors">WHY US</a>
            <a href="#/affiliates" className="text-white text-2xl font-bold hover:text-[#ff3045] transition-colors">AFFILIATES</a>
            <a href="#/company" className="text-white text-2xl font-bold hover:text-[#ff3045] transition-colors">COMPANY</a>
            <div className="flex flex-col gap-4 mt-8 w-full max-w-xs">
              <a href="#/login" className="bg-transparent border-2 border-white/20 text-white px-8 py-3 rounded-full text-center font-bold uppercase hover:border-[#ff3045] transition-colors">
                Login
              </a>
              <a href="#/get-started" className="bg-[#ff3045] text-[#050000] px-8 py-3 rounded-full text-center font-bold uppercase hover:shadow-[0_0_30px_rgba(255,48,69,0.45)] transition-all">
                Get Started
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Hero Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Liquid Glass Card */}
              <div className="liquid-glass-card w-[200px] translate-y-[-50px] mb-8">
                <div className="text-white/60 text-[14px] mb-2">[ 2025 ]</div>
                <h3 className="text-white text-[18px] font-medium leading-tight mb-3">
                  Premium <span className="italic font-serif">Adult Growth</span> Infrastructure
                </h3>
                <p className="text-white/50 text-[11px] leading-relaxed">
                  Built for creators, publishers, advertisers, and affiliate operators scaling discreet traffic.
                </p>
              </div>

              {/* Eyebrow */}
              <div className="text-[#ff3045] text-[11px] font-bold uppercase tracking-widest">
                Premium Adult-Growth Infrastructure
              </div>

              {/* Main Headline */}
              <h1 className="text-white font-black uppercase tracking-tight text-[40px] sm:text-[56px] lg:text-[72px] leading-[0.95]">
                THE #1 ADULT TRAFFIC SOURCE IN THE WORLD<span className="text-[#ff3045]">.</span>
              </h1>

              {/* Description */}
              <p className="text-white/70 text-[14px] leading-relaxed max-w-[512px]">
                Scale adult-friendly traffic, creator funnels, publisher monetization, and affiliate growth through a discreet premium network built for conversion.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="#/get-started"
                  className="inline-flex items-center justify-center gap-2 bg-[#ff3045] text-[#050000] px-8 py-4 rounded-full font-bold uppercase text-sm hover:shadow-[0_0_30px_rgba(255,48,69,0.45)] transition-all duration-300"
                >
                  Start Scaling Now
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a 
                  href="#/affiliates/apply"
                  className="inline-flex items-center justify-center gap-2 bg-black/40 backdrop-blur-sm border border-white/16 text-white px-8 py-4 rounded-full font-bold uppercase text-sm hover:border-[#ff3045] transition-all duration-300"
                >
                  Apply as Partner
                </a>
              </div>
            </div>

            {/* Right Side - Metrics Cards */}
            <div className="hidden lg:flex flex-col gap-4 items-end">
              <div className="metric-card group">
                <div className="text-[#ff3045] text-4xl font-black">500M+</div>
                <div className="text-white/70 text-sm">Monthly Impressions</div>
              </div>
              <div className="metric-card group">
                <div className="text-[#ff3045] text-4xl font-black">24/7</div>
                <div className="text-white/70 text-sm">Real-Time Traffic</div>
              </div>
              <div className="metric-card group">
                <div className="text-[#ff3045] text-2xl font-black">Premium</div>
                <div className="text-white/70 text-sm">Adult Network</div>
              </div>
              <div className="metric-card group">
                <div className="text-[#ff3045] text-2xl font-black">Growth</div>
                <div className="text-white/70 text-sm">Creator + Advertiser</div>
              </div>
            </div>
          </div>

          {/* Proof Strip */}
          <div className="absolute bottom-12 left-0 right-0 px-4 sm:px-6 lg:px-8">
            <p className="text-white/50 text-xs sm:text-sm text-center max-w-3xl mx-auto leading-relaxed">
              Trusted by creators, traffic buyers, publishers, and affiliate operators building adult-friendly growth engines.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .liquid-glass-card {
          position: relative;
          background: rgba(255, 255, 255, 0.01);
          background-blend-mode: luminosity;
          backdrop-filter: blur(4px);
          box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 20px;
        }

        .liquid-glass-card::before {
          content: '';
          position: absolute;
          inset: 0;
          padding: 1.4px;
          background: linear-gradient(180deg, rgba(255,255,255,0.7), rgba(255,255,255,0.08), rgba(180,0,18,0.55));
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          border-radius: 12px;
          pointer-events: none;
        }

        .metric-card {
          background: rgba(10, 0, 2, 0.48);
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(8px);
          border-radius: 16px;
          padding: 24px 32px;
          transition: all 0.3s ease-out;
          cursor: pointer;
          min-width: 200px;
        }

        .metric-card:hover {
          border-color: rgba(255, 48, 69, 0.6);
          box-shadow: 0 0 30px rgba(255, 48, 69, 0.3);
          transform: translateY(-4px);
        }
      `}</style>
    </div>
  );
};

export default NaughtyPilotHero;
