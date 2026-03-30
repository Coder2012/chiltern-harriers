function About() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-4xl font-bold text-amber-400 mb-3">How This Site Works</h1>
      <p className="text-slate-300 text-lg mb-8">
        From spreadsheets and PDFs to a fast, searchable results site — powered by AI.
      </p>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-slate-100 mb-3">The Problem</h2>
        <p className="text-slate-400 leading-relaxed">
          Race results for Chiltern Harriers events are published as Excel spreadsheets and PDFs.
          They're packed with data, but not exactly fun to browse on a phone — pinching, zooming,
          and scrolling sideways through a 200-row spreadsheet isn't anyone's idea of a good time.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-slate-100 mb-3">The Pipeline</h2>
        <p className="text-slate-400 leading-relaxed mb-4">
          Each set of results goes through a different extraction process depending on the source format:
        </p>
        <div className="space-y-4">
          <div className="bg-slate-800 border border-slate-700 rounded-xl px-5 py-4">
            <p className="text-xs font-bold text-amber-400/70 uppercase tracking-wider mb-1">
              Chiltern Cross Country League
            </p>
            <p className="text-slate-300 leading-relaxed">
              Match results are published as <span className="text-slate-100 font-medium">.xlsx</span> files
              with multiple sheets — one per age group, plus team scores. A Node.js script reads each
              workbook, normalises the column headers (which vary between matches), and outputs
              structured JSON that the front-end can consume directly.
            </p>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-xl px-5 py-4">
            <p className="text-xs font-bold text-amber-400/70 uppercase tracking-wider mb-1">
              Pednor 10
            </p>
            <p className="text-slate-300 leading-relaxed">
              The 2025 Pednor 10 results were published as a <span className="text-slate-100 font-medium">PDF</span>.
              Extracting tabular data from a PDF is notoriously fiddly — column alignment, merged cells,
              and inconsistent spacing all conspire against you. We used a parsing script to pull the
              text layer out and then transformed it into the same JSON shape as the league data.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-slate-100 mb-3">Built with Claude Code</h2>
        <p className="text-slate-400 leading-relaxed mb-4">
          The heavy lifting — writing the parsers, building the React components, debugging
          edge cases in the data, and designing the UI — was done with{' '}
          <a
            href="https://docs.anthropic.com/en/docs/claude-code/overview"
            target="_blank"
            rel="noopener noreferrer"
            className="text-amber-400 hover:text-amber-300 font-medium"
          >
            Claude Code
          </a>
          , Anthropic's agentic coding tool. Claude Code operates directly in the terminal, reading
          files, writing code, and running commands — acting as a pair-programming partner that can
          take on entire tasks end-to-end.
        </p>
        <p className="text-slate-400 leading-relaxed mb-4">
          From parsing messy spreadsheet data to laying out responsive Tailwind grids, Claude Code
          handled the bulk of the implementation while we focused on the what rather than the how.
        </p>
        <div className="bg-slate-800 border border-slate-700 rounded-xl px-5 py-4">
          <p className="text-sm font-semibold text-slate-200 mb-2">Interested in trying it?</p>
          <ul className="space-y-2 text-slate-400 text-sm">
            <li>
              <a
                href="https://docs.anthropic.com/en/docs/claude-code/overview"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:text-amber-300"
              >
                Claude Code Overview
              </a>
              {' — '}what it is and how it works
            </li>
            <li>
              <a
                href="https://docs.anthropic.com/en/docs/claude-code/getting-started"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:text-amber-300"
              >
                Getting Started Guide
              </a>
              {' — '}install and run your first session
            </li>
            <li>
              <a
                href="https://www.anthropic.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-amber-400 hover:text-amber-300"
              >
                Anthropic
              </a>
              {' — '}the company behind Claude
            </li>
          </ul>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold text-slate-100 mb-3">The Tech Stack</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { name: 'React 19', desc: 'UI framework' },
            { name: 'Vite', desc: 'Build tool' },
            { name: 'Tailwind CSS 4', desc: 'Styling' },
            { name: 'React Router 7', desc: 'Client-side routing' },
            { name: 'Netlify', desc: 'Hosting' },
            { name: 'Claude Code', desc: 'AI pair programmer' },
          ].map((item) => (
            <div
              key={item.name}
              className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3"
            >
              <p className="text-slate-100 font-medium text-sm">{item.name}</p>
              <p className="text-slate-500 text-xs">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default About;
