/**
 * Created with JetBrains WebStorm.
 * User: TDonaghe
 * Date: 4/27/13
 * Time: 12:33 PM
 * To change this template use File | Settings | File Templates.
 */
(function() {
   "use strict";

    var request = require("request");
    var nodeFlickrToy = require("./nodeFlickrToy.js");
    var flickrId = "b79df6b678836fd497f972e39b178b85";
    var oldRequestGetMethod;

    function mockRequest() {
        var urlEntered = "";
        var paramsSent = {};
        oldRequestGetMethod = request.get;
        request.get = function(options, cb) {
            urlEntered = options.url;
            paramsSent = options.qs;
            cb(null, 200, "some data");
        };

        request.getUrlEntered = function() {
            return urlEntered;
        };

        request.getParamsSent = function() {
            return paramsSent;
        };
    }

    function restoreRequest() {
        request.get = oldRequestGetMethod;
    }

    exports.setUp = function(done) {
        mockRequest();
        done();
    };

    exports.tearDown = function(done) {
        restoreRequest();
        done();
    };

    exports.test_getRecentPhotosTakesFlickrAPIKey = function(test) {
        nodeFlickrToy.getRecentPhotos(flickrId, function(data){
        });

        test.done();
    };

    exports.test_getRecentPhotosCallsProperFlickrUrl = function(test) {
        var expectedUrl = "http://api.flickr.com/services/rest/?method=flickr.photos.getRecent";


        nodeFlickrToy.getRecentPhotos(flickrId, function(data){
            test.equal(request.getUrlEntered(), expectedUrl);
            test.done();
        });

    };

    exports.test_getRecentPhotosSetsProperUrlParams = function(test) {
        var expectedParamsObj = {
            'api_key': flickrId,
            'format' : 'json',
            'nojsoncallback': '1'
        };

        nodeFlickrToy.getRecentPhotos(flickrId, function(data) {
            test.deepEqual(request.getParamsSent(), expectedParamsObj);
            test.done();
        });
    };
})();