# Alexandr Azimov — portfolio

Personal portfolio: https://mrx-aid.github.io/

Static HTML, CSS and JavaScript. No build step, tracking or third-party runtime dependencies.

## Local preview

Serve the repository root using a static server, for example `python -m http.server 4173`.

## Files

- `index.html`: Russian content, projects, contacts and metadata.
- `style.css`: responsive design and reduced-motion support.
- `script.js`: mobile navigation and email copy button.
- `assets/`: real project screenshots, favicon and social preview.

To add another project, add its screenshot and duplicate a `.project` article. Update the project counter in the navigation. Keep title, link, alt text and description specific to the project.

## Publishing

GitHub Pages serves `main` from the repository root. `.nojekyll` disables Jekyll processing. Update the canonical URL, sitemap and robots file if the domain changes.

Project screenshots showcase the author's work. Brand assets belong to their respective owners.
