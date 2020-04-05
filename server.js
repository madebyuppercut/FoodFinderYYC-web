(function() {
  'use strict';

  var express = require('express');
  var compression = require('compression');
  var app = express();

  function shouldCompress (req, res) {
    if (req.headers['x-no-compression']) {
      // don't compress responses with this request header
      return false;
    }

    // fallback to standard filter function
    return compression.filter(req, res);
  }

  // url encoding
  app.use(compression({filter: shouldCompress}));

  app.get('/*', function (req, res, next) {
    if (process.env.NODE_ENV !== 'local') {
      res.setHeader("Cache-Control", "public, max-age=1209600");
      res.setHeader("Expires", new Date(Date.now() + 1209600000).toUTCString());
    } else {
      res.setHeader("Cache-Control", "public, max-age=1");
      res.setHeader("Expires", new Date(Date.now() + 1000).toUTCString());
    }
    next();
  });
  // static file serve
  app.use('/', express.static(__dirname + '/dist'));
  app.use('/*', express.static(__dirname + '/dist/index.html'));
  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server running on: http://127.0.0.1:${process.env.PORT || 3000}`)
  });
})();
