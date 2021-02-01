import { iosAppVersionReader, iosAppVersionWriter } from './helpers';

/**
 * Read the app version from the `CFBundleShortVersionString` Info.plist property.
 */
export const readVersion = iosAppVersionReader;

/**
 * Write the app version to the `CFBundleShortVersionString` Info.plist property.
 */
export const writeVersion = iosAppVersionWriter;
