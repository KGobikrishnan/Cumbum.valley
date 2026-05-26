import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Eye, Compass, Award } from 'lucide-react';

export default function Storyline() {
  const pillars = [
    {
      icon: ShieldCheck,
      title: 'Organic Compliance',
      subtitle: 'Pure Agroecology',
      description: 'Grown in our organic valley zones strictly conforming to USDA Organic, NPOP, and EU regulations. Zero chemical residues, cultivated through age-old natural crop cycles.'
    },
    {
      icon: Eye,
      title: 'Sortex-Clean Optical sorting',
      subtitle: '99.9% Purity Guaranteed',
      description: 'Processed through high-resolution optical sortex systems. Double camera scanners detect and reject foreign matter, contrasting grains, and micro-impurities instantly.'
    },
    {
      icon: Compass,
      title: 'Global Export Security',
      subtitle: 'Global Logistics SLA',
      description: 'Phytosanitary cleared packaging and specialized dry-container shipping. Seamless export clearance with pre-verified document suites dispatched on shipment.'
    }
  ];

  // Animation variants
  const fadeInVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const badgeVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { type: "spring", stiffness: 200, damping: 20 }
    }
  };

  return (
    <section id="heritage-storyline" className="py-20 md:py-32 relative bg-cream overflow-hidden">
      
      {/* Light elegant water-mark text */}
      <div className="absolute top-10 left-10 pointer-events-none opacity-5 text-[8vw] font-serif font-black uppercase select-none tracking-widest text-green">
        Cumbum Valley
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeInVariants}
          className="text-center max-w-3xl mx-auto mb-20 flex flex-col items-center"
        >
          <p className="text-xs uppercase tracking-[0.25em] font-bold mb-4 text-gold">
            The Heritage Storyline
          </p>
          
          <h2 className="text-3xl md:text-5xl font-serif font-bold tracking-wide leading-tight text-green mb-6">
            Pioneering the Standards of Global Wholesale Millet Distribution
          </h2>
          
          <div className="w-24 h-[1.5px] bg-gold my-6 origin-center" />
          
          <p className="text-green/80 font-sans font-light leading-relaxed">
            Nestled in the Western Ghats rainwater basin, Cumbum Valley merges centuries of ancestral agricultural knowledge with state-of-the-art optical cleaning systems.
          </p>
        </motion.div>

        {/* Narrative & Image Side-by-Side Asymmetric Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInVariants}
            className="lg:col-span-6 flex flex-col gap-6"
          >
            <span className="self-start text-[10px] uppercase tracking-widest font-bold px-3.5 py-1 bg-gold-light text-green border border-gold/20 font-sans">
              Optical Sortex Purity
            </span>
            
            <h3 className="text-2xl md:text-3xl font-serif text-green leading-snug font-bold">
              Ensuring Technical Purity For Industrial Scale Manufacturing
            </h3>
            
            <p className="text-green/80 font-sans font-light leading-relaxed">
              We understand that high-volume B2B clients require pristine uniformity. Our signature grains pass through dual-stage gravity separation and multiple multi-wavelength infrared optical sortex fields, assuring a <strong className="text-green font-bold">99.9% premium clean-fill rate</strong>.
            </p>
            
            <p className="text-green/80 font-sans font-light leading-relaxed">
              Whether you are incorporating pearl millet grains into specialty breakfast cereals, or blending stone-ground finger millet flour into clean-label gluten-free baking pipelines, our technical quality guarantees standard moisture controls below 11% and optimal structural grain consistency.
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInVariants}
            className="lg:col-span-6 relative w-full"
          >
            {/* Visual styling container simulating modern asymmetric frame */}
            <div className="absolute inset-0 border border-gold translate-x-4 translate-y-4 opacity-30 z-0 pointer-events-none" />
            
            {/* Parallax image using scroll value simulation */}
            <motion.div 
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.6 }}
              className="relative z-10 aspect-[4/3] bg-cover bg-center shadow-2xl border border-gold/30 w-full"
              style={{ 
                backgroundImage: `url('/cumbum_valley_hero.png')`,
              }}
            />

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: "spring" }}
              className="absolute bottom-4 left-4 z-20 bg-cream/95 backdrop-blur-md p-4 flex items-center gap-3 border border-gold/30 shadow-lg"
            >
              <Award size={28} className="text-gold" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-green font-serif">Sortex Optical Clean</h4>
                <p className="text-[10px] text-green/60 font-sans font-medium">99.9% Standard Cleared</p>
              </div>
            </motion.div>
          </motion.div>

        </div>

        {/* Triple Technical Pillars Grid */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {pillars.map((p, idx) => {
            const Icon = p.icon;
            return (
              <motion.div 
                key={idx}
                variants={badgeVariants}
                className="bg-white/80 backdrop-blur-sm p-8 border border-green/5 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between origin-bottom"
                style={{ 
                  borderTop: `3px solid #C9A84C`
                }}
              >
                <div>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center mb-6 bg-gold-light border border-gold/25 text-green">
                    <Icon size={20} />
                  </div>
                  
                  <span className="text-[10px] uppercase tracking-[0.2em] font-bold block mb-2 text-gold font-sans">
                    {p.subtitle}
                  </span>
                  
                  <h4 className="text-lg font-serif font-bold text-green mb-4">
                    {p.title}
                  </h4>
                  
                  <p className="text-green/75 font-sans text-xs font-light leading-relaxed">
                    {p.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
