"use strict";

var moduleConfig = require( "./config" );

var _startServer = function ( mimosaConfig, options, next ) {
  if ( mimosaConfig.startServer.prepare ) {
    mimosaConfig.startServer.prepare();
  }

  var server = require( mimosaConfig.startServer.path );

  if ( server.startServer ) {
    server.startServer( next );
  } else {
    mimosaConfig.log.error( "server file at [[ " + mimosaConfig.startServer.path  + " ]] does not export a startServer function" );
    next();
  }
};

var registration = function (config, register) {
  if ( config.isServer ) {
    register( ["postBuild"], "server", _startServer );
  }
};

module.exports = {
  registration: registration,
  defaults: moduleConfig.defaults,
  placeholder: moduleConfig.placeholder,
  validate: moduleConfig.validate
};
