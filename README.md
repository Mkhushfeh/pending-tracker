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

## Sticky Notes

A new tab for quick daily tasks and short-term to-dos that don't need the full task form —
just type and hit **+ Add note**. Click a note to mark it done (fades + strikes through), the ✕
in the corner deletes it. Colors and slight tilt are random per note, like real sticky notes.

## Projects

Everything now lives under **Project 1** by default (Tasks, Remaining Work, As-Built Drawing —
all your existing pages, unchanged). A new tab row above the pages lets you switch projects or
click **+ Project** to start a new one, which gets its own separate set of pages/tasks. Trend,
Primavera View, and Weekly Summary all scope to the currently selected project.

## Cloud connection status

The Google Drive button now lives in the main header, not tucked in the More menu — it's red and
gently pulsing when not connected, turns green once it is. Syncing is also now automatic: on
every save, and whenever the app opens after you've connected once before, it silently checks
Drive and pulls in whichever copy (local or cloud) is actually newer — no more manual "load from
Drive?" prompt interrupting you each time.

## Primavera View

A tab between Calendar and Working Table — shows every task across whichever pages you select,
laid out like a classic Primavera/MS Project Gantt: dense rows with Start date, Finish date, and
duration spelled out, plus a timeline bar per task.

Use **Include** to pick which pages feed the view, **Group by** to switch between page / task
group / flat list, and **Text size** to bump up the row text if it's too small to read at a
glance. The date ruler along the top now marks every week (not every two) and uses a larger font
than the rest of the app, since there's room for it.

## Mobile / iPhone

The header now stays clean on a phone: Search, Export, Import, and the theme toggle are always
visible; everything else (Save, Reload, Test Storage, Google Drive, Delete Data, brightness
slider) lives behind a **⋮ More** button. Touch targets are sized for a thumb, inputs use 16px
text so iOS doesn't auto-zoom on tap, and safe-area padding keeps content clear of the notch and
home indicator.

## Theme

Click the theme button in the header to toggle between **🌙 Dark** (Cool Blue) and **☀️ Light**
(Cool Light Gray). Next to it, a **brightness slider** lets you fine-tune how light or dark the
current theme's surfaces are — slide toward ☀ for a brighter/whiter look, toward ☾ for a more
muted/darker version of the same theme. It never goes fully black or fully white. Text and status
colors (red/green/amber/etc.) stay fixed for readability regardless of where the slider sits —
only backgrounds and panels shift. Both the theme and brightness position are remembered
per-browser.

**Contrast fix:** status colors (delayed/on-track/priority labels, etc.) now use different,
darker shades specifically on the Light theme — the original shades were tuned for dark
backgrounds and were hard to read on light ones. This is fixed everywhere those colors appear:
tables, charts, badges.

## Files

- `index.html` — the whole app
- `sw.js` — one-time fix for the stuck-old-version issue, upload alongside index.html
- `README.md` — this file
