# Maximum Continuity Assessment

A standalone single-page HTML tool for determining directions of maximum spatial continuity from drillhole data — for use in variogram modelling and grade estimation search ellipsoid setup.

## Features

- Multi-file import (Collar / Survey / Assay + optional interval files) **or** unified pre-desurveyed point file
- Desurveying — Minimum Curvature, Tangential, Balanced Tangential
- Length-weighted and bench compositing
- Cell declustering
- **Balanced cross-hole variography** with stratified pair-count equalisation (Fisher-Yates) to remove drill-pattern bias
- **Two-stage direction search** — azimuth from horizontal slices, dip from 3D cross-hole directional variograms
- **Two output modes** — Search Ellipsoid (orthogonal axes via cross-product) or Ranked Continuity (independent top-3)
- **Composite confidence scoring** — combines anisotropy ratio and drill-pattern separation angle (0–100 score)
- Variogram rose diagrams and plan-view grade visualisations per element
- Per-domain breakdown when a domain column is supplied

## Quick Start

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/maximum-continuity-assessment.git
cd maximum-continuity-assessment
```

### 2. Set up your credentials

```bash
cp credentials.example.js credentials.js
```

Open `credentials.js` and replace the placeholder passwords:

```js
const USERS = {
  "admin":          "your-secure-password",
  "Patrick Richards": "another-password"
};
```

> **`credentials.js` is listed in `.gitignore` and will never be committed.**

### 3. Open the app

Open `index.html` directly in your browser — no server required:

```
File → Open File → index.html
```

Or serve locally if you prefer:

```bash
npx serve .
# then open http://localhost:3000
```

---

## Input Data Formats

### Multi-file mode

| File | Required columns |
|------|-----------------|
| **Collar** | Hole ID, X (Easting), Y (Northing), Z (Elevation) |
| **Survey** | Hole ID, Depth, Dip, Azimuth |
| **Assay** | Hole ID, From, To, + grade columns |
| **Interval files** *(optional)* | Hole ID, From, To, + domain/lith columns |

All files must be **CSV** (comma-separated). Column names are auto-detected.

### Unified point file mode

A single **CSV or Excel (.xlsx)** file with one row per interval, pre-desurveyed:

| Required | Optional |
|----------|----------|
| Hole ID, X, Y, Z | From, To |
| | Grade columns (up to 5) |
| | Domain / lithology column |

---

## Credentials

`credentials.js` is **never committed to the repository**. Each person who clones the repo must create their own from the template:

```bash
cp credentials.example.js credentials.js
# then edit credentials.js with real passwords
```

Usernames are case-insensitive. Passwords are case-sensitive.

---

## Methodology

### 1 — Drill Pattern Bias Detection
PCA on collar locations identifies the dominant drill grid orientation. Continuity directions within ~15° of this axis are flagged as potentially artefactual.

### 2 — Balanced Cross-Hole Variography
- Elevation-slice height: adaptive (4× median composite length, clamped 20–100 m)
- Pair distances: adaptive (0.8–12× median collar spacing)
- Same-hole pairs **strictly excluded**
- Pair-count equalisation: **stratified random subsampling** (Fisher-Yates, seeded LCG) to 25th-percentile bin count — robust to outlier-dense bins
- Azimuth bins: 15° steps, 0–165°

### 3 — Cross-Hole 3D Dip Search
With the major azimuth fixed, directional 3D variograms are computed at dips −80° to 0° in 5° steps using only cross-hole pairs inside a 22.5° half-angle cone.

### 4 — Axis Assembly
- **Orthogonal mode**: semi-major fixed at major+90°, minor via cross-product (enforced orthogonality — directly usable as search ellipsoid parameters)
- **Ranked mode**: three independently-searched lowest-γ azimuths (not orthogonal — useful for exploring anisotropy structure)

### 5 — Confidence Scoring

| Component | Formula | Max |
|-----------|---------|-----|
| Anisotropy | 50 × clamp((γ\_ratio − 1) / 2, 0, 1) | 50 pts |
| Drill separation | 50 × clamp(sep / 45°, 0, 1) | 50 pts |
| Hard cap | sep < 15° → max score = 25 | — |

| Level | Score |
|-------|-------|
| **Reliable** | ≥ 60 |
| **Moderate** | 35–59 |
| **Suspect** | < 35 |

---

## File Structure

```
maximum-continuity-assessment/
├── index.html               # Main application (single file)
├── credentials.example.js   # Template — safe to commit
├── credentials.js           # Your passwords — gitignored, never committed
├── .gitignore
└── README.md
```

---

## License

Internal use. Do not redistribute without permission.
