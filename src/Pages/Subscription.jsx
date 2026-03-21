import React, { useState } from 'react';
import SideBar from '../Component/SideBar';
import '../Stylesheets/Subscription.css';
import withAuth from '../Component/withAuth';
import { 
  TbDiamond, 
  TbCheck, 
  TbCreditCard, 
  TbBolt,
  TbMailFast,
  TbShieldCheck
} from 'react-icons/tb';

const Subscription = () => {
  const [selectedGateway, setSelectedGateway] = useState('paystack');

  const handleSubscribe = () => {
    // Intended redirection or logic
    console.log(`Initiating checkout with ${selectedGateway}`);
  };

  return (
    <div className="subscription-wrapper">
      <SideBar />
      <main className="subscription-main fade-in">
         <header className="subscription-header">
            <h1 className="page-title">
              <TbDiamond className="title-icon" style={{ color: '#8b5cf6' }} />
              Premium Access
            </h1>
            <p className="page-subtitle">Upgrade your experience with automated reminders and advanced tracking</p>
         </header>

         <div className="sub-content-grid">
            {/* Plan Info Card */}
            <div className="plan-showcase-card slide-up">
               <div className="plan-badge">Pro Plan</div>
               <h2>Productivity Agent</h2>
               <div className="plan-price">
                  <span className="currency">$</span>
                  <span className="amount">5</span>
                  <span className="period">/mo</span>
               </div>
               <p className="plan-desc">
                 Never miss a vital deadline again. TickIt Pro acts as your personal assistant, handling follow-ups, prioritizing timelines, and sending frequent notification reminders to keep you on execution parameters.
               </p>
               
               <ul className="plan-features">
                 <li><TbMailFast className="feat-icon" /> Frequent email & push reminders for pending tasks</li>
                 <li><TbBolt className="feat-icon" /> Accelerated syncing across all registered devices</li>
                 <li><TbShieldCheck className="feat-icon" /> Priority backup & extended data history</li>
                 <li><TbCheck className="feat-icon" /> Early access to upcoming ecosystem features</li>
               </ul>
            </div>

            {/* Payment Options Checkout */}
            <div className="payment-checkout-card slide-up" style={{ animationDelay: '0.1s' }}>
               <h3><TbCreditCard /> Select Checkout Method</h3>
               <p className="checkout-subtitle">Choose your preferred gateway to instantly unlock Premium.</p>
               
               <div className="payment-options-grid">
                  <div 
                    className={`payment-option ${selectedGateway === 'paystack' ? 'selected' : ''}`}
                    onClick={() => setSelectedGateway('paystack')}
                  >
                     <div className="gw-logo paystack">paystack</div>
                  </div>
                  
                  <div 
                    className={`payment-option ${selectedGateway === 'flutterwave' ? 'selected' : ''}`}
                    onClick={() => setSelectedGateway('flutterwave')}
                  >
                     <div className="gw-logo flutterwave">Flutterwave</div>
                  </div>

                  <div className="payment-option disabled">
                     <span className="coming-soon-badge">Coming Soon</span>
                     <div className="gw-logo stripe">stripe</div>
                  </div>

                  <div className="payment-option disabled">
                     <span className="coming-soon-badge">Coming Soon</span>
                     <div className="gw-logo paypal">PayPal</div>
                  </div>
               </div>

               <div className="checkout-action-area">
                 <button className="btn-primary checkout-btn" onClick={handleSubscribe}>
                   <TbDiamond style={{ fontSize: '1.2rem' }} />
                   Activate via {selectedGateway === 'paystack' ? 'Paystack' : 'Flutterwave'}
                 </button>
                 <span className="secure-checkout-text">
                   <TbShieldCheck /> 256-bit encrypted checkout
                 </span>
               </div>
            </div>
         </div>
      </main>
    </div>
  );
};

export default withAuth(Subscription);
