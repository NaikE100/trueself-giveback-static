# TrueSelf-GiveBack

Simple static site with a minimal Python HTTP server for local development.

## Run locally (Windows)

1. Open PowerShell in this folder:
   - Path: `C:\Users\tiaan\OneDrive\Desktop\Unfiltered Ventures\Site code\Trueself\Project\TrueSelf-GiveBack\TrueSelf-GiveBack`
2. Start the server (any of the following):
   - `py -3 server.py`
   - or `python server.py`
3. Open the site in your browser:
   - `http://localhost:5000`

The server disables caching so changes to `index.html`, `css/style.css`, and `js/app.js` are reflected on refresh.

## Project structure

- `index.html` — main page
- `css/style.css` — styles
- `js/app.js` — client-side logic
- `images/` — assets
- `server.py` — local static server (port 5000)

## Deploy

Because this is a static site, you can deploy the contents of this folder to any static host (e.g., GitHub Pages, Netlify, Vercel). The `server.py` file is only for local development and is not required in production.