/// <reference path="../../typings/phantomjs/phantomjs.d.ts" />
import { IPromise } from 'q';
declare class VizServices {
    static generateHTMLScreenshot(): IPromise;
}
export = VizServices;
