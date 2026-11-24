# Notes for Claude

## Shipping changes
- When a requested change is finished, tested and pushed, open a pull request into `main`
  and merge it right away. Don't ask first: the owner has approved this for every change
  they request.

## Project
- `index.html` is the Pending Tracker. MK Space, the main app, is `mk-space/index.html`;
  `mk-space-v1/` is the older version.
- Each app is one self-contained HTML file with no build step, served by GitHub Pages.
- In MK Space, bump `APP_VERSION` with each change so installed copies load the update.
