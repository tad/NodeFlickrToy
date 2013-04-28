(function(){
    "use strict";

    var request = require("request");

    exports.getRecentPhotos = function(callback){
        var url = "http://api.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=someFlickrId&format=json";
//        var paramsObj = {
//            //'format': 'json'
//        };

        request({url: url, json:true}, function(error, response, body) {
            callback(body);
        });
    };
})();