# Download artifacts

What the **Download** section and the QR landing pages (`u.html`, `c1/`) link to.

| Button  | Source | Notes |
|---------|--------|-------|
| Android | release `apk-latest` of **this** repo, asset `cubechat.apk` | Universal APK mirrored from the app's CI. `ANDROID` in `Download.tsx`, and the two QR pages. |
| iOS     | App Store (`IOS` in `Download.tsx`)       | `u.html` and `c1/` link the same App Store page; `cubechat-ios-sideload.txt` is no longer linked. |

## Why the APK lives in a release here

`Kuzminyo/Cubechat` is private, so its own rolling `apk-latest` release answers
404 to visitors (2026-10-27). This repository is public, and a release asset's
URL — `releases/download/apk-latest/cubechat.apk` — stays the same when the
asset is replaced, so updating the APK needs no commit and no site deploy.

It is not in this directory: the site is built in CI from what is committed,
`public/downloads/*.apk` is git-ignored, and a ~190 MB file is over GitHub's
100 MB per-file limit anyway.

## Refresh to the latest build

The app's `android.yml` publishes every green main to its private `apk-latest`.
Copy its universal APK across:

```bash
gh release download apk-latest -R Kuzminyo/Cubechat -p cubechat-universal.apk -O cubechat.apk --clobber
gh release upload apk-latest cubechat.apk -R Kuzminyo/landing_cubechat --clobber
```

When the Play listing is live, put its URL in `ANDROID` and in the two QR pages
instead.
