import * as stub from './stub';
import { getVersionCode } from '../src/versions';

describe('getVersionCode', () => {
	it('throws when `expo.sdkVersion` is missing', () => {
		const manifest = stub.manifest();
		delete manifest.expo.sdkVersion;

		expect(() => getVersionCode(manifest, '1.0.0')).toThrowError(
			'Manifest must include `expo.sdkVersion`',
		);
	});

	it('throws when `expo.sdkVersion` is malformed', () => {
		const manifest = stub.manifest();
		manifest.expo.sdkVersion = 'abc';

		expect(() => getVersionCode(manifest, '1.0.0')).toThrowError(
			'Could not parse the `expo.sdkVersion` from the manifest',
		);
	});

	it('throws when version is malformed', () => {
		expect(() => getVersionCode(stub.manifest(), 'abc')).toThrowError(
			'Could not parse the new version from standard version',
		);
	});

	it('returns 360010000 for sdk 36 and version 1.0.0', () => {
		const manifest = stub.manifest();
		manifest.expo.sdkVersion = '36.0.0';

		expect(getVersionCode(manifest, '1.0.0')).toBe(360010000);
	});

	it('returns 350101112 for sdk 35 and version 10.11.12', () => {
		const manifest = stub.manifest();
		manifest.expo.sdkVersion = '35.0.0';

		expect(getVersionCode(manifest, '10.11.12')).toBe(350101112);
	});
});
