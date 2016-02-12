/**
 * Created by epotignano on 11/02/16.
 */
///<reference path='../../typings/phantomjs/phantomjs.d.ts' />

var phantomjs = require('phantomjs-prebuilt');
var binPath = phantomjs.path;

console.log(binPath);


class VizServices {

  public static generateHTMLScreenshot() {
    console.log(binPath);
    return true;
  }
}

export = VizServices;
