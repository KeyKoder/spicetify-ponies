const esbuild = require('esbuild');
const fs = require('fs/promises');
const path = require('path');
const os = require('os');

const extFileName = "spicetify-ponies.js";

function getSpicetifyExtensionsDir() {
	try {
		const raw = execSync('spicetify path userdata', { encoding: 'utf-8' }).trim()
		return path.join(raw, 'Extensions')
	} catch {
		const platform = process.platform
		if (platform === 'win32') {
			return path.join(process.env.APPDATA ?? homedir(), 'spicetify', 'Extensions')
		}
		if (platform === 'darwin') {
			return path.join(homedir(), 'Library', 'Application Support', 'spicetify', 'Extensions')
		}
		return path.join(homedir(), '.config', 'spicetify', 'Extensions')
	}
}

const spicetifyCopyPlugin = {
    name: 'spicetify-copy',
    setup(build) {
        build.onEnd(async (result) => {
            if (result.errors.length > 0) {
                console.error('[spicetify] Build failed. Skipping copy.');
                return;
            }

            const extDir = getSpicetifyExtensionsDir();
            const extDest = path.join(extDir, extFileName);

            console.log(`[spicetify] Updated extensions at ${new Date().toLocaleTimeString()}`);
            
            try {
                await fs.mkdir(extDir, { recursive: true });
                await fs.copyFile(path.join("dist/", extFileName), extDest);
                console.log(`[spicetify] Copied -> ${extDest}`);
            } catch (err) {
                console.error('[spicetify] Copy failed:', err);
            }
        });
    },
};


const isWatchMode = process.argv.includes('--watch');

const buildOptions = {
    entryPoints: ['src/app.ts'],
    outfile: path.join(process.cwd(), 'dist', extFileName),
    bundle: true,
    format: 'iife',
    minify: false,
    plugins: [spicetifyCopyPlugin],
};

async function runBuild() {
    try {
        if (isWatchMode) {
            const ctx = await esbuild.context(buildOptions);
            await ctx.watch();
        } else {await esbuild.build(buildOptions);
            console.log('Extension built successfully!');
        }
    } catch (err) {
        console.error('Build failed:', err);
        process.exit(1);
    }
}

runBuild();