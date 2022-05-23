const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const repoFolder = path.join(path.dirname(__filename), '..');
const folderToServe = path.join(repoFolder, 'public-dist');

// cross-env TIDDLYWIKI_PLUGIN_PATH='node_modules/tiddlywiki/plugins/published' TIDDLYWIKI_THEME_PATH='${wikiFolderName}/themes'
process.env.TIDDLYWIKI_PLUGIN_PATH = `${repoFolder}/plugins`;
process.env.TIDDLYWIKI_THEME_PATH = `${repoFolder}/themes`;

const execAndLog = (command, options) => console.log(String(execSync(command, options)));

module.exports = function build() {
  // npm run build:prepare
<<<<<<< HEAD
  execAndLog(`shx rm -rf ${folderToServe}`);
  // npm run build:public
  execAndLog(`shx cp -r ${repoFolder}/public/ ${folderToServe}`, { cwd: repoFolder });
  // try copy some static assets, don't cause error if some of them been removed by the user
  try {
    // npm run build:public
    execAndLog(`shx cp ${repoFolder}/tiddlers/favicon.ico ${folderToServe}/favicon.ico`, { cwd: repoFolder });
    execAndLog(`shx cp ${repoFolder}/tiddlers/TiddlyWikiIconWhite.png ${folderToServe}/TiddlyWikiIconWhite.png`, {
      cwd: repoFolder,
    });
    execAndLog(`shx cp ${repoFolder}/tiddlers/TiddlyWikiIconBlack.png ${folderToServe}/TiddlyWikiIconBlack.png`, {
=======
  execAndLog(`rm -rf ${folderToServe}`);
  // npm run build:public
  execAndLog(`cp -r ${repoFolder}/public/ ${folderToServe}`, { cwd: repoFolder });
  try {
    execAndLog(`cp ${repoFolder}/vercel.json ${folderToServe}/vercel.json`, { cwd: repoFolder });
  }  catch (error) {
    console.log(error);
  }
  // try copy some static assets, don't cause error if some of them been removed by the user
  try {
    // npm run build:public
    execAndLog(`cp ${repoFolder}/tiddlers/favicon.ico ${folderToServe}/favicon.ico`, { cwd: repoFolder });
    execAndLog(`cp ${repoFolder}/tiddlers/TiddlyWikiIconWhite.png ${folderToServe}/TiddlyWikiIconWhite.png`, {
      cwd: repoFolder,
    });
    execAndLog(`cp ${repoFolder}/tiddlers/TiddlyWikiIconBlack.png ${folderToServe}/TiddlyWikiIconBlack.png`, {
>>>>>>> 13eead8 (Commit with Git-Sync-JS)
      cwd: repoFolder,
    });
  } catch (error) {
    console.log(error);
  }
  // npm run build:nodejs2html
<<<<<<< HEAD
  execAndLog(`tiddlywiki ${repoFolder} --build externalimages`, { cwd: repoFolder });
  execAndLog(`tiddlywiki ${repoFolder} --build externaljs`, { cwd: repoFolder });
  // npm run build:sitemap
  execAndLog(`tiddlywiki . --rendertiddler sitemap sitemap.xml text/plain && shx mv ${repoFolder}/output/sitemap.xml ${folderToServe}/sitemap.xml`, {
=======
  // exclude edit related plugins, make it readonly, and reduce size
  execAndLog(`tiddlywiki ${repoFolder} --build readonlyexternalimages`, { cwd: repoFolder });
  execAndLog(`tiddlywiki ${repoFolder} --build externaljs`, { cwd: repoFolder });
  // npm run build:sitemap
  execAndLog(`tiddlywiki . --rendertiddler sitemap sitemap.xml text/plain && mv ${repoFolder}/output/sitemap.xml ${folderToServe}/sitemap.xml`, {
>>>>>>> 13eead8 (Commit with Git-Sync-JS)
    cwd: repoFolder,
  });
  // npm run build:minifyHTML
  const htmlMinifyPath = `${repoFolder}/output/index-minify.html`;
  const htmlOutputPath = `${folderToServe}/index.html`;
  execAndLog(`html-minifier-terser -c ./html-minifier-terser.config.json -o ${htmlMinifyPath} ${repoFolder}/output/index.html`, { cwd: repoFolder });
  // build dll.js and config tw to load it
  // original filename contains invalid char, will cause static server unable to load it
  const htmlContent = fs.readFileSync(htmlMinifyPath, 'utf-8');
  const htmlContentWithCorrectJsPath = htmlContent.replaceAll('%24%3A%2Fcore%2Ftemplates%2Ftiddlywiki5.js', 'tiddlywiki5.js');
  fs.writeFileSync(htmlOutputPath, htmlContentWithCorrectJsPath);
<<<<<<< HEAD
  execAndLog(`shx mv ${repoFolder}/output/tiddlywiki5.js ${folderToServe}/tiddlywiki5.js`, { cwd: repoFolder });
=======
  execAndLog(`mv ${repoFolder}/output/tiddlywiki5.js ${folderToServe}/tiddlywiki5.js`, { cwd: repoFolder });
>>>>>>> 13eead8 (Commit with Git-Sync-JS)
  // npm run build:precache
  execAndLog(`workbox injectManifest workbox-config.js`, { cwd: repoFolder });
};
