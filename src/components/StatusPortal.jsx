import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { ClipboardList, Clock, User, ShieldCheck, Mail, Phone, Scale, Calendar, CheckCircle2, FileText, Printer, Check } from 'lucide-react';

export default function StatusPortal() {
  const { orders, lastCompletedOrder, triggerHaptic } = useApp();
  
  // Default to last completed order if exists, otherwise first order in system
  const initialOrderId = lastCompletedOrder?.id || orders[0]?.id || null;
  const [selectedOrderId, setSelectedOrderId] = useState(initialOrderId);

  // Sync state if selected order is null but orders exist
  const activeOrder = orders.find(o => o.id === selectedOrderId) || orders[0];

  const handleOrderSelect = (id) => {
    triggerHaptic(15);
    setSelectedOrderId(id);
  };

  const statusSteps = [
    { key: 'Logged', title: 'Sourcing Order Logged', desc: 'Secure payment cleared. Packaging lines initialized under optical monitoring.' },
    { key: 'Processing', title: 'Optical Sorting & Sifting', desc: 'Heritage grains processed through high-resolution multi-wavelength infrared sorters.' },
    { key: 'Packed', title: 'Vacuum Sourced & Sealed', desc: 'Packed inside premium nitrogen-flushed, multi-layered bag wrappers.' },
    { key: 'Shipped', title: 'Logistics Dispatch', desc: 'Handed over to temperature-controlled air freight/cargo logistics partners.' },
    { key: 'Delivered', title: 'Sourced Successfully', desc: 'Cargo arrived at target destination with full phytosanitary clearance.' }
  ];

  const getStatusIndex = (status) => {
    switch (status) {
      case 'Logged': return 0;
      case 'Processing': return 1;
      case 'Packed': return 2;
      case 'Shipped': return 3;
      case 'Delivered': return 4;
      default: return 0;
    }
  };

  const currentStatusIdx = activeOrder ? getStatusIndex(activeOrder.status) : 0;

  const handlePrintReceipt = () => {
    triggerHaptic(20);
    window.print();
  };

  return (
    <section className="py-12 md:py-24 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Block */}
        <div className="border-b border-gold/25 pb-8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 print:hidden">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] font-bold mb-2 text-gold">
              Bespoke Customer Console
            </p>
            <h1 className="text-3xl md:text-5xl font-serif font-black text-green">
              Logistics Tracking Portal
            </h1>
            <p className="text-green/80 text-sm font-light mt-2 max-w-2xl font-sans leading-relaxed">
              Monitor your heritage millet consignments in real-time. Check vacuum-sealing validations, optical sortex compliance certificates, and SLA dispatch progress.
            </p>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white border border-green/10 p-12 text-center flex flex-col items-center shadow-lg print:hidden">
            <ClipboardList size={44} className="text-gold animate-pulse mb-4" />
            <h3 className="text-lg font-serif font-bold text-green">No Procurement History Found</h3>
            <p className="text-green/60 text-xs mt-2 font-sans">Submit a secure checkout from the Elite Catalog boutique to log active shipments.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Sidebar Queue (Print Hidden) */}
            <div className="lg:col-span-4 flex flex-col gap-4 print:hidden">
              <span className="text-[9px] uppercase tracking-widest font-extrabold text-green/45 block px-1">
                Completed Consignments ({orders.length})
              </span>
              
              <div className="space-y-3 overflow-y-auto max-h-[70vh]">
                {orders.map((ord) => {
                  const isSelected = activeOrder?.id === ord.id;
                  const itemNames = ord.items.map(i => i.product.tamilName).join(', ');

                  return (
                    <motion.div
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      key={ord.id}
                      onClick={() => handleOrderSelect(ord.id)}
                      className={`p-4 border transition-all duration-300 cursor-pointer relative ${
                        isSelected 
                          ? 'bg-white border-gold border-l-4 border-l-gold shadow-md' 
                          : 'bg-cream-darker/40 border-green/10 hover:bg-white'
                      }`}
                      style={{ borderRadius: '0' }}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-bold text-gold tracking-wider font-sans">
                          {ord.id}
                        </span>
                        
                        <span className="text-[7.5px] uppercase tracking-widest px-2 py-0.5 font-bold font-sans bg-green/10 text-green">
                          {ord.status}
                        </span>
                      </div>

                      <h4 className="text-xs font-serif font-black text-green leading-tight mb-1 truncate">
                        {itemNames}
                      </h4>
                      
                      <div className="flex justify-between items-center mt-3 text-[9px] text-green/40 font-semibold font-sans">
                        <span>{ord.shippingDetails.company || 'Direct Signatory'}</span>
                        <span className="font-extrabold text-green/60">
                          ₹{ord.total.toLocaleString()}
                        </span>
                      </div>

                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Right Detailed panel (Prints beautifully as Receipt Invoice!) */}
            <div className="lg:col-span-8 bg-white border border-green/5 p-6 md:p-10 shadow-lg relative overflow-hidden print:border-none print:shadow-none print:p-0">
              
              <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-green/10 pb-6 mb-8 gap-4">
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-green/40 font-semibold font-sans">Active Consignment</span>
                  <h3 className="text-xl font-serif font-black text-green">
                    {activeOrder.id}
                  </h3>
                  <div className="flex flex-wrap items-center gap-3 mt-2 text-[9.5px] text-green/50 font-sans">
                    <span>Company: <strong>{activeOrder.shippingDetails.company || 'Direct Signatory'}</strong></span>
                    <span>•</span>
                    <span>Signatory: <strong>{activeOrder.shippingDetails.signatory}</strong></span>
                  </div>
                </div>

                <div className="text-left md:text-right font-sans">
                  <span className="text-[9px] uppercase tracking-wider text-green/40 font-semibold">Log Timestamp</span>
                  <span className="text-xs font-bold text-green block">
                    {new Date(activeOrder.createdAt).toLocaleDateString()}
                  </span>
                  <span className="text-[9px] text-green/45 block">
                    {new Date(activeOrder.createdAt).toLocaleTimeString()}
                  </span>
                </div>
              </div>

              {/* Core Logistics payload summary strip */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-cream border border-green/10 p-5 mb-10 text-xs font-sans print:bg-white print:border-none">
                <div className="flex items-center gap-3">
                  <Scale size={16} className="text-gold" />
                  <div>
                    <span className="text-[8px] uppercase tracking-wider text-green/45 font-bold block mb-1">Items count</span>
                    <span className="font-bold text-green">
                      {activeOrder.items.reduce((sum, i) => sum + i.quantity, 0)} packages
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar size={16} className="text-gold" />
                  <div>
                    <span className="text-[8px] uppercase tracking-wider text-green/45 font-bold block mb-1">Transit method</span>
                    <span className="font-bold text-green truncate max-w-[140px] block">{activeOrder.shippingDetails.timeline}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <User size={16} className="text-gold" />
                  <div>
                    <span className="text-[8px] uppercase tracking-wider text-green/45 font-bold block mb-1">Sourcing Officer</span>
                    <span className="font-bold text-gold">{activeOrder.accountExecutive}</span>
                  </div>
                </div>
              </div>

              {/* TIMELINE TRACKING NODES (Hidden on print) */}
              <div className="space-y-8 relative pl-1 mb-12 print:hidden">
                
                {/* Connector line grows from scaleY */}
                <motion.div 
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  className="absolute left-[11px] top-2 bottom-2 w-[2px] bg-green/10 z-0 origin-top"
                />

                {statusSteps.map((step, idx) => {
                  const isDone = currentStatusIdx >= idx;
                  const isCurrent = currentStatusIdx === idx;
                  
                  return (
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1, duration: 0.5 }}
                      key={step.key} 
                      className="flex gap-6 items-start relative z-10"
                    >
                      {/* Circle node indicator */}
                      <motion.div 
                        animate={isCurrent ? { 
                          scale: [1, 1.15, 1],
                          boxShadow: "0 0 12px rgba(195, 156, 78, 0.45)"
                        } : {}}
                        transition={isCurrent ? { repeat: Infinity, duration: 2 } : {}}
                        className={`w-6 h-6 rounded-full flex items-center justify-center border transition-colors ${
                          isDone ? 'bg-green border-green text-cream' : 'bg-white border-green/15 text-green/30'
                        }`}
                      >
                        {isDone ? (
                          <Check size={12} className="text-gold stroke-[3px]" />
                        ) : (
                          <Clock size={10} />
                        )}
                      </motion.div>

                      {/* Content */}
                      <div className="flex-1 font-sans">
                        <div className="flex items-center gap-2">
                          <h4 className={`text-sm font-serif font-black ${isDone ? 'text-green' : 'text-green/40'}`}>
                            {step.title}
                          </h4>
                          
                          {isCurrent && (
                            <span className="text-[8px] uppercase tracking-widest font-black px-2 py-0.5 bg-gold-light text-gold animate-pulse">
                              Active progress
                            </span>
                          )}
                        </div>
                        
                        <p className={`text-xs font-light mt-1 ${isDone ? 'text-green/75' : 'text-green/40'}`}>
                          {step.desc}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* DETAILED DIGITAL INVOICE RECEIPT CARD */}
              <div className="border-t border-gold/20 pt-8 mt-8">
                <div className="bg-cream border border-gold/25 p-6 md:p-8 flex flex-col gap-6 relative shadow-inner">
                  
                  {/* Decorative organic background stamp */}
                  <div className="absolute right-4 bottom-4 font-serif text-[7vw] font-black uppercase text-green opacity-[0.03] select-none pointer-events-none">
                    CUMBUM
                  </div>

                  <div className="flex justify-between items-start border-b border-green/10 pb-4">
                    <div>
                      <h4 className="text-xs font-serif font-black text-green uppercase tracking-wider">
                        Commercial Receipt Invoice
                      </h4>
                      <span className="text-[8px] uppercase tracking-widest text-green/50 font-bold font-sans">
                        USDA Phytosanitary Certified Payload
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-serif font-bold text-gold">{activeOrder.id}</span>
                    </div>
                  </div>

                  {/* List of items */}
                  <div className="flex flex-col gap-3.5">
                    {activeOrder.items.map((item) => (
                      <div key={item.id} className="flex justify-between items-center gap-3 text-xs">
                        <div className="min-w-0">
                          <span className="font-serif font-black text-green block">
                            {item.product.name}
                          </span>
                          <span className="text-[8px] uppercase tracking-wider text-gold font-bold font-sans">
                            {Number(item.quantity.toFixed(1))} × {item.size} kg pack ({item.quantity * item.size} kg total weight)
                          </span>
                        </div>
                        <span className="font-bold text-green font-sans">
                          ₹{Math.round(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Totals box */}
                  <div className="border-t border-green/10 pt-4 flex flex-col gap-2">
                    <div className="flex justify-between items-center text-[10px] font-sans font-bold text-green/60 uppercase">
                      <span>Subtotal</span>
                      <span>₹{activeOrder.total.toLocaleString()}</span>
                    </div>

                    <div className="flex justify-between items-center text-[10px] font-sans font-bold text-green/60 uppercase">
                      <span>Logistics cargo fee</span>
                      {activeOrder.total >= 1000 ? (
                        <span className="text-gold font-extrabold tracking-wider">Free cargo</span>
                      ) : (
                        <span>₹150</span>
                      )}
                    </div>

                    <div className="h-[1px] bg-gold/15 my-1" />

                    <div className="flex justify-between items-end">
                      <div>
                        <span className="text-[9px] uppercase tracking-wider text-green/45 font-bold block font-sans">
                          Settlement Paid
                        </span>
                        <span className="text-xl font-serif font-black text-green leading-none">
                          ₹{(activeOrder.total >= 1000 ? activeOrder.total : activeOrder.total + 150).toLocaleString()}
                        </span>
                      </div>

                      <div className="text-right">
                        <span className="text-[8px] text-green/40 uppercase block font-sans">Settlement method</span>
                        <span className="text-[9px] font-black text-green font-sans uppercase">Mock Card Verified</span>
                      </div>
                    </div>
                  </div>

                  {/* Shipping address recap */}
                  <div className="border-t border-green/10 pt-4 text-[9.5px] font-sans leading-relaxed text-green/70">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <span className="font-extrabold uppercase text-green/55 block text-[8px] tracking-wider mb-0.5">Logistics Destination</span>
                        <strong>{activeOrder.shippingDetails.signatory}</strong><br />
                        {activeOrder.shippingDetails.company && <span>{activeOrder.shippingDetails.company}<br /></span>}
                        {activeOrder.shippingDetails.address}<br />
                        Pin: {activeOrder.shippingDetails.pincode}
                      </div>

                      <div className="flex flex-col justify-between items-start md:items-end">
                        <div className="md:text-right">
                          <span className="font-extrabold uppercase text-green/55 block text-[8px] tracking-wider mb-0.5">Contact Link</span>
                          {activeOrder.shippingDetails.email}<br />
                          {activeOrder.shippingDetails.phone}
                        </div>

                        {/* Gold seal */}
                        <div className="flex items-center gap-1.5 mt-4 border border-gold/40 px-3 py-1 bg-white">
                          <ShieldCheck size={14} className="text-gold" />
                          <span className="text-[8px] uppercase tracking-widest font-black text-green">USDA Organic Sealed</span>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* Action buttons toolbar (Hidden on print) */}
              <div className="mt-8 flex justify-between items-center gap-4 print:hidden">
                <div className="flex items-center gap-2 text-[9px] text-green/50 uppercase font-bold tracking-widest font-sans">
                  <Clock size={12} className="text-gold" />
                  <span>SLA Guarantee: 24H RESPONSE TIME SECURED</span>
                </div>

                <button
                  onClick={handlePrintReceipt}
                  className="btn-gold flex items-center justify-center gap-2 py-3 px-6 text-[10px] tracking-widest text-white cursor-pointer bg-gold"
                  style={{ borderRadius: '0' }}
                >
                  <Printer size={13} />
                  <span>Print Receipt</span>
                </button>
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
}
