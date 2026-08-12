# Pending Tracker

A self-contained project/pending-item tracker — pages, Working Table with Excel-style filters,
Gantt (plan vs. actual), Trend charts, Calendar with drag-to-reschedule, Weekly Summary reports,
Excel export/import, and optional Google Drive sync. Single HTML file, no build step required.

## Deploy on GitHub Pages

1. Replace `index.html` (and `sw.js` — important, see below) in your repo with the versions here.
2. Commit and push.
3. Visit your Pages URL.

## `sw.js` — important, one-time fix

An earlier version of this project registered a service worker with a "cache forever" strategy,
which can make browsers keep showing an old version even after you update the file. The `sw.js`
in this download replaces it with one that automatically clears itself out. Upload it once and
the problem goes away permanently — no manual cache-clearing needed after that.

## How saving works

**Local save (always on):** the app auto-saves to the browser's own storage as you work. This is
per-browser/per-device — it won't sync between your phone and laptop by itself.

**Cross-device sync — two options:**

1. **Excel export/import** — click Export on one device, Import on another. Works immediately,
   no setup.
2. **Google Drive sync** — automatic, real-time-ish sync across all your devices once set up.
   Requires a one-time setup (below).

## Setting up Google Drive sync (optional, one-time)

1. Go to https://console.cloud.google.com/ and create a new project (or use an existing one).
2. In the sidebar, go to **APIs & Services → Library**, search for **Google Drive API**, and
   click **Enable**.
3. Go to **APIs & Services → OAuth consent screen**. Choose **External**, fill in the required
   fields (app name, your email), and save. You can leave it in "Testing" mode and add your own
   Google account under **Test users** — no need to publish it.
4. Go to **APIs & Services → Credentials → Create Credentials → OAuth client ID**.
   - Application type: **Web application**
   - Under **Authorized JavaScript origins**, add your GitHub Pages URL exactly, e.g.
     `https://mkhushfeh.github.io` (no trailing slash, no path)
   - Click **Create** — you'll get a **Client ID** ending in `.apps.googleusercontent.com`
5. Open `index.html`, find this line near the top of the `<script>` section:
   ```js
   const GOOGLE_CLIENT_ID = 'PASTE_YOUR_CLIENT_ID_HERE.apps.googleusercontent.com';
   ```
   Replace the placeholder with your real Client ID, keeping the quotes.
6. Commit and push the updated `index.html`.
7. On the live site, click **🔗 Connect Google Drive** and sign in. It'll ask permission for
   this app to manage files *it creates* (nothing else in your Drive is touched — that's what
   the `drive.file` scope means).

Once connected on two devices, each save also pushes to a single JSON file in your Drive named
`pending-tracker-data.json`. On first connect on a second device, it'll ask whether to load the
existing Drive data or push what's currently on that device — pick load on the second device to
pull in what the first device already saved.

**Note:** the Drive connection doesn't persist across closing the browser (you'll need to click
Connect again each session) — this keeps the setup simple and avoids storing long-lived tokens.

## Files

- `index.html` — the whole app
- `sw.js` — one-time fix for the stuck-old-version issue, upload alongside index.html
- `README.md` — this file
