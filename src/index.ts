/**
 * Created by epotignano on 11/02/16.
 */

///<reference path='../typings/hapi/hapi.d.ts' />
'use strict';

import hapi = require('hapi');
import routes = require('./routes');

this.server = new hapi.Server();


var _host;
var lout_status = false;

if (process.env.NODE_ENV !== 'development') {
  _host = '0.0.0.0';
} else {
  _host = 'localhost';
}

this.server.connection({
  port: process.env.PORT || 5000,
  host: _host
});

// Add all API routes

routes.map((route, index) => {
  routes[index].path = '/api' + route.path;
  this.server.route(routes[index]);
});

// Lout documentation to see all the API routes
this.server.register([require('vision'), require('inert'), {
  register: require('lout'),
  options: {
    endpoint: '/api'
  }
}], function() {
  lout_status = true;
});

// Start server
this.server.start(() => {
  if (lout_status === true) {
    console.log('✓ lout: API Documentation generated at ' + this.server.info.uri + '/api');
  }
  console.log('✓ Hapi: Server started at ' + this.server.info.uri);
});
