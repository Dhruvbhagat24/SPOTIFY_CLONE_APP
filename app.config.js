import 'dotenv/config';

module.exports = {
  expo: {
    name: 'spotify-clone',
    slug: 'spotify-clone',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/logo.png',
    scheme: 'spotifyclone',
    plugins: ['expo-router'],
    splash: {
      image: './assets/images/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    web: {
      bundler: 'metro',
      favicon: './assets/images/logo.png',
    },
    experiments: {
      typedRoutes: true,
    },
    extra: {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      tokenKey: process.env.TOKEN_KEY || 'spotify_token',
      refreshTokenKey: process.env.REFRESH_TOKEN_KEY || 'spotify_refresh_token',
      expirationKey: process.env.EXPIRATION_KEY || 'spotify_expiration',
      authorizationEndpoint: process.env.AUTHORIZATION_ENDPOINT || 'https://accounts.spotify.com/authorize',
      tokenEndpoint: process.env.TOKEN_ENDPOINT || 'https://accounts.spotify.com/api/token',
      redirectUri: process.env.REDIRECT_URI || 'http://localhost:8081/callback',
      router: {
        origin: false,
      },
      eas: {
        projectId: '33b0281a-b127-47fe-ab16-e94caf272493',
      },
    },
  },
};
