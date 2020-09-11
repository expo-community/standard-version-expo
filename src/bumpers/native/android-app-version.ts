import { androidAppVersionReader, androidAppVersionWriter } from './helpers';

/**
 * Read the app version from the `versionName` build.gradle property.
 */
export const readVersion = androidAppVersionReader;

/**
 * Write the app version to the `versionName` build.gradle property.
 */
export const writeVersion = androidAppVersionWriter;
