const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const port = process.env.PORT || 3000;
const download_url = "https://github.com/cworsley4/Porterhouse-releases/releases/download/v2.0.14/Porterhouse-2.0.14.dmg";

app.use(express.static('build/pages',{
  extensions: ['html', 'htm'],
}));

app.get('/download', (req, res) => {
  res.redirect(download_url);
});

const swishProxy = createProxyMiddleware({
  target: 'http://cn.swish.ink',
  headers: {host: 'porterhouse.app'},
  xfwd: true,
  followRedirects: true,
});

app.use('/blog', swishProxy);

app.listen(port, () => console.log(`listening on port ${port}!`));
