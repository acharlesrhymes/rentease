import React, { useState } from 'react';
import { Home, CreditCard, Shield, Users, Mail, Lock, CheckCircle, Star, ArrowRight, Check, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pricingToggle, setPricingToggle] = useState<'monthly' | 'yearly'>('monthly');
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleDemoLogin = async (role: 'renter' | 'landlord') => {
    const demoEmail = role === 'renter' ? 'renter@demo.com' : 'landlord@demo.com';
    try {
      await login(demoEmail, 'demo123');
      navigate('/dashboard');
    } catch (error) {
      console.error('Demo login failed:', error);
    }
  };

  const pricingPlans = {
    renter: [
      {
        name: 'Basic',
        price: { monthly: 0, yearly: 0 },
        description: 'Perfect for individual renters',
        features: [
          'Secure rent payments',
          'Payment history tracking',
          'Email notifications',
          'Basic customer support',
          'Mobile app access'
        ],
        notIncluded: [
          'Auto-pay setup',
          'Premium support',
          'Advanced analytics'
        ],
        popular: false,
        cta: 'Get Started Free'
      },
      {
        name: 'Premium',
        price: { monthly: 4.99, yearly: 49.99 },
        description: 'Enhanced features for power users',
        features: [
          'Everything in Basic',
          'Auto-pay setup & management',
          'SMS notifications',
          'Priority customer support',
          'Payment scheduling',
          'Expense tracking',
          'Tax document generation'
        ],
        notIncluded: [
          'Concierge support'
        ],
        popular: true,
        cta: 'Start Premium Trial'
      },
      {
        name: 'Pro',
        price: { monthly: 9.99, yearly: 99.99 },
        description: 'Ultimate rental management',
        features: [
          'Everything in Premium',
          'Concierge support (24/7)',
          'Advanced payment analytics',
          'Multiple property management',
          'Custom payment schedules',
          'Integration with accounting software',
          'Dedicated account manager'
        ],
        notIncluded: [],
        popular: false,
        cta: 'Go Pro'
      }
    ],
    landlord: [
      {
        name: 'Starter',
        price: { monthly: 9.99, yearly: 99.99 },
        description: 'Perfect for small landlords',
        features: [
          'Up to 5 properties',
          'Tenant payment tracking',
          'Basic reporting',
          'Email notifications',
          'Mobile app access',
          'Standard customer support'
        ],
        notIncluded: [
          'Advanced analytics',
          'Bulk messaging',
          'API access'
        ],
        popular: false,
        cta: 'Start Managing'
      },
      {
        name: 'Professional',
        price: { monthly: 19.99, yearly: 199.99 },
        description: 'Ideal for growing portfolios',
        features: [
          'Up to 25 properties',
          'Everything in Starter',
          'Advanced analytics & reporting',
          'Bulk tenant messaging',
          'Maintenance request management',
          'Automated rent reminders',
          'Priority support'
        ],
        notIncluded: [
          'White-label solution',
          'API access'
        ],
        popular: true,
        cta: 'Go Professional'
      },
      {
        name: 'Enterprise',
        price: { monthly: 49.99, yearly: 499.99 },
        description: 'For large property management',
        features: [
          'Unlimited properties',
          'Everything in Professional',
          'White-label solution',
          'API access & integrations',
          'Custom reporting',
          'Dedicated account manager',
          'Advanced security features',
          'Custom onboarding'
        ],
        notIncluded: [],
        popular: false,
        cta: 'Contact Sales'
      }
    ]
  };

  const [selectedPlanType, setSelectedPlanType] = useState<'renter' | 'landlord'>('renter');

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl">
                <Home className="text-white" size={24} />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                RentEase
              </h1>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">How It Works</a>
              <a href="#pricing" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Pricing</a>
              <a href="#testimonials" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Reviews</a>
              <button
                onClick={() => setShowLogin(!showLogin)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {showLogin ? 'Close' : 'Sign In'}
              </button>
            </nav>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Main Content */}
        <div className={`flex-1 transition-all duration-300 ${showLogin ? 'lg:mr-96' : ''}`}>
          {/* Hero Section */}
          <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
              <div className="text-center max-w-4xl mx-auto">
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
                  Simplify Your
                  <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                    Rent Payments
                  </span>
                </h1>
                
                <p className="text-xl sm:text-2xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
                  The modern way for renters to pay rent and landlords to manage properties. 
                  Secure, simple, and completely stress-free.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <button
                    onClick={() => handleDemoLogin('renter')}
                    disabled={isLoading}
                    className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 disabled:opacity-50 flex items-center justify-center space-x-2"
                  >
                    <span>Try as Renter</span>
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                  </button>
                  <button
                    onClick={() => handleDemoLogin('landlord')}
                    disabled={isLoading}
                    className="group bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 disabled:opacity-50 flex items-center justify-center space-x-2"
                  >
                    <span>Try as Landlord</span>
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section id="features" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Everything you need to manage rent
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Powerful features designed to make rent payments effortless for everyone
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="p-3 bg-blue-100 rounded-xl w-fit mb-6 group-hover:bg-blue-200 transition-colors">
                    <CreditCard className="text-blue-600" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Instant Payments</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Pay rent with just a few clicks using credit cards, debit cards, or bank transfers. 
                    Payments are processed instantly and securely.
                  </p>
                </div>
                
                <div className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="p-3 bg-green-100 rounded-xl w-fit mb-6 group-hover:bg-green-200 transition-colors">
                    <Shield className="text-green-600" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Bank-Level Security</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Your financial information is protected with 256-bit SSL encryption and 
                    PCI DSS compliance. We never store your payment details.
                  </p>
                </div>
                
                <div className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="p-3 bg-purple-100 rounded-xl w-fit mb-6 group-hover:bg-purple-200 transition-colors">
                    <Users className="text-purple-600" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Property Management</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Landlords can easily manage multiple properties, track payments, 
                    and communicate with tenants all in one place.
                  </p>
                </div>

                <div className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="p-3 bg-orange-100 rounded-xl w-fit mb-6 group-hover:bg-orange-200 transition-colors">
                    <CheckCircle className="text-orange-600" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Auto-Pay Setup</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Never miss a payment again. Set up automatic monthly payments 
                    and enjoy peace of mind knowing your rent is always on time.
                  </p>
                </div>

                <div className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="p-3 bg-indigo-100 rounded-xl w-fit mb-6 group-hover:bg-indigo-200 transition-colors">
                    <Mail className="text-indigo-600" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Smart Notifications</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Get timely reminders about upcoming payments, confirmations, 
                    and important updates via email and SMS.
                  </p>
                </div>

                <div className="group bg-white p-8 rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="p-3 bg-pink-100 rounded-xl w-fit mb-6 group-hover:bg-pink-200 transition-colors">
                    <Home className="text-pink-600" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Payment History</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Keep track of all your payments with detailed history, receipts, 
                    and downloadable statements for your records.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section id="how-it-works" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  How RentEase Works
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Get started in minutes with our simple three-step process
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="relative mb-8">
                    <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <span className="text-2xl font-bold text-white">1</span>
                    </div>
                    <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-blue-200 -translate-y-0.5"></div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Sign Up & Verify</h3>
                  <p className="text-gray-600">
                    Create your account and verify your identity. Choose whether you're a renter or landlord.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="relative mb-8">
                    <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <span className="text-2xl font-bold text-white">2</span>
                    </div>
                    <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-green-200 -translate-y-0.5"></div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Connect & Setup</h3>
                  <p className="text-gray-600">
                    Add your property details or connect with your landlord. Set up your payment preferences.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="relative mb-8">
                    <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                      <span className="text-2xl font-bold text-white">3</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Pay & Manage</h3>
                  <p className="text-gray-600">
                    Make payments, set up auto-pay, and manage everything from your personalized dashboard.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Pricing Section */}
          <section id="pricing" className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Simple, Transparent Pricing
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                  Choose the perfect plan for your needs. No hidden fees, no surprises.
                </p>
                
                {/* Plan Type Toggle */}
                <div className="flex items-center justify-center mb-8">
                  <div className="bg-gray-100 p-1 rounded-xl">
                    <button
                      onClick={() => setSelectedPlanType('renter')}
                      className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                        selectedPlanType === 'renter'
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      For Renters
                    </button>
                    <button
                      onClick={() => setSelectedPlanType('landlord')}
                      className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                        selectedPlanType === 'landlord'
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      For Landlords
                    </button>
                  </div>
                </div>

                {/* Billing Toggle */}
                <div className="flex items-center justify-center space-x-4 mb-12">
                  <span className={`font-medium ${pricingToggle === 'monthly' ? 'text-gray-900' : 'text-gray-500'}`}>
                    Monthly
                  </span>
                  <button
                    onClick={() => setPricingToggle(pricingToggle === 'monthly' ? 'yearly' : 'monthly')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      pricingToggle === 'yearly' ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        pricingToggle === 'yearly' ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                  <span className={`font-medium ${pricingToggle === 'yearly' ? 'text-gray-900' : 'text-gray-500'}`}>
                    Yearly
                  </span>
                  {pricingToggle === 'yearly' && (
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      Save 20%
                    </span>
                  )}
                </div>
              </div>
              
              {/* Pricing Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {pricingPlans[selectedPlanType].map((plan, index) => (
                  <div
                    key={plan.name}
                    className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                      plan.popular
                        ? 'border-blue-500 ring-4 ring-blue-100'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                          Most Popular
                        </span>
                      </div>
                    )}
                    
                    <div className="p-8">
                      <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                        <p className="text-gray-600 mb-6">{plan.description}</p>
                        
                        <div className="mb-6">
                          <span className="text-5xl font-bold text-gray-900">
                            ${plan.price[pricingToggle]}
                          </span>
                          <span className="text-gray-600 ml-2">
                            /{pricingToggle === 'monthly' ? 'month' : 'year'}
                          </span>
                          {pricingToggle === 'yearly' && plan.price.yearly > 0 && (
                            <div className="text-sm text-green-600 font-medium mt-1">
                              Save ${(plan.price.monthly * 12 - plan.price.yearly).toFixed(2)} per year
                            </div>
                          )}
                        </div>
                        
                        <button
                          onClick={() => handleDemoLogin(selectedPlanType)}
                          className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 ${
                            plan.popular
                              ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl'
                              : 'bg-gray-900 hover:bg-gray-800 text-white shadow-lg hover:shadow-xl'
                          }`}
                        >
                          {plan.cta}
                        </button>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">What's included:</h4>
                          <ul className="space-y-3">
                            {plan.features.map((feature, featureIndex) => (
                              <li key={featureIndex} className="flex items-start space-x-3">
                                <Check className="text-green-500 flex-shrink-0 mt-0.5" size={16} />
                                <span className="text-gray-600 text-sm">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        {plan.notIncluded.length > 0 && (
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-3">Not included:</h4>
                            <ul className="space-y-3">
                              {plan.notIncluded.map((feature, featureIndex) => (
                                <li key={featureIndex} className="flex items-start space-x-3">
                                  <X className="text-gray-400 flex-shrink-0 mt-0.5" size={16} />
                                  <span className="text-gray-400 text-sm">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Enterprise CTA */}
              <div className="mt-16 text-center">
                <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-8 border border-gray-200">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Need a custom solution?
                  </h3>
                  <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                    We offer custom enterprise solutions for large property management companies, 
                    real estate firms, and organizations with unique requirements.
                  </p>
                  <button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                    Contact Enterprise Sales
                  </button>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="mt-20">
                <h3 className="text-2xl font-bold text-gray-900 text-center mb-12">
                  Frequently Asked Questions
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Is there a setup fee?</h4>
                    <p className="text-gray-600 text-sm">
                      No setup fees, no hidden costs. You only pay the monthly or yearly subscription fee.
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Can I cancel anytime?</h4>
                    <p className="text-gray-600 text-sm">
                      Yes, you can cancel your subscription at any time. No long-term contracts required.
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Do you offer refunds?</h4>
                    <p className="text-gray-600 text-sm">
                      We offer a 30-day money-back guarantee for all paid plans. No questions asked.
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="font-semibold text-gray-900 mb-2">Is my data secure?</h4>
                    <p className="text-gray-600 text-sm">
                      Absolutely. We use bank-level encryption and are PCI DSS compliant to protect your data.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section id="testimonials" className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                  Loved by renters and landlords
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  See what our users have to say about their RentEase experience
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="text-yellow-400 fill-current" size={20} />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    "RentEase has completely transformed how I manage my rental properties. 
                    The dashboard is intuitive and my tenants love the convenience."
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                      SJ
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Sarah Johnson</p>
                      <p className="text-gray-500 text-sm">Property Owner</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="text-yellow-400 fill-current" size={20} />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    "Finally, a rent payment system that actually works! Auto-pay means 
                    I never have to worry about late fees again."
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                      MW
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Mike Wilson</p>
                      <p className="text-gray-500 text-sm">Renter</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
                  <div className="flex items-center mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="text-yellow-400 fill-current" size={20} />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    "The security features give me peace of mind, and the payment history 
                    makes tax season so much easier. Highly recommend!"
                  </p>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                      AL
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Alex Lee</p>
                      <p className="text-gray-500 text-sm">Renter</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
            <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
              <h2 className="text-4xl font-bold text-white mb-6">
                Ready to simplify your rent payments?
              </h2>
              <p className="text-xl text-blue-100 mb-10">
                Join thousands of satisfied users who have made the switch to RentEase
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => handleDemoLogin('renter')}
                  disabled={isLoading}
                  className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 disabled:opacity-50"
                >
                  Get Started as Renter
                </button>
                <button
                  onClick={() => handleDemoLogin('landlord')}
                  disabled={isLoading}
                  className="bg-blue-700 hover:bg-blue-800 text-white border-2 border-blue-400 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 disabled:opacity-50"
                >
                  Get Started as Landlord
                </button>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-gray-900 text-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="col-span-1 md:col-span-2">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-2 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl">
                      <Home className="text-white" size={24} />
                    </div>
                    <h3 className="text-2xl font-bold">RentEase</h3>
                  </div>
                  <p className="text-gray-400 mb-6 max-w-md">
                    Making rent payments simple, secure, and stress-free for everyone. 
                    The modern solution for property management.
                  </p>
                  <div className="flex space-x-4">
                    <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                      <span className="text-sm font-bold">f</span>
                    </div>
                    <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                      <span className="text-sm font-bold">t</span>
                    </div>
                    <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors cursor-pointer">
                      <span className="text-sm font-bold">in</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-4">Product</h4>
                  <ul className="space-y-2 text-gray-400">
                    <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-4">Support</h4>
                  <ul className="space-y-2 text-gray-400">
                    <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                  </ul>
                </div>
              </div>
              
              <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
                <p>&copy; 2025 RentEase. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </div>

        {/* Login Panel */}
        {showLogin && (
          <div className="fixed right-0 top-16 bottom-0 w-96 bg-white shadow-2xl z-40 transform transition-transform duration-300 ease-in-out overflow-y-auto">
            <div className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
                <p className="text-gray-600">Sign in to your RentEase account</p>
              </div>
              
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors disabled:opacity-50 shadow-lg hover:shadow-xl"
                >
                  {isLoading ? 'Signing In...' : 'Sign In'}
                </button>
              </form>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <p className="text-center text-sm text-gray-600 mb-4">
                  Try demo accounts:
                </p>
                <div className="space-y-3">
                  <button
                    onClick={() => handleDemoLogin('renter')}
                    disabled={isLoading}
                    className="w-full text-left px-4 py-3 text-sm text-blue-600 hover:bg-blue-50 rounded-lg border border-blue-200 transition-all disabled:opacity-50 flex items-center space-x-3"
                  >
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Home size={16} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Renter Demo</p>
                      <p className="text-xs text-gray-500">renter@demo.com</p>
                    </div>
                  </button>
                  <button
                    onClick={() => handleDemoLogin('landlord')}
                    disabled={isLoading}
                    className="w-full text-left px-4 py-3 text-sm text-purple-600 hover:bg-purple-50 rounded-lg border border-purple-200 transition-all disabled:opacity-50 flex items-center space-x-3"
                  >
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <Users size={16} className="text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium">Landlord Demo</p>
                      <p className="text-xs text-gray-500">landlord@demo.com</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;