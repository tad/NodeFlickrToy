
// This code comes from the LetsLearnJavascript tutorial done by James Shore
(function(){

    "use strict";

    var http = require("http");
    var fs = require("fs");
    var server;

    exports.start = function(homePageToServe, notFoundPageToServe, portNumber, callback) {
        if(!portNumber) throw new Error("Port number required");
        server = http.createServer();
        server.on("request", function(request, response) {
            console.log(request.url);
            if(request.url === "/" || request.url === "/index.html"){

                var nodeFlickrToy = require("./nodeFlickr.js");
                var flickrId = "YOUR API KEY HERE";

                var photos = [];

                nodeFlickrToy.getRecentPhotos(flickrId, function(data) {
                    photos = data;
                    response.statusCode = 200;
                    // Read in the html File
                    fs.readFile('src/server/content/homepage.html', function(err, data) {
                        if(err) throw err;
                        var template = data.toString();
                        var html = template.replace('%', photos.join("' /></li><li class='photo-item'><img src='"));
                        response.end(html);
                    });
                });

                //serveFile(response, homePageToServe);

            } else if(request.url ==="/site.css") {
                response.statusCode = 200;
                serveFile(response, "src/server/content/site.css");

            } else {
                response.statusCode = 404;
                serveFile(response, notFoundPageToServe);
            }
        });
        server.listen(portNumber, callback);
    };

    exports.stop = function(callback) {
        server.close(callback);
    };

    function serveFile(response, fileToServe) {
        fs.readFile(fileToServe, function(err, data) {
            if (err) throw err;
            response.end(data);
        });
    }
})();