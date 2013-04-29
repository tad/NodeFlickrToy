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
            var listOfUrls = [];
            for(var i = 0; i < body.photos.photo.length; i += 1) {
                var photo = body.photos.photo[i];
                var url = "http://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_m.jpg";
                listOfUrls.push(url);
            }
            callback(listOfUrls);
        });
    }

    exports.getRecentPhotos = getRecentPhotos;
})();