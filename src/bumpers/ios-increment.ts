import { parse, serialize } from '../expo';
import { iosVersionReader } from '../helpers';
import { VersionWriter } from '../types';

/**
 * Read the manifest version from the `expo.ios.buildNumber` property.
 */
export const readVersion = iosVersionReader;

/**
 * Write the manifest version to the `expo.ios.buildNumber` property.
 * This uses the an incremental approach, and ignores the provided version.
 */
export const writeVersion: VersionWriter = (contents, _version) => {
  const manifest = parse(contents);
  manifest.expo.ios = manifest.expo.ios || {};

  const buildNumber =
    manifest.expo.ios.buildNumber !== undefined ? Number(manifest.expo.ios.buildNumber) : 0;

  if (Number.isNaN(buildNumber)) {
    throw new Error('Could not parse number from `expo.ios.buildNumber`.');
  }

  manifest.expo.ios.buildNumber = String(buildNumber + 1);

  return serialize(manifest, contents);
};
