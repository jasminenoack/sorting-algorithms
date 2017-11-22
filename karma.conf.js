var webpackConfig = require("./webpack.config.js");

module.exports = (config) => {
  let focusGlob = "*";
  if (process.env.npm_config_focus) {
    focusGlob = `*${process.env.npm_config_focus}*`;
  }

  config.set({
    frameworks: ["jasmine"],

    files: [
      "src/*.ts",
      "src/sorts/*.ts",
      "src/shuffles/*.ts",
      { pattern: `spec/**/${focusGlob}.ts`, watched: false },
    ],

    preprocessors: {
      "src/**/*.ts": ["webpack", "coverage"],
    },

    webpack: webpackConfig,

    reporters: ["spec", "coverage"],

    browsers: ["ChromeHeadless"],

    mime: {
      "text/x-typescript": ["ts"],
    },
  });

  const testPath = `spec/**/${focusGlob}.ts`;
  config.preprocessors[testPath] = ["webpack"];
};
