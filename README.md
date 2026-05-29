# spicetify-ponies

Ponify your Spotify!

A small extension for Spicetify that brings the wonderful Browser Ponies to Spotify.


## Features & To-Do

- [x] Different ponies appear depending on the song playing
- [ ] Customizable pony sets that randomly appear when non-pony songs are playing


Also there's always the gigantic job of mapping ponies for every song the fandom has made thus far.


## Build & Installation

### Prerequisites

* npm

1. Clone the repository.
2. Install dependencies:
    ```bash
    npm install
    ```
3. Build the project:
    ```bash
    npm run build
    ```
4. Copy the output to your Spicetify Extensions folder:
    ```bash
    cp dist/spicetify-ponies.js ~/.config/spicetify/Extensions/
    ```
5. Apply the extension:
    ```bash
    spicetify config extensions spicetify-ponies.js
    spicetify apply
    ```

---

## Credits

This wouldn't have been possible without the work made by [panzi](https://github.com/panzi) on the original [Browser-Ponies](https://github.com/panzi/Browser-Ponies) repo 
and the revival/continuation work made by [JasminDreasond](https://github.com/JasminDreasond) on her [New-Browser-Ponies](https://github.com/Pony-House/New-Browser-Ponies) repo.
