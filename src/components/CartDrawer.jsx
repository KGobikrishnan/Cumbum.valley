import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { X, Trash2, ShoppingBag, Plus, Minus, ArrowRight, ShieldCheck } from 'lucide-react';

const getBulkSizeLabel = (size) => {
  if (size === 50) return '50 kg Bag';
  if (size === 100) return '100 kg Bag';
  if (size === 500) return '500 kg Jumbo';
  if (size === 1000) return '1 MT Pallet';
  return `${size} kg Bag`;
};

// Sub-component to manage local weight input state to prevent typing glitches/auto-deletes
function CartItemRow({ item, updateCartQuantity, removeFromCart, triggerHaptic }) {
  const [localWeight, setLocalWeight] = useState(item.quantity * item.size);

  useEffect(() => {
    setLocalWeight(item.quantity * item.size);
  }, [item.quantity, item.size]);

  const handleWeightChange = (e) => {
    const val = e.target.value;
    setLocalWeight(val);
    
    const parsedWeight = parseFloat(val);
    if (!isNaN(parsedWeight) && parsedWeight > 0) {
      const newQty = parsedWeight / item.size;
      updateCartQuantity(item.id, newQty);
    }
  };

  const handleBlur = () => {
    const parsedWeight = parseFloat(localWeight);
    if (isNaN(parsedWeight) || parsedWeight <= 0) {
      // If cleared or zero, reset to previous value or minimum of 1 pack
      const prevWeight = item.quantity * item.size;
      setLocalWeight(prevWeight > 0 ? prevWeight : item.size);
      if (!(item.quantity > 0)) {
        updateCartQuantity(item.id, 1);
      }
    } else {
      // Force round to 1 decimal place on blur for clean B2B shipping specifications
      const roundedWeight = Math.round(parsedWeight * 10) / 10;
      setLocalWeight(roundedWeight);
      updateCartQuantity(item.id, roundedWeight / item.size);
    }
  };

  return (
    <motion.div
      layout
      className="p-4 bg-white border border-green/5 shadow flex gap-4 items-center justify-between group relative overflow-hidden"
    >
      {/* Visual miniature */}
      <div className="w-16 h-16 rounded overflow-hidden border border-gold/15 flex-shrink-0 relative bg-green">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${item.product.image}')` }}
        />
      </div>

      {/* Details content */}
      <div className="flex-1 min-w-0">
        <h4 className="text-xs font-serif font-black text-green truncate leading-tight group-hover:text-gold transition-colors duration-300">
          {item.product.name}
        </h4>
        <p className="text-[9px] text-gold font-bold uppercase tracking-wider mt-0.5 font-sans">
          {getBulkSizeLabel(item.size)} • ₹{item.price.toLocaleString()} per unit
        </p>

        {/* B2B Dual Quantity & Manual Weight Tools */}
        <div className="flex items-center gap-3 mt-3">
          {/* Rapid Bag increment tools */}
          <div className="flex items-center bg-cream border border-green/10 p-1 w-18 justify-between">
            <button
              onClick={() => {
                const nextQty = Math.max(0, item.quantity - 1);
                updateCartQuantity(item.id, nextQty);
              }}
              className="w-5 h-5 flex items-center justify-center text-green cursor-pointer border-none bg-transparent hover:bg-white"
              title="Decrease bags count"
            >
              <Minus size={9} />
            </button>
            <span className="text-[9px] font-black text-green font-sans" title="Bags count">
              {Number(item.quantity.toFixed(1))}
            </span>
            <button
              onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
              className="w-5 h-5 flex items-center justify-center text-green cursor-pointer border-none bg-transparent hover:bg-white"
              title="Increase bags count"
            >
              <Plus size={9} />
            </button>
          </div>

          {/* Manual weight input tool */}
          <div className="flex items-center border border-green/10 bg-cream p-1 px-2">
            <input
              type="number"
              min="0"
              step="any"
              value={localWeight}
              onChange={handleWeightChange}
              onBlur={handleBlur}
              className="w-16 bg-transparent border-none text-center text-[9px] font-black text-green focus:outline-none p-0"
              title="Manual payload weight in kg"
            />
            <span className="text-[7.5px] font-bold text-green/45 select-none ml-1">kg</span>
          </div>
        </div>
      </div>

      {/* Pricing total & Remove tool */}
      <div className="flex flex-col items-end justify-between self-stretch">
        <button
          onClick={() => removeFromCart(item.id)}
          className="text-green/30 hover:text-red border-none bg-transparent cursor-pointer transition-colors"
        >
          <Trash2 size={13} className="hover:text-red-500" />
        </button>
        
        <span className="text-xs font-bold text-green font-sans mt-auto">
          ₹{Math.round(item.price * item.quantity).toLocaleString()}
        </span>
      </div>

    </motion.div>
  );
}

export default function CartDrawer() {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    updateCartQuantity, 
    removeFromCart, 
    setActivePage,
    triggerHaptic 
  } = useApp();

  const handleClose = () => {
    triggerHaptic(10);
    setIsCartOpen(false);
  };

  const handleProceedToCheckout = () => {
    triggerHaptic(25);
    setIsCartOpen(false);
    setActivePage('checkout');
  };

  const totalWeight = cart.reduce((sum, item) => sum + item.size * item.quantity, 0);
  const meetsMinWeight = totalWeight >= 50;
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? (totalWeight >= 500 ? 0 : 450) : 0; // Free B2B sea freight over 500kg
  const grandTotal = subtotal + shipping;

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop screen */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-green/75 backdrop-blur-md"
            onClick={handleClose}
          />

          {/* Right sidebar drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 350, damping: 32 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-cream shadow-2xl z-[100] border-l border-gold/30 flex flex-col justify-between"
          >
            {/* Header */}
            <div className="p-6 border-b border-gold/20 flex justify-between items-center bg-cream/90 backdrop-blur sticky top-0 z-10">
              <div className="flex items-center gap-2.5">
                <ShoppingBag size={18} className="text-gold" />
                <h3 className="text-lg font-serif font-black text-green">
                  Your Sourcing Bag
                </h3>
                {cart.length > 0 && (
                  <span className="bg-gold text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                    {Math.ceil(cart.reduce((sum, i) => sum + i.quantity, 0))} items
                  </span>
                )}
              </div>
              
              <button
                onClick={handleClose}
                className="w-8 h-8 rounded-full border border-green/10 bg-white flex items-center justify-center text-green cursor-pointer hover:bg-gold-light hover:border-gold transition-all duration-300"
              >
                <X size={16} />
              </button>
            </div>

            {/* Scrollable list content */}
            <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-4">
              {cart.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                  <ShoppingBag size={48} className="text-gold opacity-35 animate-pulse mb-4" />
                  <h4 className="text-sm font-serif font-bold text-green uppercase tracking-wider">
                    Sourcing Bag is Empty
                  </h4>
                  <p className="text-[11px] text-green/60 font-sans mt-2 max-w-[240px] leading-relaxed">
                    Select elite millet grains from our boutique catalog to begin building your heritage payload.
                  </p>
                  <button
                    onClick={() => { triggerHaptic(15); setIsCartOpen(false); setActivePage('shop'); }}
                    className="btn-outline-green mt-6 text-[9px] py-3 px-6 tracking-widest font-sans"
                    style={{ borderRadius: '0' }}
                  >
                    Boutique Showroom
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <CartItemRow
                    key={item.id}
                    item={item}
                    updateCartQuantity={updateCartQuantity}
                    removeFromCart={removeFromCart}
                    triggerHaptic={triggerHaptic}
                  />
                ))
              )}
            </div>

            {/* Subtotal Receipt Summary Footer */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-gold/20 bg-cream/90 backdrop-blur sticky bottom-0">
                <div className="flex flex-col gap-2.5 mb-6">
                  
                  <div className="flex justify-between items-center text-[10px] font-sans font-bold text-green/60 uppercase">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between items-center text-[10px] font-sans font-bold text-green/60 uppercase">
                    <span>Shipping Logistics</span>
                    {shipping === 0 ? (
                      <span className="text-gold font-extrabold tracking-widest">Free Cargo</span>
                    ) : (
                      <span>₹{shipping.toLocaleString()}</span>
                    )}
                  </div>

                  {shipping > 0 && (
                    <span className="text-[8.5px] text-gold font-bold uppercase tracking-wider font-sans leading-none block -mt-1">
                      Add {(500 - totalWeight).toLocaleString()} kg more for free B2B sea freight
                    </span>
                  )}

                  <div className="h-[1px] bg-gold/10 my-1" />

                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-green/45 font-bold block font-sans">
                        Estimated Payoff
                      </span>
                      <span className="text-2xl font-serif font-black text-green leading-none">
                        ₹{grandTotal.toLocaleString()}
                      </span>
                    </div>

                    <span className="text-[8px] text-green/40 uppercase font-sans font-bold">
                      All Import duties incl.
                    </span>
                  </div>

                </div>

                {/* Primary checkouts buttons triggers */}
                {meetsMinWeight ? (
                  <button
                    onClick={handleProceedToCheckout}
                    className="w-full btn-gold py-4 flex items-center justify-center gap-3 text-xs tracking-[0.2em] font-black uppercase text-white bg-gold border-none cursor-pointer hover:bg-gold-hover transition-all duration-300 shadow-gold mb-3"
                    style={{ borderRadius: '0' }}
                  >
                    <span>Log Logistics Checkout</span>
                    <ArrowRight size={13} />
                  </button>
                ) : (
                  <div className="flex flex-col gap-2 mb-3 font-sans">
                    <div className="p-3 bg-red-500/10 border border-red-500/35 text-red-700 text-center text-[9px] font-black uppercase tracking-wider">
                      ⚠️ MINIMUM QUANTITY RESTRICTION
                    </div>
                    <p className="text-[10px] text-green/70 font-sans text-center font-medium leading-relaxed mb-1">
                      A minimum order weight of <strong className="text-gold">50 kg</strong> is required for B2B export clearances.
                    </p>
                    <div className="w-full bg-cream-darker border border-green/10 p-2.5 flex justify-between items-center text-[10px] font-sans font-bold">
                      <span className="text-green/50">Current order payload:</span>
                      <span className="text-red-600">{totalWeight} kg / 50 kg</span>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-center gap-1.5 text-[8.5px] text-green/50 uppercase font-bold tracking-widest font-sans">
                  <ShieldCheck size={11} className="text-gold" />
                  <span>USDA Certified Compliant Delivery</span>
                </div>

              </div>
            )}

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
