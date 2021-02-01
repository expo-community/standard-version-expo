import plist, { PlistObject } from 'plist';

import * as stub from '../../stub';
import { readVersion, writeVersion } from '../../../src/bumpers/native/ios-app-version';

describe('readVersion', () => {
	it('returns ios app version from Info.plist', () => {
		const version = '4.2.1';
		const infoPlistStr = stub.iosInfoPlist(version);

		expect(readVersion(infoPlistStr)).toBe(version);
	});

	it('returns empty string by default', () => {
		const infoPlist: PlistObject = plist.parse(stub.iosInfoPlist()) as PlistObject;
		const writable = { ...infoPlist };
		delete writable.CFBundleShortVersionString;

		expect(readVersion(plist.build(writable))).toBe('');
	});
});

describe('writeVersion', () => {
	it('returns Info.plist with modified ios app version', () => {
		const newVersion = '3.2.1';
		const infoPlistStr = stub.iosInfoPlist();
		expect(readVersion(infoPlistStr)).not.toBe(newVersion);

		const modified = writeVersion(infoPlistStr, newVersion);

		expect(readVersion(modified)).toBe(newVersion);
	});

	it('returns Info.plist with added ios app version', () => {
		const version = '1.2.3';
		const infoPlist = plist.parse(stub.iosInfoPlist()) as PlistObject;
		const writable = { ...infoPlist };
		delete writable.CFBundleShortVersionString;
		expect(readVersion(plist.build(writable))).toBe('');

		const modified = writeVersion(plist.build(writable), version);

		expect(readVersion(modified)).toBe(version);
	});
});
