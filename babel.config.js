module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      // reanimated plugin has to be the last
      "react-native-reanimated/plugin",
    ],
  };
};
