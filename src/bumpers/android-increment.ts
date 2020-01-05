import { parse, serialize } from '../expo';
import { androidVersionReader } from '../helpers';
import { VersionWriter } from '../types';

/**
 * Read the manifest version from the `expo.android.versionCode` property.
 */
export const readVersion = androidVersionReader;

/**
 * Write the manifest version to the `expo.android.versionCode` property.
 * This uses the an incremental approach, and ignores the provided version.
 */
export const writeVersion: VersionWriter = (contents, _version) => {
	const manifest = parse(contents);
	manifest.expo.android = manifest.expo.android || {};
	manifest.expo.android.versionCode = (manifest.expo.android.versionCode || 0) + 1;

	return serialize(manifest, contents);
};
