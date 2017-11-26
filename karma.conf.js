var webpackConfig = require("./webpack.test.js");

module.exports = (config) => {
  let focusGlob = "*";
  if (process.env.npm_config_focus) {
    focusGlob = `*${process.env.npm_config_focus}*`;
  }

  config.set({
    frameworks: ["jasmine"],

    files: [
      { pattern: `src/${focusGlob}.ts`, watched: false },
      { pattern: `src/**/${focusGlob}.ts`, watched: false },
      { pattern: `spec/**/${focusGlob}.ts`, watched: false },
    ],

    preprocessors: {
      "src/**/*.ts": ["webpack"],
    },

    webpack: webpackConfig,

    reporters: ["mocha", "coverage-istanbul"],

    browsers: ["ChromeHeadless"],

    coverageIstanbulReporter: {
      fixWebpackSourcePaths: true,
      reports: ["html", "lcovonly"],
      skipFilesWithNoCoverage: false,
    },

    mime: {
      "text/x-typescript": ["ts"],
    },
  });

  const testPath = `spec/**/${focusGlob}.ts`;
  config.preprocessors[testPath] = ["webpack"];
};
