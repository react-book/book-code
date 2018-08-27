const http = require('http');
const React = require('react');
const { renderToString } = require('react-dom/server');
const App = require('./App');

const server = http.createServer((req, res) => {
  const htmlMarkup = renderToString(React.createElement(App));
  res.end(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <title>Demo</title>
    </head>
    <body>
        <div id="root">${htmlMarkup}</div>
    </body>
    </html>
  `);
});

server.listen(3000, '127.0.0.1');