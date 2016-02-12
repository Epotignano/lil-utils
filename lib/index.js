'use strict';
var _this = this;
var hapi = require('hapi');
var routes = require('./routes');
this.server = new hapi.Server();
var _host;
var lout_status = false;
if (process.env.NODE_ENV !== 'development') {
    _host = '0.0.0.0';
}
else {
    _host = 'localhost';
}
this.server.connection({
    port: process.env.PORT || 5000,
    host: _host
});
routes.map(function (route, index) {
    routes[index].path = '/api' + route.path;
    _this.server.route(routes[index]);
});
this.server.register([require('vision'), require('inert'), {
        register: require('lout'),
        options: {
            endpoint: '/api'
        }
    }], function () {
    lout_status = true;
});
this.server.start(function () {
    if (lout_status === true) {
        console.log('✓ lout: API Documentation generated at ' + _this.server.info.uri + '/api');
    }
    console.log('✓ Hapi: Server started at ' + _this.server.info.uri);
});
