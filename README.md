# Blue Ridge Plants · Plantas de la Blue Ridge

A bilingual (English and Spanish) phone field guide to 47 plants, mosses and lichens of Asheville, Boone and the Blue Ridge Parkway, written for a November 2026 visit. It merges four earlier guides and checks them against current sources.

## Files

| File | What it does |
| --- | --- |
| `index.html` | The whole site: pages, styles and code |
| `species.js` | The species data (edit text here) |
| `sw.js` | Offline support |
| `manifest.webmanifest`, `icon-*.png`, `apple-touch-icon.png` | Home screen app icon and name |

## Publish on GitHub Pages

1. Create a new public repository, for example `blue-ridge-plants`.
2. Choose **Add file > Upload files**, drag in all seven files, and commit to `main`.
3. Open **Settings > Pages**. Under **Build and deployment**, choose **Deploy from a branch**, branch `main`, folder `/ (root)`, and save.
4. After a minute or two the site is live at `https://<your-username>.github.io/blue-ridge-plants/`.

## Before the trip, on Wi-Fi

1. Open the site on your phone.
2. Go to **More > Save photos for offline use** and wait for it to finish (about 20 to 40 MB).
3. Add the site to your home screen: on iPhone, **Share > Add to Home Screen**; on Android, **menu > Install app**.

Offline use needs the https address; opening `index.html` directly from a file does not enable it.

## Photos

Photos load from Wikipedia and Wikimedia Commons (one lead image per species) and from research grade iNaturalist observations with Creative Commons licenses, preferring observations between Asheville and Boone made from October to December. Every photo links to its author and license.

## Your notes

Each species page has an "I saw this plant" box and a notes field. They are saved only on that phone. **Field kit > Download notes** exports them as a CSV file.
