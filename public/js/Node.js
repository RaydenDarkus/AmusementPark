const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/example') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      console.log(body);
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.end('Received POST data');
    });
  } else {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('Not found');
  }
});

server.listen(8080, () => {
  console.log('Server listening on port 8080');
});
