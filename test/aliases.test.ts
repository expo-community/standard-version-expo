import globby from 'globby';

/* eslint-disable @typescript-eslint/no-var-requires */

describe('bumper aliases', () => {
	const aliases = globby.sync(['android/**/*', 'ios/**/*']);
	aliases.forEach(path => {
		describe(path, () => {
			it('is importable', () => {
				const bumperModule = require(`../${path}`);

				let bumper = bumperModule;
				if (bumperModule instanceof Function) {
					bumper = bumperModule('37.0.0');  // dummy SDK version
				}
				expect(bumper.readVersion).toBeInstanceOf(Function);
				expect(bumper.writeVersion).toBeInstanceOf(Function);
			});
		});
	})
});
