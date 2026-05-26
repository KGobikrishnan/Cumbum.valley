import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { Sprout, BarChart3, ClipboardList, ShieldCheck, ShoppingBag } from 'lucide-react';

export default function MobileBottomNav() {
  const { activeMobileTab, setActiveMobileTab, cart, setIsCartOpen, triggerHaptic } = useApp();

  const tabs = [
    { id: 'home', label: 'Heritage', icon: Sprout },
    { id: 'catalog', label: 'Boutique', icon: BarChart3 },
    { id: 'portal', label: 'Tracker', icon: ClipboardList },
    { id: 'admin', label: 'Admin', icon: ShieldCheck }
  ];

  const handleTabClick = (tabId) => {
    triggerHaptic(20);
    setActiveMobileTab(tabId);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* Floating native-like Cart Action Bubble for mobile screens */}
      <AnimatePresence>
        {totalCartCount > 0 && (
          <motion.button
            initial={{ scale: 0, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 15 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => { triggerHaptic(25); setIsCartOpen(true); }}
            className="fixed bottom-24 right-5 z-40 w-14 h-14 rounded-full bg-gold border border-gold-light text-white shadow-xl md:hidden flex items-center justify-center cursor-pointer"
            style={{
              boxShadow: '0 8px 30px rgba(195, 156, 78, 0.45)'
            }}
          >
            <ShoppingBag size={20} className="text-white" />
            <span className="absolute -top-1 -right-1 bg-green text-white text-[8.5px] font-black w-5 h-5 rounded-full flex items-center justify-center border border-white">
              {totalCartCount}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      <nav className="fixed bottom-0 left-0 right-0 z-50 h-20 md:hidden bg-cream/95 backdrop-blur-md border-t border-gold/25 flex items-center justify-around pb-4 print:hidden">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeMobileTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className="flex flex-col items-center justify-center relative flex-1 h-full bg-none border-none outline-none cursor-pointer"
              style={{
                color: isActive ? '#082c1b' : 'rgba(8, 44, 27, 0.45)'
              }}
            >
              {/* Native Active Sliding bubble */}
              {isActive && (
                <motion.span 
                  layoutId="activeMobileBubble"
                  className="absolute w-12 h-12 rounded-full bg-gold-light border border-gold opacity-30 z-0"
                  transition={{ type: "spring", stiffness: 350, damping: 25 }}
                  style={{ translateY: '-2px' }}
                />
              )}

              {/* Icon anim */}
              <motion.div 
                animate={{ 
                  y: isActive ? -2 : 0, 
                  scale: isActive ? 1.1 : 1 
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="relative z-10 text-inherit"
              >
                <Icon
                  size={20}
                  className={isActive ? 'text-gold' : 'opacity-70'}
                />
              </motion.div>

              {/* Label text */}
              <span
                className={`text-[8.5px] font-bold tracking-wider uppercase mt-1 relative z-10 transition-colors duration-300 font-sans ${
                  isActive ? 'text-green font-extrabold' : 'text-green/50'
                }`}
              >
                {tab.label}
              </span>

              {/* Gold dot */}
              {isActive && (
                <motion.span
                  layoutId="activeMobileDot"
                  className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-gold shadow-gold"
                  transition={{ type: "spring", stiffness: 450, damping: 25 }}
                />
              )}
            </button>
          );
        })}
      </nav>
    </>
  );
}
