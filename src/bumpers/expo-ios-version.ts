import { parse, serialize, iosVersionReader } from '../parsers/expo';
import { VersionWriter } from '../types';

/**
 * Read the manifest version from the `expo.ios.buildNumber` property.
 */
export const readVersion = iosVersionReader;

/**
 * Write the manifest version to the `expo.ios.buildNumber` property.
 */
export const writeVersion: VersionWriter = (contents, version) => {
  const manifest = parse(contents);
  manifest.expo.ios = manifest.expo.ios || {};
  manifest.expo.ios.buildNumber = version;

  return serialize(manifest, contents);
};
