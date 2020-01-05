import * as stub from '../stub';
import { readVersion, writeVersion } from '../../src/bumpers/android-increment';

describe('readVersion', () => {
	it('returns android version code from manifest', () => {
		expect(readVersion(stub.manifestRaw)).toBe(
			String(stub.manifest().expo.android!.versionCode)
		);
	});

	it('returns empty string by default', () => {
		const manifest = stub.manifest();
		delete manifest.expo.android;

		expect(readVersion(JSON.stringify(manifest))).toBe('');
	});
});

describe('writeVersion', () => {
	it('returns manifest with modified android version code', () => {
		const manifest = stub.manifest();
		manifest.expo.android!.versionCode = 5;
		const modified = writeVersion(JSON.stringify(manifest), '3.2.1');

		expect(readVersion(modified)).toBe('6');
	});

	it('returns manifest with added android version code', () => {
		const manifest = stub.manifest();
		delete manifest.expo.android;
		const modified = writeVersion(JSON.stringify(manifest), '1.2.3');

		expect(readVersion(modified)).toBe('1');
	});
});
