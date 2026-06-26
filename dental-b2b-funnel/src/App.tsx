/**
 * ============================================================================
 * App Root — Routing (Landing / CRM)
 * ============================================================================
 */

import { useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import LandingPage from './pages/LandingPage';
import { CONTACT } from './vertical.config';

const CRMPage = lazy(() => import('./pages/CRMPage'));

export default function App() {
  const [view, setView] = useState<'landing' | 'crm'>('landing');

  useEffect(() => {
    const checkRoute = () => {
      const path = window.location.pathname.toLowerCase();
      setView(path.includes('/crm') ? 'crm' : 'landing');
    };
    checkRoute();
    window.addEventListener('popstate', checkRoute);
    return () => window.removeEventListener('popstate', checkRoute);
  }, []);

  // Floating WhatsApp FAB
  const fabUrl = `https://wa.me/${CONTACT.whatsapp_number}`;

  return (
    <>
      <AnimatePresence mode="wait">
        {view === 'landing' ? (
          <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <LandingPage onSubmitted={() => { window.location.href = '/crm'; }} />
          </motion.div>
        ) : (
          <motion.div key="crm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="w-10 h-10 border-4 border-slate-200 border-t-secondary rounded-full animate-spin" /></div>}>
              <CRMPage />
            </Suspense>
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp FAB — only on landing */}
      {view === 'landing' && (
        <motion.a
          href={fabUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 260, damping: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-6 left-6 z-[9999] w-14 h-14 rounded-full bg-[#25D366] shadow-2xl flex items-center justify-center text-white hover:bg-[#1FB855] transition-colors"
          aria-label="تواصل عبر واتساب"
        >
          <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20" />
          <MessageCircle className="w-7 h-7 relative z-10" fill="currentColor" />
        </motion.a>
      )}
    </>
  );
}
