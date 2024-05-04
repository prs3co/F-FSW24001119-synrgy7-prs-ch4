const http = require('http')
const { PORT = 8000, HOST = 'localhost' } = process.env

const fs = require('fs')
const path = require('path')
const PUBLIC_DIRECTORY = path.join(__dirname, '..', 'public')
console.log(PUBLIC_DIRECTORY);

// function onRequest(req, res) {
//   const htmlFile = path.join(PUBLIC_DIRECTORY, 'index.html')
//   const html = fs.readFileSync(htmlFile, 'utf-8')
//   res.setHeader('Content-Type', 'text/html')
//   res.writeHead(200)
//   res.end(html)
// }

function onRequest(req, res) {
  let filePath = path.join(PUBLIC_DIRECTORY, req.url);

  if (req.url === '/') {
    filePath = path.join(PUBLIC_DIRECTORY, 'index.html');
  } else if (req.url === '/cars') {
    filePath = path.join(PUBLIC_DIRECTORY, 'cars.html');
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, {'Content-Type': 'text/plain'});
      res.end('404 Not Found');
    } else {
      const contentType = getContentType(filePath);
      res.writeHead(200, {'Content-Type': contentType});
      res.end(data);
    }
  });
}

function getContentType(filePath) {
  const extname = path.extname(filePath);
  if (extname === '.html') {
    return 'text/html'
  } else if (extname === '.css') {
    return 'text/css'
  } else if (extname === '.js') {
    return 'text/javascript'
  } else if (extname === '.png') {
    return 'image/png'
  } else if (extname === '.jpg' || extname === '.jpeg') {
    return 'image/jpeg'
  } else {
    return 'text/plain'
  }
}

const server = http.createServer(onRequest)

server.listen(PORT, HOST, ()=> {
  console.log(`server running on http://${HOST}:${PORT}`)
})