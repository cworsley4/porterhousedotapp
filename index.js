const express = require('express');
var proxy = require('express-http-proxy');
const app = express();
const port = process.env.PORT || 3000;
const download_url = "https://github.com/cworsley4/Porterhouse-releases/releases/download/v2.0.14/Porterhouse-2.0.14.dmg";

app.use(express.static('build/pages',{
  extensions: ['html', 'htm'],
}));

app.get('/download', (req, res) => {
  res.redirect(download_url);
});

app.use('/blog', proxy('porterhouse.swish.ink', {
  userResHeaderDecorator(headers, userReq, userRes, proxyReq, proxyRes) {
    return {
      ...headers,
      'X-Forwarded-For': userReq.ip,
      'X-Forwarded-Proto': userReq.protocol,
      'X-Real-IP': userReq.ip,
      'Host': userReq.headers.host,
    };
  },
}));

app.listen(port, () => console.log(`listening on port ${port}!`));
