import { androidBuildnumReader, androidBuildnumWriter } from '../helpers';
import { getVersionCodeFromSdkVersion } from '../../../versions';

/**
 * Since a standard-version bumper only receives the contents of a single file,
 * we add a layer of indirection here and ask the user to supply the sdkVersion
 * directly. Note that they can choose to pull this from app.json, or even supply
 * the Android min SDK version if they're not using Expo.
 * 
 * Configuration example in .versionrc.js:
 *
 *     const sdkVersion = '37.0.0';  // or pull from app.json
 *     module.exports = [
 *         ...
 *         {
 *             filename: 'android/app/build.gradle',
 *             updater: require.resolve('standard-version-expo/android/native/code')(sdkVersion),
 *         },
 *         ...
 *     ];
 *
 * This does add the requirement that they use .versionrc.js, not the other formats.
 */
export default (sdkVersion: string) => ({
	/**
	 * Read the build code from the `versionCode` property.
	 */
	readVersion: androidBuildnumReader,

	/**
	 * Write the manifest version to the `versionCode` property.
	 * This uses the Android version code approach of Maxi Rosson.
	 *
	 * @see https://medium.com/@maxirosson/versioning-android-apps-d6ec171cfd82
	 */
	writeVersion: (contents: string, version: string) => androidBuildnumWriter(
		contents,
		String(
			getVersionCodeFromSdkVersion(sdkVersion, version),
		),
	),
});
