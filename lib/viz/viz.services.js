var phantomjs = require('phantomjs-prebuilt');
var binPath = phantomjs.path;
var q_1 = require('q');
var path_1 = require('path');
var driver = require('node-phantom-simple');
var _childArgs = [
    path_1.join(__dirname, 'phantomjs-script.js')
];
var fs_1 = require('fs');
var VizServices = (function () {
    function VizServices() {
    }
    VizServices.generateHTMLScreenshot = function () {
        var _htmlScreenshotPromise = q_1.defer();
        driver.create({ path: binPath }, function (err, browser) {
            return browser.createPage(function (err, page) {
                return page.open('http://www.google.com', function (err, status) {
                    console.log('opened? ', status);
                    page.viewportSize = { width: 1440, height: 900 };
                    page.includeJs('http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js', function (err, jquery) {
                        setTimeout(function () {
                            page.evaluate(function () {
                                return $('#hplogo').get(0).getBoundingClientRect();
                            }, function (evalErr, result) {
                                page.clipRect = {
                                    top: result.top,
                                    left: result.left,
                                    width: result.width,
                                    height: result.height
                                };
                                page.render('google.png', { format: 'png', quality: 100 });
                                fs_1.readFile('./google.png', function (err, data) {
                                    if (err) {
                                        throw err;
                                    }
                                    _htmlScreenshotPromise.resolve({ data: data });
                                });
                            });
                        }, 5000);
                    });
                });
            });
        });
        return _htmlScreenshotPromise.promise;
    };
    return VizServices;
})();
module.exports = VizServices;
