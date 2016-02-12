/**
 * Created by epotignano on 11/02/16.
 */
///<reference path='../../typings/phantomjs/phantomjs.d.ts' />

// https://www.npmjs.com/package/phantomjs-prebuilt --- NPM PHANTOM PREBUILT DOCS

var phantomjs = require('phantomjs-prebuilt');
var binPath = phantomjs.path;
import { join } from 'path';
import { execFile } from 'child_process';
var driver = require('node-phantom-simple');
var _childArgs = [
  join(__dirname, 'phantomjs-script.js')
];
class VizServices {
  public static generateHTMLScreenshot() {
    driver.create({path: binPath}, (err, browser) => {
      return browser.createPage((err, page) => {
        return page.open('http://www.google.com', (err, status) => {
          console.log('opened? ', status);
          page.viewportSize = { width: 1440, height: 900 };
          page.includeJs('http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js', function (err, jquery) {
            //jquery Loaded for explore the document;
            setTimeout(() => {
              page.evaluate(() => {
                return $('#hplogo').get(0).getBoundingClientRect();
              }, (evalErr, result) => {
                page.clipRect = {
                  top:    result.top,
                  left:   result.left,
                  width:  result.width,
                  height: result.height
                };
                page.render('google.png');
                phantom.exit();
              });

            }, 5000);
          });




        });
      });
    });
  }
}

export = VizServices;
