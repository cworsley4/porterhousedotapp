const fs = require('fs');
const ncp = require('ncp');
const recursive = require("recursive-readdir");

function build(done) {
  const headerStart = fs.readFileSync('./header-start.html').toString();
  const headerEnd = fs.readFileSync('./header-end.html').toString();
  const footer = fs.readFileSync('./footer.html').toString();
  const links = fs.readFileSync('./link-tags.html').toString();
  const ga = fs.readFileSync('./ga.js').toString();
  const port = process.env.PORT || 3000;
  const rootURL = process.env.NODE_ENV === 'development' ? `http://localhost:${port}` : 'https://porterhouse.app';
  const railsURL = process.env.NODE_ENV === 'development' ? 'http://localhost:9999' : 'https://order.porterhouse.app';

  console.log('Building for ' + process.env.NODE_ENV);

  // copy assets
  ncp('./pages/assets', './build/pages/assets', console.log);
  console.log('Starting build...');
  recursive('./pages', (err, files) => {
    console.log(files);
    files.forEach((filePath) => {
      if (filePath.includes('assets')) return;
      console.log('Building...', filePath);
      let page = fs.readFileSync(`./${filePath}`).toString();

      // top level replacements
      console.log('Replacing ___HEADER_START___');
      page = page.replace('___HEADER_START___', headerStart);
      console.log('Replacing ___HEADER_END___');
      page = page.replace('___HEADER_END___', headerEnd);
      console.log('Replacing ___FOOTER___');
      page = page.replace('___FOOTER___', footer);
      console.log('Replacing ___GA___');
      page = page.replace('___GA___', ga);
      console.log('Replacing ___LINK_TAGS___');
      page = page.replace('___LINK_TAGS___', links);


      // embedded replacements
      console.log('Replacing ___ROOT_URL___', rootURL);
      page = page.replace(/___ROOT_URL___/g, rootURL);
      console.log('Replacing ___RAILS_URL___', railsURL);
      page = page.replace(/___RAILS_URL___/g, railsURL);

      fs.writeFileSync(`./build/${filePath}`, page);
    });

    if (done) done();
  });
}

build();

exports.build = build;
