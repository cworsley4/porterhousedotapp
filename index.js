const handler = require('serve-handler');
const http = require('http');
const port = process.env.PORT || 3000;
const download_url = "https://github.com/cworsley4/Porterhouse-releases/releases/download/v2.0.14/Porterhouse-2.0.14.dmg";

const server = http.createServer((request, response) => {
  return handler(request, response, {
    "public": "build/pages/",
    "cleanUrls": true,
    "directoryListing": process.env.NODE_ENV === 'production' ? false : true,
    "redirects": [
      { "source": "/download", "destination": download_url, "type": 302 }
    ],
  });
});

server.listen(process.env.PORT || 3000, () => {
  console.log(`Running on port: ${port}`);
});
