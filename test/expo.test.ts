import detectIndent from 'detect-indent';
import detectNewline from 'detect-newline';
import * as expo from '../src/expo';
import * as stub from './stub';

describe('parse', () => {
	it('throws when content is empty', () => {
		expect(expo.parse).toThrowError(
			'Manifest must include a JSON object'
		);
	});

	it('throws when expo property is missing', () => {
		expect(() => expo.parse('{}')).toThrowError(
			'Property \'expo\' in manifest is not an object'
		);
	});

	it('returns manifest from string', () => {
		expect(expo.parse(stub.manifestRaw)).toMatchObject(stub.manifest());
	});
});

describe('serialize', () => {
	it('returns string with default indent and newline', () => {
		const serialized = expo.serialize(stub.manifest());
		const { indent } = detectIndent(serialized);
		const newline = detectNewline(serialized);

		expect(indent).toMatch('  ');
		expect(newline).toMatch('\n');
	});

	it('returns string with tab indent', () => {
		const serialized = expo.serialize(stub.manifest(), stub.manifestRaw);
		const { indent } = detectIndent(serialized);

		expect(indent).toMatch('\t');
	});

	it('returns string with ending newline', () => {
		const serialized = expo.serialize(stub.manifest());
		const end = serialized[serialized.length - 1];

		expect(end).toBe('\n');
	});
});
