/**
 * Created by epotignano on 11/02/16.
 */

import { generateHTMLScreenshot } from './viz.services';

var _prefix = '/viz';

var vizRoutes = [{

  method: 'POST',
  path: _prefix + '/screenshot',
  handler: function(request, reply) {
    generateHTMLScreenshot(request.payload.html);
  }
}];

export = vizRoutes;
