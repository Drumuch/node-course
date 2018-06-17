const http      = require('http');
const fs        = require('fs');
const indexPath = './http-servers/index.html';

http.createServer(function (req, res) {
    // const indexFile         = fs.readFileSync(indexPath);
    // const indexFileReplaced = indexFile.toString().replace(/{\w*}/, 'Hello World!!!!!!');
    // res.writeHead(200, {'Content-Type': 'text/html'});
    // res.write(indexFileReplaced);
    // res.end();

    const file = new fs.ReadStream(indexPath);
    file.pipe(res);
    // sendFile(file, res);
}).listen(8080);

function sendFile(file, res) {
    let newFileContent = '';
    file.on('readable', replace);

    function replace () {
        const fileContent = file.read();
        if(fileContent){
            newFileContent = fileContent.toString().replace(/{\w*}/, 'Hello World!!!!!!')
        }
    }
    file.on('end', function(){
        res.write(newFileContent);
        res.end();
    });
}