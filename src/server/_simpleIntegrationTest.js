/**
 * Created with JetBrains WebStorm.
 * User: TDonaghe
 * Date: 4/28/13
 * Time: 9:30 PM
 * To change this template use File | Settings | File Templates.
 */
// NOTE: This is *not* meant to be run via jake as it's just a sanity smoke test sort of thing to make sure we're
// working with actual Flickr content properly.

(function() {

    "use strict";

    var nodeFlickrToy = require("./nodeFlickr.js");
    var flickrId = "YOUR API KEY HERE";

    nodeFlickrToy.getRecentPhotos(flickrId, function(data) {
        console.log(data);
    });

})();
