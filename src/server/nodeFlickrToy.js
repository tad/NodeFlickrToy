(function(){
    "use strict";

    var request = require("request");

    function getRecentPhotos(flickrAPIKey, callback){
        var url = "http://api.flickr.com/services/rest/?method=flickr.photos.getRecent";
        var paramsObj = {
            'api_key': flickrAPIKey,
            'format' : 'json',
            'nojsoncallback': '1'
        };

        request.get({url: url, json:true, qs:paramsObj}, function(error, response, body) {
            callback(body);
        });
    }

    exports.getRecentPhotos = getRecentPhotos;
})();