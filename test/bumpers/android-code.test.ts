import { readVersion, writeVersion } from '../../src/bumpers/android-code';
import { getVersionCode } from '../../src/versions';
import * as stub from '../stub';

describe('readVersion', () => {
  it('returns android version code from manifest', () => {
    expect(readVersion(stub.manifestRaw)).toBe(String(getVersionCode(stub.manifest(), '1.0.0')));
  });

  it('returns empty string by default', () => {
    const manifest = stub.manifest();
    delete manifest.expo.android;

    expect(readVersion(JSON.stringify(manifest))).toBe('');
  });
});

describe('writeVersion', () => {
  it('returns manifest with modified android version code', () => {
    const modified = writeVersion(stub.manifestRaw, '3.2.1');

    expect(readVersion(modified)).toBe('350030201');
  });

  it('returns manifest with added android version code', () => {
    const manifest = stub.manifest();
    delete manifest.expo.android;
    const modified = writeVersion(JSON.stringify(manifest), '1.2.3');

    expect(readVersion(modified)).toBe('350010203');
  });
});
