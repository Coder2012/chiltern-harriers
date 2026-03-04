import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Results from './pages/Results';
import Pednor102025 from './pages/results/Pednor10-2025';
import CCL202526M1 from './pages/results/CCL-202526-M1';
import CCL202526M2 from './pages/results/CCL-202526-M2';
import CCL202526M3 from './pages/results/CCL-202526-M3';
import CCL202526M4 from './pages/results/CCL-202526-M4';
import CCL202526M5 from './pages/results/CCL-202526-M5';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/results', label: 'Results' },
  { to: '/contact', label: 'Contact' },
];

function BurgerIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-950">

        {/* ── Navbar ── */}
        <nav className="bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50 sticky top-0 z-[70]">
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="font-extrabold text-xl text-amber-400 tracking-tight hover:text-amber-300 transition-colors"
            >
              Chiltern Harriers
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map(({ to, label }) => (
                <Link
                  key={to}
                  to={to}
                  className="px-4 py-2 text-slate-300 hover:text-amber-400 font-semibold rounded-lg hover:bg-slate-800 transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>

            <button
              className="md:hidden p-2 rounded-lg text-slate-300 hover:bg-slate-800 transition-colors"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? <CloseIcon /> : <BurgerIcon />}
            </button>
          </div>
        </nav>

        {/* ── Mobile full-screen overlay ── */}
        <div
          className={[
            'fixed z-[60] flex flex-col md:hidden',
            'transition-opacity duration-200',
            menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none',
          ].join(' ')}
          style={{ inset: 0, background: 'rgba(2, 6, 23, 0.98)' }}
        >
          <nav className="flex flex-col items-center justify-center flex-1 gap-10">
            {NAV_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                onClick={() => setMenuOpen(false)}
                className="text-slate-100 text-3xl font-bold tracking-wide hover:text-amber-400 transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* ── Page content ── */}
        <main className="max-w-6xl mx-auto px-4 py-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/results" element={<Results />} />
            <Route path="/results/pednor10-2025" element={<Pednor102025 />} />
            <Route path="/results/ccl-202526-m1" element={<CCL202526M1 />} />
            <Route path="/results/ccl-202526-m2" element={<CCL202526M2 />} />
            <Route path="/results/ccl-202526-m3" element={<CCL202526M3 />} />
            <Route path="/results/ccl-202526-m4" element={<CCL202526M4 />} />
            <Route path="/results/ccl-202526-m5" element={<CCL202526M5 />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
