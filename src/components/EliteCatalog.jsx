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
    triggerHaptic,
    selectedCategory,
    setSelectedCategory,
    selectedSubCategory,
    setSelectedSubCategory
  } = useApp();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypes, setSelectedTypes] = useState(['Major', 'Minor']);
  const [selectedForms, setSelectedForms] = useState(['Raw Grain', 'Fine Flour', 'Flakes']);
  const [moqRange, setMoqRange] = useState('All');
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false);
  const [addingProductId, setAddingProductId] = useState(null);

  const handleToggleFilters = () => {
    triggerHaptic(15);
    setIsFilterSheetOpen(!isFilterSheetOpen);
  };

  const toggleTypeFilter = (type) => {
    triggerHaptic(12);
    setSelectedTypes((prev) => {
      if (prev.includes(type)) {
        const next = prev.filter((t) => t !== type);
        return next.length === 0 ? ['Major', 'Minor'] : next;
      } else {
        return [...prev, type];
      }
    });
  };

  const toggleFormFilter = (form) => {
    triggerHaptic(12);
    setSelectedForms((prev) => {
      if (prev.includes(form)) {
        const next = prev.filter((f) => f !== form);
        return next.length === 0 ? ['Raw Grain', 'Fine Flour', 'Flakes'] : next;
      } else {
        return [...prev, form];
      }
    });
  };

  const handleResetFilters = () => {
    triggerHaptic(10);
    setSearchQuery('');
    setSelectedTypes(['Major', 'Minor']);
    setSelectedForms(['Raw Grain', 'Fine Flour', 'Flakes']);
    setMoqRange('All');
    setSelectedCategory('All');
    setSelectedSubCategory('All');
  };

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.scientificName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.tamilName.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchType = selectedTypes.includes(p.type);
      
      const matchForm = selectedForms.includes(p.form);

      const basePrice = p.pricePerKg;
      const matchMOQ = moqRange === 'All' || 
                        (moqRange === 'Under 180' && basePrice < 190) ||
                        (moqRange === '180 & Over' && basePrice >= 190);

      const matchCategory = selectedCategory === 'All' || p.category === selectedCategory;
      const matchSubCategory = selectedSubCategory === 'All' || p.subCategory === selectedSubCategory;

      return matchSearch && matchType && matchForm && matchMOQ && matchCategory && matchSubCategory;
    });
  }, [products, searchQuery, selectedTypes, selectedForms, moqRange, selectedCategory, selectedSubCategory]);

  const handleProductDetailsClick = (product) => {
    triggerHaptic(20);
    setActiveProduct(product);
    setIsDetailsOpen(true);
  };

  const handleQuickAddClick = (e, product) => {
    e.stopPropagation();
    triggerHaptic(25);
    addToCart(product, 1, product.availableSizes[0] || 1);
    setAddingProductId(product.id);
    setTimeout(() => {
      setAddingProductId(null);
    }, 1500);
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
              Wholesale Organic Sourcing
            </p>
            <h1 className="text-3xl md:text-5xl font-serif font-black text-green">
              Organic Millet Store
            </h1>
            <p className="text-green/80 text-sm font-light mt-2 max-w-2xl font-sans leading-relaxed">
              Explore Cumbum Valley's signature organic grains, premium stone-ground flours, and rolled flakes. Click any item to select pack sizes and add to your bag.
            </p>
          </div>
          
          <button
            onClick={handleToggleFilters}
            className="btn-gold flex items-center justify-center gap-2 self-start md:self-auto"
            style={{ borderRadius: '0' }}
          >
            <SlidersHorizontal size={14} />
            <span>Filter Products</span>
          </button>
        </div>

        {/* Global Catalog Search Box */}
        <div className="relative mb-8 max-w-xl">
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

        {/* Elite Horizontal Category Pills */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none select-none border-b border-gold/10">
          {[
            { id: 'All', label: 'All Products' },
            { id: 'Millet Grain', label: 'Grains' },
            { id: 'Millet Flour', label: 'Flours' },
            { id: 'Millet Rava', label: 'Ravas' },
            { id: 'Millet Flakes', label: 'Flakes' },
            { id: 'Siridhanya', label: 'Siridhanya' },
            { id: 'Combos', label: 'Combos' },
            { id: 'Ready to Cook', label: 'Ready-to-Cook' },
            { id: 'Sweets & Snacks', label: 'Sweets & Snacks' }
          ].map((cat) => {
            const isSel = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  triggerHaptic(12);
                  setSelectedCategory(cat.id);
                  setSelectedSubCategory('All');
                }}
                className={`py-2.5 px-5 text-[9px] uppercase font-black tracking-widest border transition-all whitespace-nowrap cursor-pointer ${
                  isSel
                    ? 'bg-gold border-gold text-white shadow-md'
                    : 'bg-white border-green/10 text-green hover:border-gold/30 hover:bg-gold-light/10'
                }`}
                style={{ borderRadius: '0' }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Dynamic Sub-Category Ribbon */}
        {selectedCategory !== 'All' && (
          <div className="flex gap-2 overflow-x-auto pb-4 mb-6 select-none animate-fade-in-up">
            <button
              onClick={() => {
                triggerHaptic(10);
                setSelectedSubCategory('All');
              }}
              className={`py-1.5 px-3 text-[8.5px] uppercase font-extrabold tracking-wider border transition-all whitespace-nowrap cursor-pointer ${
                selectedSubCategory === 'All'
                  ? 'bg-green border-green text-cream shadow-sm'
                  : 'bg-white border-green/10 text-green/70 hover:border-green/30'
              }`}
              style={{ borderRadius: '0' }}
            >
              All {selectedCategory}
            </button>
            {Array.from(
              new Set(
                products
                  .filter((p) => p.category === selectedCategory)
                  .map((p) => p.subCategory)
                  .filter(Boolean)
              )
            ).map((sub) => {
              const isSubSel = selectedSubCategory === sub;
              return (
                <button
                  key={sub}
                  onClick={() => {
                    triggerHaptic(10);
                    setSelectedSubCategory(sub);
                  }}
                  className={`py-1.5 px-3 text-[8.5px] uppercase font-extrabold tracking-wider border transition-all whitespace-nowrap cursor-pointer ${
                    isSubSel
                      ? 'bg-green border-green text-cream shadow-sm'
                      : 'bg-white border-green/10 text-green/70 hover:border-green/30'
                  }`}
                  style={{ borderRadius: '0' }}
                >
                  {sub}
                </button>
              );
            })}
          </div>
        )}

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
              className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8"
            >
              {filteredProducts.map((p) => (
                <motion.div
                  layout
                  key={p.id}
                  variants={cardVariants}
                  className="bg-white border border-green/10 shadow-lg flex flex-col justify-between group relative overflow-hidden"
                >
                  
                  {/* Asymmetric Image Container - takes 65% height */}
                  <div className="h-[120px] sm:h-[180px] md:h-[280px] relative overflow-hidden bg-green flex-shrink-0">
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                      style={{ backgroundImage: `url('${p.image}')` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-green/60 to-transparent z-10" />
                    
                    <span className="absolute top-2 left-2 md:top-4 md:left-4 text-[7px] md:text-[8.5px] uppercase tracking-wider font-bold px-1.5 py-0.5 md:px-2 md:py-1 bg-cream text-green border border-gold z-20">
                      {p.type} Millet
                    </span>

                    <span className="absolute bottom-2 right-2 md:bottom-4 md:right-4 bg-green/80 text-[6.5px] md:text-[8px] uppercase tracking-widest text-white px-1.5 py-0.5 md:px-2 md:py-1 border border-green/40 z-20 font-sans">
                      USDA Organic
                    </span>
                  </div>

                  {/* bottom 35% - Details Spec Sheet */}
                  <div className="p-3 md:p-8 flex-1 flex flex-col justify-between bg-white relative z-25">
                    <div>
                      <div className="flex justify-between items-start gap-1 md:gap-2 mb-1">
                        <h3 
                          onClick={() => handleProductDetailsClick(p)}
                          className="text-[12px] sm:text-[14px] md:text-xl font-serif font-black text-green leading-snug group-hover:text-gold transition-colors duration-300 cursor-pointer line-clamp-2 md:line-clamp-none"
                        >
                          {p.name}
                        </h3>
                        
                        <span className="text-[11px] sm:text-xs md:text-base font-black text-green font-sans whitespace-nowrap">
                          ₹{(p.pricePerKg * 100).toLocaleString()}<span className="text-[9px] md:text-[10px] text-green/50 font-normal">/100kg</span>
                        </span>
                      </div>
                      
                      <p className="text-[7.5px] md:text-[9px] text-gold font-bold uppercase tracking-wider md:tracking-widest mb-1 truncate">
                        {p.tamilName} • {p.scientificName}
                      </p>
                      <p className="text-[7px] text-green/45 font-bold uppercase tracking-widest mb-1.5 md:mb-3">
                        Min. Order: 50 kg • ₹{p.pricePerKg}/kg Base
                      </p>

                      {/* Ratings stars under details */}
                      <div className="flex items-center gap-0.5 md:gap-1 mb-2 md:mb-4">
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={8} className="fill-gold text-gold" />
                          ))}
                        </div>
                        <span className="text-[8px] md:text-[10px] font-bold text-green font-sans ml-0.5 md:ml-1">
                          {p.rating}
                        </span>
                        <span className="hidden md:inline text-[9px] text-green/40 font-sans ml-1">
                          ({p.reviewsCount} reviews)
                        </span>
                      </div>

                      {/* parameters specs - hidden on compact mobile cards */}
                      <div className="hidden md:grid border-t border-b border-green/10 py-3 mb-6 grid-cols-2 gap-4">
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

                    {/* Dual Action Buttons system - stacked on mobile */}
                    <div className="flex flex-col sm:flex-row gap-1.5 mt-auto">
                      <motion.button
                        onClick={() => handleProductDetailsClick(p)}
                        className="flex-1 py-2 md:py-3 text-center flex items-center justify-center gap-1 text-[8px] md:text-[10px] uppercase font-bold tracking-wider md:tracking-widest border border-green text-green font-sans bg-transparent cursor-pointer hover:bg-green hover:text-cream transition-colors duration-300"
                        style={{ borderRadius: '0' }}
                      >
                        <Eye size={10} className="hidden sm:inline" />
                        <span>Inspect</span>
                      </motion.button>

                      <motion.button
                        onClick={(e) => handleQuickAddClick(e, p)}
                        disabled={addingProductId === p.id}
                        className={`flex-1 py-2 px-2 md:py-3 md:px-4 text-center flex items-center justify-center gap-1 text-[8px] md:text-[10px] uppercase font-bold tracking-wider border transition-all duration-300 cursor-pointer ${
                          addingProductId === p.id
                            ? 'bg-green border-green text-cream shadow-inner'
                            : 'border-gold bg-gold text-white hover:bg-gold-hover hover:border-gold-hover'
                        }`}
                        style={{ borderRadius: '0' }}
                      >
                        {addingProductId === p.id ? (
                          <motion.span
                            initial={{ scale: 0.5, rotate: -30 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                            className="flex items-center gap-1 font-sans"
                          >
                            <Check size={10} className="text-white animate-pulse" />
                            <span>Added</span>
                          </motion.span>
                        ) : (
                          <>
                            <ShoppingBag size={10} className="hidden sm:inline" />
                            <span>Add</span>
                          </>
                        )}
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
              className="fixed inset-0 z-[100] bg-green/75 backdrop-blur-md"
              onClick={handleToggleFilters}
            />

            {/* Sidebar drawer panel - slide x axis */}
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-cream shadow-2xl z-[100] border-l border-gold/30 flex flex-col justify-between"
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
                      Millet Classification (Multi-Select)
                    </label>
                    <div className="flex border border-green/10 p-1 rounded-2xl bg-cream-darker/30 w-full gap-1">
                      {['Major', 'Minor'].map((type) => {
                        const isSel = selectedTypes.includes(type);
                        return (
                          <motion.button
                            key={type}
                            whileTap={{ scale: 0.96 }}
                            onClick={() => toggleTypeFilter(type)}
                            className={`flex-1 py-2.5 text-[10px] font-bold uppercase tracking-wider font-sans transition-all duration-300 rounded-xl cursor-pointer text-center ${
                              isSel ? 'bg-green text-cream shadow-sm' : 'bg-transparent text-green/60 hover:bg-cream/40'
                            }`}
                          >
                            {type}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Filter 2: Milling Form */}
                  <div className="flex flex-col">
                    <label className="text-[8.5px] uppercase tracking-[0.2em] font-bold text-green/50 mb-3 font-sans">
                      Milling Structure Form (Multi-Select)
                    </label>
                    <div className="grid grid-cols-3 border border-green/10 p-1 rounded-2xl bg-cream-darker/30 w-full gap-1">
                      {['Raw Grain', 'Fine Flour', 'Flakes'].map((form) => {
                        const isSel = selectedForms.includes(form);
                        return (
                          <motion.button
                            key={form}
                            whileTap={{ scale: 0.96 }}
                            onClick={() => toggleFormFilter(form)}
                            className={`py-2 text-[9px] font-bold uppercase tracking-wider font-sans transition-all duration-300 rounded-xl cursor-pointer text-center ${
                              isSel ? 'bg-green text-cream shadow-sm' : 'bg-transparent text-green/60 hover:bg-cream/40'
                            }`}
                          >
                            {form}
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Filter 3: Price Level */}
                  <div className="flex flex-col">
                    <label className="text-[8.5px] uppercase tracking-[0.2em] font-bold text-green/50 mb-3 font-sans">
                      Product Price Range
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
