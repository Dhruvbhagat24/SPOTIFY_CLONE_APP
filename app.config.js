module.exports = {
  expo: {
    name: "spotify-clone",
    slug: "spotify-clone",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    scheme: "acme",
    plugins: ["expo-router"],
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    web: {
      bundler: "metro",
      favicon: "./assets/favicon.png",
    },
    experiments: {
      typedRoutes: true,
    },
    extra: {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      router: {
        origin: false,
      },
      eas: {
        projectId: "33b0281a-b127-47fe-ab16-e94caf272493",
      },
    },
  },
};
