// Minimal static file server for local development: serves ./dist.
const http = require('http');
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, 'dist');
const types = {
    '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css', '.json': 'application/json',
    '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.gif': 'image/gif', '.ico': 'image/x-icon',
    '.woff': 'font/woff', '.woff2': 'font/woff2', '.wasm': 'application/wasm', '.swf': 'application/x-shockwave-flash',
};

http.createServer((req, res) => {
    let file = path.join(root, decodeURIComponent(new URL(req.url, 'http://localhost').pathname));
    if (!file.startsWith(root)) return res.writeHead(403).end();
    if (fs.existsSync(file) && fs.statSync(file).isDirectory()) {
        if (!req.url.split('?')[0].endsWith('/')) return res.writeHead(301, { Location: req.url.replace(/(\?|$)/, '/$1') }).end();
        file = path.join(file, 'index.html');
    };
    fs.readFile(file, (err, data) => {
        if (err) return res.writeHead(404).end('Not found');
        res.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream' }).end(data);
    });
}).listen(process.env.PORT || 3000, () => console.log(`Incognito frontend running on http://localhost:${process.env.PORT || 3000}`));
