const handler = require('serve-handler');
const http = require('http');
const port = process.env.PORT || 3000;
 
const server = http.createServer((request, response) => {
  return handler(request, response, {
    "public": "build/pages/",
    "cleanUrls": true,
    "directoryListing": process.env.NODE_ENV === 'production' ? false : true,
  });
});
 
server.listen(process.env.PORT || 3000, () => {
  console.log(`Running on port: ${port}`);
});
