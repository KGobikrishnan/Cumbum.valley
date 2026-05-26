import React from 'react';
import { useApp } from '../context/AppContext';
import { ShoppingBag } from 'lucide-react';

export default function MobileTopNav() {
  const { cart, setIsCartOpen, triggerHaptic, setActivePage } = useApp();

  const handleLogoClick = () => {
    triggerHaptic(10);
    setActivePage('landing');
  };

  const handleCartClick = () => {
    triggerHaptic(20);
    setIsCartOpen(true);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="fixed top-0 left-0 right-0 h-14 z-50 md:hidden bg-cream/90 backdrop-blur-md border-b border-gold/20 flex items-center justify-between px-5 select-none print:hidden">
      
      {/* Brand Identity */}
      <div onClick={handleLogoClick} className="flex items-center gap-2.5 cursor-pointer">
        <div className="w-8 h-8 rounded-full bg-green border border-gold flex items-center justify-center shadow-gold">
          <span className="font-serif text-white font-bold text-sm">CV</span>
        </div>
        <div>
          <h1 className="text-sm font-bold tracking-widest text-green font-serif leading-none">CUMBUM VALLEY</h1>
          <p className="text-[7.5px] uppercase tracking-[0.2em] text-gold font-extrabold mt-0.5">Heritage Organics</p>
        </div>
      </div>

      {/* Shopping Bag Button (Mobile Top Nav) */}
      <button
        onClick={handleCartClick}
        className="relative w-8 h-8 rounded-full bg-white border border-gold/20 flex items-center justify-center text-green cursor-pointer shadow-gold"
      >
        <ShoppingBag size={13} className="text-gold" />
        {totalCartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-green text-white text-[7.5px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center border border-white">
            {totalCartCount}
          </span>
        )}
      </button>

    </header>
  );
}
