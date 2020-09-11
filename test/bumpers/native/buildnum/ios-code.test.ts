import plist, { PlistObject } from 'plist';

import * as stub from '../../../stub';
import iosCodeBumper from '../../../../src/bumpers/native/buildnum/ios-code';
import { getVersionCodeFromSdkVersion } from '../../../../src/versions';

describe('readVersion', () => {
	const sdkVersion = '37.0.0';
	const { readVersion } = iosCodeBumper(sdkVersion);

	it('returns ios build number from Info.plist', () => {
		const version = '1.0.0';
		const buildnum = '370010000';
		const infoPlist = stub.iosInfoPlist(version, buildnum);

		expect(readVersion(infoPlist)).toBe(
			String(getVersionCodeFromSdkVersion(sdkVersion, version))
		);
	});

	it('returns empty string by default', () => {
		const infoPlistStr = stub.iosInfoPlist();
		const infoPlist: PlistObject = plist.parse(infoPlistStr) as PlistObject;
		expect(readVersion(infoPlistStr)).not.toBe('');

		const writable = { ...infoPlist };
		delete writable.CFBundleVersion;

		expect(readVersion(plist.build(writable))).toBe('');
	});
});

describe('writeVersion', () => {
	const sdkVersion = '37.0.0';
	const { readVersion, writeVersion } = iosCodeBumper(sdkVersion);

	it('returns Info.plist with modified ios build number', () => {
		const version = '3.2.1';
		const expectedBuildnum = '370030201';
		const infoPlistStr = stub.iosInfoPlist(version, '123');
		expect(readVersion(infoPlistStr)).not.toBe(expectedBuildnum);

		const modified = writeVersion(infoPlistStr, version);

		expect(readVersion(modified)).toBe(expectedBuildnum);
	});

	it('returns Info.plist with added ios build number', () => {
		const oldBuildnum = '370030201';
		const oldVersion = '3.2.1';
		const version = '1.2.3';
		const newBuildnum = '370010203';

		const infoPlistStr = stub.iosInfoPlist(oldVersion, oldBuildnum);
		const infoPlist: PlistObject = plist.parse(infoPlistStr) as PlistObject;

		const writable = { ...infoPlist };
		delete writable.CFBundleVersion;

		const modified = writeVersion(plist.build(writable), version);

		expect(readVersion(modified)).toBe(newBuildnum);
	});
});
