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

function ChevronDownIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
  );
}

function FilterLabel({ children }) {
  return (
    <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
      {children}
    </span>
  );
}

function ButtonGroup({ options, value, onChange }) {
  return (
    <div className="flex rounded-xl border border-gray-200 overflow-hidden bg-white shadow-sm">
      {options.map((opt, i) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={[
            'flex-1 px-3 py-2 text-sm font-medium transition-all whitespace-nowrap',
            i > 0 ? 'border-l border-gray-200' : '',
            value === opt.value
              ? 'bg-blue-600 text-white shadow-inner'
              : 'bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-600',
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
          className="w-full appearance-none text-sm border border-gray-200 rounded-xl px-3 py-2 pr-8 bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
        >
          <option value="">All</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-2.5 flex items-center pointer-events-none text-gray-400">
          <ChevronDownIcon />
        </div>
      </div>
    </div>
  );
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
      <h1 className="text-3xl font-bold text-blue-600 mb-1">{race.name}</h1>
      <p className="text-gray-500 mb-6">
        {new Date(race.date).toLocaleDateString('en-GB', {
          weekday: 'long',
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })}
      </p>

      {/* ── Filter bar ── */}
      <div className="mb-6 p-4 bg-white rounded-2xl border border-gray-200 shadow-sm">
        <div className="flex flex-col md:flex-row md:flex-wrap md:items-end gap-3 md:gap-4">

          {/* Gender */}
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

          {/* Relay */}
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

          <FilterSelect
            label="Club / Team"
            value={club}
            onChange={setClub}
            options={clubs}
          />

          <FilterSelect
            label="Category"
            value={category}
            onChange={setCategory}
            options={categories}
          />

          {hasFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-red-500 hover:text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors md:self-end"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
              Clear filters
            </button>
          )}
        </div>
      </div>

      <p className="text-sm text-gray-500 mb-3">
        Showing <span className="font-semibold text-gray-700">{filtered.length}</span> of {results.length} entries
      </p>

      {/* Mobile: collapsed rows with expandable detail card */}
      {!isDesktop && (
        <div className="space-y-1">
          {filtered.map((r) => {
            const isOpen = expanded === r.raceNumber;
            return (
              <div key={r.raceNumber}>
                <button
                  onClick={() => toggleExpanded(r.raceNumber)}
                  className={[
                    'w-full flex items-center gap-3 px-3 py-2.5 bg-white border border-gray-200 text-left transition-colors hover:bg-blue-50',
                    isOpen ? 'rounded-t-lg' : 'rounded-lg',
                  ].join(' ')}
                >
                  <span className="w-8 shrink-0 text-sm text-gray-400">{r.position}</span>
                  <span className="flex-1 text-sm font-medium text-gray-800">{r.name}</span>
                  <span className="text-sm tabular-nums font-medium text-gray-700">{r.time}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className={`shrink-0 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                  >
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>

                {isOpen && (
                  <div className="border border-t-0 border-gray-200 rounded-b-lg bg-blue-50/50 px-4 py-3">
                    <dl className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm">
                      {r.club && (
                        <>
                          <dt className="text-gray-500">Club</dt>
                          <dd className="text-gray-800 font-medium">{r.club}</dd>
                        </>
                      )}
                      <dt className="text-gray-500">Category</dt>
                      <dd className="text-gray-800 font-medium">{r.category}</dd>
                      {r.split && (
                        <>
                          <dt className="text-gray-500">Split</dt>
                          <dd className="tabular-nums text-gray-800">{r.split}</dd>
                        </>
                      )}
                      {r.menPosition && (
                        <>
                          <dt className="text-gray-500">Men's pos.</dt>
                          <dd className="text-gray-800">{r.menPosition}</dd>
                        </>
                      )}
                      {r.womenPosition && (
                        <>
                          <dt className="text-gray-500">Women's pos.</dt>
                          <dd className="text-gray-800">{r.womenPosition}</dd>
                        </>
                      )}
                      {r.relayPosition && (
                        <>
                          <dt className="text-gray-500">Relay pos.</dt>
                          <dd className="text-gray-800">{r.relayPosition}</dd>
                        </>
                      )}
                      <dt className="text-gray-500">Race no.</dt>
                      <dd className="text-gray-800">{r.raceNumber}</dd>
                      {r.award && (
                        <>
                          <dt className="text-gray-500">Award</dt>
                          <dd className="font-semibold text-blue-700">{r.award}</dd>
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
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-blue-600 text-white text-left">
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
                <tr
                  key={r.raceNumber}
                  className="border-b border-gray-100 even:bg-gray-50 hover:bg-blue-50 transition-colors"
                >
                  <td className="px-3 py-2.5 font-medium">{r.position}</td>
                  <td className="px-3 py-2.5 text-gray-500">{r.menPosition ?? ''}</td>
                  <td className="px-3 py-2.5 text-gray-500">{r.womenPosition ?? ''}</td>
                  <td className="px-3 py-2.5 text-gray-500">{r.relayPosition ?? ''}</td>
                  <td className="px-3 py-2.5 text-gray-400">{r.raceNumber}</td>
                  <td className="px-3 py-2.5 font-medium text-gray-900">{r.name}</td>
                  <td className="px-3 py-2.5 text-gray-600">{r.club ?? ''}</td>
                  <td className="px-3 py-2.5">{r.category}</td>
                  <td className="px-3 py-2.5 tabular-nums text-gray-600">{r.split ?? ''}</td>
                  <td className="px-3 py-2.5 tabular-nums font-semibold text-gray-900">{r.time}</td>
                  <td className="px-3 py-2.5 text-blue-700 font-semibold">{r.award ?? ''}</td>
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
