async function main() {
	while (!Spicetify?.Platform?.PlayerAPI || !Spicetify?.Keyboard) {
		await new Promise((resolve) => setTimeout(resolve, 100));
	}

	Spicetify.showNotification("Loading ponies...")
}

export default main;
main();
