import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { Sprout, BarChart3, Leaf, ClipboardList, ShieldCheck, ShoppingBag } from 'lucide-react';

export default function Navbar() {
  const { activePage, setActivePage, cart, setIsCartOpen, triggerHaptic } = useApp();

  const navItems = [
    { id: 'landing', label: 'Home', icon: Sprout },
    { id: 'shop', label: 'Shop All', icon: BarChart3 },
    { id: 'story', label: 'Our Story', icon: Leaf },
    { id: 'portal', label: 'Track Order', icon: ClipboardList },
    { id: 'admin', label: 'Admin', icon: ShieldCheck }
  ];

  const handleNavClick = (id) => {
    triggerHaptic(15);
    setActivePage(id);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 py-4 px-6 md:px-12 bg-cream/85 backdrop-blur-md border-b border-gold/25 hidden md:block print:hidden"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Brand Identity */}
        <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => handleNavClick('landing')}>
          <div className="w-10 h-10 rounded-full bg-green border border-gold flex items-center justify-center shadow-gold">
            <span className="font-serif text-white font-bold text-lg">CV</span>
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-widest text-green font-serif leading-none">CUMBUM VALLEY</h1>
            <p className="text-[9px] uppercase tracking-[0.25em] text-gold font-bold mt-1">Organic Millet Store</p>
          </div>
        </div>

        {/* Dynamic Navigation Tabs */}
        <nav className="flex items-center gap-8">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="relative py-2 px-1 text-xs font-bold tracking-widest uppercase transition-colors duration-300 flex items-center gap-2 outline-none cursor-pointer border-none bg-transparent"
                style={{
                  color: isActive ? '#082c1b' : 'rgba(8, 44, 27, 0.55)',
                }}
              >
                <Icon size={14} className={`transition-transform duration-300 ${isActive ? 'scale-110 text-gold' : 'opacity-70'}`} />
                <span>{item.label}</span>
                
                {/* Gold indicator underline */}
                {isActive && (
                  <motion.div 
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gold"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* E-Commerce Shopping Bag Button & SLA Badge */}
        <div className="flex items-center gap-4">
          
          <button 
            onClick={() => { triggerHaptic(20); setIsCartOpen(true); }}
            className="relative p-2.5 bg-white border border-gold/30 rounded-full text-green hover:bg-gold-light transition-all duration-300 cursor-pointer flex items-center justify-center shadow-gold"
          >
            <ShoppingBag size={15} className="text-gold" />
            {totalCartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-green text-white text-[8px] font-black w-4 h-4 rounded-full flex items-center justify-center border border-white">
                {totalCartCount}
              </span>
            )}
          </button>

          {/* Global Security SLA Badge */}
          <div className="flex items-center gap-2 px-4 py-2 bg-gold-light border border-gold/30 rounded-full text-[9px] font-bold uppercase tracking-wider text-green">
            <div className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />
            <span>Phytosanitary Certified</span>
          </div>

        </div>

      </div>
    </motion.header>
  );
}
