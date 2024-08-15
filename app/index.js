const http = require('http');
const url = require('url');

const port = process.env.COLOR_PORT || 8080;
const fqdn = process.env.HOSTNAME || 'localhost';

http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // Regular expression to match the URL pattern
  const colorRegex = /\/(prod|qa)\/(\w+)/;
  const match = pathname.match(colorRegex);

  let color = 'white'; // Default color
  if (match) {
    color = match[2]; // Extract the color from the match
  }

  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<html>' +
    '    <head>' +
    '        <title>color ' + color + '</title>' +
    '        <style type="text/css">' +
    '            body {background-color:  ' + color + '}' +
    '        </style>' +
    '    </head>' +
    '    <body>' +
    '        <h1>' + color + '</h1>' +
    '        <h2>Running on ' + fqdn + '</h2>' +
    '        <h2><a href="/prod/red">red</a></h2>' +
    '        <h2><a href="/prod/green">green</a></h2>' +
    '        <h2><a href="/prod/white">white</a></h2>' +
    '    <body>' +
    '</html>');
  res.end();
}).listen(parseInt(port, 10));

console.log("HTTP server running at\n  => http://localhost:" + port + "/\nCTRL + C to shutdown");