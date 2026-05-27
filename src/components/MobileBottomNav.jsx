import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { Sprout, BarChart3, Leaf, ClipboardList, ShieldCheck, ShoppingBag } from 'lucide-react';

export default function MobileBottomNav() {
  const { activeMobileTab, setActiveMobileTab, cart, setIsCartOpen, triggerHaptic, activePage } = useApp();

  const tabs = [
    { id: 'home', label: 'Home', icon: Sprout },
    { id: 'catalog', label: 'Shop', icon: BarChart3 },
    { id: 'story', label: 'Story', icon: Leaf },
    { id: 'portal', label: 'Orders', icon: ClipboardList },
    { id: 'admin', label: 'Admin', icon: ShieldCheck }
  ];

  const handleTabClick = (tabId) => {
    triggerHaptic(20);
    setActiveMobileTab(tabId);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (activePage === 'checkout') return null;

  return (
    <>
      {/* Floating native-like Cart Action Bubble for mobile screens */}
      <AnimatePresence>
        {totalCartCount > 0 && activeMobileTab !== 'checkout' && (
          <motion.button
            initial={{ scale: 0, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 15 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => { triggerHaptic(25); setIsCartOpen(true); }}
            className="fixed bottom-20 right-5 z-40 w-12 h-12 rounded-full bg-gold border border-gold-light text-white shadow-xl md:hidden flex items-center justify-center cursor-pointer"
            style={{
              boxShadow: '0 8px 30px rgba(195, 156, 78, 0.45)'
            }}
          >
            <ShoppingBag size={18} className="text-white" />
            <span className="absolute -top-1 -right-1 bg-green text-white text-[8px] font-black w-4.5 h-4.5 rounded-full flex items-center justify-center border border-white">
              {totalCartCount}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* SLEEK LOW-PROFILE FLOATING GLASS DOCK (No circular bubbles) */}
      <nav className="fixed bottom-4 left-4 right-4 z-50 h-14 md:hidden bg-green/95 backdrop-blur-md border border-gold/25 rounded-xl flex items-center justify-around px-2 shadow-2xl print:hidden">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeMobileTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className="flex flex-col items-center justify-center relative flex-1 h-full bg-none border-none outline-none cursor-pointer"
              style={{
                color: isActive ? '#C9A84C' : 'rgba(245, 240, 232, 0.45)'
              }}
            >
              {/* Sleek Golden Top-Sliding Indicator Line */}
              {isActive && (
                <motion.span 
                  layoutId="activeMobileLine"
                  className="absolute top-0 w-8 h-[2.5px] bg-gold rounded-full"
                  transition={{ type: "spring", stiffness: 380, damping: 28 }}
                  style={{ boxShadow: '0 2px 8px rgba(201, 168, 76, 0.5)' }}
                />
              )}

              {/* Icon spring animation */}
              <motion.div 
                animate={{ 
                  y: isActive ? 1 : 0, 
                  scale: isActive ? 1.05 : 1 
                }}
                transition={{ type: "spring", stiffness: 450, damping: 28 }}
                className="relative z-10 text-inherit flex items-center justify-center"
              >
                <Icon
                  size={17}
                  className={isActive ? 'text-gold' : 'text-cream/50 opacity-70'}
                />
              </motion.div>

              {/* Minimalist active-glowing label text */}
              <span
                className={`text-[7px] font-black tracking-widest uppercase mt-0.5 relative z-10 transition-colors duration-300 font-sans ${
                  isActive ? 'text-gold font-extrabold' : 'text-cream/40'
                }`}
              >
                {tab.label}
              </span>

            </button>
          );
        })}
      </nav>
    </>
  );
}
