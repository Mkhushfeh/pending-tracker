# Pending Tracker

A self-contained project/pending-item tracker — pages, Working Table with Excel-style filters,
Gantt (plan vs. actual), Trend charts, Calendar with drag-to-reschedule, Weekly Summary reports,
and Excel export/import. Single HTML file, no build step, no server required.

## Deploy on GitHub Pages

1. In your existing repo (`mkhushfeh.github.io/pending-tracker`), replace the current `index.html`
   with the `index.html` in this download.
2. Commit and push to the branch GitHub Pages serves from (usually `main`).
3. Wait a minute or two, then visit your Pages URL — the updated app will be live.

## How saving works here

This version saves to **your browser's local storage** automatically — no publish step,
no Claude account needed, works the moment it's live on GitHub Pages. That's different
from the Claude-artifact version, which required a separate "storage" feature that wasn't
available in your setup.

**Important:** local storage is per-browser, per-device. It will NOT sync automatically
between your phone and your laptop, or between different browsers on the same device.

To move your data between devices/browsers:
1. On the device with your data: click **⬇ Export to Excel**.
2. Open the app on the other device/browser.
3. Click **⬆ Import from Excel** and pick that same file.

Use **🔬 Test Storage** any time to confirm local saving is working in your current browser.

## Files

- `index.html` — the whole app. This is the only file GitHub Pages needs to serve the site.
