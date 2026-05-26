import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { Leaf, ShieldCheck, Sun, Droplets, ArrowRight, Layers, HeartHandshake } from 'lucide-react';

export default function HeritageStoryPage() {
  const { triggerHaptic } = useApp();
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0-100

  const handleSliderChange = (e) => {
    const val = Number(e.target.value);
    if (Math.abs(val - sliderPosition) > 2) {
      triggerHaptic(5); // Soft haptic feedback while dragging!
    }
    setSliderPosition(val);
  };

  const farmerProfiles = [
    {
      name: 'Maruthu Pandian',
      region: 'Upper Cumbum Boundary',
      millets: 'Organic Kambu (Pearl Millet)',
      linage: '3rd Generation Dryland Grower',
      desc: 'Cultivates ancient pearl grains in volcanic red soils, utilizing strictly rain-fed agroecology and vermicompost sorting.',
      avatarBg: 'bg-green/10'
    },
    {
      name: 'R. Annadurai',
      region: 'Bodi Hills Foothills',
      millets: 'Heritage Ragi (Finger Millet)',
      linage: 'Heritage Seed Conservator',
      desc: 'Manages a high-altitude sanctuary of native finger millet strains, preserving heirloom seeds dating back a century.',
      avatarBg: 'bg-gold-light/40'
    }
  ];

  const scrollRevealVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.98 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] 
      }
    }
  };

  const staggerCardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: "spring", stiffness: 220, damping: 20 }
    }
  };

  return (
    <div className="py-12 md:py-24 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Editorial Title Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="border-b border-gold/25 pb-8 mb-16 text-center max-w-3xl mx-auto"
        >
          <p className="text-xs uppercase tracking-[0.25em] font-bold mb-2 text-gold">
            Linear Sourcing Legacy
          </p>
          <h1 className="text-4xl md:text-6xl font-serif font-black text-green leading-tight">
            Our Farm Agronomy & Sourcing Story
          </h1>
          <div className="h-[1.5px] w-24 bg-gold mx-auto my-6" />
          <p className="text-green/80 text-sm font-light leading-relaxed font-sans">
            In the rainwater basin of the Western Ghats, Cumbum Valley merges centuries of ancestral agricultural knowledge with state-of-the-art multi-spectral optical sortex cleaning systems to deliver 99.9% premium purity.
          </p>
        </motion.div>

        {/* Narrative Split Column Section with scroll-reveals */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24 overflow-hidden">
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={scrollRevealVariants}
            className="flex flex-col gap-6"
          >
            <span className="self-start text-[9px] uppercase tracking-[0.2em] font-extrabold text-gold font-sans bg-gold-light px-3 py-1 border border-gold/25">
              The Western Ghats Watershed
            </span>
            <h3 className="text-2xl md:text-3xl font-serif font-black text-green">
              Pioneering Pure B2B Heritage Grain Sourcing
            </h3>
            <p className="text-xs font-sans text-green/80 leading-relaxed font-light">
              Cumbum Valley is not just a digital e-commerce directory; it is a live B2B alliance of heirloom dryland farmers. Our heritage millets are cultivated in rich red loam volcanic soil basins, nourished entirely by rain-fed microclimates that lock in high mineral concentrates (iron, zinc, and calcium) that modern hybrid seeds fail to accumulate.
            </p>
            <p className="text-xs font-sans text-green/80 leading-relaxed font-light">
              By removing intermediate brokers, we route crops directly from smallholder cooperative clusters to corporate milling sites. Every package in your cart holds phytosanitary traceability maps and USDA Organic authenticity guarantees.
            </p>

            <div className="grid grid-cols-2 gap-4 mt-4 text-xs font-sans">
              <div className="flex items-center gap-3">
                <Sun size={18} className="text-gold" />
                <div>
                  <span className="font-extrabold text-green block">Natural Dryland</span>
                  <span className="text-[10px] text-green/50">Zero chemical fertilizers</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Droplets size={18} className="text-gold" />
                <div>
                  <span className="font-extrabold text-green block">Rainwater Fed</span>
                  <span className="text-[10px] text-green/50">Conserves valley aquifiers</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Graphic Badge Panel with scroll-reveal */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={scrollRevealVariants}
            className="relative"
          >
            <div className="absolute inset-0 border border-gold translate-x-4 translate-y-4 z-0 pointer-events-none" />
            <div 
              className="h-[300px] md:h-[400px] bg-cover bg-center border border-gold/45 relative z-10 shadow-xl"
              style={{ backgroundImage: `url('/cumbum_valley_hero.png')` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-green/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/95 backdrop-blur border border-gold/30 flex items-center justify-between">
                <div>
                  <h4 className="text-[10px] uppercase font-bold tracking-wider text-green/55 mb-1 font-sans">Soil matrix score</h4>
                  <span className="text-base font-serif font-black text-green">100% Volcanic Clay loam</span>
                </div>
                <span className="text-[8.5px] uppercase tracking-widest font-black text-gold border-b-2 border-gold/40 pb-0.5 font-sans">
                  SLA Certified Sourcing
                </span>
              </div>
            </div>
          </motion.div>

        </div>

        {/* INTERACTIVE COMPARATIVE SORTEX CLEAN SLIDER with scroll reveals */}
        <div className="bg-white border border-green/10 p-6 md:p-12 shadow-xl mb-24 overflow-hidden">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="max-w-xl mx-auto text-center mb-8"
          >
            <h3 className="text-xl md:text-2xl font-serif font-black text-green">
              Interactive Sortex Purification Demo
            </h3>
            <p className="text-[11px] text-green/60 font-sans mt-2">
              Slide the center divider line to inspect the difference between Raw Field Crops (with natural husk particles, dust, and micro impurities) and our **99.9% Sortex Clean Standard**.
            </p>
          </motion.div>

          {/* Slider Container Frame with scroll popup */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={scrollRevealVariants}
            className="relative max-w-2xl mx-auto h-[320px] rounded-lg overflow-hidden border border-gold shadow-lg select-none"
          >
            
            {/* UNDERLAY: Raw grain with impurities */}
            <div 
              className="absolute inset-0 bg-cover bg-center flex items-center justify-start p-6"
              style={{ backgroundImage: `url('/pearl_millet.png')`, filter: 'sepia(0.2) contrast(1.05)' }}
            >
              {/* Overlay simulated impurity dots */}
              <div className="absolute inset-0 bg-black/5 mix-blend-multiply pointer-events-none" />
              
              {/* Simulated visual chaff particles */}
              <div className="absolute top-[20%] left-[30%] w-2 h-1 bg-amber-900/60 rounded rotate-12" />
              <div className="absolute top-[60%] left-[20%] w-1.5 h-1.5 bg-yellow-900/70 rounded-full" />
              <div className="absolute top-[40%] left-[60%] w-2.5 h-1 bg-amber-950/70 rounded -rotate-45" />
              <div className="absolute top-[75%] left-[80%] w-1.5 h-2 bg-yellow-800/60 rounded" />
              <div className="absolute top-[30%] left-[85%] w-2 h-1.5 bg-yellow-900/50 rounded" />
              
              <div className="absolute left-6 bottom-6 bg-red-900/90 text-white border border-red-500/30 text-[8px] uppercase font-black px-3 py-1 font-sans tracking-widest">
                Raw Field Harvest
              </div>
            </div>

            {/* OVERLAY: Clean grain cleared 99.9% */}
            <div 
              className="absolute inset-0 bg-cover bg-center overflow-hidden z-10"
              style={{ 
                backgroundImage: `url('/pearl_millet.png')`,
                width: `${sliderPosition}%`,
                borderRight: '2px solid #C9A84C'
              }}
            >
              {/* Pristine Gold overlay glow */}
              <div className="absolute inset-0 bg-gold/5 pointer-events-none" />
              
              {/* Force the background inside to remain 100% full width to prevent image scaling/compression! */}
              <div 
                className="absolute inset-0 bg-cover bg-center w-[672px]" // Matches container width max-w-2xl
                style={{ backgroundImage: `url('/pearl_millet.png')` }}
              >
                <div className="absolute left-6 bottom-6 bg-green/90 text-white border border-gold/30 text-[8px] uppercase font-black px-3 py-1 font-sans tracking-widest">
                  99.9% Sortex Cleaned
                </div>
              </div>
            </div>

            {/* Interactive slide input controller */}
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={sliderPosition} 
              onChange={handleSliderChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-25"
            />

            {/* Visual Slide Drag Indicator Bar */}
            <div 
              className="absolute top-0 bottom-0 z-20 pointer-events-none w-[2px] bg-gold"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-gold border border-white shadow flex items-center justify-center text-white text-xs font-bold">
                ↔
              </div>
            </div>

          </motion.div>
        </div>

        {/* FARMERS / GROWERS HIGHLIGHTS with scroll reveals */}
        <div className="mb-24 overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="border-b border-green/10 pb-4 mb-10 text-center"
          >
            <h3 className="text-xl md:text-2xl font-serif font-black text-green flex items-center justify-center gap-2">
              <HeartHandshake size={20} className="text-gold" />
              <span>Meet Our Smallholder Cooperatives</span>
            </h3>
            <p className="text-[10px] text-green/50 uppercase tracking-widest font-bold mt-1 font-sans">
              100% FairTrade Traceable Linage
            </p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ staggerChildren: 0.15 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {farmerProfiles.map((f, i) => (
              <motion.div 
                key={i} 
                variants={staggerCardVariants}
                className="bg-white border border-green/5 p-6 md:p-8 shadow flex gap-6 items-start relative overflow-hidden group"
              >
                {/* Farmer initials mock avatar with premium border */}
                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-green border border-gold flex-shrink-0 font-serif font-bold text-lg shadow-gold ${f.avatarBg}`}>
                  {f.name.split(' ').map(n => n[0]).join('')}
                </div>

                <div className="flex-1">
                  <div className="flex justify-between items-start gap-2 mb-1">
                    <h4 className="text-base font-serif font-black text-green group-hover:text-gold transition-colors duration-300">
                      {f.name}
                    </h4>
                    <span className="text-[8px] uppercase tracking-wider font-extrabold text-gold font-sans whitespace-nowrap">
                      {f.region}
                    </span>
                  </div>

                  <span className="text-[9px] uppercase tracking-widest font-black text-green/55 block mb-3 font-sans">
                    {f.millets} • {f.linage}
                  </span>

                  <p className="text-xs text-green/75 font-sans leading-relaxed font-light">
                    {f.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* AUTHENTICITY AND COMPLIANCE INDEX MATRIX TABLE with scroll reveal */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={scrollRevealVariants}
          className="bg-white border border-green/10 p-6 md:p-10 shadow-lg overflow-hidden"
        >
          <div className="border-b border-gold/25 pb-4 mb-6">
            <h4 className="text-sm font-serif font-black text-green uppercase tracking-wider">
              Organic Traceability Compliance Index
            </h4>
            <span className="text-[8px] uppercase tracking-widest text-green/45 font-bold font-sans block mt-1">
              Phytosanitary Certification & Optical Clean-Fill Regulations
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs font-sans">
              <thead>
                <tr className="border-b border-green/15 text-[8.5px] uppercase tracking-wider font-bold text-green/55 pb-2">
                  <th className="py-3">Validation Standard</th>
                  <th className="py-3">Certified Agency</th>
                  <th className="py-3">Technical Limits</th>
                  <th className="py-3 text-right">Sourcing Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-green/5 text-green/75 font-light">
                
                <tr>
                  <td className="py-3.5 font-bold text-green">USDA Organic Compliance</td>
                  <td className="py-3.5">NPOP Certs (India / EU Equiv)</td>
                  <td className="py-3.5">0.00% Synthetic Residues</td>
                  <td className="py-3.5 text-right font-bold text-gold">USDA Certified</td>
                </tr>

                <tr>
                  <td className="py-3.5 font-bold text-green">Optical Sortex Cleanliness</td>
                  <td className="py-3.5">Cumbum QC Mechanical Sorting</td>
                  <td className="py-3.5">99.9% Clean-Fill Grain Rate</td>
                  <td className="py-3.5 text-right font-bold text-gold">100% Cleared</td>
                </tr>

                <tr>
                  <td className="py-3.5 font-bold text-green">Moisture Retention Limit</td>
                  <td className="py-3.5">Phytosanitary Port Inspectors</td>
                  <td className="py-3.5">Below 11.5% Standard Max</td>
                  <td className="py-3.5 text-right font-bold text-gold">SLA Compliant</td>
                </tr>

                <tr>
                  <td className="py-3.5 font-bold text-green">Dryland FairTrade Sourcing</td>
                  <td className="py-3.5">Valley Smallholder Cooperative</td>
                  <td className="py-3.5">Minimum 65% Direct-to-Farmer Share</td>
                  <td className="py-3.5 text-right font-bold text-gold">Verified Source</td>
                </tr>

              </tbody>
            </table>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
