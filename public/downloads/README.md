# Download artifacts

Files served by the **Download** section. The iOS button links here with an HTML
`download` attribute, so a click saves the file instead of navigating.

| Button  | Source | Notes |
|---------|--------|-------|
| Android | none for now | "Coming soon to Google Play" label, not a link: `Kuzminyo/cubechat` went private, so its `apk-latest` release answers 404 (2026-10-27). |
| iOS     | App Store (`IOS` in `Download.tsx`)       | `cubechat-ios-sideload.txt` is still linked from `u.html` and `c1/`. |

## Regenerate

Only the iOS guide lives here, and it is hand-written. The Android APK used to
come from the app repository's rolling `apk-latest` prerelease; a private
repository's release assets are not downloadable by visitors, so when the Play
listing is live, put its URL in `ANDROID` and in the two QR landing pages.

If a versioned APK is ever wanted on the site instead of the rolling one, the
link is the thing to change (`ANDROID` in `src/components/Download.tsx`), not
this directory: `public/downloads/*.apk` is git-ignored, and the site is built
in CI from what is committed, so an APK dropped in here never reaches the
deploy. That is what used to make the Android button 404.
