# Spotify Clone (React Native)

This is a project, which will be a clone of Spotify (only Mobile support) - using real API.

# Quick preview

| PREV GIF 1 | PREV GIF 2 |
| ---------- | ---------- |

# Cloning the project

Clone the project simply by running:

```bash
git clone https://github.com/dhunanyan/spotify-clone.git
```

OR

```bash
git clone git@github.com:dhunanyan/spotify-clone.git
```

# How to install project dependencies?

Go to your terminal and run the following commands below in yhe root of your project:

```bash
cd ./spotify-clone
nvm use
yarn install
```

# How to run project?

To run project for IOS Device please run one of the following commands:

```bash
# if you have Apple Developer membership
yarn dev:ios

# if you DON'T have Apple Developer membership
yarn dev
```

To run project for Android Device please run the following command:

```bash
yarn dev:android
```

# How to open the app on real device

If you will be using a _real device_ in order to run the app, you should go to `App Store (IOS)` / `Google Play (Android)` and install `Expo Go` application.

After installing the app you should open up the camera of your phone and scan the QR code which will be generated in the terminal after your finish the previous step

# How to open the app on Native Simulator?

if you will be using Native Simulator, please download you simulator, setup the device you will be using.

Later on go to the terminal in which you run the app (the one with the QR code) and press:

- `"a"` - for Android Simulator
- `"i"` - for IOS Simulator
- `"w"` - to open up project in Web Browser (However unfortunately, there is no support for Web Browser :disappointed:)
