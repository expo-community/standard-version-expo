import * as stub from '../stub';
import { readVersion, writeVersion } from '../../src/bumpers/ios-increment';

describe('readVersion', () => {
	it('returns ios build number from manifest', () => {
		const manifest = stub.manifest();
		manifest.expo.ios!.buildNumber = '5';

		expect(readVersion(JSON.stringify(manifest))).toBe('5');
	});

	it('returns empty string by default', () => {
		const manifest = stub.manifest();
		delete manifest.expo.ios;

		expect(readVersion(JSON.stringify(manifest))).toBe('');
	});
});

describe('writeVersion', () => {
	it('returns manifest with modified ios build number', () => {
		const manifest = stub.manifest();
		manifest.expo.ios!.buildNumber = '6';
		const modified = writeVersion(JSON.stringify(manifest), '3.2.1');

		expect(readVersion(modified)).toBe('7');
	});

	it('returns manifest with added ios build number', () => {
		const manifest = stub.manifest();
		delete manifest.expo.ios;
		const modified = writeVersion(JSON.stringify(manifest), '1.2.3');

		expect(readVersion(modified)).toBe('1');
	});
});
