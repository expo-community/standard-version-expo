import os from 'os';

import plist, { PlistObject } from 'plist';

import { VersionReader, VersionWriter } from '../../types';

const androidAppVersionRegex = /^(.+versionName +["']?)([^"']+)(["']?.*)$/;
const androidBuildnumRegex = /^(.+versionCode +["']?)([0-9]+)(["']?.*)$/;

const replaceMatchingLines = (contents: string, rx: RegExp, version: string): string => {
	// it's a PITA to make sure we insert it in the right place,
	// and it's always there in the generated android project,
	// so if we don't find it, throw an error.
	if (!findMatchingLine(contents, rx)) {
		let field;
		if (rx === androidAppVersionRegex) {
			field = 'versionName';
		} else if (rx === androidBuildnumRegex) {
			field = 'versionCode';
		} else {
			throw new Error('NOTREACHED');
		}
		throw new Error(`Could not find ${field} in build.gradle`)
	}

	return contents.split(os.EOL)
		.map(line => line.replace(rx, `$1${version}$3`))
		.join(os.EOL)
};

const findMatchingLine = (contents: string, rx: RegExp): string => {
	for (const line of contents.split(os.EOL)) {
		const match = line.match(rx);
		if (match) {
			return match[2];
		}
	}
	return '';
}

/**
 * The default android app version reader.
 * It reads the value from `android/app/build.gradle` and returns it as string.
 */
export const androidAppVersionReader: VersionReader = (contents) => (
	findMatchingLine(contents, androidAppVersionRegex)
);

/**
 * The default android buildnum reader.
 * It reads the value from `android/app/build.gradle` and returns it as string.
 */
export const androidBuildnumReader: VersionReader = (contents) => (
	findMatchingLine(contents, androidBuildnumRegex)
);


/**
 * The default android app version writer.
 * It replaces the value in the `android/app/build.gradle` contents and
 * returns the new contents as string.
 */
export const androidAppVersionWriter: VersionWriter = (contents, version) => (
	replaceMatchingLines(contents, androidAppVersionRegex, version)
);

/**
 * The default android buildnum writer.
 * It replaces the value in the `android/app/build.gradle` contents and
 * returns the new contents as string.
 */
export const androidBuildnumWriter: VersionWriter = (contents, version) => (
	replaceMatchingLines(contents, androidBuildnumRegex, version)
);

const iosReadVersion = (contents: string, key: string): string => (
	(plist.parse(contents) as PlistObject)[key] as string || ''
)

/**
 * The default ios app version reader.
 * It reads the value from `Info.plist` and returns it as string.
 */
export const iosAppVersionReader: VersionReader = (contents) => (
	iosReadVersion(contents, 'CFBundleShortVersionString')
);

/**
 * The default ios buildnum reader.
 * It reads the value from `Info.plist` and returns it as string.
 */
export const iosBuildnumReader: VersionReader = (contents) => (
	iosReadVersion(contents, 'CFBundleVersion')
);

const iosWriteVersion = (contents: string, key: string, value: string): string => (
	plist.build({
		...(plist.parse(contents) as PlistObject),
		[key]: value,
	})
)

/**
 * The default ios app version writer.
 * It replaces the value in the `Info.plist` contents and returns the new contents as string.
 */
export const iosAppVersionWriter: VersionWriter = (contents, version) => (
	iosWriteVersion(contents, 'CFBundleShortVersionString', version)
);

/**
 * The default ios buildnum writer.
 * It replaces the value in the `Info.plist` contents and returns the new contents as string.
 */
export const iosBuildnumWriter: VersionWriter = (contents, version) => (
	iosWriteVersion(contents, 'CFBundleVersion', version)
);
