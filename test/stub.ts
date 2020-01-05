import { AppJSONConfig } from '@expo/config';

/**
 * An example manifest as raw json string, for testing purposes.
 *
 * @see https://github.com/byCedric/use-expo/blob/master/example/app.json
 */
export const manifestRaw = `{
	"expo": {
		"name": "expo hooks",
		"description": "complementary hooks for expo",
		"slug": "use-expo",
		"privacy": "public",
		"sdkVersion": "35.0.0",
		"githubUrl": "https://github.com/bycedric/use-expo",
		"platforms": ["ios", "android", "web"],
		"version": "1.0.0",
		"android": {
			"versionCode": 350010000
		},
		"ios": {
			"buildNumber": "1.0.0"
		}
	}
}`;

/**
 * The example manifest, but parsed, for testing purposes.
 * It's a function that returns new objects to avoid mutating the original data.
 */
export const manifest = () => JSON.parse(manifestRaw) as AppJSONConfig;
