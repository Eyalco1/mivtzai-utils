const { task, series, src, dest } = require('gulp');
const exec = require('child_process').exec;
const { join } = require('path');
const replace = require('gulp-replace');
const del = require('delete');
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
    ` * @name ${pkg.eyal.name}\n` +
    ` * @description ${pkg.description}\n` +
    ` * @version ${pkg.version}\n` +
    ` * @author ${pkg.author}\n` +
    ` * @license ${pkg.license}\n` +
    ` */\n\n`;

const scriptNameNoSpaces = pkg.eyal.name.replace(/\s+/g, '');

const executeScript = (absFilePath, callback) => {
    const shellCommand = `"${exeFolder}" -r ` + absFilePath;
    exec(shellCommand, callback);
};

task('renameWithVersion', done => {
    try {
        fs.renameSync(
            `dist/temp.jsx`,
            `dist/${scriptNameNoSpaces}_v${pkg.version}.jsx`
        );
    } catch (_) {}

    done();
});

task('createHeader', done => {
    const read = fs.readFileSync(`dist/temp.jsx`, {
        encoding: 'utf-8'
    });
    fs.writeFileSync(`dist/temp.jsx`, headerStr + read);
    done();
});

task('preprocessSources', done => {
    src('src/**/*.ts')
        .pipe(replace(/^\s*#include/gm, '//= include'))
        .pipe(replace('@@name', pkg.eyal.name))
        .pipe(replace('@@nospacename', scriptNameNoSpaces))
        .pipe(replace('@@version', pkg.version))
        .pipe(dest('.temp'));

    done();
});

task('tsc', done => {
    exec('tsc --p tsconfig-build.json');
    setTimeout(() => {
        done();
    }, 3000);
});

task('buildAssets', done => {
    fse.copySync(
        'src/assets',
        `dist/${scriptNameNoSpaces}_v${pkg.version} Assets`,
        {
            overwrite: true
        }
    );
    done();
});

task('runScript', done => {
    const absPath = join(
        __dirname,
        `dist/${scriptNameNoSpaces}_v${pkg.version}.jsx`
    );
    executeScript(absPath, (error, stdout, stderr) => {
        done();
    });
});

task('jsxbin', done => {
    jsxbin(
        `dist/${scriptNameNoSpaces}_v${pkg.version}.jsx`,
        `dist/${scriptNameNoSpaces}_v${pkg.version}.jsxbin`
    );

    done();
});

task('addToHost', done => {
    fs.copyFileSync(
        `dist/${scriptNameNoSpaces}_v${pkg.version}.jsx`,
        scriptFolder + `\\${scriptNameNoSpaces}_v${pkg.version}.jsx`
    );
    fse.copySync(
        `dist/${scriptNameNoSpaces}_v${pkg.version} Assets`,
        scriptFolder + `\\${scriptNameNoSpaces}_v${pkg.version} Assets`,
        { overwrite: true }
    );
    done();
});

task('clean', done => {
    del(['.temp', `dist/${scriptNameNoSpaces}.jsx`]);
    done();
});

task(
    'default',
    series(
        'preprocessSources',
        'tsc',
        'createHeader',
        'renameWithVersion',
        'buildAssets',
        'runScript',
        'jsxbin',
        'addToHost',
        'clean'
    )
);
