mimosa-start-server
===========

## Overview

This module will call a hook in your project's server code in order to start a server during `mimosa watch`.

For more information regarding Mimosa, see http://mimosa.io

## Usage

Add `'start-server'` to your list of modules.  That's all!  Mimosa will install the module for you when you start `mimosa watch` or `mimosa build`.

## Functionality

During `mimosa watch` this module will call a `startServer` function exported by your server.  It provides a callback function to execute when the server has started so that Mimosa can carry on executing module code.

## How is this different from mimosa-server?

`mimosa-server` is a much bigger and more complicated module.  It has an embedded server that can leverage your server templates.  It expects your server to be returned and it expects live reload to be returned.  

If __all__ you need is to have your server started and you need nothing else, this is a much leaner and more straight forward module.

If you want to use mimosa-live-reload or mimosa-server-reload then you will need to use mimosa-server.  Those modules depend on your server returning a server object and optionally a socket.io connection.

## Default Config

```javascript
startServer: {
  path: "server.js",
  prepare: null
}
```

* `path`: the path from the root of your project to your server file. This file must export a `startServer` function.
* `prepare`: a function that can require and/or register any transpilers if, for instance, this module needs to start a CoffeeScript or LiveScript server

## Example Config

```javascript
startServer: {
  path: "server.coffee",
  prepare: function() {
    var cs = require("coffee-script");
    cs.register();
  }
}
```

