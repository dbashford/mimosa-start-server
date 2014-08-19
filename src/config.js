"use strict";

var path = require( "path" )
  , fs = require( "fs" );

exports.defaults = function() {
  return {
    startServer: {
      path: "server.js",
      prepare: null
    }
  };
};

exports.placeholder = function() {
  var ph = "  startServer:               # settings for start-server module\n" +
     "    path:[]                  # path to the server file, relative to the root of the project\n" +
     "    prepare:null             # a function that can require and/or register any transpilers\n" +
     "                             # if, for instance, this module needs to start a CoffeeScript\n" +
     "                             # or LiveScript server.\n";
  return ph;
};

exports.validate = function ( config, validators ) {
  var errors = [];

  if ( validators.ifExistsIsObject(errors, "startServer config", config.startServer ) ) {

    if ( config.startServer.prepare ) {
      if ( !( config.startServer.prepare instanceof Function ) ) {
        errors.push( "startServer.prepare must be a function" );
      }
    }

    if ( validators.ifExistsIsString( errors, "startServer.path", config.startServer.path ) ) {
      config.startServer.path = path.join( config.root, config.startServer.path);
      if ( !fs.existsSync( config.startServer.path ) ) {
        errors.push( "startServer.path does not exist, resolved it to [[ " + config.startServer.path + " ]]" );
      }
    }
  }

  return errors;
};
