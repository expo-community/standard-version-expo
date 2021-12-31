import { parse } from './expo';
import { VersionReader } from './types';

/**
 * The default android version reader.
 * It reads the value from `expo.android.versionCode` and returns it as string.
 */
export const androidVersionReader: VersionReader = (contents) =>
  String(parse(contents).expo.android?.versionCode || '');

/**
 * The default ios version reader.
 * It reads the value from `expo.ios.buildNumber` and returns it as string.
 */
export const iosVersionReader: VersionReader = (contents) =>
  parse(contents).expo.ios?.buildNumber || '';
