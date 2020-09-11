import os from 'os';

import { AppJSONConfig } from '@expo/config';

/**
 * An example manifest as raw json string, for testing purposes.
 *
 * @see https://github.com/byCedric/use-expo/blob/master/example/app.json
 */
export const manifestRaw = `{
	"expo": {
		"name": "expo hooks",
		"description": "complementary hooks for expo",
		"slug": "use-expo",
		"privacy": "public",
		"sdkVersion": "35.0.0",
		"githubUrl": "https://github.com/bycedric/use-expo",
		"platforms": ["ios", "android", "web"],
		"version": "1.0.0",
		"android": {
			"versionCode": 350010000
		},
		"ios": {
			"buildNumber": "1.0.0"
		}
	}
}`;

/**
 * The example manifest, but parsed, for testing purposes.
 * It's a function that returns new objects to avoid mutating the original data.
 */
export const manifest = () => JSON.parse(manifestRaw) as AppJSONConfig;

/**
 * Minimal Info.plist from an iOS project, for testing purposes.
 */
export const iosInfoPlistRaw = `
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
	<key>CFBundleShortVersionString</key>
	<string>VERSION</string>
	<key>CFBundleVersion</key>
	<string>BUILDNUM</string>
</dict>
</plist>
`;

/**
 * Minimal app/build.gradle file from an Android project, for testing purposes.
 */
export const androidBuildGradleRaw = [
	'	android {',
	'		defaultConfig {',
	'			versionName "VERSION"',
	'			versionCode BUILDNUM',
	'		}',
	'	}',
	'',
].join(os.EOL);

type StubGenerator = (version?: string, buildnum?: string) => string;

const makeStubGenerator = (content: string): StubGenerator => (
	(version = '1.0.0', buildnum = '42') => (
		content
			.replace('VERSION', version)
			.replace('BUILDNUM', buildnum)
	)
);

/**
 * The example Info.plist, but cloned, for testing purposes.
 * It's a function that returns new objects to avoid mutating the original data.
 */
export const iosInfoPlist: StubGenerator = makeStubGenerator(iosInfoPlistRaw);

/**
 * The example app/build.gradle, but cloned, for testing purposes.
 * It's a function that returns new objects to avoid mutating the original data.
 */
export const androidBuildGradle: StubGenerator = makeStubGenerator(androidBuildGradleRaw);
