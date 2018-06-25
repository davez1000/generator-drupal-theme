const path = require('path');

const rootDir = path.resolve(__dirname, '..');

module.exports = {
  rootDir,
  srcDir: path.resolve(rootDir, 'src'),
  templatesDir: path.resolve(rootDir, 'templates'),
};
