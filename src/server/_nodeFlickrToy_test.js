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
        var returnData = {"photos":{"page":1, "pages":200, "perpage":5, "total":1000,
            "photo":[
                {"id":"8688689065", "owner":"90699886@N05", "secret":"2796a52546", "server":"8399", "farm":9, "title":"mikes camera day at the zoo 246.jpg", "ispublic":1, "isfriend":0, "isfamily":0},
                {"id":"8688689277", "owner":"95374184@N08", "secret":"7a6de11120", "server":"8255", "farm":9, "title":"DSC_4715", "ispublic":1, "isfriend":0, "isfamily":0},
                {"id":"8688689285", "owner":"10142427@N07", "secret":"22d665e013", "server":"8124", "farm":9, "title":"#quiltsforboston", "ispublic":1, "isfriend":0, "isfamily":0},
                {"id":"8688689289", "owner":"94558814@N04", "secret":"cda855e71a", "server":"8544", "farm":9, "title":"Big bmx air at Radlands skatepark in Northampton. #bmx #radlands #skatepark", "ispublic":1, "isfriend":0, "isfamily":0},
                {"id":"8689808088", "owner":"31637856@N03", "secret":"5d5e555df4", "server":"8253", "farm":9, "title":"IMG_2667", "ispublic":1, "isfriend":0, "isfamily":0}]}, "stat":"ok"};
        oldRequestGetMethod = request.get;
        request.get = function(options, cb) {
            urlEntered = options.url;
            paramsSent = options.qs;
            cb(null, 200, returnData);
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

    exports.test_getRecentPhotosReturnsArrayOfUrls = function(test) {
        var expectedArray = ["http://farm9.staticflickr.com/8399/8688689065_2796a52546_m.jpg",
            "http://farm9.staticflickr.com/8255/8688689277_7a6de11120_m.jpg",
            "http://farm9.staticflickr.com/8124/8688689285_22d665e013_m.jpg",
            "http://farm9.staticflickr.com/8544/8688689289_cda855e71a_m.jpg",
            "http://farm9.staticflickr.com/8253/8689808088_5d5e555df4_m.jpg"];
        nodeFlickrToy.getRecentPhotos(flickrId, function(data) {
           test.deepEqual(data, expectedArray);
           test.done();
        });
    };
})();