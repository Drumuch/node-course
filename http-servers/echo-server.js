const http = require('http');
const url  = require('url');

http.createServer(function (req, res) {
    const urlParsed = url.parse(req.url, true);

    if (urlParsed.query.message) {
        res.statusCode = 200;
        res.end( urlParsed.query.message );
    } else {
        res.statusCode = 400;
        res.end('You didn\'t send any parameters try localhost:8080/?message=Hello');
    }
}).listen(8080);