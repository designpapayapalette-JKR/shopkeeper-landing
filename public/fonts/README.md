# Gilroy font files

Free-tier Gilroy (Radomir Tinkov) — see `Gilroy-EULA.pdf` for license terms.
Personal and commercial use, web embedding via `@font-face`, and embedding
in software/apps are all explicitly permitted (no redistribution of the
raw font files as a standalone product).

Only 2 weights are available in the free tier:
- `Gilroy-Light.otf` (weight 300)
- `Gilroy-ExtraBold.otf` (weight 800)

`@font-face` in `src/app/globals.css` declares these at their real
weights; the browser's standard CSS font-weight matching fills in
everything else (≤400 → Light, ≥500 → ExtraBold — see the comment there).
The full weight family (Regular/Medium/SemiBold/Bold) requires the paid
Gilroy license if finer-grained weights are ever needed.
