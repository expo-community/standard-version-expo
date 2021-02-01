import { iosBuildnumReader, iosBuildnumWriter } from '../helpers';
import { VersionWriter } from '../../../types';

/**
 * Read the buildnum stored at CFBundleVersion in the Info.plist.
 */
export const readVersion = iosBuildnumReader;

/**
 * Increment the buildnum stored at CFBundleVersion in the Info.plist.
 * This ignores the provided version.
 */
export const writeVersion: VersionWriter = (contents, _version) => {
	const buildNumStr = iosBuildnumReader(contents);
	const buildNumber = buildNumStr != ''
		? Number(buildNumStr)
		: 0;

	if (Number.isNaN(buildNumber)) {
		throw new Error('Could not parse number from `CFBundleVersion`.');
	}

	return iosBuildnumWriter(contents, String(buildNumber + 1));
};
