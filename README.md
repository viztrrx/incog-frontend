# Incognito Frontend

The UI half of [Incognito](https://github.com/titaniumnetwork-dev/Incognito-old), split out from the original monorepo. It is a static site: pages, styles, scripts and the games library. Proxying, the search gateway and suggestions come from the **incognito-backend** repo.

## Setup

1. Point the frontend at your backend in `static/config.js`:

   ```js
   window.INCOGNITO_CONFIG = {
       backend: 'https://your-backend.example.com',
   };
   ```

   Leave `backend` empty if a reverse proxy serves the backend on the same origin.

2. Build and run:

   ```sh
   npm run build   # renders pages into ./dist
   npm start       # builds, then serves ./dist on http://localhost:3000
   ```

No dependencies are needed (Node 16.7+). To deploy, upload `dist/` to any static host (Netlify, Vercel, GitHub Pages, Cloudflare Pages, nginx, …) with `npm run build` as the build command and `dist` as the output directory.

## Layout

| Path | Description |
| --- | --- |
| `template.html` | Shared page shell (header, footer, scripts) |
| `pages/` | Page bodies: home, settings, support, games, privacy |
| `gs.json` | Games list rendered into the games page |
| `static/` | CSS, JS, fonts, icons and games, copied as-is into `dist/` |
| `static/config.js` | Backend URL |
| `build.js` | Static site generator |
| `serve.js` | Local development server |

Appearance and search engine are saved in cookies and applied in the browser. The engine is sent to the backend with each search.

Game builds in `*.unityweb` files are stored with [Git LFS](https://git-lfs.com).
