import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Sparkles, ArrowDown } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function Hero() {
  const { cart, setActivePage, triggerHaptic } = useApp();
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const { scrollY } = useScroll();

  const indicatorOpacity = useTransform(scrollY, [0, 100], [1, 0]);

  useEffect(() => {
    const unsubscribe = scrollY.onChange((latest) => {
      if (latest > 50) {
        setShowScrollIndicator(false);
      } else {
        setShowScrollIndicator(true);
      }
    });
    return () => unsubscribe();
  }, [scrollY]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const wordVariants = {
    hidden: { 
      opacity: 0, 
      y: 30 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    },
  };

  const titleWords = ["CUMBUM", "VALLEY"];
  const subtitleWords = "India's premier bulk B2B exporter of certified organic unpolished heritage millets, supplying globally at commercial scale.".split(" ");

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-green">
      
      {/* Premium Background Image */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat scale-[1.03] opacity-55"
        style={{
          backgroundImage: `url('/cumbum_valley_hero.png')`,
          filter: 'brightness(0.65) contrast(1.1) saturate(1.05)'
        }}
      />

      {/* Dark Luxury Overlay */}
      <div 
        className="absolute inset-0 z-10"
        style={{ 
          background: 'linear-gradient(180deg, rgba(10, 18, 10, 0.45) 0%, rgba(10, 18, 10, 0.8) 100%)' 
        }} 
      />

      {/* Floating particles */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <span
            key={i}
            className="ambient-particle absolute bg-gold-light rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${40 + Math.random() * 60}%`,
              width: `${1 + Math.random() * 3}px`,
              height: `${1 + Math.random() * 3}px`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${7 + Math.random() * 7}s`,
            }}
          />
        ))}
      </div>

      {/* Content Layer */}
      <div className="relative z-30 max-w-5xl mx-auto px-6 text-center flex flex-col items-center">
        
        {/* Soft Golden Certitude Badge */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.25em] mb-8 bg-gold-light bg-opacity-10 border border-gold border-opacity-35 text-gold font-sans"
        >
          <Sparkles size={11} className="animate-pulse text-gold" />
          <span>Bulk Export Sourcing • Global Certification</span>
        </motion.div>

        {/* Display Header Serif with stagger words */}
        <motion.h1 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-5xl md:text-8xl font-serif font-black tracking-wider leading-[1.05] text-cream mb-6 flex flex-wrap justify-center gap-x-6 select-none"
        >
          {titleWords.map((word, idx) => (
            <motion.span 
              key={idx} 
              variants={wordVariants}
              className={word === "VALLEY" ? "text-gold" : "text-cream"}
            >
              {word}
            </motion.span>
          ))}
        </motion.h1>

        {/* Animated Gold Accent Line */}
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="h-[1.5px] w-36 bg-gold mb-8 origin-center"
        />

        {/* Tagline */}
        <motion.p 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-sm md:text-lg text-cream opacity-85 max-w-2xl mx-auto font-sans font-light leading-relaxed tracking-wider mb-12 flex flex-wrap justify-center gap-x-1.5 select-none"
        >
          {subtitleWords.map((word, idx) => (
            <motion.span 
              key={idx} 
              variants={wordVariants}
            >
              {word}
            </motion.span>
          ))}
        </motion.p>

        {/* Elite Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-6"
        >
          <button 
            onClick={() => {
              triggerHaptic(22);
              if (cart.length > 0) {
                setActivePage('checkout');
              } else {
                setActivePage('shop');
                setTimeout(() => {
                  document.getElementById('boutique-catalog')?.scrollIntoView({ behavior: 'smooth' });
                }, 150);
              }
            }}
            className="btn-gold font-sans text-xs tracking-[0.2em] font-bold px-8 py-4 bg-gold text-green border-none uppercase cursor-pointer hover:bg-gold-hover transition-all duration-300 shadow-gold"
            style={{ borderRadius: '0' }}
          >
            Initiate Bulk Order
          </button>
          
          <div className="flex items-center gap-3 text-cream opacity-65 text-[10px] uppercase tracking-[0.2em] font-semibold font-sans">
            <span className="w-8 h-[1px] bg-cream opacity-30" />
            <span>Container Load Shipments Worldwide</span>
            <span className="w-8 h-[1px] bg-cream opacity-30" />
          </div>
        </motion.div>

      </div>

      {/* Infinite Bouncing Scroll Indicator */}
      {showScrollIndicator && (
        <motion.div 
          style={{ opacity: indicatorOpacity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 cursor-pointer"
          onClick={() => {
            if (window.navigator.vibrate) window.navigator.vibrate(10);
            document.getElementById('heritage-storyline')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span className="text-[9px] uppercase tracking-[0.2em] text-gold font-bold font-sans">
            Scroll to Explore
          </span>
          <motion.div 
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="text-gold"
          >
            <ArrowDown size={14} />
          </motion.div>
        </motion.div>
      )}

      {/* Gold Bottom Border */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-[1.5px] z-30"
        style={{ background: 'linear-gradient(90deg, transparent 0%, #C9A84C 50%, transparent 100%)' }}
      />

    </section>
  );
}
