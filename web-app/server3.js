var http = require('http');
var fs = require('fs');
var path = require('path');
var qs = require('querystring');
var url = require('url');

var hostname = 'localhost';
var port = 8080;


var server = http.createServer(function (req, res) {
    //   console.log('Request for ' + req.url + ' by method ' + req.method);

    if (req.method === 'POST') {
        console.log('printing file url below :')
        console.log(url);
        console.log("request---------->");

        var data = " ";
        req.on('data', function (data) {
            var str = ['data1,data2', 'data3,data4'].join(',');
            console.log("Data found in request..!!");
            console.log(data.toString());

            //https://nodejs.org/api/querystring.html
            var query = qs.parse(data.toString());
            console.log(query.firstname);

            fs.appendFile('data.txt', 'query', function (err) {
                if (err) {
                    return console.log(err);
                } else {
                    console.log("Ready");
                }

            });
        });
    } else if (req.method == 'GET') {
        var fileUrl;
        if (req.url === '/')
            fileUrl = '/index.html';
        else fileUrl = req.url; //returns index.html by default
        console.log('printing file url below :')
        console.log(fileUrl);

        var filePath = path.resolve('./views' + fileUrl);
        var fileExt = path.extname(filePath);
        if (fileExt == '.html') {
            fs.exists(filePath, function (exists) {
                if (!exists) {
                    res.writeHead(404, {
                        'Content-Type': 'text/html'
                    });
                    res.end('<html><body><h1>Error 404: ' + fileUrl +
                        ' not found</h1></body></html>');
                    return;
                }
                res.writeHead(200, {
                    'Content-Type': 'text/html'
                });
                fs.createReadStream(filePath).pipe(res);
            });
        } else {

            res.writeHead(404, {
                'Content-Type': 'text/html'
            });
            res.end('<html><body><h1>Error 404: ' + fileUrl +
                ' not a HTML file</h1></body></html>');
        }
    } else {
        res.writeHead(404, {
            'Content-Type': 'text/html'
        });
        res.end('<html><body><h1>Error 404: ' + req.method +
            ' not supported</h1></body></html>');
    }
});

server.listen(port, hostname, function () {
    console.log(`Server running at http://${hostname}:${port}/`);
});