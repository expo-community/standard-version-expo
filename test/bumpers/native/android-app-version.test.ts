import * as stub from '../../stub';
import { readVersion, writeVersion } from '../../../src/bumpers/native/android-app-version';

describe('readVersion', () => {
	it('returns android app version from build.gradle', () => {
		const version = '4.2.1';
		const buildGradle = stub.androidBuildGradle(version);

		expect(readVersion(buildGradle)).toBe(version);
	});

	it('returns empty string by default', () => {
		const buildGradle = stub.androidBuildGradle();
		const buildGradleNoAppVersion = buildGradle.replace(/\t+versionName +[0-9.'"]+/m, '');

		expect(readVersion(buildGradleNoAppVersion)).toBe('');
	});
});

describe('writeVersion', () => {
	it('returns build.gradle with modified android app version', () => {
		const newVersion = '3.2.1';
		const buildGradle = stub.androidBuildGradle();
		expect(readVersion(buildGradle)).not.toBe(newVersion);

		const modified = writeVersion(buildGradle, newVersion);

		expect(readVersion(modified)).toBe(newVersion);
	});

	it('throws if android app version is missing', () => {
		const version = '1.2.3';
		const buildGradle = stub.androidBuildGradle();
		const buildGradleNoAppVersion = buildGradle.replace(/\t+versionName +[0-9.'"]+/m, '');

		expect(() => writeVersion(buildGradleNoAppVersion, version)).toThrow();
	});
});
