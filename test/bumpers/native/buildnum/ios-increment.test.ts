import plist, { PlistObject } from 'plist';

import * as stub from '../../../stub';
import { readVersion, writeVersion } from '../../../../src/bumpers/native/buildnum/ios-increment';

describe('readVersion', () => {
	it('returns ios build number from Info.plist', () => {
		const buildnum = '5';
		const infoPlist = stub.iosInfoPlist(undefined, buildnum);

		expect(readVersion(infoPlist)).toBe(buildnum);
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
	it('returns Info.plist with modified ios build number', () => {
		const buildnum = '5';
		const infoPlist = stub.iosInfoPlist(undefined, buildnum);

		const modified = writeVersion(infoPlist, 'ignored');
		expect(readVersion(modified)).toBe('6');
	});

	it('returns Info.plist with added ios build number', () => {
		const infoPlistStr = stub.iosInfoPlist();
		const infoPlist: PlistObject = plist.parse(infoPlistStr) as PlistObject;

		const writable = { ...infoPlist };
		delete writable.CFBundleVersion;

		const modified = writeVersion(plist.build(writable), 'ignored');

		expect(readVersion(modified)).toBe('1');
	});
});
