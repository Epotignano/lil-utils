var viz_services_1 = require('./viz.services');
var _prefix = '/viz';
var vizRoutes = [{
        method: 'POST',
        path: _prefix + '/screenshot',
        handler: function (request, reply) {
            viz_services_1.generateHTMLScreenshot(request.payload.html);
        }
    }];
module.exports = vizRoutes;
