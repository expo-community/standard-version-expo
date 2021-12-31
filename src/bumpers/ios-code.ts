import { parse, serialize } from '../expo';
import { iosVersionReader } from '../helpers';
import { VersionWriter } from '../types';
import { getVersionCode } from '../versions';

/**
 * Read the manifest version from the `expo.ios.buildNumber` property.
 */
export const readVersion = iosVersionReader;

/**
 * Write the manifest version to the `expo.ios.buildNumber` property.
 * This uses the Android version code approach of Maxi Rosson.
 *
 * @see https://medium.com/@maxirosson/versioning-android-apps-d6ec171cfd82
 */
export const writeVersion: VersionWriter = (contents, version) => {
  const manifest = parse(contents);
  manifest.expo.ios = manifest.expo.ios || {};
  manifest.expo.ios.buildNumber = String(getVersionCode(manifest, version));

  return serialize(manifest, contents);
};
