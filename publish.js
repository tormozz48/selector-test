'use strict';

const path = require('path');
const Promise = require('bluebird');
const fsExtra = require('fs-extra');
const githubPages = require('gh-pages');
const publish = Promise.promisify(githubPages.publish);

const distDir = path.join(__dirname, 'dist');
const htmlPage = path.join(__dirname, 'index.html');
const publishDir = path.join(__dirname, '__dist');

return fsExtra.ensureDir(publishDir)
    .then(() => fsExtra.copy(distDir, path.join(publishDir, 'dist')))
    .then(() => fsExtra.copy(htmlPage, path.join(publishDir, 'index.html')))
    .then(() => publish(publishDir))
    .then(() => fsExtra.remove(publishDir))
    .then(() => {
        console.info('Publish successful');
    })
    .catch((error) => {
        console.error('Error occur while publishing on github pages');
        console.error(error.stack || error.message);
    });
