/**
 * Created with JetBrains WebStorm.
 * User: TDonaghe
 * Date: 4/27/13
 * Time: 12:33 PM
 * To change this template use File | Settings | File Templates.
 */
(function() {
   "use strict";

    var nodeFlickrToy = require("./nodeFlickrToy.js");

    exports.test_NodeFlickrToyExists = function(test) {

        test.notEqual(nodeFlickrToy, null, "nodeFlickrToy should not be null");
        test.done();
    };

    exports.test_getRecentPhotosMethodExists = function(test) {
        var photos = nodeFlickrToy.getRecentPhotos(function(data){
        });
        test.done();
    };

    exports.test_getRecentPhotosCallsProperFlickrUrl = function(test) {
        var nock = require("nock");
        var returnValue = {'some_key':'some_value'};
        nock('http://api.flickr.com')
            .get('/services/rest/?method=flickr.photos.getRecent&api_key=someFlickrId&format=json')
            .reply(200, returnValue);

        nodeFlickrToy.getRecentPhotos(function(data){
            test.deepEqual(data, returnValue);
            test.done();
        });
    };

})();