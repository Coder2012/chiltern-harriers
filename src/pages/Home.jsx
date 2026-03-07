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
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <div className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-5 py-4">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Road Race</p>
            <p className="text-slate-100 font-semibold">Pednor 10</p>
            <p className="text-slate-400 text-sm">2025 results</p>
          </div>
          <div className="flex-1 bg-slate-800 border border-slate-700 rounded-xl px-5 py-4">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Cross Country</p>
            <p className="text-slate-100 font-semibold">Chiltern League 2025/26</p>
            <p className="text-slate-400 text-sm">Matches 1 – 5</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
