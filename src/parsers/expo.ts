import { AppJSONConfig } from '@expo/config';
import jsonFile, { JSONObject } from '@expo/json-file';
import detectIndent from 'detect-indent';
import detectNewline from 'detect-newline';

import { VersionReader } from '../types';

const DEFAULT_INDENT = '  ';
const DEFAULT_NEWLINE = '\n';

/**
 * Parse and validate the manifest file, and return it as typed object.
 */
export function parse(contents: string): AppJSONConfig {
  let manifest: JSONObject | null;

  try {
    manifest = jsonFile.parseJsonString(contents, { json5: true });
  } catch {
    manifest = null;
  }

  if (manifest === null || typeof manifest !== 'object') {
    throw new Error('Manifest must include a JSON object.');
  }

  if (manifest.expo === null || typeof manifest.expo !== 'object') {
    throw new Error("Property 'expo' in manifest is not an object.");
  }

  return manifest as AppJSONConfig;
}

/**
 * Serialize the manifest content back to string.
 * This also accepts the raw content to detect the indentation and/or newline.
 */
export function serialize(manifest: AppJSONConfig, raw = ''): string {
  const indent = detectIndent(raw).indent || DEFAULT_INDENT;
  const newline = detectNewline(raw) || DEFAULT_NEWLINE;
  const json = JSON.stringify(manifest, null, indent);

  return json.replace(/\n/g, newline) + newline;
}

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
