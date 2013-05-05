/**
 * Created with JetBrains WebStorm.
 * User: TDonaghe
 * Date: 5/4/13
 * Time: 5:29 PM
 * To change this template use File | Settings | File Templates.
 */
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
            callback(getListOfPhotoUrls(body));
        });
    }

    function getPhotoUrl(photo) {
        return "http://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/" + photo.id + "_" +
            photo.secret + "_m.jpg";
    }

    function getListOfPhotoUrls(body) {
        var listOfUrls = [];
        for(var i = 0; i < body.photos.photo.length; i += 1)
            listOfUrls.push(getPhotoUrl(body.photos.photo[i]));
        return listOfUrls;
    }

    exports.getRecentPhotos = getRecentPhotos;
})();