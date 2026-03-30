import { Link } from 'react-router-dom';
import heroImage from '../assets/img/homepage_hero_desktop.png';

function Home() {
  return (
    <div>
      <div className="relative overflow-hidden rounded-xl aspect-[16/9] md:aspect-[21/9]">
        <img
          src={heroImage}
          alt="Chiltern Harriers"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      </div>
      <div className="mt-10">
        <h1 className="text-4xl font-bold text-amber-400 mb-3">Results Viewer</h1>
        <p className="text-slate-300 text-lg mb-4 max-w-2xl">
          Race results — without the spreadsheet.
        </p>
        <p className="text-slate-400 max-w-2xl leading-relaxed">
          Official results for Chiltern Harriers events are published as Excel files — great for data,
          not so great for a quick look on your phone. This site takes those spreadsheets and turns
          them into fast, filterable, mobile-friendly results pages.
        </p>
        <p className="mt-6">
          <Link to="/results" className="text-amber-400 hover:text-amber-300 font-semibold">
            View results &rarr;
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Home;
