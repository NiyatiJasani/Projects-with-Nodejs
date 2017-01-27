var http = require('http');
var fs = require('fs');

var hostname = 'localhost';
var port = 8080;

//Create Server
var server = http.createServer(function (req, res) {
    console.log(req.headers);
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });


    //read file
    fs.readFile('./views/index.html', 'utf8', function (err, data) {

        if (err) {
            console.log(err);
            res.writeHead(404, {
                'Content-Type': 'text/html'
            });
            res.end('<html><body><h1>Error 404: ' + fileUrl +
                ' not a HTML file</h1></body></html>');
        } else {
            res.writeHead(200, {
                'Content-Type': 'text/html'
            });

            // Write the content of the file to res body
            res.write(data.toString());
        }
        // Send the res body 
        res.end();
    });
});

server.listen(port, hostname, function () {
    console.log(`Server running at http://${hostname}:${port}/`);
});