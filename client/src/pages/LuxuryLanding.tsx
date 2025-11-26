import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Globe, MapPin, Shield, Clock, Star, Anchor, Plane, Box, CheckCircle2, Menu, X, BarChart3 } from "lucide-react";
import { useRef, useState } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Assets
import marbleTexture from "@assets/stock_images/luxury_gold_and_whit_bd54d3a5.jpg";
import jetInterior from "@assets/stock_images/private_jet_interior_81593a0e.jpg";
import goldenGlobe from "@assets/stock_images/cinematic_golden_glo_6214e3e2.jpg";
import chartImage from "@assets/stock_images/abstract_3d_financia_706fec90.jpg";
import luxuryShip from "@assets/stock_images/luxury_container_shi_990cf15c.jpg";
import watchMech from "@assets/stock_images/close_up_of_expensiv_c5a5e676.jpg";
import architecture from "@assets/stock_images/sleek_modern_archite_f51dbae2.jpg";

// Components
const AnimatedCounter = ({ value, label }: { value: string, label: string }) => (
  <div className="text-center">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="font-luxury-heading text-4xl md:text-6xl text-[#d4af37] mb-2 italic"
    >
      {value}
    </motion.div>
    <div className="text-xs uppercase tracking-[0.2em] text-slate-500">{label}</div>
  </div>
);

const FeatureCard = ({ icon: Icon, title, desc, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    className="bg-white/5 backdrop-blur-sm border border-[#d4af37]/20 p-8 hover:bg-[#d4af37]/5 transition-all duration-500 group"
  >
    <div className="w-12 h-12 bg-[#d4af37]/10 rounded-full flex items-center justify-center text-[#d4af37] mb-6 group-hover:scale-110 transition-transform duration-500">
      <Icon strokeWidth={1.5} />
    </div>
    <h3 className="font-luxury-heading text-xl mb-4 text-slate-800 group-hover:text-[#d4af37] transition-colors">{title}</h3>
    <p className="text-slate-500 leading-relaxed text-sm">{desc}</p>
  </motion.div>
);

const ParallaxSection = ({ children, bgImage }: { children: React.ReactNode, bgImage: string }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section ref={ref} className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <img src={bgImage} alt="Background" className="w-full h-[120%] object-cover" />
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>
      <div className="relative z-10 w-full">{children}</div>
    </section>
  );
};

export default function LuxuryLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  
  // Zoom effect refs
  const zoomRef = useRef(null);
  const { scrollYProgress: zoomScroll } = useScroll({
    target: zoomRef,
    offset: ["start start", "end end"]
  });
  const scale = useTransform(zoomScroll, [0, 1], [1, 1.5]);
  const opacity = useTransform(zoomScroll, [0, 0.5, 1], [1, 1, 0]);

  const chartData = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 600 },
    { name: 'Apr', value: 800 },
    { name: 'May', value: 500 },
    { name: 'Jun', value: 900 },
    { name: 'Jul', value: 1100 },
  ];

  return (
    <div className="font-luxury-body bg-[#fdfbf7] text-slate-900 overflow-x-hidden selection:bg-[#d4af37] selection:text-white">
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-[#d4af37] z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#fdfbf7]/90 backdrop-blur-md border-b border-[#d4af37]/20 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <div className="font-luxury-heading text-3xl italic font-bold relative group cursor-pointer">
            Meridian<span className="text-[#d4af37]">.</span>
            <div className="absolute -bottom-2 left-0 w-0 h-px bg-[#d4af37] group-hover:w-full transition-all duration-500" />
          </div>

          <div className="hidden md:flex gap-12 text-xs uppercase tracking-[0.2em] font-medium text-slate-500">
            {["Heritage", "Concierge", "Fleet", "Network", "Contact"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-[#d4af37] transition-colors relative group">
                {item}
                <span className="absolute -bottom-2 left-1/2 w-0 h-px bg-[#d4af37] -translate-x-1/2 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-6">
             <button className="hidden md:block border border-[#d4af37] text-[#d4af37] px-8 py-3 text-xs uppercase tracking-widest hover:bg-[#d4af37] hover:text-white transition-all duration-500">
              Client Login
            </button>
            <button className="md:hidden text-slate-800" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <img src={jetInterior} alt="Hero" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
        </motion.div>

        <div className="relative z-10 text-center text-white max-w-5xl px-6 mt-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-4 mb-8">
              <div className="h-px w-12 bg-[#d4af37]" />
              <span className="text-[#d4af37] text-sm font-bold tracking-[0.4em] uppercase">Est. 1985</span>
              <div className="h-px w-12 bg-[#d4af37]" />
            </div>
            <h1 className="font-luxury-heading text-7xl md:text-9xl mb-8 leading-none italic drop-shadow-2xl">
              The Art of <br /> Movement
            </h1>
            <p className="text-lg md:text-xl font-light text-white/90 max-w-2xl mx-auto mb-12 leading-loose tracking-wide backdrop-blur-sm py-4">
              Experience a new standard in global logistics. Where precision meets prestige, and your cargo is treated with the reverence it deserves.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-6">
              <button className="bg-[#d4af37] text-white px-12 py-5 text-sm uppercase tracking-widest hover:bg-white hover:text-[#d4af37] transition-all duration-500 shadow-[0_0_30px_rgba(212,175,55,0.3)]">
                Begin Consultation
              </button>
              <button className="bg-transparent border border-white/30 text-white px-12 py-5 text-sm uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all duration-500 backdrop-blur-md">
                View Services
              </button>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/0 via-white/50 to-white/0" />
        </motion.div>
      </section>

      {/* Heritage / Story Section */}
      <section id="heritage" className="py-32 px-8 bg-[#fdfbf7] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#d4af37]/5 skew-x-12 translate-x-20" />
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 border border-[#d4af37]/20 rounded-full animate-spin-slow" />
            <img src={watchMech} alt="Precision" className="relative z-10 shadow-2xl w-full grayscale hover:grayscale-0 transition-all duration-1000" />
            <div className="absolute -bottom-10 -right-10 bg-white p-8 shadow-xl border-t-4 border-[#d4af37] z-20 max-w-xs hidden md:block">
              <p className="font-luxury-heading italic text-2xl mb-2">"Precision is not an act, it is a habit."</p>
              <p className="text-xs uppercase tracking-wider text-slate-400">— Founder, 1985</p>
            </div>
          </div>
          <div>
            <h2 className="font-luxury-heading text-5xl md:text-6xl text-slate-900 mb-8 italic">
              Curating the <br />
              <span className="text-[#d4af37]">Exceptional.</span>
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              Meridian was founded on the principle that logistics is not merely a transaction, but a vital artery of global commerce. For three decades, we have served the world's most distinguished brands with an unyielding commitment to excellence.
            </p>
            <ul className="space-y-4 mb-12">
              {["White-glove handling services", "Secure vault storage worldwide", "Private charter fleet access"].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-sm uppercase tracking-wider text-slate-800">
                  <CheckCircle2 className="w-5 h-5 text-[#d4af37]" /> {item}
                </li>
              ))}
            </ul>
            <div className="grid grid-cols-3 gap-8 border-t border-slate-200 pt-8">
              <AnimatedCounter value="150+" label="Countries" />
              <AnimatedCounter value="40k" label="Deliveries" />
              <AnimatedCounter value="30" label="Years" />
            </div>
          </div>
        </div>
      </section>

      {/* Zoom Scroll Feature Section */}
      <div ref={zoomRef} className="h-[200vh] relative bg-black">
        <div className="sticky top-0 h-screen overflow-hidden">
          <motion.div style={{ scale, opacity }} className="absolute inset-0">
             <img src={goldenGlobe} alt="Global" className="w-full h-full object-cover opacity-60" />
             <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
          </motion.div>
          <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
            <div className="text-center max-w-4xl px-6">
              <h2 className="font-luxury-heading text-6xl md:text-8xl text-white mb-6 italic drop-shadow-2xl">
                Global Intelligence
              </h2>
              <p className="text-xl text-white/80 font-light max-w-2xl mx-auto backdrop-blur-sm p-4 rounded-xl border border-white/10">
                Real-time telemetry across 6 continents. We monitor your assets with military-grade precision.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <section id="concierge" className="py-32 px-6 bg-[#1e1e1e] text-white relative">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-[#d4af37] text-xs font-bold tracking-[0.4em] uppercase block mb-4">Capabilities</span>
            <h2 className="font-luxury-heading text-5xl md:text-6xl mb-6 italic">The Concierge Standard</h2>
            <div className="w-20 h-1 bg-[#d4af37] mx-auto" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={Shield} 
              title="Secure Transport" 
              desc="Armored transport options for high-value assets including art, jewelry, and bullion."
              delay={0}
            />
            <FeatureCard 
              icon={Clock} 
              title="Expedited Customs" 
              desc="Pre-clearance and diplomatic channels to ensure your cargo never waits at the border."
              delay={0.2}
            />
            <FeatureCard 
              icon={Globe} 
              title="Global Compliance" 
              desc="Navigating complex regulatory environments in over 150 jurisdictions with local experts."
              delay={0.4}
            />
            <FeatureCard 
              icon={Box} 
              title="Bespoke Packaging" 
              desc="Custom crating and climate-controlled containers built specifically for your items."
              delay={0.6}
            />
            <FeatureCard 
              icon={Anchor} 
              title="Maritime Excellence" 
              desc="Priority berthing and guaranteed slot availability on premier vessel alliances."
              delay={0.8}
            />
            <FeatureCard 
              icon={Plane} 
              title="Air Charter" 
              desc="On-demand aircraft availability for urgent or oversized cargo requirements."
              delay={1}
            />
          </div>
        </div>
      </section>

      {/* Analytics Parallax Section */}
      <ParallaxSection bgImage={chartImage}>
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center h-full py-20">
          <div className="bg-white/10 backdrop-blur-xl p-8 border border-white/20 rounded-xl">
            <h3 className="font-luxury-heading text-3xl text-white mb-8 italic">Performance Metrics</h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#d4af37" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#d4af37" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="name" stroke="rgba(255,255,255,0.5)" />
                  <YAxis stroke="rgba(255,255,255,0.5)" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#000', border: '1px solid #d4af37', color: '#fff' }}
                    itemStyle={{ color: '#d4af37' }}
                  />
                  <Area type="monotone" dataKey="value" stroke="#d4af37" fillOpacity={1} fill="url(#colorValue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="text-white">
            <h2 className="font-luxury-heading text-5xl md:text-7xl mb-6 italic">Data-Driven <br />Precision</h2>
            <p className="text-lg font-light text-white/80 mb-8 leading-loose">
              Our proprietary algorithms optimize routing in real-time, saving an average of 18% on transit times and reducing carbon footprint by 25%.
            </p>
            <button className="text-[#d4af37] border-b border-[#d4af37] pb-1 hover:text-white hover:border-white transition-colors uppercase tracking-widest text-sm">
              View Case Studies
            </button>
          </div>
        </div>
      </ParallaxSection>

      {/* Fleet Showcase */}
      <section id="fleet" className="py-32 bg-[#fdfbf7]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div>
              <span className="text-[#d4af37] text-xs font-bold tracking-[0.4em] uppercase block mb-4">Our Assets</span>
              <h2 className="font-luxury-heading text-5xl text-slate-900 italic">The Meridian Fleet</h2>
            </div>
            <p className="max-w-md text-slate-500 text-sm leading-relaxed mt-8 md:mt-0">
              From Boeing 747-8F freighters to Triple-E class container vessels, our access to capacity is unmatched in the industry.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="group relative h-[500px] overflow-hidden">
              <img src={luxuryShip} alt="Ship" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
              <div className="absolute bottom-8 left-8 text-white">
                <div className="text-[#d4af37] text-xs uppercase tracking-widest mb-2">Maritime</div>
                <h3 className="font-luxury-heading text-4xl italic">Ocean Class</h3>
              </div>
            </div>
            <div className="group relative h-[500px] overflow-hidden">
              <img src={architecture} alt="Air" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
              <div className="absolute bottom-8 left-8 text-white">
                <div className="text-[#d4af37] text-xs uppercase tracking-widest mb-2">Infrastructure</div>
                <h3 className="font-luxury-heading text-4xl italic">Global Hubs</h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-32 bg-[#1e1e1e] text-white text-center px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[400px] opacity-5 font-serif pointer-events-none">"</div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="flex justify-center gap-1 text-[#d4af37] mb-8">
            <Star fill="#d4af37" />
            <Star fill="#d4af37" />
            <Star fill="#d4af37" />
            <Star fill="#d4af37" />
            <Star fill="#d4af37" />
          </div>
          <h2 className="font-luxury-heading text-3xl md:text-5xl leading-tight mb-12 italic">
            "In the world of high-stakes logistics, Meridian has no equal. They handled our entire European expansion with a level of grace and efficiency I didn't think possible."
          </h2>
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 bg-[#d4af37] rounded-full" />
            <div className="text-left">
              <div className="font-bold text-lg">Alexander V.</div>
              <div className="text-[#d4af37] text-xs uppercase tracking-widest">CEO, Luxury Goods Conglomerate</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-32 px-6 bg-[#fdfbf7]">
        <div className="max-w-7xl mx-auto bg-white shadow-2xl border border-[#d4af37]/10 p-12 md:p-20">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <span className="text-[#d4af37] text-xs font-bold tracking-[0.4em] uppercase block mb-4">Inquiries</span>
              <h2 className="font-luxury-heading text-5xl mb-8 text-slate-900 italic">Request Concierge</h2>
              <p className="text-slate-500 mb-12 leading-relaxed">
                Please provide details about your shipment requirements. Our dedicated team reviews all requests within 2 hours.
              </p>
              
              <div className="space-y-8">
                <div>
                  <h4 className="font-bold text-slate-900 mb-2">Headquarters</h4>
                  <p className="text-slate-500 text-sm">1 Knightsbridge Green<br/>London, SW1X 7QA<br/>United Kingdom</p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-2">Direct Line</h4>
                  <p className="text-slate-500 text-sm">+44 20 7123 4567</p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 mb-2">Email</h4>
                  <p className="text-slate-500 text-sm">concierge@meridian.global</p>
                </div>
              </div>
            </div>
            
            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-slate-500">First Name</label>
                  <input type="text" className="w-full border-b border-slate-200 py-2 focus:outline-none focus:border-[#d4af37] transition-colors bg-transparent" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-slate-500">Last Name</label>
                  <input type="text" className="w-full border-b border-slate-200 py-2 focus:outline-none focus:border-[#d4af37] transition-colors bg-transparent" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-slate-500">Company</label>
                <input type="text" className="w-full border-b border-slate-200 py-2 focus:outline-none focus:border-[#d4af37] transition-colors bg-transparent" />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-slate-500">Email</label>
                <input type="email" className="w-full border-b border-slate-200 py-2 focus:outline-none focus:border-[#d4af37] transition-colors bg-transparent" />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-slate-500">Requirements</label>
                <textarea rows={4} className="w-full border-b border-slate-200 py-2 focus:outline-none focus:border-[#d4af37] transition-colors bg-transparent resize-none" />
              </div>
              <button className="bg-[#0f172a] text-white px-10 py-4 w-full text-sm uppercase tracking-widest hover:bg-[#d4af37] transition-colors duration-500 mt-4">
                Submit Request
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0f172a] text-white pt-24 pb-12 px-6 border-t border-[#d4af37]/30">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-2">
            <div className="font-luxury-heading text-4xl italic font-bold mb-8">Meridian.</div>
            <p className="text-white/40 max-w-sm leading-relaxed">
              The definitive standard in luxury logistics. Connecting the world's most prestigious brands with their global markets through uncompromised service.
            </p>
          </div>
          <div>
             <h4 className="font-bold mb-6 text-xs uppercase tracking-[0.2em] text-[#d4af37]">Sitemap</h4>
             <ul className="space-y-4 text-white/60 text-sm font-light">
               <li className="hover:text-[#d4af37] transition-colors cursor-pointer">Heritage</li>
               <li className="hover:text-[#d4af37] transition-colors cursor-pointer">Services</li>
               <li className="hover:text-[#d4af37] transition-colors cursor-pointer">Fleet</li>
               <li className="hover:text-[#d4af37] transition-colors cursor-pointer">Careers</li>
             </ul>
          </div>
          <div>
             <h4 className="font-bold mb-6 text-xs uppercase tracking-[0.2em] text-[#d4af37]">Legal</h4>
             <ul className="space-y-4 text-white/60 text-sm font-light">
               <li className="hover:text-[#d4af37] transition-colors cursor-pointer">Privacy Policy</li>
               <li className="hover:text-[#d4af37] transition-colors cursor-pointer">Terms of Service</li>
               <li className="hover:text-[#d4af37] transition-colors cursor-pointer">Cookie Policy</li>
             </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-white/30">
           <div>© 2025 Meridian Global Logistics. All rights reserved.</div>
           <div className="flex gap-8 mt-4 md:mt-0">
             <span className="hover:text-white cursor-pointer transition-colors">LinkedIn</span>
             <span className="hover:text-white cursor-pointer transition-colors">Instagram</span>
             <span className="hover:text-white cursor-pointer transition-colors">Twitter</span>
           </div>
        </div>
      </footer>
    </div>
  );
}
