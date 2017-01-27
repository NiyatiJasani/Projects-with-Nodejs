/*var http = require('http');
var fs = require('fs');


//Create Server
var server = http.createServer(function (req, res) {
    console.log("Request was made" + req.url);
    if (req.url === './home' || req.url === '/') {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        fs.createReadStream(__dirname + '/index.html').pipe(res);
    } else if (req.url === '/aboutus') {
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        fs.createReadStream(__dirname + '/aboutus.html').pipe(res);
    } else {

        res.writeHead(404, {
            'Content-Type': 'text/html'
        });
        res.end('<html><body><h1>Error 404: ' + fileUrl +
            ' not a HTML file</h1></body></html>');
    }

});


server.listen(8080, '127.0.0.1');




>>>server.2
var http = require('http');
var fs = require('fs');
var path = require('path');

var hostname = 'localhost';
var port = 3000;

var server = http.createServer(function (req, res) {
    console.log('Request for ' + req.url + ' by method ' + req.method);

    //if req url ends with a slash, we don't need host name. we handle from the /
    if (req.method == 'GET') {
        var fileUrl;
        if (req.url == '/') fileUrl = '/index.html';
        else fileUrl = req.url; //returns index.html by default

        //set up file path. corrresponding to current directory, look for info in the current folder
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
})

server.listen(port, hostname, function () {
    console.log(`Server running at http://${hostname}:${port}/`);
});

>>server.js
var http = require('http');
var fs = require('fs');
var url = require('url');

var hostname = 'localhost';
var port = 3000;

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

})

server.listen(port, hostname, function () {
    console.log(`Server running at http://${hostname}:${port}/`);
});


// Callback function is used to deal with response
var callback = function (response) {
        // Continuously update stream with data
        var body = '';
        response.on('data', function (data) {
            body += data;
        });

        response.on('end', function () {
            // Data received completely.
            console.log(body);
        });
    }
    // Make a request to the server
var req = http.request(options, callback);
req.end();

//      //            var request = http.request({
            //                method: 'post',
            //                host: 'localhost',
            //                path: 'data.txt',
            //                headers: form.getHeaders()
            //            });
            //
            //            form.pipe(request);
            //
            //            request.on('response', function (res) {
            //                console.log(res.statusCode);
            //            });