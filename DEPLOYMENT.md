# Public Deployment Guide

## Option A — Netlify (recommended for static sites)
1. Create a new site on Netlify and connect your Git repo.
2. Build settings:
   - Build command: none
   - Publish directory: `.`
3. Add domain `trueself.co.za` in Netlify Domains.
4. Update DNS at your registrar:
   - Set `A` record to Netlify load balancer IP (shown by Netlify), or
   - Use Netlify name servers to delegate.
5. Force HTTPS and verify `https://trueself.co.za` loads.

## Option B — Vercel
1. Import the repo into Vercel, Framework preset: `Other`.
2. Output / public directory: `.`
3. Add custom domain `trueself.co.za` and follow DNS instructions.

## SEO & Caching
- `robots.txt` and `sitemap.xml` added at site root.
- `netlify.toml` applies immutable caching for versioned assets under `/css`, `/js`, and `/images`.
- HTML is sent with no-cache for quick content updates.

## Payments (PayFast)
- The embedded form posts to PayFast. Before public launch:
  - Confirm `merchant_id` and `merchant_key` are production values.
  - Configure success, cancel, and notify URLs if needed.
  - Verify pricing text matches actual allocation on the site.

## Local testing
```
# From this folder
py -3 server.py
# Open http://localhost:5000
```

## Structure
- `index.html` – landing and entry
- `rules.html` – competition rules (excludes cancer/stroke mentions)
- `css/`, `js/`, `images/` – static assets
- `server.py` – local only












