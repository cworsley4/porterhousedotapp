const fs = require('fs');
const build = require('./build').build;
const recursive = require("recursive-readdir");

let filesToWatch = ['./link-tags.html', './header-end.html', './header-start.html', './footer.html', './ga.js'];

build();

let lock = false;

recursive('./pages', (err, files) => {
  filesToWatch = filesToWatch.concat(files);
  filesToWatch.forEach((fileOrDir) => {
    fs.watch(fileOrDir, { encoding: 'buffer' }, (eventType, filename) => {
      if (lock) {
        console.log('Skipping, build in progress'); 
        return;
      }

      lock = true;
      
      if (filename) build(() => {
        console.log('Releasing lock.')
        lock = false;
        console.log('\n\n\n\n\n\n\n\n');
      });
    });
  })
});
