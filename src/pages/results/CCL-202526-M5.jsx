import { useState, useMemo, useEffect } from 'react';
import data from '../../assets/chiltern_league/match5/CCL-202526-M5.json';

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
    <div className="flex flex-col gap-1.5 w-full md:w-48">
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

// ── Team Results Table ─────────────────────────────────────────────────────────
function TeamResultsTable({ teams, division }) {
  return (
    <div>
      <h2 className="text-lg font-bold text-slate-300 mb-3">Division {division}</h2>
      <div className="overflow-x-auto rounded-xl border border-slate-700 shadow-lg mb-8">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="bg-slate-900 text-slate-400 text-left border-b border-slate-700">
              <th className="px-3 py-3 font-semibold">Pos</th>
              <th className="px-3 py-3 font-semibold">Club / Team</th>
              <th className="px-3 py-3 font-semibold text-right text-amber-400">Total</th>
              <th className="px-3 py-3 font-semibold text-right">SM</th>
              <th className="px-3 py-3 font-semibold text-right">SW</th>
              <th className="px-3 py-3 font-semibold text-right">U17M</th>
              <th className="px-3 py-3 font-semibold text-right">U20W</th>
              <th className="px-3 py-3 font-semibold text-right">U15B</th>
              <th className="px-3 py-3 font-semibold text-right">U15G</th>
              <th className="px-3 py-3 font-semibold text-right">U13B</th>
              <th className="px-3 py-3 font-semibold text-right">U13G</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((t) => (
              <tr key={t.position} className="border-b border-slate-700/50 even:bg-slate-800/40 hover:bg-slate-700/60 transition-colors">
                <td className={`px-3 py-2.5 ${positionClass(t.position)}`}>{t.position}</td>
                <td className="px-3 py-2.5 font-medium text-slate-100">{t.club}</td>
                <td className="px-3 py-2.5 font-bold text-right text-amber-400">{t.total}</td>
                <td className="px-3 py-2.5 text-right text-slate-400">{t.SM || '–'}</td>
                <td className="px-3 py-2.5 text-right text-slate-400">{t.SW || '–'}</td>
                <td className="px-3 py-2.5 text-right text-slate-400">{t.U17M || '–'}</td>
                <td className="px-3 py-2.5 text-right text-slate-400">{t.U20W || '–'}</td>
                <td className="px-3 py-2.5 text-right text-slate-400">{t.U15B || '–'}</td>
                <td className="px-3 py-2.5 text-right text-slate-400">{t.U15G || '–'}</td>
                <td className="px-3 py-2.5 text-right text-slate-400">{t.U13B || '–'}</td>
                <td className="px-3 py-2.5 text-right text-slate-400">{t.U13G || '–'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Individual Results ─────────────────────────────────────────────────────────
function IndividualResults({ races }) {
  const raceNames = useMemo(() => races.map((r) => r.race), [races]);

  const [selectedRace, setSelectedRace] = useState(raceNames[0]);
  const [division, setDivision] = useState('');
  const [club, setClub] = useState('');
  const [athleteCategory, setAthleteCategory] = useState('');
  const [expanded, setExpanded] = useState(null);
  const isDesktop = useIsDesktop();

  const raceData = useMemo(() => races.find((r) => r.race === selectedRace), [selectedRace, races]);

  useEffect(() => {
    setDivision('');
    setClub('');
    setAthleteCategory('');
    setExpanded(null);
  }, [selectedRace]);

  const clubs = useMemo(() => {
    if (!raceData) return [];
    return [...new Set(raceData.results.map((r) => r.club).filter(Boolean))].sort();
  }, [raceData]);

  const athleteCategories = useMemo(() => {
    if (!raceData) return [];
    return [...new Set(raceData.results.map((r) => r.athleteCategory).filter(Boolean))].sort();
  }, [raceData]);

  const divisions = useMemo(() => {
    if (!raceData) return [];
    return [...new Set(raceData.results.map((r) => r.division).filter(Boolean))].sort();
  }, [raceData]);

  const filtered = useMemo(() => {
    if (!raceData) return [];
    return raceData.results.filter((r) => {
      if (division && r.division !== division) return false;
      if (club && r.club !== club) return false;
      if (athleteCategory && r.athleteCategory !== athleteCategory) return false;
      return true;
    });
  }, [raceData, division, club, athleteCategory]);

  const hasFilters = division || club || athleteCategory;

  function clearFilters() {
    setDivision('');
    setClub('');
    setAthleteCategory('');
  }

  function toggleExpanded(number) {
    setExpanded((prev) => (prev === number ? null : number));
  }

  const divisionOptions = [
    { value: '', label: 'All' },
    ...divisions.map((d) => ({ value: d, label: d })),
  ];

  return (
    <div>
      {/* Race selector */}
      <div className="mb-5 flex flex-wrap gap-2">
        {raceNames.map((name) => (
          <button
            key={name}
            onClick={() => setSelectedRace(name)}
            className={[
              'px-4 py-2 rounded-xl text-sm font-medium border transition-all',
              selectedRace === name
                ? 'bg-amber-500 text-slate-900 border-amber-500'
                : 'bg-slate-800 text-slate-400 border-slate-700 hover:border-amber-500/50 hover:text-slate-200',
            ].join(' ')}
          >
            {name}
          </button>
        ))}
      </div>

      {/* Filter bar */}
      <div className="mb-5 p-4 bg-slate-800 rounded-2xl border border-slate-700 shadow-lg">
        <div className="flex flex-col md:flex-row md:flex-wrap md:items-end gap-3 md:gap-4">
          <div className="flex flex-col gap-1.5">
            <FilterLabel>Division</FilterLabel>
            <ButtonGroup value={division} onChange={setDivision} options={divisionOptions} />
          </div>

          <FilterSelect label="Club / Team" value={club} onChange={setClub} options={clubs} />
          <FilterSelect label="Category" value={athleteCategory} onChange={setAthleteCategory} options={athleteCategories} />

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
        Showing <span className="font-semibold text-slate-300">{filtered.length}</span> of {raceData?.results.length ?? 0} entries
      </p>

      {/* Mobile: accordion */}
      {!isDesktop && (
        <div className="space-y-1">
          {filtered.map((r) => {
            const isOpen = expanded === r.number;
            return (
              <div key={r.number}>
                <button
                  onClick={() => toggleExpanded(r.number)}
                  className={[
                    'w-full flex items-center gap-3 px-3 py-2.5 bg-slate-800 border border-slate-700 text-left transition-colors hover:bg-slate-700',
                    isOpen ? 'rounded-t-lg' : 'rounded-lg',
                  ].join(' ')}
                >
                  <span className={`w-8 shrink-0 text-sm ${positionClass(r.position)}`}>{r.position}</span>
                  <span className="flex-1 text-sm font-medium text-slate-100 truncate">{r.name}</span>
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
                      <dd className="text-slate-200 font-medium">{r.athleteCategory}</dd>
                      <dt className="text-slate-500">Division</dt>
                      <dd className="text-slate-200">{r.division}</dd>
                      <dt className="text-slate-500">Div pos.</dt>
                      <dd className="text-slate-200">{r.divPosition}</dd>
                      <dt className="text-slate-500">Div pts.</dt>
                      <dd className="text-slate-200">{r.divPoints}</dd>
                      <dt className="text-slate-500">Race no.</dt>
                      <dd className="text-slate-200">{r.number}</dd>
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
                <th className="px-3 py-3 font-semibold">Div</th>
                <th className="px-3 py-3 font-semibold">Div Pos</th>
                <th className="px-3 py-3 font-semibold">Div Pts</th>
                <th className="px-3 py-3 font-semibold">No.</th>
                <th className="px-3 py-3 font-semibold">Name</th>
                <th className="px-3 py-3 font-semibold">Club / Team</th>
                <th className="px-3 py-3 font-semibold">Cat.</th>
                <th className="px-3 py-3 font-semibold">Time</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.number} className="border-b border-slate-700/50 even:bg-slate-800/40 hover:bg-slate-700/60 transition-colors">
                  <td className={`px-3 py-2.5 ${positionClass(r.position)}`}>{r.position}</td>
                  <td className="px-3 py-2.5 text-slate-500">{r.division}</td>
                  <td className="px-3 py-2.5 text-slate-500">{r.divPosition}</td>
                  <td className="px-3 py-2.5 text-slate-500">{r.divPoints}</td>
                  <td className="px-3 py-2.5 text-slate-600">{r.number}</td>
                  <td className="px-3 py-2.5 font-medium text-slate-100">{r.name}</td>
                  <td className="px-3 py-2.5 text-slate-400">{r.club ?? '–'}</td>
                  <td className="px-3 py-2.5 text-slate-400">{r.athleteCategory}</td>
                  <td className="px-3 py-2.5 tabular-nums font-semibold text-amber-400">{r.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────────
function CCL202526M5() {
  const { match, teamResults, races } = data;
  const [view, setView] = useState('teams');

  return (
    <section>
      <h1 className="text-3xl font-bold text-amber-400 mb-1">{match.name}</h1>
      <p className="text-slate-500 mb-6">
        {match.venue} &mdash;{' '}
        {new Date(match.date + 'T00:00:00').toLocaleDateString('en-GB', {
          weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
        })}
      </p>

      <div className="mb-6">
        <ButtonGroup
          value={view}
          onChange={setView}
          options={[
            { value: 'teams', label: 'Team Results' },
            { value: 'individual', label: 'Individual Results' },
          ]}
        />
      </div>

      {view === 'teams' && (
        <div>
          <TeamResultsTable teams={teamResults.div1} division="1" />
          <TeamResultsTable teams={teamResults.div2} division="2" />
        </div>
      )}

      {view === 'individual' && <IndividualResults races={races} />}
    </section>
  );
}

export default CCL202526M5;
