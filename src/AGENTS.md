# Chiltern Harriers Results Site — Agent Guide

## Project Overview

Single-page React app displaying race results for Chiltern Harriers AC. Shows results from road races (e.g. Pednor 10) and Chiltern Cross Country League matches, with filtering, sorting, and responsive layouts.

Deployed on **Netlify**. The `public/_redirects` file ensures all routes fall back to `index.html` for client-side routing.

---

## Tech Stack

| Tool | Version | Purpose |
|------|---------|---------|
| React | 19 | UI library |
| React Router | 7 | Client-side routing |
| Vite | 7 | Dev server & bundler |
| Tailwind CSS | 4 | Styling |
| PostCSS + Autoprefixer | — | CSS processing |
| ESLint | 9 | Linting (flat config) |

ES modules throughout (`"type": "module"` in package.json).

---

## Commands

```bash
npm run dev      # Dev server at http://localhost:5173 (HMR enabled)
npm run build    # Production build → dist/
npm run preview  # Preview production build locally
npm run lint     # ESLint check
```

---

## Project Structure

```
src/
├── main.jsx                    # React DOM entry point
├── App.jsx                     # Router, navbar, mobile menu, route definitions
├── index.css                   # Tailwind base imports + global styles
├── pages/
│   ├── Home.jsx
│   ├── About.jsx
│   ├── Contact.jsx
│   ├── Results.jsx             # Results index (list of all races)
│   └── results/
│       ├── Pednor10-2025.jsx   # Road race results page
│       ├── CCL-202526-M1.jsx   # League match 1 results
│       ├── CCL-202526-M2.jsx
│       ├── CCL-202526-M3.jsx
│       ├── CCL-202526-M4.jsx
│       └── CCL-202526-M5.jsx
└── assets/
    ├── pednor10results2025.json
    └── chiltern_league/
        ├── match1/CCL-202526-M1.json
        ├── match2/CCL-202526-M2.json
        ├── match3/CCL-202526-M3.json
        ├── match4/CCL-202526-M4.json
        └── match5/CCL-202526-M5.json
```

---

## Architecture

### Routing
- `BrowserRouter` in `main.jsx`, routes defined in `App.jsx`
- `App.jsx` provides the persistent navbar and mobile overlay menu
- Each results page is its own route component

### Data
- Race results stored as **JSON files** in `src/assets/`
- Imported directly into page components — no API calls
- Categories and clubs are **derived dynamically** from the data, not hardcoded

### Responsive Layout Pattern
- **Mobile**: accordion/expandable rows
- **Desktop**: full sortable/filterable tables
- Custom hook `useIsDesktop()` drives the responsive switch

### State Management
- Local `useState` + `useMemo` in each results component
- `useMemo` used for filtering and sorting expensive computations
- No global state management library

### Styling
- Tailwind utility classes only (no custom CSS classes)
- **Dark theme**: `slate-950` background, `amber-400` accent
- Consistent filter UI: `FilterLabel`, `ButtonGroup`, `FilterSelect` components

---

## Data Formats

### Road Race (Pednor10 format)
```json
{
  "race": { "name": "...", "date": "YYYY-MM-DD", "organiser": "..." },
  "results": [
    {
      "position": 1,
      "menPosition": 1,
      "womenPosition": null,
      "relayPosition": null,
      "raceNumber": 223,
      "name": "LAST, First",
      "club": "Club Name",
      "category": "SM",
      "split": "28:46",
      "time": "0:57:28",
      "award": "1st Man"
    }
  ]
}
```

### Cross Country League (CCL format)
```json
{
  "match": { "name": "...", "venue": "...", "date": "YYYY-MM-DD" },
  "teamResults": {
    "div1": [ /* team standings with category breakdowns */ ],
    "div2": [ /* division 2 standings */ ]
  },
  "races": [
    {
      "race": "Race Name",
      "results": [
        {
          "position": 1,
          "number": 101,
          "name": "Athlete Name",
          "club": "Club Name",
          "athleteCategory": "SM",
          "division": "1",
          "divPosition": 1,
          "divPoints": 100,
          "time": "30:45"
        }
      ]
    }
  ]
}
```

---

## Adding New Results

### New Road Race
1. Add JSON data file to `src/assets/`
2. Create `src/pages/results/RaceName-YYYY.jsx` — model on `Pednor10-2025.jsx`
3. Add route in `App.jsx`
4. Add entry to the results list in `Results.jsx`

### New League Match
1. Add JSON to `src/assets/chiltern_league/matchN/`
2. Create `src/pages/results/CCL-YYYYYY-MN.jsx` — model on an existing CCL page
3. Add route in `App.jsx`
4. Add entry in `Results.jsx`

---

## Notes

- `tailwind.config.js` extends the default theme with Inter font
- Google Fonts (Inter) loaded in `index.html`
- ESLint uses flat config (`eslint.config.js`) with `react-hooks` and `react-refresh` plugins
- No test suite currently exists
