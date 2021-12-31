import path from 'path';

import { getVersionCode } from '../../src/versions';
import * as stub from '../stub';

describe('getVersionCode', () => {
  it('throws when `expo.sdkVersion` is missing', () => {
    const manifest = stub.manifest();
    delete manifest.expo.sdkVersion;

    expect(() => getVersionCode(manifest, '1.0.0')).toThrowError(
      'Cannot determine which native SDK version'
    );
  });

  it('throws when `expo.sdkVersion` is malformed', () => {
    const manifest = stub.manifest();
    manifest.expo.sdkVersion = 'abc';

    expect(() => getVersionCode(manifest, '1.0.0')).toThrowError(
      'Could not parse the `expo.sdkVersion` from the manifest'
    );
  });

  it('throws when version is malformed', () => {
    expect(() => getVersionCode(stub.manifest(), 'abc')).toThrowError(
      'Could not parse the new version from standard version'
    );
  });

  it('returns 350101112 for sdk 35 and version 10.11.12', () => {
    const manifest = stub.manifest();
    manifest.expo.sdkVersion = '35.0.0';

    expect(getVersionCode(manifest, '10.11.12')).toBe(350101112);
  });

  it('returns 360010000 for sdk 36 and version 1.0.0', () => {
    const manifest = stub.manifest();
    manifest.expo.sdkVersion = '36.0.0';

    expect(getVersionCode(manifest, '1.0.0')).toBe(360010000);
  });

  it('returns 370030201 for sdk 37 and version 3.2.1 from package.json', () => {
    const manifest = stub.manifest();
    manifest.expo.nodeModulesPath = path.resolve(__dirname, './stubs');
    delete manifest.expo.sdkVersion;

    expect(getVersionCode(manifest, '3.2.1')).toBe(370030201);
  });
});
