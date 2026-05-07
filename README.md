# Imran Ullah Portfolio

Modern static portfolio for **Imran Ullah (Web Developer & 3D Artist)**.

## Run locally
Because this is a static GitHub Pages site, you can serve it with any static server.

### Option 1: Python
```bash
python3 -m http.server 8080
```
Then open `http://localhost:8080`.

### Option 2: VS Code Live Server
Open the folder in VS Code and run **Live Server** on `index.html`.

## Customize content
Main files:
- `index.html`: section layout and semantic structure
- `style.css`: theme variables, responsive styles, and animations
- `script.js`: dynamic content, theme persistence, nav highlighting, and contact behavior

Update portfolio entries in:
- `projectData` array in `script.js`
- `artworkData` array in `script.js`

Update links in:
- Hero social links in `index.html`
- Contact email in `index.html` and `script.js`

## Deploy (GitHub Pages)
1. Push changes to the repository.
2. In GitHub, ensure **Pages** is enabled for the repository.
3. Site is served as a static page and supports repository-relative assets.
