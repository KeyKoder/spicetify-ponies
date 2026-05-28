import defaultConfig from "./defaults/config.json"

const loadScript = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
        document.body.appendChild(script);
    });
};

async function main() {
	while (!Spicetify?.Platform?.PlayerAPI || !Spicetify?.Keyboard || !document.body) {
		await new Promise((resolve) => setTimeout(resolve, 100));
	}

	Spicetify.showNotification("Loading ponies...")
	
	try {
		await loadScript(defaultConfig.basecfgLocation);
		await loadScript("https://browser.pony.house/js/browserponies.js");

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
				"derpy hooves": 1,
				"princess luna": 1
			},
			autostart: true,
		});

		Spicetify.Player.addEventListener("songchange", (event) => {
            BrowserPonies.unspawnAll();
			for(let artist of event.data.item.artists) {
				BrowserPonies.spawn(artist.name);
			}
        });
	}catch (error) {
        console.error("[Spicetify Ponies] Failed to initialize:", error);
        Spicetify.showNotification("Failed to load ponies. Check console.", true);
    }

}

export default main;
main();
