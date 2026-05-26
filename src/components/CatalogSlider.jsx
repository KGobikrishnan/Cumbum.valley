import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { ChevronRight, ArrowRight, ShieldCheck, Scale, ArrowLeft, Eye } from 'lucide-react';

export default function CatalogSlider() {
  const { 
    products, 
    setActivePage, 
    setActiveMobileTab, 
    setIsDetailsOpen, 
    setActiveProduct, 
    triggerHaptic 
  } = useApp();

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trim',
    dragFree: true
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const signatureProducts = products.slice(0, 3);

  const handleInspectClick = (product) => {
    triggerHaptic(20);
    setActiveProduct(product);
    setIsDetailsOpen(true);
  };

  const handleViewAllClick = () => {
    triggerHaptic(15);
    setActivePage('shop');
    setActiveMobileTab('catalog');
  };

  const scrollPopupVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.96 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.9, 
        ease: [0.16, 1, 0.3, 1] 
      }
    }
  };

  return (
    <section className="py-20 md:py-28 relative bg-white border-t border-cream-darker overflow-hidden">
      
      {/* Header Block with scroll-entrance popup */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto px-6 mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10"
      >
        <div>
          <p className="text-xs uppercase tracking-[0.25em] font-bold mb-3 text-gold">
            Signature Harvest
          </p>
          <h2 className="text-3xl md:text-5xl font-serif font-black text-green">
            Premium Spotlight Showcase
          </h2>
          <div className="w-16 h-[2px] bg-gold mt-4" />
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex gap-2">
            <button 
              onClick={scrollPrev}
              className="w-10 h-10 border border-green/15 flex items-center justify-center hover:bg-cream transition-colors text-green outline-none cursor-pointer"
              style={{ borderRadius: '0' }}
            >
              <ArrowLeft size={16} />
            </button>
            <button 
              onClick={scrollNext}
              className="w-10 h-10 border border-green/15 flex items-center justify-center hover:bg-cream transition-colors text-green outline-none cursor-pointer"
              style={{ borderRadius: '0' }}
            >
              <ArrowRight size={16} />
            </button>
          </div>

          <button
            onClick={handleViewAllClick}
            className="btn-outline-green font-sans"
            style={{ borderRadius: '0' }}
          >
            <span>View Full Catalog</span>
          </button>
        </div>
      </motion.div>

      {/* Embla Carousel scroll-revealed popup */}
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={scrollPopupVariants}
        className="w-full overflow-hidden px-6 md:px-12 relative z-10 animate-fade-in-up"
        ref={emblaRef}
      >
        <div className="flex gap-6 select-none">
          {signatureProducts.map((p) => (
            <motion.div
              key={p.id}
              whileHover={{ 
                scale: 1.03, 
                y: -6,
                borderColor: '#C9A84C'
              }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex-shrink-0 w-[290px] md:w-[480px] bg-cream border border-green/10 shadow-lg rounded-none relative flex flex-col md:flex-row overflow-hidden"
              style={{ scrollSnapAlign: 'start' }}
            >
              {/* Image Frame */}
              <div className="w-full md:w-[200px] aspect-[4/3] md:aspect-square relative overflow-hidden bg-green flex-shrink-0">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url('${p.image}')` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green to-transparent opacity-60" />
                
                {/* Spec metrics floating label on hover */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-green/80 flex flex-col items-center justify-center p-4 z-20 text-center"
                >
                  <span className="text-[10px] uppercase font-bold text-gold tracking-widest mb-2 font-sans">Specifications</span>
                  <p className="text-[11px] text-cream font-sans italic font-light">{p.premiumMetric}</p>
                </motion.div>

                <div className="absolute top-3 left-3 bg-gold text-white font-bold text-[8.5px] uppercase tracking-wider px-2 py-1 z-10">
                  {p.type} Millet
                </div>
              </div>

              {/* Spec Panel */}
              <div className="p-6 md:p-8 flex flex-col justify-between flex-1 relative z-10 bg-cream">
                <div>
                  <div className="flex justify-between items-start gap-2 mb-1">
                    <h3 
                      onClick={() => handleInspectClick(p)}
                      className="text-lg md:text-xl font-serif font-black text-green leading-tight hover:text-gold transition-colors cursor-pointer"
                    >
                      {p.name}
                    </h3>
                  </div>
                  
                  <p className="text-[9px] text-gold font-bold uppercase tracking-widest mb-3">
                    {p.tamilName} • {p.scientificName}
                  </p>

                  <p className="text-green/80 text-xs font-sans font-light leading-relaxed line-clamp-3 mb-6">
                    {p.description}
                  </p>

                  {/* parameters metrics details */}
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="flex items-center gap-2">
                      <Scale size={12} className="text-gold" />
                      <div className="text-[9px]">
                        <span className="text-green/45 block font-bold uppercase leading-none font-sans mb-1">Packing weight</span>
                        <span className="font-extrabold text-green font-sans">{p.moq} pack</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <ShieldCheck size={12} className="text-gold" />
                      <div className="text-[9px]">
                        <span className="text-green/45 block font-bold uppercase leading-none font-sans mb-1">Purity Level</span>
                        <span className="font-extrabold text-green font-sans">{p.purity.split(' ')[0]}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => handleInspectClick(p)}
                  className="w-full btn-gold py-3.5 text-center flex items-center justify-center gap-2 text-[10px] tracking-[0.25em]"
                  style={{ borderRadius: '0' }}
                >
                  <Eye size={12} />
                  <span>Inspect Sourced</span>
                </button>
              </div>

            </motion.div>
          ))}
        </div>
      </motion.div>
      
    </section>
  );
}
