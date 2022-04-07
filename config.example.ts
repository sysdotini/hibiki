const config: HibikiConfig = {
  hibiki: {
    token: "",
    locale: "en-GB",
    testGuildID: "",
    prefixes: [],
  },

  options: {},

  webserver: {
    baseURL: "http://127.0.0.1:4000",
    sessionSecret: "",
    clientID: "",
    clientSecret: "",
    callbackURI: "http://127.0.0.1:4000/auth/callback",
    port: 4000,
  },

  colours: {
    primary: "#648fff",
    secondary: "#785ef0",
    error: "#fe6100",
    success: "#dc267f",
    warning: "#ffb000",
    /*
    I really dont feel like explaining this.
    remove the type assignments and see for yourself. its annoying,
    and I hate typings surrounding strings with a passion. - Chen
    */
  } as unknown as HibikiColourOptions,

  database: {
    provider: "json",
  },
};

export default config;
