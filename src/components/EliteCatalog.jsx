import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { SlidersHorizontal, Search, Scale, Star, ShieldCheck, X, Check, HelpCircle, ShoppingBag, Eye } from 'lucide-react';

export default function EliteCatalog() {
  const { 
    products, 
    setIsDetailsOpen, 
    setActiveProduct, 
    addToCart, 
    triggerHaptic 
  } = useApp();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedForm, setSelectedForm] = useState('All');
  const [moqRange, setMoqRange] = useState('All');
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);

  const handleToggleFilters = () => {
    triggerHaptic(15);
    setIsFilterSheetOpen(!isFilterSheetOpen);
  };

  const handleResetFilters = () => {
    triggerHaptic(10);
    setSearchQuery('');
    setSelectedType('All');
    setSelectedForm('All');
    setMoqRange('All');
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.tamilName.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchType = selectedType === 'All' || p.type === selectedType;
      
      const matchForm = selectedForm === 'All' || p.form === selectedForm;

      const basePrice = p.pricePerKg;
      const matchMOQ = moqRange === 'All' || 
                        (moqRange === 'Under 180' && basePrice < 190) ||
                        (moqRange === '180 & Over' && basePrice >= 190);

      return matchSearch && matchType && matchForm && matchMOQ;
    });
  }, [products, searchQuery, selectedType, selectedForm, moqRange]);

  const handleProductDetailsClick = (product) => {
    triggerHaptic(20);
    setActiveProduct(product);
    setIsDetailsOpen(true);
  };

  const handleQuickAddClick = (e, product) => {
    e.stopPropagation();
    triggerHaptic(25);
    addToCart(product, 1, product.availableSizes[0] || 1);
  };

  const gridContainerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 260, damping: 22 }
    },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.25 } }
  };

  return (
    <section className="py-12 md:py-24 relative bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Elite Page Header */}
        <div className="border-b border-gold/25 pb-8 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] font-bold mb-2 text-gold">
              Wholesale Boutique Sourcing
            </p>
            <h1 className="text-3xl md:text-5xl font-serif font-black text-green">
              High-Density Elite Boutique
            </h1>
            <p className="text-green/80 text-sm font-light mt-2 max-w-2xl font-sans leading-relaxed">
              Explore Cumbum Valley's signature organic heritage grain millets, premium stone-ground flours, and rolled flakes. Click any specimen to customize pack sizes and initiate purchases.
            </p>
          </div>
          
          <button
            onClick={handleToggleFilters}
            className="btn-gold flex items-center justify-center gap-2 self-start md:self-auto"
            style={{ borderRadius: '0' }}
          >
            <SlidersHorizontal size={14} />
            <span>Refine boutique</span>
          </button>
        </div>

        {/* Global Catalog Search Box */}
        <div className="relative mb-10 max-w-xl">
          <input
            type="text"
            placeholder="Search pearl, finger, kambu, ragi, thinai, varagu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-green/15 px-12 py-4 text-xs font-sans focus:outline-none transition-all duration-300 text-green"
            style={{ borderRadius: '0' }}
          />
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-green/40" />
          
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-none border-none cursor-pointer"
            >
              <X size={16} className="text-green/40" />
            </button>
          )}
        </div>

        {/* Catalog Grid */}
        <AnimatePresence mode="popLayout">
          {filteredProducts.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="bg-white border border-green/10 p-12 text-center flex flex-col items-center shadow-lg"
            >
              <HelpCircle size={44} className="text-gold animate-bounce mb-4" />
              <h3 className="text-lg font-serif font-bold text-green">No Specimens Match Filters</h3>
              <p className="text-green/60 text-xs mt-2 mb-6 font-sans">Refine your queries or reset specifications.</p>
              <button 
                onClick={handleResetFilters}
                className="btn-outline-green font-sans"
              >
                Reset Global Filters
              </button>
            </motion.div>
          ) : (
            <motion.div 
              variants={gridContainerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProducts.map((p) => (
                <motion.div
                  layout
                  key={p.id}
                  variants={cardVariants}
                  className="bg-white border border-green/10 shadow-lg flex flex-col justify-between group relative overflow-hidden"
                >
                  
                  {/* Asymmetric Image Container - takes 65% height */}
                  <div className="h-[240px] md:h-[280px] relative overflow-hidden bg-green flex-shrink-0">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url('${p.image}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-green/60 to-transparent z-10" />
                    
                    <span className="absolute top-4 left-4 text-[8.5px] uppercase tracking-wider font-bold px-2 py-1 bg-cream text-green border border-gold z-20">
                      {p.type} Millet
                    </span>

                    <span className="absolute bottom-4 right-4 bg-green/80 text-[8px] uppercase tracking-widest text-white px-2 py-1 border border-green/40 z-20 font-sans">
                      USDA Organic
                    </span>
                  </div>

                  {/* bottom 35% - Details Spec Sheet */}
                  <div className="p-6 md:p-8 flex-1 flex flex-col justify-between bg-white relative z-25">
                    <div>
                      <div className="flex justify-between items-start gap-2 mb-1">
                        <h3 
                          onClick={() => handleProductDetailsClick(p)}
                          className="text-xl font-serif font-black text-green leading-snug group-hover:text-gold transition-colors duration-300 cursor-pointer"
                        >
                          {p.name}
                        </h3>
                        
                        <span className="text-base font-black text-green font-sans whitespace-nowrap">
                          ₹{p.pricePerKg}<span className="text-[10px] text-green/50 font-normal">/kg</span>
                        </span>
                      </div>
                      
                      <p className="text-[9px] text-gold font-bold uppercase tracking-widest mb-3">
                        {p.tamilName} • {p.scientificName}
                      </p>

                      {/* Ratings stars under details */}
                      <div className="flex items-center gap-1 mb-4">
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={11} className="fill-gold text-gold" />
                          ))}
                        </div>
                        <span className="text-[10px] font-bold text-green font-sans ml-1">
                          {p.rating}
                        </span>
                        <span className="text-[9px] text-green/40 font-sans">
                          ({p.reviewsCount} reviews)
                        </span>
                      </div>

                      {/* parameters specs */}
                      <div className="border-t border-b border-green/10 py-3 mb-6 grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                          <Scale size={13} className="text-gold" />
                          <div className="text-[9px]">
                            <span className="text-green/45 block font-bold uppercase leading-none font-sans mb-1">Stock status</span>
                            <span className="font-extrabold text-green font-sans">In stock</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <ShieldCheck size={13} className="text-gold" />
                          <div className="text-[9px]">
                            <span className="text-green/45 block font-bold uppercase leading-none font-sans mb-1">Moisture</span>
                            <span className="font-extrabold text-green font-sans">{p.moisture}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Dual Action Buttons system */}
                    <div className="flex gap-2.5">
                      <motion.button
                        onClick={() => handleProductDetailsClick(p)}
                        className="flex-1 py-3 text-center flex items-center justify-center gap-1.5 text-[10px] uppercase font-bold tracking-widest border border-green text-green font-sans bg-transparent cursor-pointer hover:bg-green hover:text-cream transition-colors duration-300"
                        style={{ borderRadius: '0' }}
                      >
                        <Eye size={12} />
                        <span>Inspect</span>
                      </motion.button>

                      <motion.button
                        onClick={(e) => handleQuickAddClick(e, p)}
                        className="py-3 px-4 text-center flex items-center justify-center gap-1.5 text-[10px] uppercase font-bold tracking-[0.08em] border border-gold bg-gold text-white font-sans cursor-pointer hover:bg-gold-hover hover:border-gold-hover transition-colors duration-300"
                        style={{ borderRadius: '0' }}
                      >
                        <ShoppingBag size={12} />
                        <span>Add Bag</span>
                      </motion.button>
                    </div>

                  </div>

                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* Fluid Filter Slide-Out panel */}
      <AnimatePresence>
        {isFilterSheetOpen && (
          <>
            {/* Backdrop Blur Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-green/75 backdrop-blur-md"
              onClick={handleToggleFilters}
            />

            {/* Sidebar drawer panel - slide x axis */}
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-cream shadow-2xl z-50 border-l border-gold/30 flex flex-col justify-between"
            >
              
              <div>
                {/* Header */}
                <div className="p-6 md:p-8 border-b border-gold/20 flex justify-between items-center bg-cream">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal size={16} className="text-gold" />
                    <h3 className="text-lg font-serif font-bold text-green">Specification Filters</h3>
                  </div>
                  
                  <button 
                    onClick={handleToggleFilters}
                    className="w-8 h-8 rounded-full border border-green/10 bg-white flex items-center justify-center text-green cursor-pointer hover:bg-cream transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 flex flex-col gap-6 overflow-y-auto max-h-[70vh]">
                  
                  {/* Filter 1: Millet Classification */}
                  <div className="flex flex-col">
                    <label className="text-[8.5px] uppercase tracking-[0.2em] font-bold text-green/50 mb-3 font-sans">
                      Millet Classification
                    </label>
                    <div className="flex gap-2">
                      {['All', 'Major', 'Minor'].map((type) => (
                        <motion.button
                          key={type}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => { triggerHaptic(10); setSelectedType(type); }}
                          className={`flex-1 py-2 text-[10px] font-bold uppercase tracking-wider font-sans transition-all duration-300 border cursor-pointer ${selectedType === type ? 'bg-gold border-gold text-white shadow-md' : 'bg-white border-green/15 text-green'}`}
                          style={{ borderRadius: '0' }}
                        >
                          {type}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Filter 2: Milling Form */}
                  <div className="flex flex-col">
                    <label className="text-[8.5px] uppercase tracking-[0.2em] font-bold text-green/50 mb-3 font-sans">
                      Milling Structure Form
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {['All', 'Raw Grain', 'Fine Flour', 'Flakes'].map((form) => (
                        <motion.button
                          key={form}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => { triggerHaptic(10); setSelectedForm(form); }}
                          className={`py-2 text-[10px] font-bold uppercase tracking-wider font-sans transition-all duration-300 border cursor-pointer ${selectedForm === form ? 'bg-gold border-gold text-white shadow-md' : 'bg-white border-green/15 text-green'}`}
                          style={{ borderRadius: '0' }}
                        >
                          {form}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Filter 3: Price Level */}
                  <div className="flex flex-col">
                    <label className="text-[8.5px] uppercase tracking-[0.2em] font-bold text-green/50 mb-3 font-sans">
                      Boutique Retail Price Level
                    </label>
                    <div className="flex flex-col gap-2">
                      {[
                        { id: 'All', label: 'All Price Ranges' },
                        { id: 'Under 180', label: 'Daily Grains (< ₹190 / kg)' },
                        { id: '180 & Over', label: 'Premium Harvest (>= ₹190 / kg)' }
                      ].map((opt) => {
                        const isSel = moqRange === opt.id;
                        return (
                          <motion.button
                            key={opt.id}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => { triggerHaptic(10); setMoqRange(opt.id); }}
                            className={`p-3 px-4 text-[10px] font-bold text-left transition-all font-sans border cursor-pointer flex items-center justify-between ${isSel ? 'bg-gold-light border-gold text-green' : 'bg-white border-green/10 text-green'}`}
                            style={{ borderRadius: '0' }}
                          >
                            <span>{opt.label}</span>
                            {isSel && <Check size={14} className="text-gold" />}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                </div>
              </div>

              {/* Drawer actions footer */}
              <div className="p-6 md:p-8 border-t border-gold/20 flex gap-4 bg-cream">
                <button
                  onClick={handleResetFilters}
                  className="flex-1 btn-outline-green font-sans"
                  style={{ borderRadius: '0' }}
                >
                  Reset Specs
                </button>
                
                <button
                  onClick={handleToggleFilters}
                  className="flex-1 btn-gold font-sans"
                  style={{ borderRadius: '0' }}
                >
                  Apply Filters
                </button>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

    </section>
  );
}
