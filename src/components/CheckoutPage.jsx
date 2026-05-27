import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, CreditCard, ChevronRight, ChevronLeft, Calendar, User, Mail, Phone, MapPin, Truck } from 'lucide-react';

const checkoutSchema = z.object({
  signatory: z.string().min(3, "Signature name is too short (min 3 chars)"),
  company: z.string().optional(),
  email: z.string().email("Enter a valid B2B or personal email address"),
  phone: z.string().min(10, "Enter a valid phone number (min 10 digits)"),
  address: z.string().min(10, "Address is too short (min 10 chars)"),
  pincode: z.string().length(6, "Indian postal pin must be 6 digits"),
  timeline: z.string().min(1, "Select shipping timeline option"),
  cardNumber: z.string().regex(/^\d{16}$/, "Card number must be exactly 16 digits"),
  cardExpiry: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Expiry must be in MM/YY format"),
  cardCvv: z.string().regex(/^\d{3}$/, "CVV must be exactly 3 digits")
});

export default function CheckoutPage() {
  const { cart, submitCheckout, setActivePage, triggerHaptic } = useApp();
  const [step, setStep] = useState(1);
  const [isFlipped, setIsFlipped] = useState(false); // Credit card flip for CVV focus!
  const [submittedOrder, setSubmittedOrder] = useState(null);
  const [slaCountdown, setSlaCountdown] = useState(86400); // 24 hours in seconds

  useEffect(() => {
    if (!submittedOrder) return;
    const timer = setInterval(() => {
      setSlaCountdown((c) => Math.max(0, c - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [submittedOrder]);

  const formatCountdown = (seconds) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  const { register, handleSubmit, formState: { errors }, trigger, watch } = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      signatory: '',
      company: '',
      email: '',
      phone: '',
      address: '',
      pincode: '',
      timeline: 'Standard B2B Delivery',
      cardNumber: '',
      cardExpiry: '',
      cardCvv: ''
    }
  });

  const watchedFields = watch();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? (subtotal >= 1000 ? 0 : 150) : 0;
  const grandTotal = subtotal + shipping;

  const handleNextStep = async () => {
    let fieldsToValidate = [];
    if (step === 1) {
      fieldsToValidate = ['signatory', 'email', 'phone'];
    } else if (step === 2) {
      fieldsToValidate = ['address', 'pincode', 'timeline'];
    }

    const isValid = await trigger(fieldsToValidate);
    if (isValid) {
      triggerHaptic(20);
      setStep((prev) => prev + 1);
    } else {
      triggerHaptic(35); // Double vibration for validation blocks!
    }
  };

  const handlePrevStep = () => {
    triggerHaptic(10);
    setStep((prev) => prev - 1);
  };

  const onFormSubmit = (data) => {
    const order = submitCheckout(data);
    setSubmittedOrder(order);
  };

  // Helper to format card number with spaces for luxury preview
  const formatCardNumber = (num) => {
    if (!num) return '•••• •••• •••• ••••';
    return num.replace(/(\d{4})/g, '$1 ').trim();
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-cream flex flex-col items-center justify-center text-center p-8">
        <h2 className="text-2xl font-serif font-black text-green mb-4">No Active Payload to Checkout</h2>
        <p className="text-xs text-green/60 font-sans mb-8">Add exquisite millets to your bag before proceeding to procurement checkout.</p>
        <button
          onClick={() => { triggerHaptic(15); setActivePage('shop'); }}
          className="btn-gold px-8 py-4 font-sans tracking-[0.2em] font-bold text-white bg-gold"
          style={{ borderRadius: '0' }}
        >
          Browse Boutique
        </button>
      </div>
    );
  }

  return (
    <div className="py-12 md:py-24 bg-cream min-h-screen">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Form & Stages (7 cols) */}
        <div className="lg:col-span-7">
          
          {/* Progress Timeline Header */}
          <div className="flex items-center justify-between max-w-md mb-12">
            {[
              { num: 1, label: 'Signatory' },
              { num: 2, label: 'Logistics' },
              { num: 3, label: 'Settlement' }
            ].map((s) => (
              <React.Fragment key={s.num}>
                <div className="flex flex-col items-center gap-2">
                  <div className={`w-8 h-8 rounded-full border flex items-center justify-center font-bold text-xs font-serif transition-colors duration-300 ${
                    step >= s.num ? 'bg-green border-green text-white shadow' : 'bg-white border-green/15 text-green/45'
                  }`}>
                    {s.num}
                  </div>
                  <span className={`text-[8.5px] uppercase tracking-widest font-sans font-bold ${
                    step >= s.num ? 'text-green' : 'text-green/45'
                  }`}>
                    {s.label}
                  </span>
                </div>
                {s.num < 3 && (
                  <div className={`flex-1 h-[1.5px] mb-6 transition-colors duration-300 ${
                    step > s.num ? 'bg-green' : 'bg-green/10'
                  }`} />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Form Content container */}
          <form onSubmit={handleSubmit(onFormSubmit)} className="bg-white border border-green/10 p-8 shadow-xl relative overflow-hidden">
            
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  className="flex flex-col gap-6"
                >
                  <div className="border-l-2 border-gold pl-4">
                    <h3 className="text-[9px] uppercase tracking-wider text-green/50 font-bold font-sans">Step 1 of 3</h3>
                    <h4 className="text-base font-serif font-black text-green">Signatory Credentials</h4>
                  </div>

                  {/* Signatory Input */}
                  <div className="flex flex-col">
                    <label className="text-[8.5px] uppercase tracking-[0.2em] font-extrabold text-green/50 mb-2 font-sans">
                      Signatory Full Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        {...register('signatory')}
                        placeholder="e.g. Siddharth R."
                        className={`w-full bg-cream border px-10 py-3.5 text-xs font-sans focus:outline-none transition-colors ${
                          errors.signatory ? 'border-red-500' : 'border-green/10 focus:border-gold'
                        }`}
                        style={{ borderRadius: '0' }}
                      />
                      <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-green/30" />
                    </div>
                    {errors.signatory && (
                      <span className="text-[9px] font-bold text-red-500 mt-1 font-sans">{errors.signatory.message}</span>
                    )}
                  </div>

                  {/* Corporate Entity (Optional) */}
                  <div className="flex flex-col">
                    <label className="text-[8.5px] uppercase tracking-[0.2em] font-extrabold text-green/50 mb-2 font-sans">
                      Corporate Entity / Company (Optional)
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        {...register('company')}
                        placeholder="e.g. Cumbum Valley Wholesale"
                        className="w-full bg-cream border border-green/10 px-10 py-3.5 text-xs font-sans focus:outline-none focus:border-gold"
                        style={{ borderRadius: '0' }}
                      />
                      <ShieldCheck size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-green/30" />
                    </div>
                  </div>

                  {/* Email Input */}
                  <div className="flex flex-col">
                    <label className="text-[8.5px] uppercase tracking-[0.2em] font-extrabold text-green/50 mb-2 font-sans">
                      Contact Email Address
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        {...register('email')}
                        placeholder="e.g. partner@cumbumvalley.com"
                        className={`w-full bg-cream border px-10 py-3.5 text-xs font-sans focus:outline-none transition-colors ${
                          errors.email ? 'border-red-500' : 'border-green/10 focus:border-gold'
                        }`}
                        style={{ borderRadius: '0' }}
                      />
                      <Mail size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-green/30" />
                    </div>
                    {errors.email && (
                      <span className="text-[9px] font-bold text-red-500 mt-1 font-sans">{errors.email.message}</span>
                    )}
                  </div>

                  {/* Phone Input */}
                  <div className="flex flex-col">
                    <label className="text-[8.5px] uppercase tracking-[0.2em] font-extrabold text-green/50 mb-2 font-sans">
                      Active Phone Contact
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        {...register('phone')}
                        placeholder="e.g. +91 98450 11234"
                        className={`w-full bg-cream border px-10 py-3.5 text-xs font-sans focus:outline-none transition-colors ${
                          errors.phone ? 'border-red-500' : 'border-green/10 focus:border-gold'
                        }`}
                        style={{ borderRadius: '0' }}
                      />
                      <Phone size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-green/30" />
                    </div>
                    {errors.phone && (
                      <span className="text-[9px] font-bold text-red-500 mt-1 font-sans">{errors.phone.message}</span>
                    )}
                  </div>

                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  className="flex flex-col gap-6"
                >
                  <div className="border-l-2 border-gold pl-4">
                    <h3 className="text-[9px] uppercase tracking-wider text-green/50 font-bold font-sans">Step 2 of 3</h3>
                    <h4 className="text-base font-serif font-black text-green">Logistics & Address</h4>
                  </div>

                  {/* Shipping Address */}
                  <div className="flex flex-col">
                    <label className="text-[8.5px] uppercase tracking-[0.2em] font-extrabold text-green/50 mb-2 font-sans">
                      Delivery Street Address
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        {...register('address')}
                        placeholder="e.g. 12 Rue de la Paix, Paris or Whitefield, Bangalore"
                        className={`w-full bg-cream border px-10 py-3.5 text-xs font-sans focus:outline-none transition-colors ${
                          errors.address ? 'border-red-500' : 'border-green/10 focus:border-gold'
                        }`}
                        style={{ borderRadius: '0' }}
                      />
                      <MapPin size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-green/30" />
                    </div>
                    {errors.address && (
                      <span className="text-[9px] font-bold text-red-500 mt-1 font-sans">{errors.address.message}</span>
                    )}
                  </div>

                  {/* Postal Pincode */}
                  <div className="flex flex-col">
                    <label className="text-[8.5px] uppercase tracking-[0.2em] font-extrabold text-green/50 mb-2 font-sans">
                      Indian Postal Pin (6 Digits)
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        maxLength={6}
                        {...register('pincode')}
                        placeholder="e.g. 560066"
                        className={`w-full bg-cream border px-10 py-3.5 text-xs font-sans focus:outline-none transition-colors ${
                          errors.pincode ? 'border-red-500' : 'border-green/10 focus:border-gold'
                        }`}
                        style={{ borderRadius: '0' }}
                      />
                      <Truck size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-green/30" />
                    </div>
                    {errors.pincode && (
                      <span className="text-[9px] font-bold text-red-500 mt-1 font-sans">{errors.pincode.message}</span>
                    )}
                  </div>

                  {/* Logistics Timeline */}
                  <div className="flex flex-col">
                    <label className="text-[8.5px] uppercase tracking-[0.2em] font-extrabold text-green/50 mb-2 font-sans">
                      Procurement Shipping Timeline
                    </label>
                    <select
                      {...register('timeline')}
                      className="w-full bg-cream border border-green/10 px-4 py-3.5 text-xs font-sans font-bold focus:outline-none focus:border-gold cursor-pointer"
                      style={{ borderRadius: '0' }}
                    >
                      <option value="Standard B2B Delivery">Standard Cargo Transit (3-5 Days)</option>
                      <option value="Express Air Cargo">Express Temperature-Controlled Air (1-2 Days)</option>
                      <option value="Priority SLA Freight">Priority Organic SLA Delivery (Under 24 Hours)</option>
                    </select>
                  </div>

                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  className="flex flex-col gap-6"
                >
                  <div className="border-l-2 border-gold pl-4">
                    <h3 className="text-[9px] uppercase tracking-wider text-green/50 font-bold font-sans">Step 3 of 3</h3>
                    <h4 className="text-base font-serif font-black text-green">Secure B2B Settlement</h4>
                  </div>

                  {/* Interactive Flip Card UI */}
                  <div className="perspective-[1000px] w-full flex justify-center py-4 select-none">
                    <motion.div
                      animate={{ rotateY: isFlipped ? 180 : 0 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="w-full max-w-sm h-48 rounded-xl relative transform-style-3d shadow-xl text-white font-sans overflow-hidden"
                      style={{
                        background: 'linear-gradient(135deg, #082c1b 0%, #113f27 100%)',
                        border: '1px solid rgba(195, 156, 78, 0.4)'
                      }}
                    >
                      {/* FRONT OF THE CARD */}
                      <div className="absolute inset-0 backface-hidden p-6 flex flex-col justify-between">
                        <div className="flex justify-between items-start">
                          <div>
                            <span className="text-[8px] uppercase tracking-wider opacity-60">Sourcing Account</span>
                            <span className="block font-serif font-bold text-xs mt-0.5 tracking-widest text-gold">CUMBUM VALLEY BOUTIQUE</span>
                          </div>
                          <CreditCard size={28} className="text-gold" />
                        </div>
                        
                        <div className="font-serif tracking-[0.18em] text-lg text-cream my-auto">
                          {formatCardNumber(watchedFields.cardNumber)}
                        </div>

                        <div className="flex justify-between items-end">
                          <div>
                            <span className="text-[7px] uppercase tracking-wider opacity-50 block">Account Signatory</span>
                            <span className="text-[10px] font-bold uppercase truncate max-w-[180px] block">
                              {watchedFields.signatory || 'Siddharth R.'}
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-[7px] uppercase tracking-wider opacity-50 block">Expires</span>
                            <span className="text-[10px] font-bold tracking-widest">
                              {watchedFields.cardExpiry || 'MM/YY'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* BACK OF THE CARD */}
                      <div className="absolute inset-0 backface-hidden p-6 flex flex-col justify-between [transform:rotateY(180deg)]">
                        <div className="h-8 bg-charcoal -mx-6 mt-1" />
                        <div className="bg-white text-green p-1.5 text-right font-bold text-xs border-r-8 border-gold tracking-widest -mx-2">
                          {watchedFields.cardCvv || '•••'}
                        </div>
                        <div className="flex justify-between items-end">
                          <span className="text-[7px] uppercase tracking-widest opacity-40">
                            USDA Certified Cryptographic Encryption
                          </span>
                          <span className="text-[9px] font-black text-gold">SLA LOCK</span>
                        </div>
                      </div>

                    </motion.div>
                  </div>

                  {/* Card Number Input */}
                  <div className="flex flex-col">
                    <label className="text-[8.5px] uppercase tracking-[0.2em] font-extrabold text-green/50 mb-2 font-sans">
                      Secure Account Number (16 Digits)
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        maxLength={16}
                        {...register('cardNumber')}
                        placeholder="4111222233334444"
                        className={`w-full bg-cream border px-10 py-3.5 text-xs font-sans focus:outline-none transition-colors ${
                          errors.cardNumber ? 'border-red-500' : 'border-green/10 focus:border-gold'
                        }`}
                        style={{ borderRadius: '0' }}
                      />
                      <CreditCard size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-green/30" />
                    </div>
                    {errors.cardNumber && (
                      <span className="text-[9px] font-bold text-red-500 mt-1 font-sans">{errors.cardNumber.message}</span>
                    )}
                  </div>

                  {/* Card Expiry & CVV input grid */}
                  <div className="grid grid-cols-2 gap-4">
                    
                    <div className="flex flex-col">
                      <label className="text-[8.5px] uppercase tracking-[0.2em] font-extrabold text-green/50 mb-2 font-sans">
                        Expiry Date (MM/YY)
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          maxLength={5}
                          {...register('cardExpiry')}
                          placeholder="12/28"
                          className={`w-full bg-cream border px-10 py-3.5 text-xs font-sans focus:outline-none transition-colors ${
                            errors.cardExpiry ? 'border-red-500' : 'border-green/10 focus:border-gold'
                          }`}
                          style={{ borderRadius: '0' }}
                        />
                        <Calendar size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-green/30" />
                      </div>
                      {errors.cardExpiry && (
                        <span className="text-[9px] font-bold text-red-500 mt-1 font-sans">{errors.cardExpiry.message}</span>
                      )}
                    </div>

                    <div className="flex flex-col">
                      <label className="text-[8.5px] uppercase tracking-[0.2em] font-extrabold text-green/50 mb-2 font-sans">
                        Security Code (CVV)
                      </label>
                      <input
                        type="password"
                        maxLength={3}
                        {...register('cardCvv')}
                        onFocus={() => setIsFlipped(true)}
                        onBlur={() => setIsFlipped(false)}
                        placeholder="•••"
                        className={`w-full bg-cream border px-4 py-3.5 text-xs font-sans focus:outline-none transition-colors ${
                          errors.cardCvv ? 'border-red-500' : 'border-green/10 focus:border-gold'
                        }`}
                        style={{ borderRadius: '0' }}
                      />
                      {errors.cardCvv && (
                        <span className="text-[9px] font-bold text-red-500 mt-1 font-sans">{errors.cardCvv.message}</span>
                      )}
                    </div>

                  </div>

                </motion.div>
              )}
            </AnimatePresence>

            {/* Wizard Form Navigation toolbar buttons */}
            <div className="mt-8 border-t border-green/10 pt-6 flex justify-between items-center gap-4">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="btn-outline-green flex items-center justify-center gap-1.5 py-3.5 text-[10px] tracking-wider cursor-pointer"
                  style={{ borderRadius: '0' }}
                >
                  <ChevronLeft size={13} />
                  <span>Credential Back</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => { triggerHaptic(10); setActivePage('shop'); }}
                  className="btn-outline-green py-3.5 text-[10px] tracking-wider cursor-pointer"
                  style={{ borderRadius: '0' }}
                >
                  Boutique Bag
                </button>
              )}

              {step < 3 ? (
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="btn-gold flex items-center justify-center gap-1.5 py-3.5 text-[10px] tracking-widest text-white cursor-pointer ml-auto bg-gold"
                  style={{ borderRadius: '0' }}
                >
                  <span>Continue</span>
                  <ChevronRight size={13} />
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn-gold py-4 flex items-center justify-center gap-2 text-xs tracking-[0.2em] font-black uppercase text-white bg-gold border-none cursor-pointer hover:bg-gold-hover transition-all duration-300 shadow-gold ml-auto"
                  style={{ borderRadius: '0' }}
                >
                  <ShieldCheck size={14} className="animate-pulse" />
                  <span>Settle & Sourced</span>
                </button>
              )}
            </div>

          </form>

        </div>

        {/* Right Column: Checkout Bag Spec Invoice (5 cols) */}
        <div className="lg:col-span-5 self-start bg-white border border-green/10 p-6 md:p-8 shadow-lg flex flex-col justify-between">
          <div className="border-b border-gold/25 pb-4 mb-6">
            <h3 className="text-sm font-serif font-black text-green uppercase tracking-wider">
              Procurement Invoice
            </h3>
            <span className="text-[8px] uppercase tracking-wider text-green/45 font-bold font-sans">
              Authentic Organic Grains Payloads
            </span>
          </div>

          {/* Cart Item rows list */}
          <div className="flex flex-col gap-4 max-h-[40vh] overflow-y-auto mb-6 pr-2">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-center gap-3">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-8 h-8 rounded border border-gold/15 bg-green flex-shrink-0 relative overflow-hidden">
                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${item.product.image}')` }} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-[10px] font-serif font-black text-green leading-none truncate mb-1">
                      {item.product.name}
                    </h4>
                    <span className="text-[8px] uppercase tracking-wider text-gold font-bold font-sans block">
                      {Number(item.quantity.toFixed(1))} × {item.size} kg pack ({item.quantity * item.size} kg total)
                    </span>
                  </div>
                </div>

                <span className="text-xs font-bold text-green font-sans whitespace-nowrap">
                  ₹{Math.round(item.price * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          {/* Receipt Calculations summary */}
          <div className="border-t border-green/10 pt-4 flex flex-col gap-2.5">
            <div className="flex justify-between items-center text-[10px] font-sans font-bold text-green/60 uppercase">
              <span>Cart Subtotal</span>
              <span>₹{subtotal.toLocaleString()}</span>
            </div>

            <div className="flex justify-between items-center text-[10px] font-sans font-bold text-green/60 uppercase">
              <span>Secure Logistics Fee</span>
              {shipping === 0 ? (
                <span className="text-gold font-extrabold tracking-widest">Free Shipping</span>
              ) : (
                <span>₹{shipping.toLocaleString()}</span>
              )}
            </div>

            <div className="h-[1.5px] bg-gold/15 my-2" />

            <div className="flex justify-between items-end">
              <div>
                <span className="text-[9px] uppercase tracking-wider text-green/45 font-bold block font-sans">
                  Total Settlement
                </span>
                <span className="text-xl md:text-2xl font-serif font-black text-green leading-none">
                  ₹{grandTotal.toLocaleString()}
                </span>
              </div>
              <span className="text-[8.5px] text-green/40 font-sans font-bold uppercase">
                24H SLA Lock active
              </span>
            </div>

          </div>

        </div>

      </div>

      {/* 24-HOUR B2B SLA RESPONSE SECURED MODAL */}
      <AnimatePresence>
        {submittedOrder && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-4">
            {/* Soft dark green glassmorphic backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-green/90 backdrop-blur-md"
            />
            
            {/* iOS squircle floating modal */}
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 30 }}
              transition={{ type: "spring", stiffness: 350, damping: 28 }}
              className="relative z-10 w-full max-w-lg bg-cream border border-gold/45 p-8 md:p-12 text-center text-green rounded-[28px] max-h-[92vh] overflow-y-auto"
              style={{
                boxShadow: '0 30px 80px rgba(8, 44, 27, 0.45)'
              }}
            >
              {/* Organic watermark */}
              <div className="absolute right-4 bottom-4 font-serif text-[7vw] font-black uppercase text-green opacity-[0.02] select-none pointer-events-none">
                SLA CLEARED
              </div>

              {/* Verified Badge */}
              <div className="w-14 h-14 rounded-full bg-gold/10 text-gold flex items-center justify-center mx-auto mb-6 border border-gold/30">
                <ShieldCheck size={28} className="text-gold animate-pulse" />
              </div>

              <span className="text-[9px] uppercase tracking-[0.25em] font-extrabold text-gold font-sans block mb-2">
                24-Hour B2B SLA Response Secured
              </span>
              
              <h2 className="text-xl md:text-2xl font-serif font-black text-green leading-tight mb-4">
                Sourcing Consignment Registered
              </h2>

              <p className="text-xs text-green/75 font-sans leading-relaxed max-w-sm mx-auto mb-8">
                Your bulk millet procurement contract has been successfully initialized into our domestic and international logistics pipeline. Designated clearing executives are reviewing phytosanitary specifications.
              </p>

              {/* SLA Ticking Clock */}
              <div className="bg-white border border-gold/25 p-5 rounded-2xl mb-6 flex flex-col items-center shadow-inner">
                <span className="text-[8px] uppercase tracking-widest text-green/45 font-black block mb-2 font-sans">
                  SLA Response Guarantee Countdown
                </span>
                <span className="text-xl md:text-2xl font-mono font-black text-green tracking-widest leading-none">
                  {formatCountdown(slaCountdown)}
                </span>
                <span className="text-[8px] text-gold font-bold uppercase tracking-wider mt-2 font-sans">
                  Contract SLA: {submittedOrder.id}
                </span>
              </div>

              {/* Executive Grid */}
              <div className="grid grid-cols-2 gap-4 text-left bg-white/60 border border-green/5 p-4 rounded-xl mb-8 text-[11px] font-sans">
                <div>
                  <span className="text-[7.5px] uppercase tracking-wider text-green/45 font-bold block mb-0.5">Designated Executive</span>
                  <strong className="text-green">{submittedOrder.accountExecutive}</strong>
                  <span className="text-[9px] text-green/55 block">Procurement Specialist</span>
                </div>
                <div>
                  <span className="text-[7.5px] uppercase tracking-wider text-green/45 font-bold block mb-0.5">Logistics Port Sizing</span>
                  <strong className="text-green truncate block max-w-[150px]">{submittedOrder.shippingDetails.address}</strong>
                  <span className="text-[9px] text-green/55 block">Pin Code: {submittedOrder.shippingDetails.pincode}</span>
                </div>
              </div>

              {/* CTA button */}
              <button
                onClick={() => {
                  triggerHaptic(20);
                  setActivePage('portal');
                }}
                className="w-full btn-gold py-4 flex items-center justify-center gap-2.5 text-xs tracking-[0.2em] font-black uppercase text-cream bg-gold border-none cursor-pointer hover:bg-gold-hover transition-all duration-300 shadow-gold"
                style={{ borderRadius: '9999px' }}
              >
                <span>Access Live Logistics Hub</span>
                <ChevronRight size={12} className="text-cream" />
              </button>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
