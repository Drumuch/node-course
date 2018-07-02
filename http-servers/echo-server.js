const http = require('http');

http.createServer(function (req, res) {
    if (req.body) {
        res.statusCode = 200;
        res.end(req.body);
    } else {
        res.statusCode = 400;
        res.end('You didn\'t send any parameters try localhost:8080/?message=Hello');
    }
}).listen(8080);