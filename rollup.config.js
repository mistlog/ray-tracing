import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import liveServer from 'live-server';
import svelte_draft from 'rollup-plugin-svelte-draft';
import { readdirSync } from 'fs';
import { resolve as resolvePath } from 'path';

//
const production = !process.env.ROLLUP_WATCH;

//
const mappings = [
	...readdirSync("./src/illustrations").filter(each => each.endsWith(".tsx")).map(each => {
		const name = each.replace(".tsx", "");
		return [`./illustrations/${name}`, `./docs/illustrations/${name}/build`];
	}),
	...readdirSync("./src/sections").map(each => [`./sections/${each}/section`, `./docs/illustrations/${each}/build`])
];

const config = mappings.map(each => getConfig(...each));
export default config;

function getConfig(entry, dist) {
	const jsFile = resolvePath(dist, "./bundle.js");
	const cssFile = resolvePath(dist, "./bundle.css");

	return {
		input: 'src/main.js',
		external: ['three','plotly.js'],
		output: {
			sourcemap: false,
			format: 'iife',
			name: 'app',
			file: jsFile,
			globals: {
				three: 'THREE',
				'plotly.js': 'Plotly'
			}
		},
		plugins: [
			{
				resolveId(source) {
					if (source === 'src/main.js') {
						return source; // this signals that rollup should not ask other plugins or check the file system to find this id
					}
					return null; // other ids should be handled as usually
				},
				load(id) {
					if (id === 'src/main.js') {
						return `
						import Demo from "${entry}";
	
						const app = new Demo({
							target: document.body
						});
						
						export default app;
					`
					}

					return null;
				}
			},
			svelte_draft({ include: ["./src/**/*.tsx", "./src/**/*.ts"] }),
			svelte({
				extensions: [".tsx", ".svelte"],
				exclude: "./src/**/*.js.tsx",
				dev: !production,

				// Separate CSS file is not supported during HMR (neither with Nollup
				// nor rollup-plugin-hot), so we just disable it when `hot` is true.
				css: css => {
					css.write(cssFile)
				}
			}),

			// If you have external dependencies installed from
			// npm, you'll most likely need these plugins. In
			// some cases you'll need additional configuration —
			// consult the documentation for details:
			// https://github.com/rollup/plugins/tree/master/packages/commonjs
			resolve({
				browser: true,
				dedupe: ['svelte']
			}),
			commonjs(),

			// In dev mode, call `npm run start` once
			// the bundle has been generated
			!production && serve(),

			// If we're building for production (npm run build
			// instead of npm run dev), minify
			production && terser()
		],
		watch: {
			clearScreen: false
		}
	}
}

function serve() {
	return {
		writeBundle() {
			if (!serve.started) {
				serve.started = true;

				const params = {
					port: 8080, // Set the server port. Defaults to 8080.
					host: "0.0.0.0", // Set the address to bind to. Defaults to 0.0.0.0 or process.env.IP.
					root: resolvePath(__dirname, "./docs"), // Set root directory that's being served. Defaults to cwd.
					open: true, // When false, it won't load your browser by default.
					ignore: 'src,script,docs/css,docs/js,docs/illustrations', // comma-separated string for paths to ignore
					// wait: 1000, // Waits for all changes, before reloading. Defaults to 0 sec.
					logLevel: 2 // 0 = errors only, 1 = some, 2 = lots
				};
				liveServer.start(params);
			}
		}
	};
}