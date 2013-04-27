/**
 * Created with JetBrains WebStorm.
 * User: TDonaghe
 * Date: 4/27/13
 * Time: 12:33 PM
 * To change this template use File | Settings | File Templates.
 */
(function() {
   "use strict";

    exports.test_NodeFlickrToyExists = function(test) {
        var nodeFlickrToy = require("./nodeFlickrToy.js");
        test.notEqual(nodeFlickrToy, null, "nodeFlickrToy should not be null");
        test.done();
    };
})();