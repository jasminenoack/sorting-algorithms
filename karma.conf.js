var webpackConfig = require("./webpack.config.js");

module.exports = (config) => {
  let focusGlob = "*";
  if (process.env.npm_config_focus) {
    focusGlob = `*${process.env.npm_config_focus}*`;
  }

  config.set({
    frameworks: ["jasmine"],

    files: [
      "typescript/*.ts",
      "typescript/sorts/*.ts",
      "typescript/shuffles/*.ts",
      { pattern: `typescript/spec/**/${focusGlob}.ts`, watched: false },
    ],

    preprocessors: {
      "typescript/**/*.ts": ["webpack", "coverage"],
    },

    webpack: webpackConfig,

    reporters: ["spec", "coverage"],

    browsers: ["ChromeHeadless"],

    mime: {
      "text/x-typescript": ["ts"],
    },
  });

  const testPath = `typescript/spec/**/${focusGlob}.ts`;
  config.preprocessors[testPath] = ["webpack"];
};
