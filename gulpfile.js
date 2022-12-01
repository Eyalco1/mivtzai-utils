const { task, series } = require('gulp');
const exec = require('child_process').exec;
const { join } = require('path');
const fs = require('fs');
const pkg = require('./package.json');
const jsxbin = require('jsxbin');
const exeFolder = 
  'C:\\Program Files\\Adobe\\Adobe After Effects 2022\\Support Files\\AfterFX.exe';
const scriptFolder = 
  'C:\\Program Files\\Adobe\\Adobe After Effects 2022\\Support Files\\Scripts\\ScriptUI Panels';
const headerStr =
  `/**\n` +
  ` * @name ${pkg.name}\n` +
  ` * @description ${pkg.description}\n` +
  ` * @version ${pkg.version}\n` +
  ` * @author ${pkg.author}\n` +
  ` * @license ${pkg.license}\n` +
  ` */\n\n`;

const executeScript = (absFilePath, callback) => {
  const shellCommand = `"${exeFolder}" -r ` + absFilePath;
  exec(shellCommand, callback);
};

task('createHeader', done => {
  const read = fs.readFileSync('dist/MivtzaiUtils.jsx', { encoding: 'utf-8' });
  fs.writeFileSync('dist/MivtzaiUtils.jsx', headerStr + read);
  done();
});

task('runScript', done => {
  const absPath = join(__dirname, 'dist/MivtzaiUtils.jsx');
  executeScript(absPath, (error, stdout, stderr) => {
    done();
  });
});

task('jsxbin', () => jsxbin('dist/MivtzaiUtils.jsx', 'dist/MivtzaiUtils.jsxbin'));

task('addToHost', done => {
  fs.copyFileSync('dist/MivtzaiUtils.jsx', scriptFolder + '\\MivtzaiUtils.jsx');
  done();
});

task('default', series('createHeader', 'runScript', 'jsxbin', 'addToHost'));
