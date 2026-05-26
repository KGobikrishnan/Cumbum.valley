import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { X, Star, ShoppingBag, Leaf, Shield, Award, Plus, Minus } from 'lucide-react';

export default function ProductDetailsModal() {
  const { isDetailsOpen, setIsDetailsOpen, activeProduct, addToCart, triggerHaptic } = useApp();
  const [selectedSize, setSelectedSize] = useState(1); // Default to 1kg
  const [quantity, setQuantity] = useState(1);

  // Reset local state when active product changes
  useEffect(() => {
    if (activeProduct) {
      setSelectedSize(activeProduct.availableSizes[0] || 1);
      setQuantity(1);
    }
  }, [activeProduct]);

  if (!activeProduct) return null;

  const handleClose = () => {
    triggerHaptic(10);
    setIsDetailsOpen(false);
  };

  const handleSizeSelect = (size) => {
    triggerHaptic(15);
    setSelectedSize(size);
  };

  const handleIncrement = () => {
    triggerHaptic(10);
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      triggerHaptic(10);
      setQuantity((prev) => prev - 1);
    }
  };

  const handleAddToBag = () => {
    addToCart(activeProduct, quantity, selectedSize);
    setIsDetailsOpen(false);
  };

  const unitPrice = Math.round(activeProduct.pricePerKg * selectedSize);
  const totalPrice = unitPrice * quantity;

  return (
    <AnimatePresence>
      {isDetailsOpen && (
        <>
          {/* Backdrop blur overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-green/75 backdrop-blur-md"
            onClick={handleClose}
          />

          {/* Slide up details sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            className="fixed bottom-0 left-0 right-0 max-h-[92vh] md:max-h-[85vh] z-50 bg-cream border-t border-gold/30 rounded-t-[24px] overflow-hidden flex flex-col md:max-w-4xl md:mx-auto md:bottom-1/2 md:translate-y-1/2 md:rounded-[24px] md:border"
            style={{
              boxShadow: '0 -20px 40px rgba(8, 44, 27, 0.12)'
            }}
          >
            {/* Header toolbar */}
            <div className="p-5 md:p-6 border-b border-gold/20 flex justify-between items-center bg-cream/90 backdrop-blur sticky top-0 z-10">
              <div>
                <span className="text-[8px] uppercase tracking-[0.2em] font-extrabold text-gold font-sans block mb-1">
                  Heritage Signature Grain
                </span>
                <h2 className="text-lg md:text-xl font-serif font-black text-green leading-none">
                  {activeProduct.name}
                </h2>
              </div>
              
              <button
                onClick={handleClose}
                className="w-9 h-9 rounded-full border border-green/10 bg-white flex items-center justify-center text-green cursor-pointer hover:bg-gold-light hover:border-gold transition-all duration-300"
              >
                <X size={16} />
              </button>
            </div>

            {/* Scrollable details body */}
            <div className="p-6 md:p-8 overflow-y-auto flex-1 grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Left Column: Visual Showcase */}
              <div className="flex flex-col gap-6">
                <div className="aspect-[4/3] rounded-xl overflow-hidden border border-gold/25 relative bg-green shadow-lg">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url('${activeProduct.image}')` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-green/50 to-transparent" />
                  
                  {/* Organic Floating Badge */}
                  <span className="absolute bottom-4 left-4 flex items-center gap-1.5 px-3 py-1 bg-cream/95 text-green text-[9px] font-bold uppercase tracking-wider border border-gold rounded-full">
                    <Leaf size={10} className="text-gold" />
                    <span>{activeProduct.certification}</span>
                  </span>
                </div>

                {/* Rating details & Review Stats */}
                <div className="flex items-center justify-between border-b border-gold/20 pb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={13} className="fill-gold text-gold" />
                    ))}
                    <span className="text-xs font-bold text-green font-sans ml-2">
                      {activeProduct.rating}
                    </span>
                    <span className="text-[10px] text-green/50 font-sans ml-1">
                      ({activeProduct.reviewsCount} organic reviews)
                    </span>
                  </div>

                  <span className="text-[10px] text-gold font-extrabold uppercase tracking-widest font-sans">
                    {activeProduct.premiumMetric}
                  </span>
                </div>

                {/* Nutritional Values Grid */}
                <div>
                  <h4 className="text-[10px] uppercase tracking-wider font-extrabold text-green/50 mb-3 font-sans">
                    Nutritional Matrix (Per 100g)
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white border border-green/5 p-3 flex flex-col justify-center rounded">
                      <span className="text-[8px] uppercase tracking-wider text-green/45 font-bold mb-1 font-sans">Protein content</span>
                      <span className="text-xs font-black text-green font-sans">{activeProduct.protein}</span>
                    </div>
                    <div className="bg-white border border-green/5 p-3 flex flex-col justify-center rounded">
                      <span className="text-[8px] uppercase tracking-wider text-green/45 font-bold mb-1 font-sans">Dietary fiber</span>
                      <span className="text-xs font-black text-green font-sans">{activeProduct.fiber}</span>
                    </div>
                  </div>
                </div>

                {/* Core parameters certifications badges */}
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <div className="flex flex-col items-center p-3 text-center border border-gold/15 bg-white">
                    <Shield size={16} className="text-gold mb-1" />
                    <span className="text-[7.5px] uppercase tracking-wider font-extrabold text-green/80 font-sans">Sortex 99.9%</span>
                  </div>
                  <div className="flex flex-col items-center p-3 text-center border border-gold/15 bg-white">
                    <Leaf size={16} className="text-gold mb-1" />
                    <span className="text-[7.5px] uppercase tracking-wider font-extrabold text-green/80 font-sans">Pure Organic</span>
                  </div>
                  <div className="flex flex-col items-center p-3 text-center border border-gold/15 bg-white">
                    <Award size={16} className="text-gold mb-1" />
                    <span className="text-[7.5px] uppercase tracking-wider font-extrabold text-green/80 font-sans">Origin Certified</span>
                  </div>
                </div>

              </div>

              {/* Right Column: E-Commerce configuration */}
              <div className="flex flex-col justify-between gap-6">
                
                {/* Description editorial */}
                <div>
                  <h4 className="text-[10px] uppercase tracking-wider font-extrabold text-green/50 mb-2 font-sans">
                    Heritage Narrative & Story
                  </h4>
                  <p className="text-xs text-green/80 font-sans leading-relaxed font-light mb-4">
                    {activeProduct.description}
                  </p>
                  <p className="text-[10px] font-bold text-gold uppercase tracking-wider font-sans">
                    Cultivated in {activeProduct.origin}
                  </p>
                </div>

                {/* Packaging Size Selection */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-[10px] uppercase tracking-wider font-extrabold text-green/50 font-sans">
                      Select Package Weight
                    </label>
                    <span className="text-[9px] text-gold font-extrabold uppercase font-sans">
                      ₹{activeProduct.pricePerKg}/kg Base
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-2">
                    {activeProduct.availableSizes.map((size) => {
                      const isSelected = selectedSize === size;
                      const label = size < 1 ? `${size * 1000}g` : `${size} kg`;
                      return (
                        <button
                          key={size}
                          onClick={() => handleSizeSelect(size)}
                          className={`py-3 text-center text-xs font-bold font-sans border transition-all duration-300 cursor-pointer ${
                            isSelected 
                              ? 'bg-gold border-gold text-white shadow-md' 
                              : 'bg-white border-green/10 text-green hover:bg-gold-light/20'
                          }`}
                          style={{ borderRadius: '0' }}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Quantity selectors */}
                <div>
                  <label className="text-[10px] uppercase tracking-wider font-extrabold text-green/50 block mb-3 font-sans">
                    Configure Quantity
                  </label>
                  <div className="flex items-center gap-4 bg-white border border-green/10 p-2 w-32 justify-between">
                    <button
                      onClick={handleDecrement}
                      className="w-8 h-8 flex items-center justify-center text-green cursor-pointer hover:bg-cream border-none bg-transparent"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="text-sm font-black text-green font-sans">{quantity}</span>
                    <button
                      onClick={handleIncrement}
                      className="w-8 h-8 flex items-center justify-center text-green cursor-pointer hover:bg-cream border-none bg-transparent"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                {/* Subtotal Display Box */}
                <div className="bg-white border border-gold/20 p-4 flex justify-between items-center">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-green/45 font-bold block font-sans">
                      Estimated Investment
                    </span>
                    <span className="text-2xl font-serif font-black text-green">
                      ₹{totalPrice.toLocaleString()}
                    </span>
                  </div>

                  <span className="text-[10px] text-green/50 font-sans">
                    Incl. Packaging & Taxes
                  </span>
                </div>

                {/* Checkout Add to bag action */}
                <button
                  onClick={handleAddToBag}
                  className="w-full btn-gold py-4 flex items-center justify-center gap-3 text-xs tracking-[0.2em] font-black uppercase text-white bg-gold border-none cursor-pointer hover:bg-gold-hover transition-all duration-300 shadow-gold"
                  style={{ borderRadius: '0' }}
                >
                  <ShoppingBag size={14} />
                  <span>Secure Add to Bag</span>
                </button>

              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
