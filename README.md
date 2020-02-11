<div align="center">
    <h1>Standard Version Expo</h1>
    <p>Automatic <a href="https://github.com/expo/expo">Expo</a> versioning with <a href="https://github.com/conventional-changelog/standard-version">Standard Version</a></p>
    <sup>
        <a href="https://github.com/expo-community/standard-version-expo/releases">
            <img src="https://img.shields.io/github/release/expo-community/standard-version-expo/all.svg?style=flat-square" alt="releases" />
        </a>
        <a href="https://github.com/expo-community/standard-version-expo/actions">
            <img src="https://img.shields.io/github/workflow/status/expo-community/standard-version-expo/CI/master.svg?style=flat-square" alt="builds" />
        </a>
        <a href="https://dev.to/bycedric/simplify-expo-releases-with-standard-version-2f4o">
            <img src="https://img.shields.io/badge/guide-dev.to-lightgrey?style=flat-square" alt="guide" />
        </a>
    </sup>
    <br />
		<br />
    <br />
    <pre>npm i -D standard-version@next standard-version-expo</pre>
</div>

## What's inside?

Standard version is a tool to automate the versioning of your project using semver and [conventional commits][link-conventional].
This package includes some helpful bumpers to update the Expo manifest automatically.
With these bumpers you can automate updating the [`version`][link-expo-version], [Android `versionCode`][link-expo-android], and/or [iOS `buildNumber`][link-expo-ios].
You should be able to automate versioning of your app by using a single command, like:

```bash
$ npx standard-version --release-as minor
```

## Getting started

It's recommended to install both Standard Version and this package as `devDependency`.
You can do this with the npm command listed at the top of this read me.
After you installed the packages, we need to [configure Standard Version using any of the configuration methods listed here][link-standard-version].
Here is an example configuration that updates the version, Android `versionCode`, and iOS `buildNumber` using the recommended approaches.

```js
// .versionrc.js
module.exports = {
  bumpFiles: [
    {
      filename: 'package.json',
    },
    {
      filename: 'app.json',
      updater: require.resolve('standard-version-expo'),
    },
    {
      filename: 'app.json',
      updater: require.resolve('standard-version-expo/android'),
    },
    {
      filename: 'app.json',
      updater: require.resolve('standard-version-expo/ios'),
    }
  ]
};
```

To test if your configuration works as expected, you can run standard version in dry mode.
This shows you what will happen, without actually applying the versions and tags.

```bash
$ npx standard-version --dry-run
```

## Usage

Standard Version's version bumpers are pretty simple; each bump only updates a single file using a single updater.
This package exposes multiple kinds of updaters, for different areas of the manifest.
You can "compose" your own set of `bumpFiles` entries to suit your needs.

updater             | example      | description
---                 | ---          | ---
`<root>`            | `3.2.1`      | _alias of `manifest/version`_
`manifest`          | `3.2.1`      | _alias of `manifest/version`_
`manifest/version`  | `3.2.1`      | Replace `expo.version` with the exact calculated semver. (**recommended**)
`android`           | `360030201`  | _alias of `android/code`_
`android/code`      | `350010000`  | Replace `expo.android.versionCode` with the [method described by Maxi Rosson][link-version-code]. (**recommended**)
`android/increment` | `8`          | Replace `expo.android.versionCode` with an incremental version.
`ios`               | `3.2.1`      | _alias of `ios/version`_
`ios/code`          | `360030201`  | Replace `expo.ios.buildNumber` with the [method described by Maxi Rosson][link-version-code].
`ios/increment`     | `9`          | Replace `expo.ios.buildNumber` with an incremental version.
`ios/version`       | `3.2.1`      | Replace `expo.ios.buildNumber` with the exact calculated semver. (**recommended**)

### Version code

Semver is one of the most popular versioning methods; it generates a string with a syntax that even humans can read.
Unfortunately, in Android, we are limited to use a numeric `versionCode` as version.
The version code uses an approach from [Maxi Rosson][link-version-code] to calculate a numeric value from semver.
It's a deterministic solution that removes some of the ambiguity of incremental build numbers, like security-patching old versions.

> The method initially uses the Android minimum API level. For Expo, we replaced this with the major Expo SDK version.

<div align="center">
    <br />
    with :heart: <strong>byCedric</strong>
    <br />
</div>

[link-conventional]: https://www.conventionalcommits.org/en/v1.0.0/
[link-expo-android]: https://docs.expo.io/versions/latest/workflow/configuration#android
[link-expo-ios]: https://docs.expo.io/versions/latest/workflow/configuration#ios
[link-expo-version]: https://docs.expo.io/versions/latest/workflow/configuration#version
[link-standard-version]: https://github.com/conventional-changelog/standard-version#configuration
[link-version-code]: https://medium.com/@maxirosson/versioning-android-apps-d6ec171cfd82
