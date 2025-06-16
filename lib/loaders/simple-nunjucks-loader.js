const nunjucks = require('nunjucks');
const path = require('path');
const slash = require('slash');

module.exports = function(source) {
  this.cacheable && this.cacheable();

  const name = slash(path.relative(this.rootContext || this.context, this.resourcePath));
  let compiled = nunjucks.precompileString(source, { name });
  compiled = compiled.replace(/window\.nunjucksPrecompiled/g, 'nunjucks.nunjucksPrecompiled');

  const templateReg = /env\.getTemplate\(\"(.*?)\"/g;
  let match;
  const required = {};

  let output = '';
  output += 'var nunjucks = require("nunjucks/browser/nunjucks-slim");\n';
  output += 'var env = nunjucks.currentEnv || (nunjucks.currentEnv = new nunjucks.Environment([]));\n';
  output += 'var dependencies = nunjucks.webpackDependencies || (nunjucks.webpackDependencies = {});\n';
  output += 'var shim = require("' + slash(path.resolve(__dirname, "./runtime-shim")) + '");\n';

  while ((match = templateReg.exec(compiled))) {
    const ref = match[1];
    if (!required[ref]) {
      output += 'dependencies["' + ref + '"] = require("' + ref + '");\n';
      required[ref] = true;
    }
  }

  output += compiled + '\n';
  output += 'module.exports = shim(nunjucks, env, nunjucks.nunjucksPrecompiled["' + name + '"], dependencies);';

  return output;
};
