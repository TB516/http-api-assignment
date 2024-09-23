const fs = require('fs');

const index = fs.readFileSync(`${__dirname}/../../client/client.html`);
const css = fs.readFileSync(`${__dirname}/../../client/style.css`);

const getIndexHtml = (_params, request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(index);
  response.end();
};

const getIndexCss = (_params, request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(css);
  response.end();
};

module.exports.getIndex = getIndexHtml;
module.exports.getCss = getIndexCss;
