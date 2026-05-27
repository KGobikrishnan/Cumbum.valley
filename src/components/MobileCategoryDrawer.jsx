import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { X, Sprout, Sparkles, Zap, Layers, Gift, Package, Utensils, Heart, ChevronRight, Check } from 'lucide-react';

export default function MobileCategoryDrawer() {
  const {
    products,
    isCategoryDrawerOpen,
    setIsCategoryDrawerOpen,
    selectedCategory,
    setSelectedCategory,
    selectedSubCategory,
    setSelectedSubCategory,
    setActivePage,
    setActiveMobileTab,
    triggerHaptic
  } = useApp();

  const [expandedCategory, setExpandedCategory] = useState(null);

  // Group categories and subcategories with icons and descriptions
  const categoriesConfig = [
    {
      id: 'Millet Grain',
      name: 'Millet Grain',
      tamilName: 'Siridhanya Dhanyam',
      icon: Sprout,
      color: '#C9A84C',
      description: 'Heritage unpolished high-density raw grains.'
    },
    {
      id: 'Millet Flour',
      name: 'Millet Flour',
      tamilName: 'Millet Maavu',
      icon: Sparkles,
      color: '#C9A84C',
      description: 'Chilled stone-ground superfine organic flours.'
    },
    {
      id: 'Millet Rava',
      name: 'Millet Rava',
      tamilName: 'Millet Rava',
      icon: Zap,
      color: '#C9A84C',
      description: 'Breakfast semolina and rapid-cook coarse rava.'
    },
    {
      id: 'Millet Flakes',
      name: 'Millet Flakes',
      tamilName: 'Millet Aval',
      icon: Layers,
      color: '#C9A84C',
      description: 'Steam-rolled flat flakes and premium poha.'
    },
    {
      id: 'Siridhanya',
      name: 'Siridhanya Combos',
      tamilName: 'Siridhanya Kombos',
      icon: Gift,
      color: '#C9A84C',
      description: 'Holistic 5-grain organic value packs.'
    },
    {
      id: 'Combos',
      name: 'Combos & Laddos',
      tamilName: 'Laddoo Combos',
      icon: Package,
      color: '#C9A84C',
      description: 'Pure ghee A2 laddoos and batter pairings.'
    },
    {
      id: 'Ready to Cook',
      name: 'Ready to Cook',
      tamilName: 'Instant Mixes',
      icon: Utensils,
      color: '#C9A84C',
      description: 'Gluten-free noodles, pasta, and healthy drinks.'
    },
    {
      id: 'Sweets & Snacks',
      name: 'Sweets & Snacks',
      tamilName: 'Savoury & Podi',
      icon: Heart,
      color: '#C9A84C',
      description: 'Traditional sweets, spicy podi, and fresh batters.'
    }
  ];

  // Calculate product counts dynamically for each category
  const categoryCounts = useMemo(() => {
    const counts = {};
    products.forEach((p) => {
      // Map Siridhanya or Sweets & Snacks to config names correctly
      let cat = p.category;
      if (cat === 'Siridhanya') cat = 'Siridhanya';
      else if (cat === 'Combos') cat = 'Combos';
      else if (cat === 'Sweets & Snacks') cat = 'Sweets & Snacks';
      
      counts[cat] = (counts[cat] || 0) + 1;
    });
    return counts;
  }, [products]);

  // Extract unique subcategories per category dynamically
  const subCategoriesMap = useMemo(() => {
    const map = {};
    products.forEach((p) => {
      const cat = p.category;
      if (!map[cat]) map[cat] = new Set();
      if (p.subCategory) {
        map[cat].add(p.subCategory);
      }
    });
    
    // Convert sets to arrays
    const finalMap = {};
    Object.keys(map).forEach((key) => {
      finalMap[key] = Array.from(map[key]);
    });
    return finalMap;
  }, [products]);

  const handleClose = () => {
    triggerHaptic(10);
    setIsCategoryDrawerOpen(false);
  };

  const handleSelectCategoryOnly = (catId) => {
    triggerHaptic(20);
    setSelectedCategory(catId);
    setSelectedSubCategory('All');
    
    // Switch to Boutique Shop tab
    setActivePage('shop');
    setActiveMobileTab('catalog');
    
    setIsCategoryDrawerOpen(false);
  };

  const handleSelectSubCategory = (catId, subCat) => {
    triggerHaptic(22);
    setSelectedCategory(catId);
    setSelectedSubCategory(subCat);
    
    // Switch to Boutique Shop tab
    setActivePage('shop');
    setActiveMobileTab('catalog');
    
    setIsCategoryDrawerOpen(false);
  };

  const handleResetFilters = () => {
    triggerHaptic(15);
    setSelectedCategory('All');
    setSelectedSubCategory('All');
    setActivePage('shop');
    setActiveMobileTab('catalog');
    setIsCategoryDrawerOpen(false);
  };

  const handleToggleAccordion = (catId) => {
    triggerHaptic(12);
    if (expandedCategory === catId) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(catId);
    }
  };

  return (
    <AnimatePresence>
      {isCategoryDrawerOpen && (
        <>
          {/* Elegant dark green backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-green/75 backdrop-blur-md md:hidden"
            onClick={handleClose}
          />

          {/* Premium sliding drawer */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
            className="fixed top-0 left-0 h-full w-[85vw] max-w-sm bg-cream shadow-2xl z-[100] border-r border-gold/30 flex flex-col justify-between md:hidden"
          >
            <div>
              {/* Luxury Header */}
              <div className="p-5 border-b border-gold/25 flex justify-between items-center bg-cream-darker">
                <div>
                  <h3 className="text-base font-serif font-black text-green leading-none">
                    SHOP CATEGORIES
                  </h3>
                  <p className="text-[7.5px] uppercase tracking-[0.2em] text-gold font-bold mt-1">
                    Cumbum Valley Organic
                  </p>
                </div>

                <button
                  onClick={handleClose}
                  className="w-8 h-8 rounded-full border border-green/10 bg-white flex items-center justify-center text-green cursor-pointer shadow-sm"
                >
                  <X size={14} />
                </button>
              </div>

              {/* Reset/View All quick button */}
              <div className="p-4 px-5 border-b border-green/5 bg-white">
                <button
                  onClick={handleResetFilters}
                  className={`w-full py-2 px-3 text-[9px] uppercase tracking-widest font-black transition-all border flex items-center justify-between cursor-pointer ${
                    selectedCategory === 'All'
                      ? 'bg-gold text-white border-gold'
                      : 'bg-cream-darker text-green border-green/10 hover:border-gold/30'
                  }`}
                  style={{ borderRadius: '0' }}
                >
                  <span>Browse Full Catalog</span>
                  {selectedCategory === 'All' ? <Check size={11} /> : <ChevronRight size={11} />}
                </button>
              </div>

              {/* Scrollable Categories List */}
              <div className="overflow-y-auto max-h-[72vh] p-4 flex flex-col gap-3">
                {categoriesConfig.map((cat) => {
                  const IconComponent = cat.icon;
                  const isSelected = selectedCategory === cat.id;
                  const isExpanded = expandedCategory === cat.id;
                  const count = categoryCounts[cat.id] || 0;
                  const subs = subCategoriesMap[cat.id] || [];

                  return (
                    <div
                      key={cat.id}
                      className="border border-green/10 bg-white shadow-sm flex flex-col overflow-hidden"
                    >
                      {/* Main Category Row */}
                      <div className="flex items-center justify-between p-3.5 cursor-pointer hover:bg-gold-light/10 transition-colors">
                        <div 
                          className="flex items-center gap-3 flex-1"
                          onClick={() => handleToggleAccordion(cat.id)}
                        >
                          <div
                            className="w-8 h-8 flex items-center justify-center text-white"
                            style={{ backgroundColor: cat.color }}
                          >
                            <IconComponent size={14} />
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <h4 className="text-[11px] font-extrabold uppercase text-green tracking-wide">
                                {cat.name}
                              </h4>
                              <span className="text-[7.5px] text-green/40 font-bold font-sans">
                                ({count})
                              </span>
                            </div>
                            <span className="text-[7px] text-gold font-bold uppercase tracking-wider block">
                              {cat.tamilName}
                            </span>
                          </div>
                        </div>

                        {/* Expand/Go Button */}
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleSelectCategoryOnly(cat.id)}
                            className={`p-1.5 border border-gold/20 flex items-center justify-center text-gold cursor-pointer transition-colors ${
                              isSelected ? 'bg-gold-light border-gold text-green' : 'bg-transparent hover:bg-cream-darker'
                            }`}
                          >
                            <Check size={10} className={isSelected ? 'opacity-100' : 'opacity-0'} />
                          </button>
                          
                          <button
                            onClick={() => handleToggleAccordion(cat.id)}
                            className="p-1.5 text-green/40 hover:text-green cursor-pointer font-bold"
                          >
                            <ChevronRight
                              size={12}
                              className={`transition-transform duration-300 ${isExpanded ? 'rotate-90 text-gold' : ''}`}
                            />
                          </button>
                        </div>
                      </div>

                      {/* Expandable Accordion (Sub-categories list) */}
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden bg-cream/50 border-t border-green/5"
                          >
                            <div className="p-3 flex flex-col gap-2">
                              {/* Option: View All in this Category */}
                              <button
                                onClick={() => handleSelectCategoryOnly(cat.id)}
                                className={`text-left text-[9px] uppercase tracking-widest font-black py-2 px-3 border transition-colors flex items-center justify-between cursor-pointer ${
                                  isSelected && selectedSubCategory === 'All'
                                    ? 'bg-gold-light border-gold text-green'
                                    : 'bg-white border-green/5 text-green/70 hover:border-gold/20'
                                }`}
                                style={{ borderRadius: '0' }}
                              >
                                <span>All {cat.name}</span>
                                <ChevronRight size={10} className="text-gold" />
                              </button>

                              {/* Subcategories list */}
                              {subs.map((sub) => {
                                const isSubSelected = isSelected && selectedSubCategory === sub;
                                return (
                                  <button
                                    key={sub}
                                    onClick={() => handleSelectSubCategory(cat.id, sub)}
                                    className={`text-left text-[8.5px] font-extrabold uppercase py-2 px-3 border transition-colors flex items-center justify-between cursor-pointer ${
                                      isSubSelected
                                        ? 'bg-gold-light border-gold text-green shadow-sm'
                                        : 'bg-white border-green/5 text-green/60 hover:border-gold/20'
                                    }`}
                                    style={{ borderRadius: '0' }}
                                  >
                                    <span>{sub}</span>
                                    {isSubSelected && <Check size={10} className="text-gold" />}
                                  </button>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Premium Branding Footer */}
            <div className="p-5 border-t border-gold/20 bg-cream-darker text-center text-[7.5px] uppercase tracking-[0.2em] text-green/50">
              © 2026 CUMBUM VALLEY ORGANIC STORE
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
