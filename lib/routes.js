var vizRoutes = require('./viz/viz.routes');
var Route = (function () {
    function Route() {
    }
    return Route;
})();
exports.Route = Route;
var _routes = [];
module.exports = _routes.concat(vizRoutes);
