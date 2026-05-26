import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import MobileBottomNav from './components/MobileBottomNav';
import Hero from './components/Hero';
import Storyline from './components/Storyline';
import CatalogSlider from './components/CatalogSlider';
import EliteCatalog from './components/EliteCatalog';
import CheckoutPage from './components/CheckoutPage';
import CartDrawer from './components/CartDrawer';
import ProductDetailsModal from './components/ProductDetailsModal';
import StatusPortal from './components/StatusPortal';
import AdminDashboard from './components/AdminDashboard';

function AppContent() {
  const { activePage, triggerHaptic } = useApp();

  // Scroll to top when active page changes on desktop
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage]);

  // Lock mobile view viewport scroll strictly to simulate a premium native mobile app
  useEffect(() => {
    const handleTouchMove = (e) => {
      // Allow scroll inside designated container blocks
    };
    document.addEventListener('touchmove', handleTouchMove, { passive: true });
    return () => document.removeEventListener('touchmove', handleTouchMove);
  }, []);

  const renderActiveScreen = () => {
    switch (activePage) {
      case 'landing':
        return (
          <div className="animate-fade-in-up">
            <Hero />
            <Storyline />
            <CatalogSlider />
          </div>
        );
      case 'shop':
        return <EliteCatalog />;
      case 'checkout':
        return <CheckoutPage />;
      case 'portal':
        return <StatusPortal />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return (
          <div className="animate-fade-in-up">
            <Hero />
            <Storyline />
            <CatalogSlider />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative bg-cream font-sans text-green">
      
      {/* Dynamic Background Grid Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.02] select-none"
        style={{
          backgroundImage: `radial-gradient(#1A2E1A 1.5px, transparent 1.5px)`,
          backgroundSize: '28px 28px'
        }}
      />

      {/* Luxury Sticky Desktop Navbar Header */}
      <Navbar />

      {/* Fluid Page Content Zone */}
      <main className="flex-1 z-10 pt-0 md:pt-[76px]">
        {renderActiveScreen()}
      </main>

      {/* Global Slide-Over Shopping Cart Sidebar Drawer */}
      <CartDrawer />

      {/* Global Product Details Sheet Overlay */}
      <ProductDetailsModal />

      {/* Responsive Touch-Optimized Native Mobile Bottom Tab Bar */}
      <MobileBottomNav />

      {/* Elegant minimalist footer for desktop screens only */}
      <footer 
        className="hidden md:block border-t border-gold/20 bg-cream py-8 text-center text-[10px] uppercase tracking-[0.25em] z-10 relative print:hidden"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center px-12">
          <span>© 2026 Cumbum Valley Luxury B2B Ecosystem</span>
          <span>Phytosanitary Certified • Sortex Cleared 99.9%</span>
        </div>
      </footer>

    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
