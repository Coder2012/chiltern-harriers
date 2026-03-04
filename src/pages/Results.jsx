import { Link } from 'react-router-dom';

function Results() {
  const races = [
    { id: 'pednor10-2025', label: 'Pednor 10 - 2025', path: '/results/pednor10-2025' },
    { id: 'ccl-202526-m1', label: 'Chiltern Cross Country League 2025/26 - Match 1', path: '/results/ccl-202526-m1' },
    { id: 'ccl-202526-m2', label: 'Chiltern Cross Country League 2025/26 - Match 2', path: '/results/ccl-202526-m2' },
    { id: 'ccl-202526-m3', label: 'Chiltern Cross Country League 2025/26 - Match 3', path: '/results/ccl-202526-m3' },
    { id: 'ccl-202526-m4', label: 'Chiltern Cross Country League 2025/26 - Match 4', path: '/results/ccl-202526-m4' },
    { id: 'ccl-202526-m5', label: 'Chiltern Cross Country League 2025/26 - Match 5', path: '/results/ccl-202526-m5' },
  ];

  return (
    <div>
      <h1 className="text-4xl font-bold text-amber-400 mb-8">Results</h1>
      <ul className="space-y-2">
        {races.map((race) => (
          <li key={race.id}>
            <Link
              to={race.path}
              className="block px-4 py-3 bg-slate-800 rounded-lg border border-slate-700 hover:border-amber-500/50 hover:bg-slate-700 font-medium text-slate-200 hover:text-amber-400 transition-all"
            >
              {race.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Results;
