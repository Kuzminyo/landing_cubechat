# Download artifacts

Files served by the **Download** section. The iOS button links here with an HTML
`download` attribute, so a click saves the file instead of navigating.

| Button  | Source | Notes |
|---------|--------|-------|
| Android | `Kuzminyo/cubechat` release `apk-latest` | `cubechat-universal.apk`, built by CI on every green main. Not in this repo. |
| iOS     | `cubechat-ios-sideload.txt`               | Sideload guide (no signed .ipa is distributable). |

## Regenerate

Only the iOS guide lives here, and it is hand-written. The Android APK comes
from the app repository's `android.yml`, which upserts the rolling `apk-latest`
prerelease — nothing to copy by hand, and nothing to bump on a release.

If a versioned APK is ever wanted on the site instead of the rolling one, the
link is the thing to change (`ANDROID` in `src/components/Download.tsx`), not
this directory: `public/downloads/*.apk` is git-ignored, and the site is built
in CI from what is committed, so an APK dropped in here never reaches the
deploy. That is what used to make the Android button 404.
