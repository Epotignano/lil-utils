var phantomjs = require('phantomjs-prebuilt');
var binPath = phantomjs.path;
console.log(binPath);
var VizServices = (function () {
    function VizServices() {
    }
    VizServices.generateHTMLScreenshot = function () {
        console.log(binPath);
        return true;
    };
    return VizServices;
})();
module.exports = VizServices;
