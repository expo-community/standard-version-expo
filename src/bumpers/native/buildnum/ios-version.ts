import { iosBuildnumReader, iosBuildnumWriter } from '../helpers';

/**
 * Read the build version stored at CFBundleVersion in the Info.plist.
 */
export const readVersion = iosBuildnumReader;

/**
 * Write the manifest version at CFBundleVersion in the Info.plist.
 */
export const writeVersion = iosBuildnumWriter;
