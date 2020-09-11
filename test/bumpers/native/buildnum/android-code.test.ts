import * as stub from '../../../stub';
import androidCodeBumper from '../../../../src/bumpers/native/buildnum/android-code';
import { getVersionCodeFromSdkVersion } from '../../../../src/versions';

describe('readVersion', () => {
	const sdkVersion = '37.0.0';
	const { readVersion } = androidCodeBumper(sdkVersion);

	it('returns android build number from build.gradle', () => {
		const version = '1.0.0';
		const buildnum = '370010000';
		const buildGradle = stub.androidBuildGradle(version, buildnum);

		expect(readVersion(buildGradle)).toBe(
			String(getVersionCodeFromSdkVersion(sdkVersion, version))
		);
	});

	it('returns empty string by default', () => {
		const buildGradle = stub.androidBuildGradle();
		expect(readVersion(buildGradle)).not.toBe('');

		const buildGradleNoBuildnum = buildGradle.replace(/\t+versionCode +[0-9]+/m, '');

		expect(readVersion(buildGradleNoBuildnum)).toBe('');
	});
});

describe('writeVersion', () => {
	const sdkVersion = '37.0.0';
	const { readVersion, writeVersion } = androidCodeBumper(sdkVersion);

	it('returns build.gradle with modified android build number', () => {
		const version = '3.2.1';
		const expectedBuildnum = '370030201';
		const buildGradle = stub.androidBuildGradle(version, '123');
		expect(readVersion(buildGradle)).not.toBe(expectedBuildnum);

		const modified = writeVersion(buildGradle, version);

		expect(readVersion(modified)).toBe(expectedBuildnum);
	});

	it('throws if android build number is missing', () => {
		const oldBuildnum = '370030201';
		const oldVersion = '3.2.1';
		const version = '1.2.3';

		const buildGradle = stub.androidBuildGradle(oldVersion, oldBuildnum);
		const buildGradleNoBuildnum = buildGradle.replace(/\t+versionCode +[0-9]+/m, '');

		expect(() => writeVersion(buildGradleNoBuildnum, version)).toThrow();
	});
});
