module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "module:react-native-dotenv",

      // reanimated plugin has to be the last
      "react-native-reanimated/plugin",
    ],
  };
};
