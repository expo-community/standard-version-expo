import * as stub from '../stub';
import { getVersionCode } from '../../src/versions';
import { readVersion, writeVersion } from '../../src/bumpers/ios-code';

describe('readVersion', () => {
	it('returns ios build number from manifest', () => {
		const manifest = stub.manifest();
		manifest.expo.ios!.buildNumber = '350010000';

		expect(readVersion(JSON.stringify(manifest))).toBe(
			String(getVersionCode(stub.manifest(), '1.0.0'))
		);
	});

	it('returns empty string by default', () => {
		const manifest = stub.manifest();
		delete manifest.expo.ios;

		expect(readVersion(JSON.stringify(manifest))).toBe('');
	});
});

describe('writeVersion', () => {
	it('returns manifest with modified ios build number', () => {
		const modified = writeVersion(stub.manifestRaw, '3.2.1');

		expect(readVersion(modified)).toBe('350030201');
	});

	it('returns manifest with added ios build number', () => {
		const manifest = stub.manifest();
		delete manifest.expo.ios;
		const modified = writeVersion(JSON.stringify(manifest), '1.2.3');

		expect(readVersion(modified)).toBe('350010203');
	});
});
