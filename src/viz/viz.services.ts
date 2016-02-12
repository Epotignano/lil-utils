import {read} from 'fs';
/**
 * Created by epotignano on 11/02/16.
 */
///<reference path='../../typings/phantomjs/phantomjs.d.ts' />

// https://www.npmjs.com/package/phantomjs-prebuilt --- NPM PHANTOM PREBUILT DOCS

var phantomjs = require('phantomjs-prebuilt');
var binPath = phantomjs.path;

import { defer, IPromise } from 'q';
import { join } from 'path';
import { execFile } from 'child_process';

var driver = require('node-phantom-simple');
var _childArgs = [
  join(__dirname, 'phantomjs-script.js')
];
import { readFile } from 'fs';

class VizServices {
  public static generateHTMLScreenshot() : IPromise  {

    var _htmlScreenshotPromise = defer();

    driver.create({path: binPath}, (err, browser) => {
      return browser.createPage((err, page) => {
        return page.open('http://www.google.com', (err, status) => {
          console.log('opened? ', status);
          page.viewportSize = { width: 1440, height: 900 };
          page.includeJs('http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js', (err, jquery) => {
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
                page.render('google.png', { format: 'png', quality: 100 }, (err, status) => {
                  readFile('./google.png', (err, data) => {
                    if (err) { throw err; }
                    _htmlScreenshotPromise.resolve({ image: data });
                  });
                });
              });
            }, 5000);
          });
        });
      });
    });
    return _htmlScreenshotPromise.promise;
  }
}

export = VizServices;
