# Alexandr Azimov — portfolio

Personal portfolio: https://mrx-aid.github.io/

Static HTML, CSS and JavaScript. No build step, tracking or third-party runtime dependencies.

## Local preview

Serve the repository root using a static server, for example `python -m http.server 4173`.

## Files

- `index.html`: Russian content, projects, contacts and metadata.
- `space.css`: space-inspired responsive design, diagonal overlay and side panel.
- `layout.css`: fluid wide-screen composition, project preview and self-hosted typography.
- `script.js`: accessible portfolio dialog, project selection, automatic scenes, pausable particles and email copy button.
- `assets/`: real project screenshots, favicon and social preview.

To add another project, add its screenshot and duplicate a `.project` article. Update the project counter in the navigation. Keep title, link, alt text and description specific to the project.

## Publishing

GitHub Pages serves `main` from the repository root. `.nojekyll` disables Jekyll processing. Update the canonical URL, sitemap and robots file if the domain changes.

Project screenshots showcase the author's work. Brand assets belong to their respective owners.

Manrope and IBM Plex Mono are self-hosted from the Google Fonts repository. Their SIL Open Font License notices are included in `assets/fonts/`.

The space backgrounds were reused from the author's reference site https://alexnesss.github.io/ (img/slide-1.jpg, slide-2.jpg, slide-3.jpg). This repository does not grant any additional rights to those images. No legacy ESCL contacts or project claims were copied.
