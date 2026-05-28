import defaultConfig from "./defaults/config.json"
import artistMap from "./defaults/artist_map.json"

let newPoniesSpawned = false;

const loadScript = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
        document.body.appendChild(script);
    });
};

async function waitWhile(conditionFn: () => boolean, interval = 100): Promise<void> {
    while (conditionFn()) {
        await new Promise((resolve) => setTimeout(resolve, interval));
    }
}

function spawnPoniesForTrack(track) {
	if(!track) return;
	BrowserPonies.unspawnAll();
	for(let artist of track.artists) {
		let name = artist.name.replace(/\s*\(.+?\)/, "");
		BrowserPonies.spawn(artistMap[name] || name);
	}
	newPoniesSpawned = true;
}

async function main() {
	await waitWhile(() => !Spicetify?.showNotification || !Spicetify?.Player || !document.body);

	Spicetify.showNotification("Loading ponies...")
	
	try {
		await loadScript(defaultConfig.basecfgLocation);
		await loadScript("https://browser.pony.house/js/browserponies.js");

		waitWhile(() => document.getElementsByClassName("main-loadingPage-container").length > 0, 1000);

		Spicetify.showNotification("Everypony is here!");

		(function (cfg) {
			BrowserPonies.setBaseUrl(cfg.baseurl);
			BrowserPonies.loadConfig(BrowserPoniesBaseConfig);
			BrowserPonies.loadConfig(cfg);
		})({
			baseurl: defaultConfig.baseUrl,
			allowDoubleClickControl: false,
			fadeDuration: 500,
			volume: 1,
			fps: 25,
			speed: 3,
			audioEnabled: false,
			dontSpeak: true,
			showFps: false,
			showLoadProgress: false,
			speakProbability: 0.1,
			spawn: {
			},
			autostart: true,
		});

		setInterval(() => {
			if(!newPoniesSpawned) return;
			for(let inst of BrowserPonies.api.getInstances()) {
				inst.img.style.pointerEvents = "none";
			}
			newPoniesSpawned = false;
		}, 5000);

		Spicetify.Player.addEventListener("songchange", (event) => {
            spawnPoniesForTrack(event.data.item);
        });

		spawnPoniesForTrack(Spicetify.Player.data.item || undefined);
	}catch (error) {
        console.error("[Spicetify Ponies] Failed to initialize:", error);
        Spicetify.showNotification("Failed to load ponies. Check console.", true);
    }

}

export default main;
main();
