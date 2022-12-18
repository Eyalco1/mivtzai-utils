const { task, series } = require('gulp');
const exec = require('child_process').exec;
const { join } = require('path');
const fs = require('fs');
const fse = require('fs-extra');
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

task('renameWithVersion', done => {
  try {
    fs.renameSync(
      'dist/MivtzaiUtils.jsx',
      `dist/MivtzaiUtils_v${pkg.version}.jsx`
    );
  } catch (_) {}

  done();
});

task('createHeader', done => {
  const read = fs.readFileSync(`dist/MivtzaiUtils_v${pkg.version}.jsx`, {
    encoding: 'utf-8'
  });
  fs.writeFileSync(`dist/MivtzaiUtils_v${pkg.version}.jsx`, headerStr + read);
  done();
});

task('buildAssets', done => {
  fse.copySync('src/assets', `dist/MivtzaiUtils_v${pkg.version} Assets`, {
    overwrite: true
  });
  done();
});

task('runScript', done => {
  const absPath = join(__dirname, `dist/MivtzaiUtils_v${pkg.version}.jsx`);
  executeScript(absPath, (error, stdout, stderr) => {
    done();
  });
});

task('jsxbin', () =>
  jsxbin(
    `dist/MivtzaiUtils_v${pkg.version}.jsx`,
    `dist/MivtzaiUtils_v${pkg.version}.jsxbin`
  )
);

task('addToHost', done => {
  fs.copyFileSync(
    `dist/MivtzaiUtils_v${pkg.version}.jsx`,
    scriptFolder + `\\MivtzaiUtils_v${pkg.version}.jsx`
  );
  fse.copySync(
    `dist/MivtzaiUtils_v${pkg.version} Assets`,
    scriptFolder + `\\MivtzaiUtils_v${pkg.version} Assets`,
    { overwrite: true }
  );
  done();
});

task(
  'default',
  series(
    'renameWithVersion',
    'createHeader',
    'buildAssets',
    'runScript',
    'jsxbin',
    'addToHost'
  )
);
