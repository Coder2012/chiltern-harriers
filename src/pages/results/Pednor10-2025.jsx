import { useState, useMemo, useEffect } from 'react';
import data from '../../assets/pednor10results2025.json';

const MALE_CATS = new Set(['SM', 'M40', 'M50', 'M60', 'M70', 'Rly-M']);
const FEMALE_CATS = new Set(['SF', 'F40', 'F50', 'F60', 'F70', 'Rly-F']);
const CATEGORY_ORDER = ['SM', 'M40', 'M50', 'M60', 'M70', 'SF', 'F40', 'F50', 'F60', 'F70', 'Rly-M', 'Rly-F', 'Rly-X'];

const DESKTOP_QUERY = window.matchMedia('(min-width: 1024px)');

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(DESKTOP_QUERY.matches);
  useEffect(() => {
    const handler = (e) => setIsDesktop(e.matches);
    DESKTOP_QUERY.addEventListener('change', handler);
    return () => DESKTOP_QUERY.removeEventListener('change', handler);
  }, []);
  return isDesktop;
}

function ChevronDownIcon({ className = '' }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  );
}

function FilterLabel({ children }) {
  return (
    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
      {children}
    </span>
  );
}

function ButtonGroup({ options, value, onChange }) {
  return (
    <div className="flex rounded-xl border border-slate-700 overflow-hidden bg-slate-800">
      {options.map((opt, i) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={[
            'flex-1 px-3 py-2 text-sm font-medium transition-all whitespace-nowrap',
            i > 0 ? 'border-l border-slate-700' : '',
            value === opt.value
              ? 'bg-amber-500 text-slate-900 font-semibold'
              : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-slate-200',
          ].join(' ')}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function FilterSelect({ label, value, onChange, options }) {
  return (
    <div className="flex flex-col gap-1.5 w-full md:w-44">
      <FilterLabel>{label}</FilterLabel>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none text-sm border border-slate-700 rounded-xl px-3 py-2 pr-8 bg-slate-800 text-slate-200 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition"
        >
          <option value="">All</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-2.5 flex items-center pointer-events-none text-slate-500">
          <ChevronDownIcon />
        </div>
      </div>
    </div>
  );
}

function positionClass(pos) {
  if (pos === 1) return 'text-yellow-400 font-bold';
  if (pos === 2) return 'text-slate-300 font-semibold';
  if (pos === 3) return 'text-amber-600 font-semibold';
  return 'text-slate-500 font-medium';
}

function Pednor102025() {
  const { race, results } = data;

  const [gender, setGender] = useState('');
  const [relay, setRelay] = useState('');
  const [club, setClub] = useState('');
  const [category, setCategory] = useState('');
  const [expanded, setExpanded] = useState(null);
  const isDesktop = useIsDesktop();

  const clubs = useMemo(
    () => [...new Set(results.map((r) => r.club).filter(Boolean))].sort(),
    []
  );

  const categories = useMemo(() => {
    const present = new Set(results.map((r) => r.category));
    return CATEGORY_ORDER.filter((c) => present.has(c));
  }, []);

  const filtered = useMemo(
    () =>
      results.filter((r) => {
        if (gender === 'male' && !MALE_CATS.has(r.category)) return false;
        if (gender === 'female' && !FEMALE_CATS.has(r.category)) return false;
        if (relay === 'individual' && r.relayPosition !== null) return false;
        if (relay === 'relay' && r.relayPosition === null) return false;
        if (club && r.club !== club) return false;
        if (category && r.category !== category) return false;
        return true;
      }),
    [gender, relay, club, category]
  );

  const hasFilters = gender || relay || club || category;

  function clearFilters() {
    setGender('');
    setRelay('');
    setClub('');
    setCategory('');
  }

  function toggleExpanded(raceNumber) {
    setExpanded((prev) => (prev === raceNumber ? null : raceNumber));
  }

  return (
    <section>
      <h1 className="text-3xl font-bold text-amber-400 mb-1">{race.name}</h1>
      <p className="text-slate-500 mb-6">
        {new Date(race.date).toLocaleDateString('en-GB', {
          weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
        })}
      </p>

      {/* ── Filter bar ── */}
      <div className="mb-6 p-4 bg-slate-800 rounded-2xl border border-slate-700 shadow-lg">
        <div className="flex flex-col md:flex-row md:flex-wrap md:items-end gap-3 md:gap-4">

          <div className="flex flex-col gap-1.5">
            <FilterLabel>Gender</FilterLabel>
            <ButtonGroup
              value={gender}
              onChange={setGender}
              options={[
                { value: '', label: 'All' },
                { value: 'male', label: 'Male' },
                { value: 'female', label: 'Female' },
              ]}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <FilterLabel>Type</FilterLabel>
            <ButtonGroup
              value={relay}
              onChange={setRelay}
              options={[
                { value: '', label: 'All' },
                { value: 'individual', label: 'Individual' },
                { value: 'relay', label: 'Relay' },
              ]}
            />
          </div>

          <FilterSelect label="Club / Team" value={club} onChange={setClub} options={clubs} />
          <FilterSelect label="Category" value={category} onChange={setCategory} options={categories} />

          {hasFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-red-400 bg-red-950/50 hover:bg-red-900/50 rounded-xl transition-colors md:self-end"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Clear filters
            </button>
          )}
        </div>
      </div>

      <p className="text-sm text-slate-500 mb-3">
        Showing <span className="font-semibold text-slate-300">{filtered.length}</span> of {results.length} entries
      </p>

      {/* Mobile: accordion */}
      {!isDesktop && (
        <div className="space-y-1">
          {filtered.map((r) => {
            const isOpen = expanded === r.raceNumber;
            return (
              <div key={r.raceNumber}>
                <button
                  onClick={() => toggleExpanded(r.raceNumber)}
                  className={[
                    'w-full flex items-center gap-3 px-3 py-2.5 bg-slate-800 border border-slate-700 text-left transition-colors hover:bg-slate-700',
                    isOpen ? 'rounded-t-lg' : 'rounded-lg',
                  ].join(' ')}
                >
                  <span className={`w-8 shrink-0 text-sm ${positionClass(r.position)}`}>{r.position}</span>
                  <span className="flex-1 text-sm font-medium text-slate-100">{r.name}</span>
                  <span className="text-sm tabular-nums font-semibold text-amber-400">{r.time}</span>
                  <ChevronDownIcon className={`shrink-0 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOpen && (
                  <div className="border border-t-0 border-slate-700 rounded-b-lg bg-slate-900/60 px-4 py-3">
                    <dl className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
                      {r.club && (
                        <>
                          <dt className="text-slate-500">Club</dt>
                          <dd className="text-slate-200 font-medium">{r.club}</dd>
                        </>
                      )}
                      <dt className="text-slate-500">Category</dt>
                      <dd className="text-slate-200 font-medium">{r.category}</dd>
                      {r.split && (
                        <>
                          <dt className="text-slate-500">Split</dt>
                          <dd className="tabular-nums text-slate-200">{r.split}</dd>
                        </>
                      )}
                      {r.menPosition && (
                        <>
                          <dt className="text-slate-500">Men's pos.</dt>
                          <dd className="text-slate-200">{r.menPosition}</dd>
                        </>
                      )}
                      {r.womenPosition && (
                        <>
                          <dt className="text-slate-500">Women's pos.</dt>
                          <dd className="text-slate-200">{r.womenPosition}</dd>
                        </>
                      )}
                      {r.relayPosition && (
                        <>
                          <dt className="text-slate-500">Relay pos.</dt>
                          <dd className="text-slate-200">{r.relayPosition}</dd>
                        </>
                      )}
                      <dt className="text-slate-500">Race no.</dt>
                      <dd className="text-slate-200">{r.raceNumber}</dd>
                      {r.award && (
                        <>
                          <dt className="text-slate-500">Award</dt>
                          <dd className="font-semibold text-amber-400">{r.award}</dd>
                        </>
                      )}
                    </dl>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Desktop: full table */}
      {isDesktop && (
        <div className="overflow-x-auto rounded-xl border border-slate-700 shadow-lg">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-slate-900 text-slate-400 text-left border-b border-slate-700">
                <th className="px-3 py-3 font-semibold">Pos</th>
                <th className="px-3 py-3 font-semibold">Men</th>
                <th className="px-3 py-3 font-semibold">Women</th>
                <th className="px-3 py-3 font-semibold">Rly</th>
                <th className="px-3 py-3 font-semibold">No.</th>
                <th className="px-3 py-3 font-semibold">Competitor(s)</th>
                <th className="px-3 py-3 font-semibold">Club / Team</th>
                <th className="px-3 py-3 font-semibold">Cat.</th>
                <th className="px-3 py-3 font-semibold">Split</th>
                <th className="px-3 py-3 font-semibold">Time</th>
                <th className="px-3 py-3 font-semibold">Award</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.raceNumber} className="border-b border-slate-700/50 even:bg-slate-800/40 hover:bg-slate-700/60 transition-colors">
                  <td className={`px-3 py-2.5 ${positionClass(r.position)}`}>{r.position}</td>
                  <td className="px-3 py-2.5 text-slate-500">{r.menPosition ?? ''}</td>
                  <td className="px-3 py-2.5 text-slate-500">{r.womenPosition ?? ''}</td>
                  <td className="px-3 py-2.5 text-slate-500">{r.relayPosition ?? ''}</td>
                  <td className="px-3 py-2.5 text-slate-600">{r.raceNumber}</td>
                  <td className="px-3 py-2.5 font-medium text-slate-100">{r.name}</td>
                  <td className="px-3 py-2.5 text-slate-400">{r.club ?? ''}</td>
                  <td className="px-3 py-2.5 text-slate-400">{r.category}</td>
                  <td className="px-3 py-2.5 tabular-nums text-slate-400">{r.split ?? ''}</td>
                  <td className="px-3 py-2.5 tabular-nums font-semibold text-amber-400">{r.time}</td>
                  <td className="px-3 py-2.5 font-semibold text-amber-400">{r.award ?? ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default Pednor102025;
