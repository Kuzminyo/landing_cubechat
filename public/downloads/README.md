# Download artifacts

Files served by the **Download** section. The Download buttons link here with
an HTML `download` attribute, so a click saves the file instead of navigating.

| Button  | File                          | Notes |
|---------|-------------------------------|-------|
| Android | `cubechat-0.1.0.apk`          | Real release build. **Git-ignored** (56 MB) — regenerate, see below. |
| iOS     | `cubechat-ios-sideload.txt`   | Sideload guide (no signed .ipa is distributable). |
| Source  | `cubechat-0.1.0-source.zip`   | Source snapshot (lib/test/tool/assets + manifests). |

## Regenerate

Both artifacts are built from the **app** repository (`Kuzminyo/cubechat`) and
written into this one — the site and the app live in separate repositories, so
these are the one place the two still meet. Paths below assume the app repo and
this repo are checked out side by side.

```bash
# Android APK — from the app repo root
flutter build apk --release
cp build/app/outputs/flutter-apk/app-release.apk ../landing/public/downloads/cubechat-0.1.0.apk
```

```powershell
# Source zip — from the app repo root
Compress-Archive -Path lib,test,tool,assets,pubspec.yaml,pubspec.lock,README.md,analysis_options.yaml,l10n.yaml,devtools_options.yaml `
  -DestinationPath ..\landing\public\downloads\cubechat-0.1.0-source.zip -Force
```

Bump the version in the filenames **and** in `src/components/Download.tsx`
(`ANDROID` / `SOURCE` constants) together.

## The APK is not on the live site

`public/downloads/*.apk` is git-ignored, and the site is built in CI from what
is committed — so the Android button 404s on cubechat.tech no matter how many
times the APK is regenerated locally. Committing 56 MB to make it work is the
wrong trade. The app repo's `android.yml` already publishes a rolling
`apk-latest` prerelease with a direct download link; pointing `ANDROID` at that
release URL fixes the button without putting a binary in git.
