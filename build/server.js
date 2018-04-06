require("source-map-support").install();
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _toConsumableArray2 = __webpack_require__(2);
  
  var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);
  
  var _set = __webpack_require__(3);
  
  var _set2 = _interopRequireDefault(_set);
  
  var _asyncToGenerator2 = __webpack_require__(4);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  __webpack_require__(5);
  
  var _path = __webpack_require__(6);
  
  var _path2 = _interopRequireDefault(_path);
  
  var _express = __webpack_require__(7);
  
  var _express2 = _interopRequireDefault(_express);
  
  var _cookieParser = __webpack_require__(8);
  
  var _cookieParser2 = _interopRequireDefault(_cookieParser);
  
  var _bodyParser = __webpack_require__(9);
  
  var _bodyParser2 = _interopRequireDefault(_bodyParser);
  
  var _expressJwt = __webpack_require__(10);
  
  var _expressJwt2 = _interopRequireDefault(_expressJwt);
  
  var _jsonwebtoken = __webpack_require__(11);
  
  var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
  
  var _jwksRsa = __webpack_require__(104);
  
  var _jwksRsa2 = _interopRequireDefault(_jwksRsa);
  
  var _react = __webpack_require__(12);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _server = __webpack_require__(13);
  
  var _server2 = _interopRequireDefault(_server);
  
  var _universalRouter = __webpack_require__(14);
  
  var _universalRouter2 = _interopRequireDefault(_universalRouter);
  
  var _prettyError = __webpack_require__(15);
  
  var _prettyError2 = _interopRequireDefault(_prettyError);
  
  var _Html = __webpack_require__(16);
  
  var _Html2 = _interopRequireDefault(_Html);
  
  var _ErrorPage = __webpack_require__(18);
  
  var _ErrorPage2 = __webpack_require__(20);
  
  var _ErrorPage3 = _interopRequireDefault(_ErrorPage2);
  
  var _passport = __webpack_require__(28);
  
  var _passport2 = _interopRequireDefault(_passport);
  
  var _routes = __webpack_require__(38);
  
  var _routes2 = _interopRequireDefault(_routes);
  
  var _assets = __webpack_require__(102);
  
  var _assets2 = _interopRequireDefault(_assets);
  
  var _config = __webpack_require__(17);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var app = (0, _express2.default)();
  
  //
  // Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
  // user agent is not known.
  // -----------------------------------------------------------------------------
  // eslint-disable-line import/no-unresolved
  
  // import models from './data/models';
  // import schema from './data/schema';
  
  // import expressGraphQL from 'express-graphql';
  global.navigator = global.navigator || {};
  global.navigator.userAgent = global.navigator.userAgent || 'all';
  
  //
  // Register Node.js middleware
  // -----------------------------------------------------------------------------
  app.use(_express2.default.static(_path2.default.join(__dirname, 'public')));
  app.use((0, _cookieParser2.default)());
  app.use(_bodyParser2.default.urlencoded({ extended: true }));
  app.use(_bodyParser2.default.json());
  
  //
  // Authentication
  // -----------------------------------------------------------------------------
  var authCheck = (0, _expressJwt2.default)({
    secret: _jwksRsa2.default.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      // YOUR-AUTH0-DOMAIN name e.g prosper.auth0.com
      jwksUri: 'https://tidalwavepredapp.eu.auth0.com/.well-known/jwks.json'
    }),
    // This is the identifier we set when we created the API
    audience: 'https://tidalwavepredapp.eu.auth0.com/api/v2/',
    issuer: 'tidalwavepredapp.eu.auth0.com',
    algorithms: ['RS256'],
    getToken: function getToken(req) {
      return req.cookies.id_token;
    }
  });
  
  app.use(_passport2.default.initialize());
  
  app.get('/login/facebook', _passport2.default.authenticate('facebook', { scope: ['email', 'user_location'], session: false }));
  app.get('/login/facebook/return', _passport2.default.authenticate('facebook', { failureRedirect: '/login', session: false }), function (req, res) {
    var expiresIn = 60 * 60 * 24 * 180; // 180 days
    var token = _jsonwebtoken2.default.sign(req.user, _config.auth.jwt.secret, { expiresIn: expiresIn });
    res.cookie('id_token', token, { maxAge: 1000 * expiresIn, httpOnly: true });
    res.redirect('/');
  });
  
  //
  // Register API middleware
  // -----------------------------------------------------------------------------
  // app.use('/graphql', expressGraphQL(req => ({
  //   schema,
  //   graphiql: true,
  //   rootValue: { request: req },
  //   pretty: process.env.NODE_ENV !== 'production',
  // })));
  
  //
  // Register server-side rendering middleware
  // -----------------------------------------------------------------------------
  app.get('*', function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(req, res, next) {
      var css, statusCode, data, html;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              css = new _set2.default();
              statusCode = 200;
              data = { title: '', description: '', style: '', script: _assets2.default.main.js, children: '' };
              _context.next = 6;
              return _universalRouter2.default.resolve(_routes2.default, {
                path: req.path,
                query: req.query,
                context: {
                  insertCss: function insertCss() {
                    for (var _len = arguments.length, styles = Array(_len), _key = 0; _key < _len; _key++) {
                      styles[_key] = arguments[_key];
                    }
  
                    styles.forEach(function (style) {
                      return css.add(style._getCss());
                    }); // eslint-disable-line no-underscore-dangle, max-len
                  },
                  setTitle: function setTitle(value) {
                    return data.title = value;
                  },
                  setMeta: function setMeta(key, value) {
                    return data[key] = value;
                  }
                },
                render: function render(component) {
                  var status = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 200;
  
                  // console.log('inside render of UniversalRouter', component);
                  css = new _set2.default();
                  statusCode = status;
                  data.children = _server2.default.renderToString(component);
                  data.style = [].concat((0, _toConsumableArray3.default)(css)).join('');
                  return true;
                }
              });
  
            case 6:
  
              // console.log('outside render func of UniversalRouter with statusCode', statusCode);
              html = _server2.default.renderToStaticMarkup(_react2.default.createElement(_Html2.default, data));
  
  
              res.status(statusCode);
              res.send('<!doctype html>' + html);
              _context.next = 14;
              break;
  
            case 11:
              _context.prev = 11;
              _context.t0 = _context['catch'](0);
  
              // console.log('some error occured', err);
              next(_context.t0);
  
            case 14:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, undefined, [[0, 11]]);
    }));
  
    return function (_x, _x2, _x3) {
      return _ref.apply(this, arguments);
    };
  }());
  
  //
  // Error handling
  // -----------------------------------------------------------------------------
  var pe = new _prettyError2.default();
  pe.skipNodeFiles();
  pe.skipPackage('express');
  
  app.use(function (err, req, res, next) {
    // eslint-disable-line no-unused-vars
    console.log(pe.render(err)); // eslint-disable-line no-console
    var statusCode = err.status || 500;
    var html = _server2.default.renderToStaticMarkup(_react2.default.createElement(
      _Html2.default,
      {
        title: 'Internal Server Error',
        description: err.message,
        style: _ErrorPage3.default._getCss() // eslint-disable-line no-underscore-dangle
      },
      _server2.default.renderToString(_react2.default.createElement(_ErrorPage.ErrorPageWithoutStyle, { error: err }))
    ));
    res.status(statusCode);
    res.send('<!doctype html>' + html);
  });
  
  app.listen(_config.port, function () {
    console.log('The server is running at http://localhost:' + _config.port + '/');
  });
  
  //
  // Launch the server
  // -----------------------------------------------------------------------------
  /* eslint-disable no-console */
  // models.sync().catch(err => console.error(err.stack)).then(() => {
  //   app.listen(port, () => {
  //     console.log(`The server is running at http://localhost:${port}/`);
  //   });
  // });
  /* eslint-enable no-console */

/***/ }),
/* 1 */
/***/ (function(module, exports) {

  module.exports = require("babel-runtime/regenerator");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

  module.exports = require("babel-runtime/helpers/toConsumableArray");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

  module.exports = require("babel-runtime/core-js/set");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

  module.exports = require("babel-runtime/helpers/asyncToGenerator");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

  module.exports = require("babel-polyfill");

/***/ }),
/* 6 */
/***/ (function(module, exports) {

  module.exports = require("path");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

  module.exports = require("express");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

  module.exports = require("cookie-parser");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

  module.exports = require("body-parser");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

  module.exports = require("express-jwt");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

  module.exports = require("jsonwebtoken");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

  module.exports = require("react");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

  module.exports = require("react-dom/server");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

  module.exports = require("universal-router");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

  module.exports = require("pretty-error");

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(12);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _config = __webpack_require__(17);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function Html(_ref) {
    var title = _ref.title,
        description = _ref.description,
        style = _ref.style,
        script = _ref.script,
        children = _ref.children;
  
    return _react2.default.createElement(
      'html',
      { className: 'no-js', lang: 'en' },
      _react2.default.createElement(
        'head',
        null,
        _react2.default.createElement('meta', { charSet: 'utf-8' }),
        _react2.default.createElement('meta', { httpEquiv: 'x-ua-compatible', content: 'ie=edge' }),
        _react2.default.createElement(
          'title',
          null,
          title
        ),
        _react2.default.createElement('meta', { name: 'description', content: description }),
        _react2.default.createElement('meta', { name: 'viewport', content: 'width=device-width, initial-scale=1' }),
        _react2.default.createElement('link', { rel: 'stylesheet', href: '/css/bootstrap.min.css' }),
        _react2.default.createElement('link', { rel: 'apple-touch-icon', href: 'apple-touch-icon.png' }),
        _react2.default.createElement('link', { rel: 'stylesheet', href: '/css/bootstrap-social.css' }),
        _react2.default.createElement('link', { rel: 'stylesheet', href: '/css/font-awesome.min.css' }),
        _react2.default.createElement('link', { rel: 'stylesheet', href: '/css/sb-admin.css' }),
        _react2.default.createElement('style', { id: 'css', dangerouslySetInnerHTML: { __html: style } })
      ),
      _react2.default.createElement(
        'body',
        null,
        _react2.default.createElement('div', { id: 'app', dangerouslySetInnerHTML: { __html: children } }),
        script && _react2.default.createElement('script', { src: script }),
        _config.analytics.google.trackingId && _react2.default.createElement('script', {
          dangerouslySetInnerHTML: { __html: 'window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;' + ('ga(\'create\',\'' + _config.analytics.google.trackingId + '\',\'auto\');ga(\'send\',\'pageview\')') }
        }),
        _config.analytics.google.trackingId && _react2.default.createElement('script', { src: 'https://www.google-analytics.com/analytics.js', async: true, defer: true })
      )
    );
  }
  
  Html.propTypes = {
    title: _react.PropTypes.string.isRequired,
    description: _react.PropTypes.string.isRequired,
    style: _react.PropTypes.string.isRequired,
    script: _react.PropTypes.string,
    children: _react.PropTypes.string
  };
  
  exports.default = Html;

/***/ }),
/* 17 */
/***/ (function(module, exports) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  /* eslint-disable max-len */
  
  var port = exports.port = process.env.PORT || 3000;
  var host = exports.host = process.env.WEBSITE_HOSTNAME || 'localhost:' + port;
  
  var databaseUrl = exports.databaseUrl = process.env.DATABASE_URL || 'sqlite:database.sqlite';
  
  var analytics = exports.analytics = {
  
    // https://analytics.google.com/
    google: {
      trackingId: process.env.GOOGLE_TRACKING_ID // UA-XXXXX-X
    }
  
  };
  
  var auth = exports.auth = {
  
    jwt: { secret: process.env.JWT_SECRET || 'React Starter Kit' },
  
    // https://developers.facebook.com/
    facebook: {
      id: process.env.FACEBOOK_APP_ID || '186244551745631',
      secret: process.env.FACEBOOK_APP_SECRET || 'a970ae3240ab4b9b8aae0f9f0661c6fc'
    },
  
    // https://cloud.google.com/console/project
    google: {
      id: process.env.GOOGLE_CLIENT_ID || '251410730550-ahcg0ou5mgfhl8hlui1urru7jn5s12km.apps.googleusercontent.com',
      secret: process.env.GOOGLE_CLIENT_SECRET || 'Y8yR9yZAhm9jQ8FKAL8QIEcd'
    },
  
    // https://apps.twitter.com/
    twitter: {
      key: process.env.TWITTER_CONSUMER_KEY || 'Ie20AZvLJI2lQD5Dsgxgjauns',
      secret: process.env.TWITTER_CONSUMER_SECRET || 'KTZ6cxoKnEakQCeSpZlaUCJWGAlTEBJj0y2EMkUBujA7zWSvaQ'
    }
  
  };

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ErrorPageWithoutStyle = undefined;
  
  var _react = __webpack_require__(12);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _withStyles = __webpack_require__(19);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _ErrorPage = __webpack_require__(20);
  
  var _ErrorPage2 = _interopRequireDefault(_ErrorPage);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  function ErrorPage(_ref, context) {
    var error = _ref.error;
  
    var title = 'Error';
    var content = 'Sorry, a critical error occurred on this page.';
    var errorMessage = null;
  
    if (error.status === 404) {
      title = 'Page Not Found';
      content = 'Sorry, the page you were trying to view does not exist.';
    } else if (true) {
      errorMessage = _react2.default.createElement(
        'pre',
        null,
        error.stack
      );
    }
  
    if (context.setTitle) {
      context.setTitle(title);
    }
  
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'h1',
        null,
        title
      ),
      _react2.default.createElement(
        'p',
        null,
        content
      ),
      errorMessage
    );
  } /**
     * React Starter Kit (https://www.reactstarterkit.com/)
     *
     * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE.txt file in the root directory of this source tree.
     */
  
  ErrorPage.propTypes = { error: _react.PropTypes.object.isRequired };
  ErrorPage.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.ErrorPageWithoutStyle = ErrorPage;
  exports.default = (0, _withStyles2.default)(_ErrorPage2.default)(ErrorPage);

/***/ }),
/* 19 */
/***/ (function(module, exports) {

  module.exports = require("isomorphic-style-loader/lib/withStyles");

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(21);
      var insertCss = __webpack_require__(23);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!../../../node_modules/postcss-loader/index.js?pack=default!./ErrorPage.css", function() {
          content = require("!!../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!../../../node_modules/postcss-loader/index.js?pack=default!./ErrorPage.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(22)();
  // imports
  
  
  // module
  exports.push([module.id, "/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n* {\n  line-height: 1.2;\n  margin: 0;\n}\n\nhtml {\n  color: #888;\n  display: table;\n  font-family: sans-serif;\n  height: 100%;\n  text-align: center;\n  width: 100%;\n}\n\nbody {\n  display: table-cell;\n  vertical-align: middle;\n  /* stylelint-disable */\n  margin: 2em auto;\n  /* stylelint-enable */\n}\n\nh1 {\n  color: #555;\n  font-size: 2em;\n  font-weight: 400;\n}\n\np {\n  margin: 0 auto;\n  width: 280px;\n}\n\npre {\n  text-align: left;\n  margin-top: 32px;\n  margin-top: 2rem;\n}\n\n@media only screen and (max-width: 280px) {\n  body,\n  p {\n    width: 95%;\n  }\n\n  h1 {\n    font-size: 1.5em;\n    margin: 0 0 0.3em;\n  }\n}\n", "", {"version":3,"sources":["/./routes/error/ErrorPage.css"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;AAEH;EACE,iBAAiB;EACjB,UAAU;CACX;;AAED;EACE,YAAY;EACZ,eAAe;EACf,wBAAwB;EACxB,aAAa;EACb,mBAAmB;EACnB,YAAY;CACb;;AAED;EACE,oBAAoB;EACpB,uBAAuB;EACvB,uBAAuB;EACvB,iBAAiB;EACjB,sBAAsB;CACvB;;AAED;EACE,YAAY;EACZ,eAAe;EACf,iBAAiB;CAClB;;AAED;EACE,eAAe;EACf,aAAa;CACd;;AAED;EACE,iBAAiB;EACjB,iBAAiB;EAAjB,iBAAiB;CAClB;;AAED;EACE;;IAEE,WAAW;GACZ;;EAED;IACE,iBAAiB;IACjB,kBAAkB;GACnB;CACF","file":"ErrorPage.css","sourcesContent":["/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n* {\n  line-height: 1.2;\n  margin: 0;\n}\n\nhtml {\n  color: #888;\n  display: table;\n  font-family: sans-serif;\n  height: 100%;\n  text-align: center;\n  width: 100%;\n}\n\nbody {\n  display: table-cell;\n  vertical-align: middle;\n  /* stylelint-disable */\n  margin: 2em auto;\n  /* stylelint-enable */\n}\n\nh1 {\n  color: #555;\n  font-size: 2em;\n  font-weight: 400;\n}\n\np {\n  margin: 0 auto;\n  width: 280px;\n}\n\npre {\n  text-align: left;\n  margin-top: 2rem;\n}\n\n@media only screen and (max-width: 280px) {\n  body,\n  p {\n    width: 95%;\n  }\n\n  h1 {\n    font-size: 1.5em;\n    margin: 0 0 0.3em;\n  }\n}\n"],"sourceRoot":"webpack://"}]);
  
  // exports


/***/ }),
/* 22 */
/***/ (function(module, exports) {

  /*
  	MIT License http://www.opensource.org/licenses/mit-license.php
  	Author Tobias Koppers @sokra
  */
  // css base code, injected by the css-loader
  module.exports = function() {
  	var list = [];
  
  	// return the list of modules as css string
  	list.toString = function toString() {
  		var result = [];
  		for(var i = 0; i < this.length; i++) {
  			var item = this[i];
  			if(item[2]) {
  				result.push("@media " + item[2] + "{" + item[1] + "}");
  			} else {
  				result.push(item[1]);
  			}
  		}
  		return result.join("");
  	};
  
  	// import a list of modules into the list
  	list.i = function(modules, mediaQuery) {
  		if(typeof modules === "string")
  			modules = [[null, modules, ""]];
  		var alreadyImportedModules = {};
  		for(var i = 0; i < this.length; i++) {
  			var id = this[i][0];
  			if(typeof id === "number")
  				alreadyImportedModules[id] = true;
  		}
  		for(i = 0; i < modules.length; i++) {
  			var item = modules[i];
  			// skip already imported module
  			// this implementation is not 100% perfect for weird media query combinations
  			//  when a module is imported multiple times with different media queries.
  			//  I hope this will never occur (Hey this way we have smaller bundles)
  			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
  				if(mediaQuery && !item[2]) {
  					item[2] = mediaQuery;
  				} else if(mediaQuery) {
  					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
  				}
  				list.push(item);
  			}
  		}
  	};
  	return list;
  };


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';
  
  var _assign = __webpack_require__(24);
  
  var _assign2 = _interopRequireDefault(_assign);
  
  var _stringify = __webpack_require__(25);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  var _slicedToArray2 = __webpack_require__(26);
  
  var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);
  
  var _getIterator2 = __webpack_require__(27);
  
  var _getIterator3 = _interopRequireDefault(_getIterator2);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * Isomorphic CSS style loader for Webpack
   *
   * Copyright © 2015-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var prefix = 's';
  var inserted = {};
  
  // Base64 encoding and decoding - The "Unicode Problem"
  // https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding#The_Unicode_Problem
  function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function (match, p1) {
      return String.fromCharCode('0x' + p1);
    }));
  }
  
  /**
   * Remove style/link elements for specified node IDs
   * if they are no longer referenced by UI components.
   */
  function removeCss(ids) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;
  
    try {
      for (var _iterator = (0, _getIterator3.default)(ids), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var id = _step.value;
  
        if (--inserted[id] <= 0) {
          var elem = document.getElementById(prefix + id);
          if (elem) {
            elem.parentNode.removeChild(elem);
          }
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }
  
  /**
   * Example:
   *   // Insert CSS styles object generated by `css-loader` into DOM
   *   var removeCss = insertCss([[1, 'body { color: red; }']]);
   *
   *   // Remove it from the DOM
   *   removeCss();
   */
  function insertCss(styles, options) {
    var _Object$assign = (0, _assign2.default)({
      replace: false,
      prepend: false
    }, options);
  
    var replace = _Object$assign.replace;
    var prepend = _Object$assign.prepend;
  
  
    var ids = [];
    for (var i = 0; i < styles.length; i++) {
      var _styles$i = (0, _slicedToArray3.default)(styles[i], 4);
  
      var moduleId = _styles$i[0];
      var css = _styles$i[1];
      var media = _styles$i[2];
      var sourceMap = _styles$i[3];
  
      var id = moduleId + '-' + i;
  
      ids.push(id);
  
      if (inserted[id]) {
        if (!replace) {
          inserted[id]++;
          continue;
        }
      }
  
      inserted[id] = 1;
  
      var elem = document.getElementById(prefix + id);
      var create = false;
  
      if (!elem) {
        create = true;
  
        elem = document.createElement('style');
        elem.setAttribute('type', 'text/css');
        elem.id = prefix + id;
  
        if (media) {
          elem.setAttribute('media', media);
        }
      }
  
      var cssText = css;
      if (sourceMap) {
        cssText += '\n/*# sourceMappingURL=data:application/json;base64,' + b64EncodeUnicode((0, _stringify2.default)(sourceMap)) + '*/';
        cssText += '\n/*# sourceURL=' + sourceMap.file + '*/';
      }
  
      if ('textContent' in elem) {
        elem.textContent = cssText;
      } else {
        elem.styleSheet.cssText = cssText;
      }
  
      if (create) {
        if (prepend) {
          document.head.insertBefore(elem, document.head.childNodes[0]);
        } else {
          document.head.appendChild(elem);
        }
      }
    }
  
    return removeCss.bind(null, ids);
  }
  
  module.exports = insertCss;

/***/ }),
/* 24 */
/***/ (function(module, exports) {

  module.exports = require("babel-runtime/core-js/object/assign");

/***/ }),
/* 25 */
/***/ (function(module, exports) {

  module.exports = require("babel-runtime/core-js/json/stringify");

/***/ }),
/* 26 */
/***/ (function(module, exports) {

  module.exports = require("babel-runtime/helpers/slicedToArray");

/***/ }),
/* 27 */
/***/ (function(module, exports) {

  module.exports = require("babel-runtime/core-js/get-iterator");

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(4);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _passport = __webpack_require__(29);
  
  var _passport2 = _interopRequireDefault(_passport);
  
  var _passportFacebook = __webpack_require__(30);
  
  var _models = __webpack_require__(31);
  
  var _config = __webpack_require__(17);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * Sign in with Facebook.
   */
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  /**
   * Passport.js reference implementation.
   * The database schema used in this sample is available at
   * https://github.com/membership/membership.db/tree/master/postgres
   */
  
  _passport2.default.use(new _passportFacebook.Strategy({
    clientID: _config.auth.facebook.id,
    clientSecret: _config.auth.facebook.secret,
    callbackURL: '/login/facebook/return',
    profileFields: ['name', 'email', 'link', 'locale', 'timezone'],
    passReqToCallback: true
  }, function (req, accessToken, refreshToken, profile, done) {
    /* eslint-disable no-underscore-dangle */
    var loginName = 'facebook';
    var claimType = 'urn:facebook:access_token';
    var fooBar = function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var userLogin, user, users, _user;
  
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!req.user) {
                  _context.next = 14;
                  break;
                }
  
                _context.next = 3;
                return _models.UserLogin.findOne({
                  attributes: ['name', 'key'],
                  where: { name: loginName, key: profile.id }
                });
  
              case 3:
                userLogin = _context.sent;
  
                if (!userLogin) {
                  _context.next = 8;
                  break;
                }
  
                // There is already a Facebook account that belongs to you.
                // Sign in with that account or delete it, then link it with your current account.
                done();
                _context.next = 12;
                break;
  
              case 8:
                _context.next = 10;
                return _models.User.create({
                  id: req.user.id,
                  email: profile._json.email,
                  logins: [{ name: loginName, key: profile.id }],
                  claims: [{ type: claimType, value: profile.id }],
                  profile: {
                    displayName: profile.displayName,
                    gender: profile._json.gender,
                    picture: 'https://graph.facebook.com/' + profile.id + '/picture?type=large'
                  }
                }, {
                  include: [{ model: _models.UserLogin, as: 'logins' }, { model: _models.UserClaim, as: 'claims' }, { model: _models.UserProfile, as: 'profile' }]
                });
  
              case 10:
                user = _context.sent;
  
                done(null, {
                  id: user.id,
                  email: user.email
                });
  
              case 12:
                _context.next = 32;
                break;
  
              case 14:
                _context.next = 16;
                return _models.User.findAll({
                  attributes: ['id', 'email'],
                  where: { '$logins.name$': loginName, '$logins.key$': profile.id },
                  include: [{
                    attributes: ['name', 'key'],
                    model: _models.UserLogin,
                    as: 'logins',
                    required: true
                  }]
                });
  
              case 16:
                users = _context.sent;
  
                if (!users.length) {
                  _context.next = 21;
                  break;
                }
  
                done(null, users[0]);
                _context.next = 32;
                break;
  
              case 21:
                _context.next = 23;
                return _models.User.findOne({ where: { email: profile._json.email } });
  
              case 23:
                _user = _context.sent;
  
                if (!_user) {
                  _context.next = 28;
                  break;
                }
  
                // There is already an account using this email address. Sign in to
                // that account and link it with Facebook manually from Account Settings.
                done(null);
                _context.next = 32;
                break;
  
              case 28:
                _context.next = 30;
                return _models.User.create({
                  email: profile._json.email,
                  emailVerified: true,
                  logins: [{ name: loginName, key: profile.id }],
                  claims: [{ type: claimType, value: accessToken }],
                  profile: {
                    displayName: profile.displayName,
                    gender: profile._json.gender,
                    picture: 'https://graph.facebook.com/' + profile.id + '/picture?type=large'
                  }
                }, {
                  include: [{ model: _models.UserLogin, as: 'logins' }, { model: _models.UserClaim, as: 'claims' }, { model: _models.UserProfile, as: 'profile' }]
                });
  
              case 30:
                _user = _context.sent;
  
                done(null, {
                  id: _user.id,
                  email: _user.email
                });
  
              case 32:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, undefined);
      }));
  
      return function fooBar() {
        return _ref.apply(this, arguments);
      };
    }();
  
    fooBar().catch(done);
  }));
  
  exports.default = _passport2.default;

/***/ }),
/* 29 */
/***/ (function(module, exports) {

  module.exports = require("passport");

/***/ }),
/* 30 */
/***/ (function(module, exports) {

  module.exports = require("passport-facebook");

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.UserProfile = exports.UserClaim = exports.UserLogin = exports.User = undefined;
  
  var _sequelize = __webpack_require__(32);
  
  var _sequelize2 = _interopRequireDefault(_sequelize);
  
  var _User = __webpack_require__(34);
  
  var _User2 = _interopRequireDefault(_User);
  
  var _UserLogin = __webpack_require__(35);
  
  var _UserLogin2 = _interopRequireDefault(_UserLogin);
  
  var _UserClaim = __webpack_require__(36);
  
  var _UserClaim2 = _interopRequireDefault(_UserClaim);
  
  var _UserProfile = __webpack_require__(37);
  
  var _UserProfile2 = _interopRequireDefault(_UserProfile);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  _User2.default.hasMany(_UserLogin2.default, {
    foreignKey: 'userId',
    as: 'logins',
    onUpdate: 'cascade',
    onDelete: 'cascade'
  }); /**
       * React Starter Kit (https://www.reactstarterkit.com/)
       *
       * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
       *
       * This source code is licensed under the MIT license found in the
       * LICENSE.txt file in the root directory of this source tree.
       */
  
  _User2.default.hasMany(_UserClaim2.default, {
    foreignKey: 'userId',
    as: 'claims',
    onUpdate: 'cascade',
    onDelete: 'cascade'
  });
  
  _User2.default.hasOne(_UserProfile2.default, {
    foreignKey: 'userId',
    as: 'profile',
    onUpdate: 'cascade',
    onDelete: 'cascade'
  });
  
  function sync() {
    return _sequelize2.default.sync.apply(_sequelize2.default, arguments);
  }
  
  exports.default = { sync: sync };
  exports.User = _User2.default;
  exports.UserLogin = _UserLogin2.default;
  exports.UserClaim = _UserClaim2.default;
  exports.UserProfile = _UserProfile2.default;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _sequelize = __webpack_require__(33);
  
  var _sequelize2 = _interopRequireDefault(_sequelize);
  
  var _config = __webpack_require__(17);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var sequelize = new _sequelize2.default(_config.databaseUrl, {
    define: {
      freezeTableName: true
    }
  });
  
  exports.default = sequelize;

/***/ }),
/* 33 */
/***/ (function(module, exports) {

  module.exports = require("sequelize");

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _sequelize = __webpack_require__(33);
  
  var _sequelize2 = _interopRequireDefault(_sequelize);
  
  var _sequelize3 = __webpack_require__(32);
  
  var _sequelize4 = _interopRequireDefault(_sequelize3);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var User = _sequelize4.default.define('User', {
  
    id: {
      type: _sequelize2.default.UUID,
      defaultValue: _sequelize2.default.UUIDV1,
      primaryKey: true
    },
  
    email: {
      type: _sequelize2.default.STRING(255),
      validate: { isEmail: true }
    },
  
    emailConfirmed: {
      type: _sequelize2.default.BOOLEAN,
      defaultValue: false
    }
  
  }, {
  
    indexes: [{ fields: ['email'] }]
  
  });
  
  exports.default = User;

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _sequelize = __webpack_require__(33);
  
  var _sequelize2 = _interopRequireDefault(_sequelize);
  
  var _sequelize3 = __webpack_require__(32);
  
  var _sequelize4 = _interopRequireDefault(_sequelize3);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var UserLogin = _sequelize4.default.define('UserLogin', {
  
    name: {
      type: _sequelize2.default.STRING(50),
      primaryKey: true
    },
  
    key: {
      type: _sequelize2.default.STRING(100),
      primaryKey: true
    }
  
  });
  
  exports.default = UserLogin;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _sequelize = __webpack_require__(33);
  
  var _sequelize2 = _interopRequireDefault(_sequelize);
  
  var _sequelize3 = __webpack_require__(32);
  
  var _sequelize4 = _interopRequireDefault(_sequelize3);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  var UserClaim = _sequelize4.default.define('UserClaim', {
  
    type: {
      type: _sequelize2.default.STRING
    },
  
    value: {
      type: _sequelize2.default.STRING
    }
  
  });
  
  exports.default = UserClaim;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _sequelize = __webpack_require__(33);
  
  var _sequelize2 = _interopRequireDefault(_sequelize);
  
  var _sequelize3 = __webpack_require__(32);
  
  var _sequelize4 = _interopRequireDefault(_sequelize3);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var UserProfile = _sequelize4.default.define('UserProfile', {
  
    userId: {
      type: _sequelize2.default.UUID,
      primaryKey: true
    },
  
    displayName: {
      type: _sequelize2.default.STRING(100)
    },
  
    picture: {
      type: _sequelize2.default.STRING(255)
    },
  
    gender: {
      type: _sequelize2.default.STRING(50)
    },
  
    location: {
      type: _sequelize2.default.STRING(100)
    },
  
    website: {
      type: _sequelize2.default.STRING(255)
    }
  
  });
  
  exports.default = UserProfile;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(4);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(12);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _App = __webpack_require__(39);
  
  var _App2 = _interopRequireDefault(_App);
  
  var _callback = __webpack_require__(111);
  
  var _callback2 = _interopRequireDefault(_callback);
  
  var _dashboard = __webpack_require__(121);
  
  var _dashboard2 = _interopRequireDefault(_dashboard);
  
  var _landing = __webpack_require__(116);
  
  var _landing2 = _interopRequireDefault(_landing);
  
  var _register = __webpack_require__(74);
  
  var _register2 = _interopRequireDefault(_register);
  
  var _upload = __webpack_require__(78);
  
  var _upload2 = _interopRequireDefault(_upload);
  
  var _prediction = __webpack_require__(87);
  
  var _prediction2 = _interopRequireDefault(_prediction);
  
  var _about = __webpack_require__(97);
  
  var _about2 = _interopRequireDefault(_about);
  
  var _chartHistory = __webpack_require__(99);
  
  var _chartHistory2 = _interopRequireDefault(_chartHistory);
  
  var _error = __webpack_require__(101);
  
  var _error2 = _interopRequireDefault(_error);
  
  var _Header = __webpack_require__(48);
  
  var _Header2 = _interopRequireDefault(_Header);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  // Child routes
  exports.default = [{
    path: '/landing',
    children: [_landing2.default],
    action: function action(_ref) {
      var _this = this;
  
      var next = _ref.next,
          render = _ref.render,
          context = _ref.context;
      return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var component;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return next();
  
              case 2:
                component = _context.sent;
  
                if (!(component === undefined)) {
                  _context.next = 5;
                  break;
                }
  
                return _context.abrupt('return', component);
  
              case 5:
                return _context.abrupt('return', render(_react2.default.createElement(
                  _App2.default,
                  { context: context },
                  component
                )));
  
              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  }, {
    path: '/callback',
    children: [_callback2.default],
    action: function action(_ref2) {
      var _this2 = this;
  
      var next = _ref2.next,
          render = _ref2.render,
          context = _ref2.context;
      return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        var component;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return next();
  
              case 2:
                component = _context2.sent;
  
                if (!(component === undefined)) {
                  _context2.next = 5;
                  break;
                }
  
                return _context2.abrupt('return', component);
  
              case 5:
                return _context2.abrupt('return', render(_react2.default.createElement(
                  _App2.default,
                  { context: context },
                  component
                )));
  
              case 6:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this2);
      }))();
    }
  }, {
    path: '/register',
    children: [_register2.default],
    action: function action(_ref3) {
      var _this3 = this;
  
      var next = _ref3.next,
          render = _ref3.render,
          context = _ref3.context;
      return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
        var component;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return next();
  
              case 2:
                component = _context3.sent;
  
                if (!(component === undefined)) {
                  _context3.next = 5;
                  break;
                }
  
                return _context3.abrupt('return', component);
  
              case 5:
                return _context3.abrupt('return', render(_react2.default.createElement(
                  _App2.default,
                  { context: context },
                  component
                )));
  
              case 6:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, _this3);
      }))();
    }
  }, {
    path: '/',
  
    // keep in mind, routes are evaluated in order
    children: [_dashboard2.default, _upload2.default, _prediction2.default, _about2.default, _chartHistory2.default,
    // place new routes before...
    _error2.default],
  
    action: function action(_ref4) {
      var _this4 = this;
  
      var next = _ref4.next,
          render = _ref4.render,
          context = _ref4.context;
      return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
        var component;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return next();
  
              case 2:
                component = _context4.sent;
  
                if (!(component === undefined)) {
                  _context4.next = 5;
                  break;
                }
  
                return _context4.abrupt('return', component);
  
              case 5:
                return _context4.abrupt('return', render(_react2.default.createElement(
                  'div',
                  null,
                  _react2.default.createElement(_Header2.default, null),
                  _react2.default.createElement(
                    'div',
                    { id: 'page-wrapper', className: 'page-wrapper' },
                    _react2.default.createElement(
                      _App2.default,
                      { context: context },
                      component
                    )
                  )
                )));
  
              case 6:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, _this4);
      }))();
    }
  }, {
    path: '/error',
    children: [_error2.default],
    action: function action(_ref5) {
      var _this5 = this;
  
      var next = _ref5.next,
          render = _ref5.render,
          context = _ref5.context;
      return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
        var component;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return next();
  
              case 2:
                component = _context5.sent;
  
                if (!(component === undefined)) {
                  _context5.next = 5;
                  break;
                }
  
                return _context5.abrupt('return', component);
  
              case 5:
                return _context5.abrupt('return', render(_react2.default.createElement(
                  _App2.default,
                  { context: context },
                  component
                )));
  
              case 6:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, _this5);
      }))();
    }
  }];

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(40);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(41);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(42);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(43);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(44);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(12);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _emptyFunction = __webpack_require__(45);
  
  var _emptyFunction2 = _interopRequireDefault(_emptyFunction);
  
  var _App = __webpack_require__(46);
  
  var _App2 = _interopRequireDefault(_App);
  
  var _Header = __webpack_require__(48);
  
  var _Header2 = _interopRequireDefault(_Header);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  // import Feedback from '../Feedback';
  // import Footer from '../Footer';
  // import Auth from '../../Auth/Auth';
  
  // const auth = new Auth();
  // auth.login();
  var App = function (_Component) {
    (0, _inherits3.default)(App, _Component);
  
    function App() {
      (0, _classCallCheck3.default)(this, App);
      return (0, _possibleConstructorReturn3.default)(this, (App.__proto__ || (0, _getPrototypeOf2.default)(App)).apply(this, arguments));
    }
  
    (0, _createClass3.default)(App, [{
      key: 'getChildContext',
      value: function getChildContext() {
        var context = this.props.context;
        return {
          insertCss: context.insertCss || _emptyFunction2.default,
          setTitle: context.setTitle || _emptyFunction2.default,
          setMeta: context.setMeta || _emptyFunction2.default
        };
      }
    }, {
      key: 'componentWillMount',
      value: function componentWillMount() {
        var insertCss = this.props.context.insertCss;
  
        this.removeCss = insertCss(_App2.default);
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this.removeCss();
      }
    }, {
      key: 'render',
      value: function render() {
        // console.log('\n********\n', this.props, '\n********12334\n');
        return this.props.children;
      }
    }]);
    return App;
  }(_react.Component);
  
  App.propTypes = {
    context: _react.PropTypes.shape({
      insertCss: _react.PropTypes.func,
      setTitle: _react.PropTypes.func,
      setMeta: _react.PropTypes.func
    }),
    children: _react.PropTypes.element.isRequired,
    error: _react.PropTypes.object
  };
  App.childContextTypes = {
    insertCss: _react.PropTypes.func.isRequired,
    setTitle: _react.PropTypes.func.isRequired,
    setMeta: _react.PropTypes.func.isRequired
  };
  exports.default = App;

/***/ }),
/* 40 */
/***/ (function(module, exports) {

  module.exports = require("babel-runtime/core-js/object/get-prototype-of");

/***/ }),
/* 41 */
/***/ (function(module, exports) {

  module.exports = require("babel-runtime/helpers/classCallCheck");

/***/ }),
/* 42 */
/***/ (function(module, exports) {

  module.exports = require("babel-runtime/helpers/createClass");

/***/ }),
/* 43 */
/***/ (function(module, exports) {

  module.exports = require("babel-runtime/helpers/possibleConstructorReturn");

/***/ }),
/* 44 */
/***/ (function(module, exports) {

  module.exports = require("babel-runtime/helpers/inherits");

/***/ }),
/* 45 */
/***/ (function(module, exports) {

  module.exports = require("fbjs/lib/emptyFunction");

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(47);
      var insertCss = __webpack_require__(23);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!../../../node_modules/postcss-loader/index.js?pack=default!./App.css", function() {
          content = require("!!../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!../../../node_modules/postcss-loader/index.js?pack=default!./App.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(22)();
  // imports
  
  
  // module
  exports.push([module.id, "/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n/*! normalize.css v4.1.1 | MIT License | github.com/necolas/normalize.css */\n\n/**\n * 1. Change the default font family in all browsers (opinionated).\n * 2. Correct the line height in all browsers.\n * 3. Prevent adjustments of font size after orientation changes in IE and iOS.\n */\n\nhtml {\n  font-family: sans-serif; /* 1 */\n  line-height: 1.15; /* 2 */\n  -ms-text-size-adjust: 100%; /* 3 */\n  -webkit-text-size-adjust: 100%; /* 3 */\n}\n\n/**\n * Remove the margin in all browsers (opinionated).\n */\n\nbody {\n  margin: 0;\n}\n\n/* HTML5 display definitions\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n * 1. Add the correct display in Edge, IE, and Firefox.\n * 2. Add the correct display in IE.\n */\n\narticle,\naside,\ndetails, /* 1 */\nfigcaption,\nfigure,\nfooter,\nheader,\nmain, /* 2 */\nmenu,\nnav,\nsection,\nsummary { /* 1 */\n  display: block;\n}\n\n/**\n * Add the correct display in IE 9-.\n */\n\naudio,\ncanvas,\nprogress,\nvideo {\n  display: inline-block;\n}\n\n/**\n * Add the correct display in iOS 4-7.\n */\n\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n\n/**\n * Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\n\nprogress {\n  vertical-align: baseline;\n}\n\n/**\n * Add the correct display in IE 10-.\n * 1. Add the correct display in IE.\n */\n\ntemplate, /* 1 */\n[hidden] {\n  display: none;\n}\n\n/* Links\n   ========================================================================== */\n\n/**\n * 1. Remove the gray background on active links in IE 10.\n * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\n */\n\na {\n  background-color: transparent; /* 1 */\n  -webkit-text-decoration-skip: objects; /* 2 */\n}\n\n/**\n * Remove the outline on focused links when they are also active or hovered\n * in all browsers (opinionated).\n */\n\na:active,\na:hover {\n  outline-width: 0;\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * 1. Remove the bottom border in Firefox 39-.\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\n\nabbr[title] {\n  border-bottom: none; /* 1 */\n  text-decoration: underline; /* 2 */\n  text-decoration: underline dotted; /* 2 */\n}\n\n/**\n * Prevent the duplicate application of `bolder` by the next rule in Safari 6.\n */\n\nb,\nstrong {\n  font-weight: inherit;\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * Add the correct font style in Android 4.3-.\n */\n\ndfn {\n  font-style: italic;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/**\n * Add the correct background and color in IE 9-.\n */\n\nmark {\n  background-color: #ff0;\n  color: #000;\n}\n\n/**\n * Add the correct font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Remove the border on images inside links in IE 10-.\n */\n\nimg {\n  border-style: none;\n}\n\n/**\n * Hide the overflow in IE.\n */\n\nsvg:not(:root) {\n  overflow: hidden;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\ncode,\nkbd,\npre,\nsamp {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/**\n * Add the correct margin in IE 8.\n */\n\nfigure {\n  margin: 1em 40px;\n}\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\n\nhr {\n  -webkit-box-sizing: content-box;\n          box-sizing: content-box; /* 1 */\n  height: 0; /* 1 */\n  overflow: visible; /* 2 */\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * 1. Change font properties to `inherit` in all browsers (opinionated).\n * 2. Remove the margin in Firefox and Safari.\n */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font: inherit; /* 1 */\n  margin: 0; /* 2 */\n}\n\n/**\n * Restore the font weight unset by the previous rule.\n */\n\noptgroup {\n  font-weight: bold;\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\n\nbutton,\ninput { /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\n\nbutton,\nselect { /* 1 */\n  text-transform: none;\n}\n\n/**\n * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\n *    controls in Android 4.\n * 2. Correct the inability to style clickable types in iOS and Safari.\n */\n\nbutton,\nhtml [type=\"button\"], /* 1 */\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button; /* 2 */\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\n\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\n\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * Change the border, margin, and padding in all browsers (opinionated).\n */\n\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\n\nlegend {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box; /* 1 */\n  color: inherit; /* 2 */\n  display: table; /* 1 */\n  max-width: 100%; /* 1 */\n  padding: 0; /* 3 */\n  white-space: normal; /* 1 */\n}\n\n/**\n * Remove the default vertical scrollbar in IE.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10-.\n * 2. Remove the padding in IE 10-.\n */\n\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n\n[type=\"search\"] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/**\n * Remove the inner padding and cancel buttons in Chrome and Safari on OS X.\n */\n\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * Correct the text style of placeholders in Chrome, Edge, and Safari.\n */\n\n::-webkit-input-placeholder {\n  color: inherit;\n  opacity: 0.54;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n\n/*! React Starter Kit | MIT License | https://www.reactstarterkit.com/ */\n\n/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n}\n\n/*\n * Base styles\n * ========================================================================== */\n\nhtml {\n  color: #222;\n  font-size: 1em; /* ~16px; */\n  font-family: 'Segoe UI', 'HelveticaNeue-Light', sans-serif;\n  line-height: 1.375; /* ~22px */\n}\n\na {\n  color: #0074c2;\n}\n\n/*\n * Remove text-shadow in selection highlight:\n * https://twitter.com/miketaylr/status/12228805301\n *\n * These selection rule sets have to be separate.\n * Customize the background color to match your design.\n */\n\n::-moz-selection {\n  background: #b3d4fc;\n  text-shadow: none;\n}\n\n::selection {\n  background: #b3d4fc;\n  text-shadow: none;\n}\n\n/*\n * A better looking default horizontal rule\n */\n\nhr {\n  display: block;\n  height: 1px;\n  border: 0;\n  border-top: 1px solid #ccc;\n  margin: 1em 0;\n  padding: 0;\n}\n\n/*\n * Remove the gap between audio, canvas, iframes,\n * images, videos and the bottom of their containers:\n * https://github.com/h5bp/html5-boilerplate/issues/440\n */\n\naudio,\ncanvas,\niframe,\nimg,\nsvg,\nvideo {\n  vertical-align: middle;\n}\n\n/*\n * Remove default fieldset styles.\n */\n\nfieldset {\n  border: 0;\n  margin: 0;\n  padding: 0;\n}\n\n/*\n * Allow only vertical resizing of textareas.\n */\n\ntextarea {\n  resize: vertical;\n}\n\n/*\n * Browser upgrade prompt\n * ========================================================================== */\n\n.browserupgrade {\n  margin: 0.2em 0;\n  background: #ccc;\n  color: #000;\n  padding: 0.2em 0;\n}\n\n/*\n * Print styles\n * Inlined to avoid the additional HTTP request:\n * http://www.phpied.com/delay-loading-your-print-css/\n * ========================================================================== */\n\n@media print {\n  *,\n  *::before,\n  *::after {\n    background: transparent !important;\n    color: #000 !important; /* Black prints faster: http://www.sanbeiji.com/archives/953 */\n    -webkit-box-shadow: none !important;\n            box-shadow: none !important;\n    text-shadow: none !important;\n  }\n\n  a,\n  a:visited {\n    text-decoration: underline;\n  }\n\n  a[href]::after {\n    content: ' (' attr(href) ')';\n  }\n\n  abbr[title]::after {\n    content: ' (' attr(title) ')';\n  }\n\n  /*\n   * Don't show links that are fragment identifiers,\n   * or use the `javascript:` pseudo protocol\n   */\n\n  a[href^='#']::after,\n  a[href^='javascript:']::after {\n    content: '';\n  }\n\n  pre,\n  blockquote {\n    border: 1px solid #999;\n    page-break-inside: avoid;\n  }\n\n  /*\n   * Printing Tables:\n   * http://css-discuss.incutio.com/wiki/Printing_Tables\n   */\n\n  thead {\n    display: table-header-group;\n  }\n\n  tr,\n  img {\n    page-break-inside: avoid;\n  }\n\n  img {\n    max-width: 100% !important;\n  }\n\n  p,\n  h2,\n  h3 {\n    orphans: 3;\n    widows: 3;\n  }\n\n  h2,\n  h3 {\n    page-break-after: avoid;\n  }\n}\n", "", {"version":3,"sources":["/./components/App/App.css","/../node_modules/normalize.css/normalize.css","/./components/variables.css"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;ACPH,4EAA4E;;AAE5E;;;;GAIG;;AAEH;EACE,wBAAwB,CAAC,OAAO;EAChC,kBAAkB,CAAC,OAAO;EAC1B,2BAA2B,CAAC,OAAO;EACnC,+BAA+B,CAAC,OAAO;CACxC;;AAED;;GAEG;;AAEH;EACE,UAAU;CACX;;AAED;gFACgF;;AAEhF;;;;GAIG;;AAEH;;;;;;;;;;;UAWU,OAAO;EACf,eAAe;CAChB;;AAED;;GAEG;;AAEH;;;;EAIE,sBAAsB;CACvB;;AAED;;GAEG;;AAEH;EACE,cAAc;EACd,UAAU;CACX;;AAED;;GAEG;;AAEH;EACE,yBAAyB;CAC1B;;AAED;;;GAGG;;AAEH;;EAEE,cAAc;CACf;;AAED;gFACgF;;AAEhF;;;GAGG;;AAEH;EACE,8BAA8B,CAAC,OAAO;EACtC,sCAAsC,CAAC,OAAO;CAC/C;;AAED;;;GAGG;;AAEH;;EAEE,iBAAiB;CAClB;;AAED;gFACgF;;AAEhF;;;GAGG;;AAEH;EACE,oBAAoB,CAAC,OAAO;EAC5B,2BAA2B,CAAC,OAAO;EACnC,kCAAkC,CAAC,OAAO;CAC3C;;AAED;;GAEG;;AAEH;;EAEE,qBAAqB;CACtB;;AAED;;GAEG;;AAEH;;EAEE,oBAAoB;CACrB;;AAED;;GAEG;;AAEH;EACE,mBAAmB;CACpB;;AAED;;;GAGG;;AAEH;EACE,eAAe;EACf,iBAAiB;CAClB;;AAED;;GAEG;;AAEH;EACE,uBAAuB;EACvB,YAAY;CACb;;AAED;;GAEG;;AAEH;EACE,eAAe;CAChB;;AAED;;;GAGG;;AAEH;;EAEE,eAAe;EACf,eAAe;EACf,mBAAmB;EACnB,yBAAyB;CAC1B;;AAED;EACE,gBAAgB;CACjB;;AAED;EACE,YAAY;CACb;;AAED;gFACgF;;AAEhF;;GAEG;;AAEH;EACE,mBAAmB;CACpB;;AAED;;GAEG;;AAEH;EACE,iBAAiB;CAClB;;AAED;gFACgF;;AAEhF;;;GAGG;;AAEH;;;;EAIE,kCAAkC,CAAC,OAAO;EAC1C,eAAe,CAAC,OAAO;CACxB;;AAED;;GAEG;;AAEH;EACE,iBAAiB;CAClB;;AAED;;;GAGG;;AAEH;EACE,gCAAwB;UAAxB,wBAAwB,CAAC,OAAO;EAChC,UAAU,CAAC,OAAO;EAClB,kBAAkB,CAAC,OAAO;CAC3B;;AAED;gFACgF;;AAEhF;;;GAGG;;AAEH;;;;;EAKE,cAAc,CAAC,OAAO;EACtB,UAAU,CAAC,OAAO;CACnB;;AAED;;GAEG;;AAEH;EACE,kBAAkB;CACnB;;AAED;;;GAGG;;AAEH;QACQ,OAAO;EACb,kBAAkB;CACnB;;AAED;;;GAGG;;AAEH;SACS,OAAO;EACd,qBAAqB;CACtB;;AAED;;;;GAIG;;AAEH;;;;EAIE,2BAA2B,CAAC,OAAO;CACpC;;AAED;;GAEG;;AAEH;;;;EAIE,mBAAmB;EACnB,WAAW;CACZ;;AAED;;GAEG;;AAEH;;;;EAIE,+BAA+B;CAChC;;AAED;;GAEG;;AAEH;EACE,0BAA0B;EAC1B,cAAc;EACd,+BAA+B;CAChC;;AAED;;;;;GAKG;;AAEH;EACE,+BAAuB;UAAvB,uBAAuB,CAAC,OAAO;EAC/B,eAAe,CAAC,OAAO;EACvB,eAAe,CAAC,OAAO;EACvB,gBAAgB,CAAC,OAAO;EACxB,WAAW,CAAC,OAAO;EACnB,oBAAoB,CAAC,OAAO;CAC7B;;AAED;;GAEG;;AAEH;EACE,eAAe;CAChB;;AAED;;;GAGG;;AAEH;;EAEE,+BAAuB;UAAvB,uBAAuB,CAAC,OAAO;EAC/B,WAAW,CAAC,OAAO;CACpB;;AAED;;GAEG;;AAEH;;EAEE,aAAa;CACd;;AAED;;;GAGG;;AAEH;EACE,8BAA8B,CAAC,OAAO;EACtC,qBAAqB,CAAC,OAAO;CAC9B;;AAED;;GAEG;;AAEH;;EAEE,yBAAyB;CAC1B;;AAED;;GAEG;;AAEH;EACE,eAAe;EACf,cAAc;CACf;;AAED;;;GAGG;;AAEH;EACE,2BAA2B,CAAC,OAAO;EACnC,cAAc,CAAC,OAAO;CACvB;;AD1ZD,yEAAyE;;AEXzE;;;;;;;GAOG;;AAEH;EACE;;gFAE8E;;EAI9E;;gFAE8E;;EAI9E;;gFAE8E,EAErD,gCAAgC,EAChC,2BAA2B,EAC3B,6BAA6B,CAC7B,iCAAiC;CAC3D;;AFfD;;gFAEgF;;AAEhF;EACE,YAAY;EACZ,eAAe,CAAC,YAAY;EAC5B,2DAAqC;EACrC,mBAAmB,CAAC,WAAW;CAChC;;AAED;EACE,eAAe;CAChB;;AAED;;;;;;GAMG;;AAEH;EACE,oBAAoB;EACpB,kBAAkB;CACnB;;AAED;EACE,oBAAoB;EACpB,kBAAkB;CACnB;;AAED;;GAEG;;AAEH;EACE,eAAe;EACf,YAAY;EACZ,UAAU;EACV,2BAA2B;EAC3B,cAAc;EACd,WAAW;CACZ;;AAED;;;;GAIG;;AAEH;;;;;;EAME,uBAAuB;CACxB;;AAED;;GAEG;;AAEH;EACE,UAAU;EACV,UAAU;EACV,WAAW;CACZ;;AAED;;GAEG;;AAEH;EACE,iBAAiB;CAClB;;AAED;;gFAEgF;;AAEhF;EACE,gBAAgB;EAChB,iBAAiB;EACjB,YAAY;EACZ,iBAAiB;CAClB;;AAED;;;;gFAIgF;;AAEhF;EACE;;;IAGE,mCAAmC;IACnC,uBAAuB,CAAC,+DAA+D;IACvF,oCAA4B;YAA5B,4BAA4B;IAC5B,6BAA6B;GAC9B;;EAED;;IAEE,2BAA2B;GAC5B;;EAED;IACE,6BAA6B;GAC9B;;EAED;IACE,8BAA8B;GAC/B;;EAED;;;KAGG;;EAEH;;IAEE,YAAY;GACb;;EAED;;IAEE,uBAAuB;IACvB,yBAAyB;GAC1B;;EAED;;;KAGG;;EAEH;IACE,4BAA4B;GAC7B;;EAED;;IAEE,yBAAyB;GAC1B;;EAED;IACE,2BAA2B;GAC5B;;EAED;;;IAGE,WAAW;IACX,UAAU;GACX;;EAED;;IAEE,wBAAwB;GACzB;CACF","file":"App.css","sourcesContent":["/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n@import '../../../node_modules/normalize.css/normalize.css';\n\n/*! React Starter Kit | MIT License | https://www.reactstarterkit.com/ */\n\n@import '../variables.css';\n\n/*\n * Base styles\n * ========================================================================== */\n\nhtml {\n  color: #222;\n  font-size: 1em; /* ~16px; */\n  font-family: var(--font-family-base);\n  line-height: 1.375; /* ~22px */\n}\n\na {\n  color: #0074c2;\n}\n\n/*\n * Remove text-shadow in selection highlight:\n * https://twitter.com/miketaylr/status/12228805301\n *\n * These selection rule sets have to be separate.\n * Customize the background color to match your design.\n */\n\n::-moz-selection {\n  background: #b3d4fc;\n  text-shadow: none;\n}\n\n::selection {\n  background: #b3d4fc;\n  text-shadow: none;\n}\n\n/*\n * A better looking default horizontal rule\n */\n\nhr {\n  display: block;\n  height: 1px;\n  border: 0;\n  border-top: 1px solid #ccc;\n  margin: 1em 0;\n  padding: 0;\n}\n\n/*\n * Remove the gap between audio, canvas, iframes,\n * images, videos and the bottom of their containers:\n * https://github.com/h5bp/html5-boilerplate/issues/440\n */\n\naudio,\ncanvas,\niframe,\nimg,\nsvg,\nvideo {\n  vertical-align: middle;\n}\n\n/*\n * Remove default fieldset styles.\n */\n\nfieldset {\n  border: 0;\n  margin: 0;\n  padding: 0;\n}\n\n/*\n * Allow only vertical resizing of textareas.\n */\n\ntextarea {\n  resize: vertical;\n}\n\n/*\n * Browser upgrade prompt\n * ========================================================================== */\n\n:global(.browserupgrade) {\n  margin: 0.2em 0;\n  background: #ccc;\n  color: #000;\n  padding: 0.2em 0;\n}\n\n/*\n * Print styles\n * Inlined to avoid the additional HTTP request:\n * http://www.phpied.com/delay-loading-your-print-css/\n * ========================================================================== */\n\n@media print {\n  *,\n  *::before,\n  *::after {\n    background: transparent !important;\n    color: #000 !important; /* Black prints faster: http://www.sanbeiji.com/archives/953 */\n    box-shadow: none !important;\n    text-shadow: none !important;\n  }\n\n  a,\n  a:visited {\n    text-decoration: underline;\n  }\n\n  a[href]::after {\n    content: ' (' attr(href) ')';\n  }\n\n  abbr[title]::after {\n    content: ' (' attr(title) ')';\n  }\n\n  /*\n   * Don't show links that are fragment identifiers,\n   * or use the `javascript:` pseudo protocol\n   */\n\n  a[href^='#']::after,\n  a[href^='javascript:']::after {\n    content: '';\n  }\n\n  pre,\n  blockquote {\n    border: 1px solid #999;\n    page-break-inside: avoid;\n  }\n\n  /*\n   * Printing Tables:\n   * http://css-discuss.incutio.com/wiki/Printing_Tables\n   */\n\n  thead {\n    display: table-header-group;\n  }\n\n  tr,\n  img {\n    page-break-inside: avoid;\n  }\n\n  img {\n    max-width: 100% !important;\n  }\n\n  p,\n  h2,\n  h3 {\n    orphans: 3;\n    widows: 3;\n  }\n\n  h2,\n  h3 {\n    page-break-after: avoid;\n  }\n}\n","/*! normalize.css v4.1.1 | MIT License | github.com/necolas/normalize.css */\n\n/**\n * 1. Change the default font family in all browsers (opinionated).\n * 2. Correct the line height in all browsers.\n * 3. Prevent adjustments of font size after orientation changes in IE and iOS.\n */\n\nhtml {\n  font-family: sans-serif; /* 1 */\n  line-height: 1.15; /* 2 */\n  -ms-text-size-adjust: 100%; /* 3 */\n  -webkit-text-size-adjust: 100%; /* 3 */\n}\n\n/**\n * Remove the margin in all browsers (opinionated).\n */\n\nbody {\n  margin: 0;\n}\n\n/* HTML5 display definitions\n   ========================================================================== */\n\n/**\n * Add the correct display in IE 9-.\n * 1. Add the correct display in Edge, IE, and Firefox.\n * 2. Add the correct display in IE.\n */\n\narticle,\naside,\ndetails, /* 1 */\nfigcaption,\nfigure,\nfooter,\nheader,\nmain, /* 2 */\nmenu,\nnav,\nsection,\nsummary { /* 1 */\n  display: block;\n}\n\n/**\n * Add the correct display in IE 9-.\n */\n\naudio,\ncanvas,\nprogress,\nvideo {\n  display: inline-block;\n}\n\n/**\n * Add the correct display in iOS 4-7.\n */\n\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n\n/**\n * Add the correct vertical alignment in Chrome, Firefox, and Opera.\n */\n\nprogress {\n  vertical-align: baseline;\n}\n\n/**\n * Add the correct display in IE 10-.\n * 1. Add the correct display in IE.\n */\n\ntemplate, /* 1 */\n[hidden] {\n  display: none;\n}\n\n/* Links\n   ========================================================================== */\n\n/**\n * 1. Remove the gray background on active links in IE 10.\n * 2. Remove gaps in links underline in iOS 8+ and Safari 8+.\n */\n\na {\n  background-color: transparent; /* 1 */\n  -webkit-text-decoration-skip: objects; /* 2 */\n}\n\n/**\n * Remove the outline on focused links when they are also active or hovered\n * in all browsers (opinionated).\n */\n\na:active,\na:hover {\n  outline-width: 0;\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * 1. Remove the bottom border in Firefox 39-.\n * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\n */\n\nabbr[title] {\n  border-bottom: none; /* 1 */\n  text-decoration: underline; /* 2 */\n  text-decoration: underline dotted; /* 2 */\n}\n\n/**\n * Prevent the duplicate application of `bolder` by the next rule in Safari 6.\n */\n\nb,\nstrong {\n  font-weight: inherit;\n}\n\n/**\n * Add the correct font weight in Chrome, Edge, and Safari.\n */\n\nb,\nstrong {\n  font-weight: bolder;\n}\n\n/**\n * Add the correct font style in Android 4.3-.\n */\n\ndfn {\n  font-style: italic;\n}\n\n/**\n * Correct the font size and margin on `h1` elements within `section` and\n * `article` contexts in Chrome, Firefox, and Safari.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/**\n * Add the correct background and color in IE 9-.\n */\n\nmark {\n  background-color: #ff0;\n  color: #000;\n}\n\n/**\n * Add the correct font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` elements from affecting the line height in\n * all browsers.\n */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\nsup {\n  top: -0.5em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Remove the border on images inside links in IE 10-.\n */\n\nimg {\n  border-style: none;\n}\n\n/**\n * Hide the overflow in IE.\n */\n\nsvg:not(:root) {\n  overflow: hidden;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * 1. Correct the inheritance and scaling of font size in all browsers.\n * 2. Correct the odd `em` font sizing in all browsers.\n */\n\ncode,\nkbd,\npre,\nsamp {\n  font-family: monospace, monospace; /* 1 */\n  font-size: 1em; /* 2 */\n}\n\n/**\n * Add the correct margin in IE 8.\n */\n\nfigure {\n  margin: 1em 40px;\n}\n\n/**\n * 1. Add the correct box sizing in Firefox.\n * 2. Show the overflow in Edge and IE.\n */\n\nhr {\n  box-sizing: content-box; /* 1 */\n  height: 0; /* 1 */\n  overflow: visible; /* 2 */\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * 1. Change font properties to `inherit` in all browsers (opinionated).\n * 2. Remove the margin in Firefox and Safari.\n */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  font: inherit; /* 1 */\n  margin: 0; /* 2 */\n}\n\n/**\n * Restore the font weight unset by the previous rule.\n */\n\noptgroup {\n  font-weight: bold;\n}\n\n/**\n * Show the overflow in IE.\n * 1. Show the overflow in Edge.\n */\n\nbutton,\ninput { /* 1 */\n  overflow: visible;\n}\n\n/**\n * Remove the inheritance of text transform in Edge, Firefox, and IE.\n * 1. Remove the inheritance of text transform in Firefox.\n */\n\nbutton,\nselect { /* 1 */\n  text-transform: none;\n}\n\n/**\n * 1. Prevent a WebKit bug where (2) destroys native `audio` and `video`\n *    controls in Android 4.\n * 2. Correct the inability to style clickable types in iOS and Safari.\n */\n\nbutton,\nhtml [type=\"button\"], /* 1 */\n[type=\"reset\"],\n[type=\"submit\"] {\n  -webkit-appearance: button; /* 2 */\n}\n\n/**\n * Remove the inner border and padding in Firefox.\n */\n\nbutton::-moz-focus-inner,\n[type=\"button\"]::-moz-focus-inner,\n[type=\"reset\"]::-moz-focus-inner,\n[type=\"submit\"]::-moz-focus-inner {\n  border-style: none;\n  padding: 0;\n}\n\n/**\n * Restore the focus styles unset by the previous rule.\n */\n\nbutton:-moz-focusring,\n[type=\"button\"]:-moz-focusring,\n[type=\"reset\"]:-moz-focusring,\n[type=\"submit\"]:-moz-focusring {\n  outline: 1px dotted ButtonText;\n}\n\n/**\n * Change the border, margin, and padding in all browsers (opinionated).\n */\n\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em;\n}\n\n/**\n * 1. Correct the text wrapping in Edge and IE.\n * 2. Correct the color inheritance from `fieldset` elements in IE.\n * 3. Remove the padding so developers are not caught out when they zero out\n *    `fieldset` elements in all browsers.\n */\n\nlegend {\n  box-sizing: border-box; /* 1 */\n  color: inherit; /* 2 */\n  display: table; /* 1 */\n  max-width: 100%; /* 1 */\n  padding: 0; /* 3 */\n  white-space: normal; /* 1 */\n}\n\n/**\n * Remove the default vertical scrollbar in IE.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * 1. Add the correct box sizing in IE 10-.\n * 2. Remove the padding in IE 10-.\n */\n\n[type=\"checkbox\"],\n[type=\"radio\"] {\n  box-sizing: border-box; /* 1 */\n  padding: 0; /* 2 */\n}\n\n/**\n * Correct the cursor style of increment and decrement buttons in Chrome.\n */\n\n[type=\"number\"]::-webkit-inner-spin-button,\n[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Correct the odd appearance in Chrome and Safari.\n * 2. Correct the outline style in Safari.\n */\n\n[type=\"search\"] {\n  -webkit-appearance: textfield; /* 1 */\n  outline-offset: -2px; /* 2 */\n}\n\n/**\n * Remove the inner padding and cancel buttons in Chrome and Safari on OS X.\n */\n\n[type=\"search\"]::-webkit-search-cancel-button,\n[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * Correct the text style of placeholders in Chrome, Edge, and Safari.\n */\n\n::-webkit-input-placeholder {\n  color: inherit;\n  opacity: 0.54;\n}\n\n/**\n * 1. Correct the inability to style clickable types in iOS and Safari.\n * 2. Change font properties to `inherit` in Safari.\n */\n\n::-webkit-file-upload-button {\n  -webkit-appearance: button; /* 1 */\n  font: inherit; /* 2 */\n}\n","/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  --font-family-base: 'Segoe UI', 'HelveticaNeue-Light', sans-serif;\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  --max-content-width: 1000px;\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */\n\n  --screen-xs-min: 480px;  /* Extra small screen / phone */\n  --screen-sm-min: 768px;  /* Small screen / tablet */\n  --screen-md-min: 992px;  /* Medium screen / desktop */\n  --screen-lg-min: 1200px; /* Large screen / wide desktop */\n}\n"],"sourceRoot":"webpack://"}]);
  
  // exports


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(40);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(41);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(42);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(43);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(44);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(12);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Navbar = __webpack_require__(50);
  
  var _Navbar2 = _interopRequireDefault(_Navbar);
  
  var _jquery = __webpack_require__(51);
  
  var _jquery2 = _interopRequireDefault(_jquery);
  
  var _AuthService = __webpack_require__(105);
  
  var _Sidebar = __webpack_require__(52);
  
  var _Sidebar2 = _interopRequireDefault(_Sidebar);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var logo = __webpack_require__(57);
  
  function toggleMenu() {
    if ((0, _jquery2.default)('.navbar-collapse').hasClass('collapse')) {
      (0, _jquery2.default)('.navbar-collapse').removeClass('collapse');
    } else {
      (0, _jquery2.default)('.navbar-collapse').addClass('collapse');
    }
  }
  var style = {
    verticleAlign: 'middle'
  };
  
  var Header = function (_Component) {
    (0, _inherits3.default)(Header, _Component);
  
    function Header() {
      (0, _classCallCheck3.default)(this, Header);
      return (0, _possibleConstructorReturn3.default)(this, (Header.__proto__ || (0, _getPrototypeOf2.default)(Header)).apply(this, arguments));
    }
  
    (0, _createClass3.default)(Header, [{
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'div',
          { id: 'wrapper', className: 'content' },
          _react2.default.createElement(
            _Navbar2.default,
            { className: 'navbar-inverse', fluid: true, style: { margin: 0 } },
            _react2.default.createElement(
              _Navbar.Brand,
              null,
              _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement('img', {
                  src: logo, alt: 'Tidal Wave Prediction Online Tool',
                  title: 'Tidal Wave Prediction Online Tool'
                }),
                _react2.default.createElement(
                  'span',
                  null,
                  '\xA0Tidal Wave Prediction Online Tool '
                ),
                _react2.default.createElement(
                  'button',
                  {
                    type: 'button', className: 'navbar-toggle', onClick: function onClick() {
                      toggleMenu();
                    },
                    style: { position: 'absolute', right: 0, top: 0 }
                  },
                  _react2.default.createElement(
                    'span',
                    { className: 'sr-only' },
                    'Toggle navigation'
                  ),
                  _react2.default.createElement('span', { className: 'icon-bar' }),
                  _react2.default.createElement('span', { className: 'icon-bar' }),
                  _react2.default.createElement('span', { className: 'icon-bar' })
                )
              )
            ),
            _react2.default.createElement(
              'ul',
              { className: 'nav navbar-top-links navbar-right' },
              _react2.default.createElement(
                'li',
                { style: style },
                (0, _AuthService.isLoggedIn)() ? _react2.default.createElement(
                  'button',
                  {
                    className: 'btn btn-danger log',
                    onClick: function onClick() {
                      return (0, _AuthService.logout)();
                    }
                  },
                  'Log out '
                ) : _react2.default.createElement(
                  'button',
                  { className: 'btn btn-info log', onClick: function onClick() {
                      return (0, _AuthService.login)();
                    } },
                  'Log In'
                )
              )
            ),
            _react2.default.createElement(_Sidebar2.default, null)
          )
        );
      }
    }]);
    return Header;
  }(_react.Component);
  
  exports.default = Header;

/***/ }),
/* 49 */
/***/ (function(module, exports) {

  module.exports = require("react-bootstrap");

/***/ }),
/* 50 */
/***/ (function(module, exports) {

  module.exports = require("react-bootstrap/lib/Navbar");

/***/ }),
/* 51 */
/***/ (function(module, exports) {

  module.exports = require("jquery");

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(40);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(41);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(42);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(43);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(44);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(12);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _history = __webpack_require__(53);
  
  var _history2 = _interopRequireDefault(_history);
  
  var _AuthService = __webpack_require__(105);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var Sidebar = function (_Component) {
    (0, _inherits3.default)(Sidebar, _Component);
  
    function Sidebar(props) {
      (0, _classCallCheck3.default)(this, Sidebar);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (Sidebar.__proto__ || (0, _getPrototypeOf2.default)(Sidebar)).call(this, props));
  
      _this.state = {
        uiElementsCollapsed: true,
        chartsElementsCollapsed: true,
        multiLevelDropdownCollapsed: true,
        thirdLevelDropdownCollapsed: true,
        samplePagesCollapsed: true
      };
      return _this;
    }
  
    (0, _createClass3.default)(Sidebar, [{
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'div',
          { className: 'navbar-default sidebar', style: { marginLeft: '-20px' }, role: 'navigation' },
          _react2.default.createElement(
            'div',
            { className: 'sidebar-nav navbar-collapse collapse' },
            _react2.default.createElement(
              'ul',
              { className: 'nav in', id: 'side-menu' },
              _react2.default.createElement(
                'li',
                { className: 'sidebar-search' },
                _react2.default.createElement(
                  'div',
                  { className: 'input-group custom-search-form' },
                  _react2.default.createElement('input', { type: 'text', className: 'form-control', placeholder: 'Search...' }),
                  _react2.default.createElement(
                    'span',
                    { className: 'input-group-btn' },
                    _react2.default.createElement(
                      'button',
                      { className: 'btn btn-default', type: 'button' },
                      _react2.default.createElement('i', { className: 'fa fa-search' })
                    )
                  )
                )
              ),
              _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement(
                  'a',
                  { href: '', onClick: function onClick(e) {
                      e.preventDefault();_history2.default.push('/');
                    } },
                  _react2.default.createElement('i', { className: 'fa fa-dashboard fa-fw' }),
                  ' \xA0Dashboard'
                )
              ),
              (0, _AuthService.isLoggedIn)() ? _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement(
                  'a',
                  { href: '', onClick: function onClick(e) {
                      e.preventDefault();_history2.default.push('/upload');
                    } },
                  _react2.default.createElement('i', { className: 'fa fa-upload fa-fw' }),
                  ' \xA0Upload Data'
                )
              ) : null,
              _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement(
                  'a',
                  { href: '', onClick: function onClick(e) {
                      e.preventDefault();_history2.default.push('/prediction');
                    } },
                  _react2.default.createElement('i', { className: 'fa fa-bar-chart fa-fw' }),
                  ' \xA0Prediction Charting'
                )
              ),
              _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement(
                  'a',
                  { href: '', onClick: function onClick(e) {
                      e.preventDefault();_history2.default.push('/contact');
                    } },
                  _react2.default.createElement('i', { className: 'fa fa-address-card-o fa-fw' }),
                  ' \xA0Contact'
                )
              ),
              _react2.default.createElement(
                'li',
                null,
                _react2.default.createElement(
                  'a',
                  { href: '', onClick: function onClick(e) {
                      e.preventDefault();_history2.default.push('/about');
                    } },
                  _react2.default.createElement('i', { className: 'fa fa-info fa-fw' }),
                  ' \xA0About'
                )
              )
            )
          )
        );
      }
    }]);
    return Sidebar;
  }(_react.Component);
  
  exports.default = Sidebar;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _createBrowserHistory = __webpack_require__(54);
  
  var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);
  
  var _createMemoryHistory = __webpack_require__(55);
  
  var _createMemoryHistory2 = _interopRequireDefault(_createMemoryHistory);
  
  var _useQueries = __webpack_require__(56);
  
  var _useQueries2 = _interopRequireDefault(_useQueries);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var history = (0, _useQueries2.default)( false ? _createBrowserHistory2.default : _createMemoryHistory2.default)(); /**
                                                                                                                                    * React Starter Kit (https://www.reactstarterkit.com/)
                                                                                                                                    *
                                                                                                                                    * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
                                                                                                                                    *
                                                                                                                                    * This source code is licensed under the MIT license found in the
                                                                                                                                    * LICENSE.txt file in the root directory of this source tree.
                                                                                                                                    */
  
  exports.default = history;

/***/ }),
/* 54 */
/***/ (function(module, exports) {

  module.exports = require("history/lib/createBrowserHistory");

/***/ }),
/* 55 */
/***/ (function(module, exports) {

  module.exports = require("history/lib/createMemoryHistory");

/***/ }),
/* 56 */
/***/ (function(module, exports) {

  module.exports = require("history/lib/useQueries");

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

  module.exports = __webpack_require__.p + "components/Header/logo.png?0f37c478e0acdd156766bfb8c2dd6dd6";

/***/ }),
/* 58 */,
/* 59 */,
/* 60 */
/***/ (function(module, exports) {

  module.exports = require("prop-types");

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(40);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(41);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(42);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(43);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(44);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(12);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactGeolocation = __webpack_require__(62);
  
  var _reactGeolocation2 = _interopRequireDefault(_reactGeolocation);
  
  var _reactBootstrap = __webpack_require__(49);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var geoLocation = function (_Component) {
    (0, _inherits3.default)(geoLocation, _Component);
  
    function geoLocation() {
      (0, _classCallCheck3.default)(this, geoLocation);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (geoLocation.__proto__ || (0, _getPrototypeOf2.default)(geoLocation)).call(this));
  
      _this.state = {};
      return _this;
    }
  
    (0, _createClass3.default)(geoLocation, [{
      key: 'render',
      value: function render() {
        return _react2.default.createElement(_reactGeolocation2.default, {
          onSuccess: console.log,
          render: function render(_ref) {
            var _ref$position = _ref.position;
            _ref$position = _ref$position === undefined ? {} : _ref$position;
            var _ref$position$coords = _ref$position.coords;
            _ref$position$coords = _ref$position$coords === undefined ? {} : _ref$position$coords;
            var latitude = _ref$position$coords.latitude,
                longitude = _ref$position$coords.longitude,
                error = _ref.error,
                getCurrentPosition = _ref.getCurrentPosition;
            return _react2.default.createElement(
              'div',
              { onLoad: getCurrentPosition },
              error && _react2.default.createElement(
                'div',
                null,
                error.message
              ),
              _react2.default.createElement(
                _reactBootstrap.Breadcrumb,
                null,
                _react2.default.createElement(
                  'b',
                  null,
                  'latitude:'
                ),
                ' ',
                latitude
              ),
              _react2.default.createElement('hr', null),
              _react2.default.createElement(
                _reactBootstrap.Breadcrumb,
                null,
                _react2.default.createElement(
                  'b',
                  null,
                  'longitude:'
                ),
                ' ',
                longitude
              )
            );
          }
        });
      }
    }]);
    return geoLocation;
  }(_react.Component);
  
  exports.default = geoLocation;
  
  // AIzaSyBxTFxWYofVC1OjCwxDlTUjTtdYh-EGzd0

/***/ }),
/* 62 */
/***/ (function(module, exports) {

  module.exports = require("react-geolocation");

/***/ }),
/* 63 */,
/* 64 */,
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.MapContainer = undefined;
  
  var _getPrototypeOf = __webpack_require__(40);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(41);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(42);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(43);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(44);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(12);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _googleMapsReact = __webpack_require__(66);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var MapContainer = exports.MapContainer = function (_Component) {
    (0, _inherits3.default)(MapContainer, _Component);
  
    function MapContainer() {
      (0, _classCallCheck3.default)(this, MapContainer);
      return (0, _possibleConstructorReturn3.default)(this, (MapContainer.__proto__ || (0, _getPrototypeOf2.default)(MapContainer)).apply(this, arguments));
    }
  
    (0, _createClass3.default)(MapContainer, [{
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          _googleMapsReact.Map,
          {
            google: this.props.google,
            style: { width: '92%', height: '300px', position: 'fixed' },
            className: 'map ',
            initialCenter: {
              lat: 53.4157082,
              lng: -7.9064346
            },
            zoom: 5
          },
          _react2.default.createElement(_googleMapsReact.Marker, {
            title: 'Achill_Island',
            name: 'Achill_Island',
            position: { lng: -10.101596, lat: 53.95219 }
          }),
          _react2.default.createElement(_googleMapsReact.Marker, {
            title: 'Achill_Island',
            name: 'Achill_Island',
            position: { lng: -10.101596, lat: 53.95219 }
          }),
          _react2.default.createElement(_googleMapsReact.Marker, {
            title: 'Aranmore',
            name: 'Aranmore',
            position: { lng: -8.49562, lat: 54.9896 }
          }),
          _react2.default.createElement(_googleMapsReact.Marker, {
            title: 'Arklow',
            name: 'Arklow',
            position: { lng: -6.1166053, lat: 52.779964 }
          }),
          _react2.default.createElement(_googleMapsReact.Marker, {
            title: 'Ballycotton',
            name: 'Ballycotton',
            position: { lng: -8.0007, lat: 51.82776 }
          }),
          _react2.default.createElement(_googleMapsReact.Marker, {
            title: 'Ballyglass',
            name: 'Ballyglass',
            position: { lng: -9.89, lat: 54.253 }
          })
        );
      }
    }]);
    return MapContainer;
  }(_react.Component);
  
  exports.default = (0, _googleMapsReact.GoogleApiWrapper)({
    apiKey: 'AIzaSyBxTFxWYofVC1OjCwxDlTUjTtdYh-EGzd0'
  })(MapContainer);

/***/ }),
/* 66 */
/***/ (function(module, exports) {

  module.exports = require("google-maps-react");

/***/ }),
/* 67 */,
/* 68 */,
/* 69 */
/***/ (function(module, exports) {

  module.exports = require("react-bootstrap/lib/Button");

/***/ }),
/* 70 */
/***/ (function(module, exports) {

  module.exports = require("react-bootstrap/lib/Panel");

/***/ }),
/* 71 */,
/* 72 */,
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

  module.exports = __webpack_require__.p + "routes/login/loginBackground.jpg?33084a126c418a141191803e8f6063e9";

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(12);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Register = __webpack_require__(75);
  
  var _Register2 = _interopRequireDefault(_Register);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  exports.default = {
  
    path: '/',
  
    action: function action() {
      return _react2.default.createElement(_Register2.default, null);
    }
  };
  // import App from '../../components/App';

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(40);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(41);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(42);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(43);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(44);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(12);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Button = __webpack_require__(69);
  
  var _Button2 = _interopRequireDefault(_Button);
  
  var _Panel = __webpack_require__(70);
  
  var _Panel2 = _interopRequireDefault(_Panel);
  
  var _withStyles = __webpack_require__(19);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _Register = __webpack_require__(76);
  
  var _Register2 = _interopRequireDefault(_Register);
  
  var _loginBackground = __webpack_require__(73);
  
  var _loginBackground2 = _interopRequireDefault(_loginBackground);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var sectionStyle = {
    width: '100%',
    height: '900px',
    backgroundImage: 'url(' + _loginBackground2.default + ')'
  };
  // import history from '../../core/history';
  
  // import { Panel, Input, Button } from 'react-bootstrap';
  
  
  var title = 'Register';
  
  var Register = function (_Component) {
    (0, _inherits3.default)(Register, _Component);
  
    function Register(props, context) {
      (0, _classCallCheck3.default)(this, Register);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (Register.__proto__ || (0, _getPrototypeOf2.default)(Register)).call(this, props));
  
      _this.state = {
        email: '',
        password: '',
        error: {
          message: ''
        }
      };
      context.setTitle(title);
      return _this;
    }
  
    (0, _createClass3.default)(Register, [{
      key: 'submitHandler',
      value: function submitHandler() {
        // e.preventDefault();
        // history.push('/');
        console.log('this.state', this.state);
        var _state = this.state,
            email = _state.email,
            password = _state.password;
  
        console.log('Email:', email);
        console.log('Password:', password);
      }
    }, {
      key: 'render',
      value: function render() {
        var _this2 = this;
  
        return _react2.default.createElement(
          'section',
          { style: sectionStyle },
          _react2.default.createElement(
            'div',
            { className: 'col-md-4 col-md-offset-4' },
            _react2.default.createElement(
              'div',
              { className: 'text-center' },
              _react2.default.createElement(
                'h1',
                { className: 'login-brand-text' },
                'Tidal Wave Prediction Online Tool'
              )
            ),
            _react2.default.createElement(
              _Panel2.default,
              { header: _react2.default.createElement(
                  'h3',
                  null,
                  'Please Register'
                ), className: 'registration-panel' },
              _react2.default.createElement(
                'form',
                { role: 'form' },
                _react2.default.createElement(
                  'div',
                  { className: 'form-group' },
                  _react2.default.createElement('input', {
                    className: 'form-control',
                    placeholder: 'email',
                    name: 'email',
                    onChange: function onChange(event) {
                      return _this2.setState({ email: event.target.value });
                    }
                  })
                ),
                _react2.default.createElement(
                  'div',
                  null,
                  _react2.default.createElement('input', {
                    className: 'form-control',
                    placeholder: 'Password',
                    type: 'password',
                    name: 'password',
                    onChange: function onChange(event) {
                      return _this2.setState({ password: event.target.value });
                    }
                  })
                ),
                _react2.default.createElement(
                  'div',
                  null,
                  _react2.default.createElement(
                    _Button2.default,
                    {
                      type: 'button',
                      bsSize: 'large',
                      bsStyle: 'success',
                      onClick: function onClick() {
                        return _this2.submitHandler();
                      }
                    },
                    'Register'
                  )
                )
              ),
              _react2.default.createElement(
                'div',
                null,
                this.state.error.message
              )
            )
          )
        );
      }
    }]);
    return Register;
  }(_react.Component);
  
  Register.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Register2.default)(Register);

/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(77);
      var insertCss = __webpack_require__(23);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!../../../node_modules/postcss-loader/index.js?pack=default!./Register.css", function() {
          content = require("!!../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!../../../node_modules/postcss-loader/index.js?pack=default!./Register.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(22)();
  // imports
  
  
  // module
  exports.push([module.id, "/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n}\n.Register_root_3RB {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n.Register_container_1Lf {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 380px;\n}\n.Register_lead_2sJ {\n  font-size: 1.25em;\n}\n.Register_formGroup_1Ge {\n  margin-bottom: 15px;\n}\n.Register_label_sr8 {\n  display: inline-block;\n  margin-bottom: 5px;\n  max-width: 100%;\n  font-weight: 700;\n}\n.Register_input_3So {\n  display: block;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  padding: 10px 16px;\n  width: 100%;\n  height: 46px;\n  outline: 0;\n  border: 1px solid #ccc;\n  border-radius: 0;\n  background: #fff;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  color: #616161;\n  font-size: 18px;\n  line-height: 1.3333333;\n  -webkit-transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\n  transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\n  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\n}\n.Register_input_3So:focus {\n  border-color: #0074c2;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\n}\n.Register_button_3Si {\n  display: block;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  margin: 0;\n  padding: 10px 16px;\n  width: 100%;\n  outline: 0;\n  border: 1px solid #373277;\n  border-radius: 0;\n  background: #373277;\n  color: #fff;\n  text-align: center;\n  text-decoration: none;\n  font-size: 18px;\n  line-height: 1.3333333;\n  cursor: pointer;\n}\n.Register_button_3Si:hover {\n  background: rgba(54, 50, 119, 0.8);\n}\n.Register_button_3Si:focus {\n  border-color: #0074c2;\n  -webkit-box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\n          box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\n}\n.Register_facebook_3Fl {\n  border-color: #3b5998;\n  background: #3b5998;\n}\n.Register_facebook_3Fl:hover {\n  background: #2d4373;\n}\n.Register_google_3QP {\n  border-color: #dd4b39;\n  background: #dd4b39;\n}\n.Register_google_3QP:hover {\n  background: #c23321;\n}\n.Register_twitter_uxx {\n  border-color: #55acee;\n  background: #55acee;\n}\n.Register_twitter_uxx:hover {\n  background: #2795e9;\n}\n.Register_icon_3KC {\n  display: inline-block;\n  margin: -2px 12px -2px 0;\n  width: 20px;\n  height: 20px;\n  vertical-align: middle;\n  fill: currentColor;\n}\n.Register_lineThrough_2IJ {\n  position: relative;\n  z-index: 1;\n  display: block;\n  margin-bottom: 15px;\n  width: 100%;\n  color: #757575;\n  text-align: center;\n  font-size: 80%;\n}\n.Register_lineThrough_2IJ::before {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  z-index: -1;\n  margin-top: -5px;\n  margin-left: -20px;\n  width: 40px;\n  height: 10px;\n  background-color: #fff;\n  content: '';\n}\n.Register_lineThrough_2IJ::after {\n  position: absolute;\n  top: 49%;\n  z-index: -2;\n  display: block;\n  width: 100%;\n  border-bottom: 1px solid #ddd;\n  content: '';\n}\n", "", {"version":3,"sources":["/./routes/register/Register.css","/./components/variables.css"],"names":[],"mappings":"AAAA;;;;;;;GAOG;ACPH;;;;;;;GAOG;AAEH;EACE;;gFAE8E;;EAI9E;;gFAE8E;;EAI9E;;gFAE8E,EAErD,gCAAgC,EAChC,2BAA2B,EAC3B,6BAA6B,CAC7B,iCAAiC;CAC3D;ADpBD;EACE,mBAAmB;EACnB,oBAAoB;CACrB;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,iBAAiB;CAClB;AAED;EACE,kBAAkB;CACnB;AAED;EACE,oBAAoB;CACrB;AAED;EACE,sBAAsB;EACtB,mBAAmB;EACnB,gBAAgB;EAChB,iBAAiB;CAClB;AAED;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,WAAW;EACX,uBAAuB;EACvB,iBAAiB;EACjB,iBAAiB;EACjB,yDAAiD;UAAjD,iDAAiD;EACjD,eAAe;EACf,gBAAgB;EAChB,uBAAuB;EACvB,yFAAyE;EAAzE,iFAAyE;EAAzE,4EAAyE;EAAzE,yEAAyE;EAAzE,+GAAyE;CAC1E;AAED;EACE,sBAAsB;EACtB,yFAAiF;UAAjF,iFAAiF;CAClF;AAED;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,UAAU;EACV,mBAAmB;EACnB,YAAY;EACZ,WAAW;EACX,0BAA0B;EAC1B,iBAAiB;EACjB,oBAAoB;EACpB,YAAY;EACZ,mBAAmB;EACnB,sBAAsB;EACtB,gBAAgB;EAChB,uBAAuB;EACvB,gBAAgB;CACjB;AAED;EACE,mCAAmC;CACpC;AAED;EACE,sBAAsB;EACtB,mDAA2C;UAA3C,2CAA2C;CAC5C;AAED;EACE,sBAAsB;EACtB,oBAAoB;CAErB;AAED;EACE,oBAAoB;CACrB;AAED;EACE,sBAAsB;EACtB,oBAAoB;CAErB;AAED;EACE,oBAAoB;CACrB;AAED;EACE,sBAAsB;EACtB,oBAAoB;CAErB;AAED;EACE,oBAAoB;CACrB;AAED;EACE,sBAAsB;EACtB,yBAAyB;EACzB,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,mBAAmB;CACpB;AAED;EACE,mBAAmB;EACnB,WAAW;EACX,eAAe;EACf,oBAAoB;EACpB,YAAY;EACZ,eAAe;EACf,mBAAmB;EACnB,eAAe;CAChB;AAED;EACE,mBAAmB;EACnB,SAAS;EACT,UAAU;EACV,YAAY;EACZ,iBAAiB;EACjB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,YAAY;CACb;AAED;EACE,mBAAmB;EACnB,SAAS;EACT,YAAY;EACZ,eAAe;EACf,YAAY;EACZ,8BAA8B;EAC9B,YAAY;CACb","file":"Register.css","sourcesContent":["/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n@import '../../components/variables.css';\n\n.root {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.container {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 380px;\n}\n\n.lead {\n  font-size: 1.25em;\n}\n\n.formGroup {\n  margin-bottom: 15px;\n}\n\n.label {\n  display: inline-block;\n  margin-bottom: 5px;\n  max-width: 100%;\n  font-weight: 700;\n}\n\n.input {\n  display: block;\n  box-sizing: border-box;\n  padding: 10px 16px;\n  width: 100%;\n  height: 46px;\n  outline: 0;\n  border: 1px solid #ccc;\n  border-radius: 0;\n  background: #fff;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  color: #616161;\n  font-size: 18px;\n  line-height: 1.3333333;\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\n}\n\n.input:focus {\n  border-color: #0074c2;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\n}\n\n.button {\n  display: block;\n  box-sizing: border-box;\n  margin: 0;\n  padding: 10px 16px;\n  width: 100%;\n  outline: 0;\n  border: 1px solid #373277;\n  border-radius: 0;\n  background: #373277;\n  color: #fff;\n  text-align: center;\n  text-decoration: none;\n  font-size: 18px;\n  line-height: 1.3333333;\n  cursor: pointer;\n}\n\n.button:hover {\n  background: rgba(54, 50, 119, 0.8);\n}\n\n.button:focus {\n  border-color: #0074c2;\n  box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\n}\n\n.facebook {\n  border-color: #3b5998;\n  background: #3b5998;\n  composes: button;\n}\n\n.facebook:hover {\n  background: #2d4373;\n}\n\n.google {\n  border-color: #dd4b39;\n  background: #dd4b39;\n  composes: button;\n}\n\n.google:hover {\n  background: #c23321;\n}\n\n.twitter {\n  border-color: #55acee;\n  background: #55acee;\n  composes: button;\n}\n\n.twitter:hover {\n  background: #2795e9;\n}\n\n.icon {\n  display: inline-block;\n  margin: -2px 12px -2px 0;\n  width: 20px;\n  height: 20px;\n  vertical-align: middle;\n  fill: currentColor;\n}\n\n.lineThrough {\n  position: relative;\n  z-index: 1;\n  display: block;\n  margin-bottom: 15px;\n  width: 100%;\n  color: #757575;\n  text-align: center;\n  font-size: 80%;\n}\n\n.lineThrough::before {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  z-index: -1;\n  margin-top: -5px;\n  margin-left: -20px;\n  width: 40px;\n  height: 10px;\n  background-color: #fff;\n  content: '';\n}\n\n.lineThrough::after {\n  position: absolute;\n  top: 49%;\n  z-index: -2;\n  display: block;\n  width: 100%;\n  border-bottom: 1px solid #ddd;\n  content: '';\n}\n","/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  --font-family-base: 'Segoe UI', 'HelveticaNeue-Light', sans-serif;\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  --max-content-width: 1000px;\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */\n\n  --screen-xs-min: 480px;  /* Extra small screen / phone */\n  --screen-sm-min: 768px;  /* Small screen / tablet */\n  --screen-md-min: 992px;  /* Medium screen / desktop */\n  --screen-lg-min: 1200px; /* Large screen / wide desktop */\n}\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Register_root_3RB",
  	"container": "Register_container_1Lf",
  	"lead": "Register_lead_2sJ",
  	"formGroup": "Register_formGroup_1Ge",
  	"label": "Register_label_sr8",
  	"input": "Register_input_3So",
  	"button": "Register_button_3Si",
  	"facebook": "Register_facebook_3Fl Register_button_3Si",
  	"google": "Register_google_3QP Register_button_3Si",
  	"twitter": "Register_twitter_uxx Register_button_3Si",
  	"icon": "Register_icon_3KC",
  	"lineThrough": "Register_lineThrough_2IJ"
  };

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(12);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _upload = __webpack_require__(79);
  
  var _upload2 = _interopRequireDefault(_upload);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = {
    path: '/upload',
  
    action: function action() {
      return _react2.default.createElement(_upload2.default, null);
    }
  };

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _keys = __webpack_require__(80);
  
  var _keys2 = _interopRequireDefault(_keys);
  
  var _getPrototypeOf = __webpack_require__(40);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(41);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(42);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(43);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(44);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(12);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _MuiThemeProvider = __webpack_require__(81);
  
  var _MuiThemeProvider2 = _interopRequireDefault(_MuiThemeProvider);
  
  var _RaisedButton = __webpack_require__(82);
  
  var _RaisedButton2 = _interopRequireDefault(_RaisedButton);
  
  var _reactDropzone = __webpack_require__(83);
  
  var _reactDropzone2 = _interopRequireDefault(_reactDropzone);
  
  var _FontIcon = __webpack_require__(84);
  
  var _FontIcon2 = _interopRequireDefault(_FontIcon);
  
  var _colors = __webpack_require__(85);
  
  var _reactBootstrap = __webpack_require__(49);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var request = __webpack_require__(86);
  
  var apiBaseUrl = 'http://localhost:5000/api/tidalprediction/';
  var style = {
    margin: 15
  };
  var title = 'Upload';
  
  var Upload = function (_Component) {
    (0, _inherits3.default)(Upload, _Component);
  
    function Upload(props, context) {
      (0, _classCallCheck3.default)(this, Upload);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (Upload.__proto__ || (0, _getPrototypeOf2.default)(Upload)).call(this, props));
  
      _this.state = {
        filesPreview: [],
        filesToBeSent: [],
        printcount: 10
      };
      context.setTitle(title);
      return _this;
    }
  
    (0, _createClass3.default)(Upload, [{
      key: 'onDrop',
      value: function onDrop(acceptedFiles) {
        console.log('Accepted files: ', acceptedFiles[0].name);
        var filesToBeSent = this.state.filesToBeSent;
        if (filesToBeSent.length < this.state.printcount) {
          filesToBeSent.push(acceptedFiles);
          var filesPreview = [];
          (0, _keys2.default)(filesToBeSent).forEach(function (key, i) {
            filesPreview.push(_react2.default.createElement(
              'div',
              null,
              filesToBeSent[i][0].name,
              _react2.default.createElement(
                _MuiThemeProvider2.default,
                null,
                _react2.default.createElement(
                  'a',
                  { href: '' },
                  _react2.default.createElement(
                    _FontIcon2.default,
                    {
                      className: 'material-icons customstyle',
                      color: _colors.blue500,
                      styles: { top: 10 }
                    },
                    'clear'
                  )
                )
              )
            ));
          });
          this.setState({ filesToBeSent: filesToBeSent, filesPreview: filesPreview });
        } else {
          alert('You have reached the limit of upload files at a time');
        }
      }
    }, {
      key: 'handleClick',
      value: function handleClick(event) {
        console.log('handleClick: ', event);
        var self = this;
        console.log('self: ', self);
        if (this.state.filesToBeSent.length > 0) {
          var filesArray = this.state.filesToBeSent;
          var req = request.post(apiBaseUrl + 'fileupload');
          (0, _keys2.default)(filesArray).forEach(function (key, i) {
            console.log('files', filesArray[i][0]);
            req.attach(filesArray[i][0].name, filesArray[i][0]);
            req.end(function (err, res) {
              if (err) {
                console.log('error ocurred');
              }
              console.log('res', res);
              alert('File upload completed');
            });
          });
        } else {
          alert('Please upload some files first');
        }
      }
    }, {
      key: 'render',
      value: function render() {
        var _this2 = this;
  
        // Debug Components
        // console.log('Panel', Panel);
        // console.log('MuiThemeProvider', MuiThemeProvider);
        // console.log('PageHeader', PageHeader);
        // console.log('Dropzone', Dropzone);
        // console.log('RaisedButton', RaisedButton);
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(
              'div',
              { className: 'col-lg-12' },
              _react2.default.createElement(
                _reactBootstrap.PageHeader,
                null,
                'Upload Data'
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(
              'div',
              { className: 'col-lg-12 col-md-8 col-sm-4' },
              _react2.default.createElement(
                _reactBootstrap.Panel,
                {
                  header: _react2.default.createElement(
                    'span',
                    null,
                    _react2.default.createElement('i', { className: 'fa fa-upload fa-fw' }),
                    ' Drag and drop your file here, or use the file browser:'
                  )
                },
                _react2.default.createElement(
                  'div',
                  { className: 'App col-lg-6 col-md-4 col-sm-2' },
                  _react2.default.createElement(
                    _reactDropzone2.default,
                    { onDrop: function onDrop(files) {
                        return _this2.onDrop(files);
                      } },
                    _react2.default.createElement(
                      'div',
                      null,
                      'Try dropping some files here, or click to select files to upload.'
                    )
                  )
                ),
                _react2.default.createElement(
                  'div',
                  { className: 'col-lg-6 col-md-4 col-sm-2' },
                  'Files to be printed are:',
                  this.state.filesPreview
                ),
                _react2.default.createElement(
                  _MuiThemeProvider2.default,
                  null,
                  _react2.default.createElement(_RaisedButton2.default, {
                    label: 'Upload Files', style: style,
                    onClick: function onClick(event) {
                      return _this2.handleClick(event);
                    }
                  })
                )
              )
            )
          )
        );
      }
    }]);
    return Upload;
  }(_react.Component);
  
  Upload.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  exports.default = Upload;

/***/ }),
/* 80 */
/***/ (function(module, exports) {

  module.exports = require("babel-runtime/core-js/object/keys");

/***/ }),
/* 81 */
/***/ (function(module, exports) {

  module.exports = require("material-ui/styles/MuiThemeProvider");

/***/ }),
/* 82 */
/***/ (function(module, exports) {

  module.exports = require("material-ui/RaisedButton");

/***/ }),
/* 83 */
/***/ (function(module, exports) {

  module.exports = require("react-dropzone");

/***/ }),
/* 84 */
/***/ (function(module, exports) {

  module.exports = require("material-ui/FontIcon");

/***/ }),
/* 85 */
/***/ (function(module, exports) {

  module.exports = require("material-ui/styles/colors");

/***/ }),
/* 86 */
/***/ (function(module, exports) {

  module.exports = require("superagent");

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(12);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _prediction = __webpack_require__(88);
  
  var _prediction2 = _interopRequireDefault(_prediction);
  
  var _Chart = __webpack_require__(89);
  
  var _Chart2 = _interopRequireDefault(_Chart);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = {
    path: '/prediction',
  
    action: function action() {
      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(_prediction2.default, null),
        _react2.default.createElement(_Chart2.default, null)
      );
    }
  };

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(12);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactBootstrap = __webpack_require__(49);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'Predictions';
  
  function displayPrediction(props, context) {
    context.setTitle(title);
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'div',
        { className: 'row' },
        _react2.default.createElement(
          'div',
          { className: 'col-lg-12' },
          _react2.default.createElement(
            _reactBootstrap.PageHeader,
            null,
            'Chart Prediction Data'
          )
        )
      )
    );
  }
  
  displayPrediction.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  exports.default = displayPrediction;

/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(40);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(41);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(42);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(43);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(44);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(12);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactBootstrap = __webpack_require__(49);
  
  var _chart = __webpack_require__(90);
  
  var _chart2 = _interopRequireDefault(_chart);
  
  var _DropdownSelect = __webpack_require__(93);
  
  var _DropdownSelect2 = _interopRequireDefault(_DropdownSelect);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  // import ReactHighcharts from 'react-highcharts';
  var chartView = function (_Component) {
    (0, _inherits3.default)(chartView, _Component);
  
    function chartView(props) {
      (0, _classCallCheck3.default)(this, chartView);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (chartView.__proto__ || (0, _getPrototypeOf2.default)(chartView)).call(this, props));
  
      _this.state = {};
      return _this;
    }
  
    (0, _createClass3.default)(chartView, [{
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            _reactBootstrap.Panel,
            {
              header: _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement('i', { className: 'fa fa-bar-chart-o fa-fw' }),
                ' Tidal Wave Predictions'
              )
            },
            _react2.default.createElement(
              'div',
              null,
              _react2.default.createElement(_chart2.default, null)
            )
          ),
          _react2.default.createElement(_DropdownSelect2.default, null)
        );
      }
    }]);
    return chartView;
  }(_react.Component);
  
  exports.default = chartView;

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _stringify = __webpack_require__(25);
  
  var _stringify2 = _interopRequireDefault(_stringify);
  
  var _getPrototypeOf = __webpack_require__(40);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(41);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(42);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(43);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(44);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(12);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _ramda = __webpack_require__(91);
  
  var _reactHighcharts = __webpack_require__(92);
  
  var _reactHighcharts2 = _interopRequireDefault(_reactHighcharts);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var chartData = [];
  // import { connect } from 'react-redux';
  
  var chartView = function (_Component) {
    (0, _inherits3.default)(chartView, _Component);
  
    function chartView(props) {
      (0, _classCallCheck3.default)(this, chartView);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (chartView.__proto__ || (0, _getPrototypeOf2.default)(chartView)).call(this, props));
  
      _this.state = {
        chartData: chartData
      };
      return _this;
    }
  
    //   componentWillReceiveProps(nextProps) {
    //     if (!isEmpty(nextProps.ModalSettingsState)) {
    //         this.setState({ title: nextProps.ModalSettingsState.title }),
    //         this.setState({ titleColor: nextProps.ModalSettingsState.colorSelectedTitle }),
    //         this.setState({ titleStyle: nextProps.ModalSettingsState.selectedTitleStyle }),
    //         this.setState({ titleSize: nextProps.ModalSettingsState.selectedTitleSize }),
    //         this.setState({ subtitle: nextProps.ModalSettingsState.subtitle }),
    //         this.setState({ subtitleColor: nextProps.ModalSettingsState.colorSelectedSubtitle }),
    //         this.setState({ subtitleStyle: nextProps.ModalSettingsState.selectedSubtitleStyle }),
    //         this.setState({ subtitleSize: nextProps.ModalSettingsState.selectedsubTitleSize }),
    //         this.setState({ xAxis: nextProps.ModalSettingsState.xAxis }),
    //         this.setState({ yAxis: nextProps.ModalSettingsState.yAxis }),
    //         this.setState({ chartColor: nextProps.ModalSettingsState.colorSelectedChart }),
    //         this.setState({ backgroundColor: nextProps.ModalSettingsState.colorSelectedBackground }),
    //         this.setState({ chartType: nextProps.ModalSettingsState.selectedChartType })
    //     }
    //   }
  
  
    (0, _createClass3.default)(chartView, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        fetch('http://localhost:5000/api/tidalprediction/', {
          method: 'GET',
          headers: {
            'Content-Type': 'text/plain'
          }
        }).then(function (response) {
          return response.json();
        }).then(function (result) {
          debugger;
          var test = (0, _ramda.compose)(_ramda.of, (0, _ramda.groupBy)((0, _ramda.prop)('stationLocation')))(result);
          console.log((0, _stringify2.default)(result));
          chartData = result;
          // console.log('chartData:', chartData);
  
          // [{
          //   date: dd-mm-yyy,
          //   name: "Arklow",
          //   data: [1,2,23,3]
          // }]
        });
      }
    }, {
      key: 'renderChart',
      value: function renderChart() {
        return {
          chart: {
            type: 'column'
          },
          title: {
            text: 'Tidal Wave Predictions January 2018'
          },
          xAxis: {
            categories: ['Achill Island', 'Aranmore', 'Arklow', 'Ballycotton', 'Ballyglass']
          },
          yAxis: {
            min: 0,
            title: {
              text: 'Tidal Wave Height (m)'
            },
            stackLabels: {
              enabled: true,
              style: {
                fontWeight: 'bold',
                color: _reactHighcharts2.default.theme && _reactHighcharts2.default.theme.textColor || 'gray'
              }
            }
          },
          legend: {
            align: 'right',
            x: -30,
            verticalAlign: 'top',
            y: 25,
            floating: true,
            backgroundColor: _reactHighcharts2.default.theme && _reactHighcharts2.default.theme.background2 || 'white',
            borderColor: '#CCC',
            borderWidth: 1,
            shadow: false
          },
          plotOptions: {
            column: {
              stacking: 'normal',
              dataLabels: {
                enabled: true,
                color: _reactHighcharts2.default.theme && _reactHighcharts2.default.theme.dataLabelsColor || 'white'
              }
            }
          },
          series: [{
            data: chartData
          }]
        };
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(_reactHighcharts2.default, { config: this.renderChart() })
        );
      }
    }]);
    return chartView;
  }(_react.Component);
  
  // function mapStateToProps({ ModalSettingsState }) {
  //   return {
  //     ModalSettingsState: ModalSettingsState,
  //   };
  // }
  // export default connect(mapStateToProps, null)(columnView);
  
  
  exports.default = chartView;

/***/ }),
/* 91 */
/***/ (function(module, exports) {

  module.exports = require("ramda");

/***/ }),
/* 92 */
/***/ (function(module, exports) {

  module.exports = require("react-highcharts");

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(40);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(41);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(42);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(43);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(44);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(12);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactSelect = __webpack_require__(94);
  
  var _reactSelect2 = _interopRequireDefault(_reactSelect);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var Dropdown = function (_React$Component) {
    (0, _inherits3.default)(Dropdown, _React$Component);
  
    function Dropdown() {
      var _ref;
  
      var _temp, _this, _ret;
  
      (0, _classCallCheck3.default)(this, Dropdown);
  
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
  
      return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Dropdown.__proto__ || (0, _getPrototypeOf2.default)(Dropdown)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
        selectedOption: ''
      }, _this.handleChange = function (selectedOption) {
        _this.setState({ selectedOption: selectedOption });
        console.log('Selected: ' + selectedOption.label);
      }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }
  
    (0, _createClass3.default)(Dropdown, [{
      key: 'render',
      value: function render() {
        var selectedOption = this.state.selectedOption;
  
        var value = selectedOption && selectedOption.value;
  
        return _react2.default.createElement(_reactSelect2.default, {
          className: 'pull-right',
          name: 'form-field-name',
          value: value,
          onChange: this.handleChange,
          options: [{ value: 'Achill Island', label: 'Achill Island' }, { value: 'Aranmore', label: 'Aranmore' }, { value: 'Arklow', label: 'Arklow' }, { value: 'Ballycotton', label: 'Ballycotton' }, { value: 'Ballyglass', label: 'Ballyglass' }]
        });
      }
    }]);
    return Dropdown;
  }(_react2.default.Component);
  
  exports.default = Dropdown;

/***/ }),
/* 94 */
/***/ (function(module, exports) {

  module.exports = require("react-select");

/***/ }),
/* 95 */,
/* 96 */,
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(12);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _about = __webpack_require__(98);
  
  var _about2 = _interopRequireDefault(_about);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = {
    path: '/about',
  
    action: function action() {
      return _react2.default.createElement(_about2.default, null);
    }
  };

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(12);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactBootstrap = __webpack_require__(49);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'About';
  
  function displayBlank(props, context) {
    context.setTitle(title);
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'div',
        { className: 'row' },
        _react2.default.createElement(
          'div',
          { className: 'col-lg-12' },
          _react2.default.createElement(
            _reactBootstrap.PageHeader,
            null,
            'About'
          ),
          _react2.default.createElement(
            'p',
            null,
            'Tidal Wave Prediction Online Tool \xA9 2017,2018, All rights reserved.'
          ),
          _react2.default.createElement(
            'p',
            null,
            _react2.default.createElement(
              'b',
              null,
              'Beta version 1.0'
            )
          ),
          _react2.default.createElement(
            'p',
            null,
            'Designed and coded by Donal Crotty, Software Design 4, Athlone Institute of Technology'
          ),
          _react2.default.createElement(
            'p',
            null,
            'Data provided by ',
            _react2.default.createElement(
              'b',
              null,
              'Oceanographic Services, Marine Institute'
            )
          )
        )
      )
    );
  }
  
  displayBlank.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  exports.default = displayBlank;

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(12);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _chartHistory = __webpack_require__(100);
  
  var _chartHistory2 = _interopRequireDefault(_chartHistory);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = {
    path: '/chartHistory',
  
    action: function action() {
      return _react2.default.createElement(_chartHistory2.default, null);
    }
  };

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(12);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactBootstrap = __webpack_require__(49);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var title = 'Chart History';
  
  function displayChartHistory(props, context) {
    context.setTitle(title);
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement(
        'div',
        { className: 'row' },
        _react2.default.createElement(
          'div',
          { className: 'col-lg-12' },
          _react2.default.createElement(
            _reactBootstrap.PageHeader,
            null,
            'Prediction Chart History'
          ),
          _react2.default.createElement(
            _reactBootstrap.Breadcrumb,
            null,
            'View some of your previously visualized Tidal Wave Height Predictions.'
          ),
          _react2.default.createElement(
            _reactBootstrap.Panel,
            {
              header: _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement('i', { className: 'fa fa-bar-chart fa-fw' })
              )
            },
            _react2.default.createElement(
              _reactBootstrap.ListGroup,
              null,
              _react2.default.createElement(
                _reactBootstrap.ListGroupItem,
                { href: '', onClick: function onClick(e) {
                    e.preventDefault();
                  } },
                _react2.default.createElement(
                  'div',
                  null,
                  _react2.default.createElement(
                    'p',
                    null,
                    _react2.default.createElement(
                      'strong',
                      null,
                      'Prediction Chart 1'
                    )
                  )
                ),
                _react2.default.createElement(
                  'div',
                  null,
                  _react2.default.createElement(
                    'p',
                    null,
                    _react2.default.createElement(
                      'span',
                      { className: 'text-muted' },
                      'Galway Bay, 09-11-16'
                    ),
                    ' '
                  )
                ),
                _react2.default.createElement(
                  'span',
                  { className: 'pull-right text-muted small' },
                  _react2.default.createElement(
                    'em',
                    null,
                    '43 minutes ago'
                  )
                )
              ),
              _react2.default.createElement(
                _reactBootstrap.ListGroupItem,
                { href: '', onClick: function onClick(e) {
                    e.preventDefault();
                  } },
                _react2.default.createElement(
                  'div',
                  null,
                  _react2.default.createElement(
                    'p',
                    null,
                    _react2.default.createElement(
                      'strong',
                      null,
                      'Prediction Chart 2'
                    )
                  )
                ),
                _react2.default.createElement(
                  'div',
                  null,
                  _react2.default.createElement(
                    'p',
                    null,
                    _react2.default.createElement(
                      'span',
                      { className: 'text-muted' },
                      'Kinsale Harbour, 12-11-16'
                    )
                  )
                ),
                _react2.default.createElement(
                  'span',
                  { className: 'pull-right text-muted small' },
                  _react2.default.createElement(
                    'em',
                    null,
                    '11:32 AM'
                  )
                )
              ),
              _react2.default.createElement(
                _reactBootstrap.ListGroupItem,
                { href: '', onClick: function onClick(e) {
                    e.preventDefault();
                  } },
                _react2.default.createElement(
                  'div',
                  null,
                  _react2.default.createElement(
                    'p',
                    null,
                    _react2.default.createElement(
                      'strong',
                      null,
                      'Prediction Chart 3'
                    )
                  )
                ),
                _react2.default.createElement(
                  'div',
                  null,
                  _react2.default.createElement(
                    'p',
                    null,
                    _react2.default.createElement(
                      'span',
                      { className: 'text-muted' },
                      'Kinsale Harbour, 12-11-16'
                    )
                  )
                ),
                _react2.default.createElement(
                  'span',
                  { className: 'pull-right text-muted small' },
                  _react2.default.createElement(
                    'em',
                    null,
                    '11:13 AM'
                  )
                )
              ),
              _react2.default.createElement(
                _reactBootstrap.ListGroupItem,
                { href: '', onClick: function onClick(e) {
                    e.preventDefault();
                  } },
                _react2.default.createElement(
                  'div',
                  null,
                  _react2.default.createElement(
                    'p',
                    null,
                    _react2.default.createElement(
                      'strong',
                      null,
                      'Prediction Chart 4'
                    )
                  )
                ),
                _react2.default.createElement(
                  'div',
                  null,
                  _react2.default.createElement(
                    'p',
                    null,
                    _react2.default.createElement(
                      'span',
                      { className: 'text-muted' },
                      'Killybegs, 01-12-16'
                    )
                  )
                ),
                _react2.default.createElement(
                  'span',
                  { className: 'pull-right text-muted small' },
                  _react2.default.createElement(
                    'em',
                    null,
                    '10:57 AM'
                  )
                )
              ),
              _react2.default.createElement(
                _reactBootstrap.ListGroupItem,
                { href: '', onClick: function onClick(e) {
                    e.preventDefault();
                  } },
                _react2.default.createElement(
                  'div',
                  null,
                  _react2.default.createElement(
                    'p',
                    null,
                    _react2.default.createElement(
                      'strong',
                      null,
                      'Prediction Chart 5'
                    )
                  )
                ),
                _react2.default.createElement(
                  'div',
                  null,
                  _react2.default.createElement(
                    'p',
                    null,
                    _react2.default.createElement(
                      'span',
                      { className: 'text-muted' },
                      'Killybegs, 01-12-16'
                    )
                  )
                ),
                _react2.default.createElement(
                  'span',
                  { className: 'pull-right text-muted small' },
                  _react2.default.createElement(
                    'em',
                    null,
                    '10:57 AM'
                  )
                )
              ),
              _react2.default.createElement(
                _reactBootstrap.ListGroupItem,
                { href: '', onClick: function onClick(e) {
                    e.preventDefault();
                  } },
                _react2.default.createElement(
                  'div',
                  null,
                  _react2.default.createElement(
                    'p',
                    null,
                    _react2.default.createElement(
                      'strong',
                      null,
                      'Prediction Chart 6'
                    )
                  )
                ),
                _react2.default.createElement(
                  'div',
                  null,
                  _react2.default.createElement(
                    'p',
                    null,
                    _react2.default.createElement(
                      'span',
                      { className: 'text-muted' },
                      'Killybegs, 01-12-16'
                    )
                  )
                ),
                _react2.default.createElement(
                  'span',
                  { className: 'pull-right text-muted small' },
                  _react2.default.createElement(
                    'em',
                    null,
                    '10:57 AM'
                  )
                )
              )
            )
          )
        )
      )
    );
  }
  
  displayChartHistory.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  exports.default = displayChartHistory;

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(12);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _App = __webpack_require__(39);
  
  var _App2 = _interopRequireDefault(_App);
  
  var _ErrorPage = __webpack_require__(18);
  
  var _ErrorPage2 = _interopRequireDefault(_ErrorPage);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = {
  
    path: '/error',
  
    action: function action(_ref) {
      var render = _ref.render,
          context = _ref.context,
          error = _ref.error;
  
      // console.log('error obj inside error index.js', error);
      return render(_react2.default.createElement(
        _App2.default,
        { context: context, error: error },
        _react2.default.createElement(_ErrorPage2.default, { error: error })
      ), error.status || 500);
    }
  }; /**
      * React Starter Kit (https://www.reactstarterkit.com/)
      *
      * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
      *
      * This source code is licensed under the MIT license found in the
      * LICENSE.txt file in the root directory of this source tree.
      */

/***/ }),
/* 102 */
/***/ (function(module, exports) {

  module.exports = require("./assets");

/***/ }),
/* 103 */,
/* 104 */
/***/ (function(module, exports) {

  module.exports = require("jwks-rsa");

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.login = login;
  exports.logout = logout;
  exports.requireAuth = requireAuth;
  exports.getIdToken = getIdToken;
  exports.getAccessToken = getAccessToken;
  exports.setAccessToken = setAccessToken;
  exports.setIdToken = setIdToken;
  exports.isLoggedIn = isLoggedIn;
  
  var _jwtDecode = __webpack_require__(106);
  
  var _jwtDecode2 = _interopRequireDefault(_jwtDecode);
  
  var _auth0Js = __webpack_require__(107);
  
  var _auth0Js2 = _interopRequireDefault(_auth0Js);
  
  var _history = __webpack_require__(53);
  
  var _history2 = _interopRequireDefault(_history);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  // import { browserHistory } from 'react-router';
  var ID_TOKEN_KEY = 'id_token';
  var ACCESS_TOKEN_KEY = 'access_token';
  
  var CLIENT_ID = 'Wj9ZPGZWivGSJpx3sLYCmObGj1IUReR5';
  var CLIENT_DOMAIN = 'tidalwavepredapp.eu.auth0.com';
  var REDIRECT = 'http://localhost:3001/callback';
  var AUDIENCE = 'https://tidalwavepredapp.eu.auth0.com/api/v2/';
  
  var auth = new _auth0Js2.default.WebAuth({
    clientID: CLIENT_ID,
    domain: CLIENT_DOMAIN
  });
  
  function login() {
    auth.authorize({
      responseType: 'token id_token',
      redirectUri: REDIRECT,
      audience: AUDIENCE
    });
  }
  function clearIdToken() {
    localStorage.removeItem(ID_TOKEN_KEY);
  }
  
  function clearAccessToken() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  }
  
  function logout() {
    clearIdToken();
    clearAccessToken();
    _history2.default.push('/landing');
  }
  
  function requireAuth(nextState, replace) {
    if (!isLoggedIn()) {
      replace({ pathname: '/' });
    }
  }
  
  function getIdToken() {
    return localStorage.getItem(ID_TOKEN_KEY);
  }
  
  function getAccessToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }
  
  // Helper function that will allow us to extract the access_token and id_token
  function getParameterByName(name) {
    var match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
  }
  
  // Get and store access_token in local storage
  function setAccessToken() {
    var accessToken = getParameterByName('access_token');
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  }
  
  // Get and store id_token in local storage
  function setIdToken() {
    var idToken = getParameterByName('id_token');
    localStorage.setItem(ID_TOKEN_KEY, idToken);
  }
  
  function isLoggedIn() {
    var idToken = getIdToken();
    return !!idToken && !isTokenExpired(idToken);
  }
  
  function getTokenExpirationDate(encodedToken) {
    var token = (0, _jwtDecode2.default)(encodedToken);
    if (!token.exp) {
      return null;
    }
  
    var date = new Date(0);
    date.setUTCSeconds(token.exp);
  
    return date;
  }
  
  function isTokenExpired(token) {
    var expirationDate = getTokenExpirationDate(token);
    return expirationDate < new Date();
  }

/***/ }),
/* 106 */
/***/ (function(module, exports) {

  module.exports = require("jwt-decode");

/***/ }),
/* 107 */
/***/ (function(module, exports) {

  module.exports = require("auth0-js");

/***/ }),
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(12);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Callback = __webpack_require__(112);
  
  var _Callback2 = _interopRequireDefault(_Callback);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  exports.default = {
  
    path: '/',
  
    action: function action() {
      return _react2.default.createElement(_Callback2.default, null);
    }
  };
  // import App from '../../components/App';

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(40);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(41);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(42);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(43);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(44);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(12);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _loading = __webpack_require__(114);
  
  var _loading2 = _interopRequireDefault(_loading);
  
  var _AuthService = __webpack_require__(105);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var style = {
    background: 'radial-gradient(black,gray, white)',
    position: 'fixed',
    top: '50%',
    left: '50%',
    marginTop: '-50px',
    marginLeft: '-100px'
  };
  
  var Callback = function (_Component) {
    (0, _inherits3.default)(Callback, _Component);
  
    function Callback() {
      (0, _classCallCheck3.default)(this, Callback);
      return (0, _possibleConstructorReturn3.default)(this, (Callback.__proto__ || (0, _getPrototypeOf2.default)(Callback)).apply(this, arguments));
    }
  
    (0, _createClass3.default)(Callback, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        (0, _AuthService.setAccessToken)();
        (0, _AuthService.setIdToken)();
        window.location.href = '/';
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement('img', { style: style, src: _loading2.default, alt: 'loading' })
        );
      }
    }]);
    return Callback;
  }(_react.Component);
  
  exports.default = Callback;

/***/ }),
/* 113 */,
/* 114 */
/***/ (function(module, exports) {

  module.exports = "data:image/svg+xml;base64,PHN2ZyBjbGFzcz0ibGRzLXNwaW5uZXIiIHdpZHRoPSIyMDBweCIgIGhlaWdodD0iMjAwcHgiICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQiIHN0eWxlPSJiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDApIG5vbmUgcmVwZWF0IHNjcm9sbCAwJSAwJTsiPjxnIHRyYW5zZm9ybT0icm90YXRlKDAgNTAgNTApIj4NCiAgPHJlY3QgeD0iNDciIHk9IjI0IiByeD0iOS40IiByeT0iNC44IiB3aWR0aD0iNiIgaGVpZ2h0PSIxMiIgZmlsbD0iIzE4NTBkZCI+DQogICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0ib3BhY2l0eSIgdmFsdWVzPSIxOzAiIHRpbWVzPSIwOzEiIGR1cj0iMXMiIGJlZ2luPSItMC45MTY2NjY2NjY2NjY2NjY2cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiPjwvYW5pbWF0ZT4NCiAgPC9yZWN0Pg0KPC9nPjxnIHRyYW5zZm9ybT0icm90YXRlKDMwIDUwIDUwKSI+DQogIDxyZWN0IHg9IjQ3IiB5PSIyNCIgcng9IjkuNCIgcnk9IjQuOCIgd2lkdGg9IjYiIGhlaWdodD0iMTIiIGZpbGw9IiMxODUwZGQiPg0KICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9Im9wYWNpdHkiIHZhbHVlcz0iMTswIiB0aW1lcz0iMDsxIiBkdXI9IjFzIiBiZWdpbj0iLTAuODMzMzMzMzMzMzMzMzMzNHMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIj48L2FuaW1hdGU+DQogIDwvcmVjdD4NCjwvZz48ZyB0cmFuc2Zvcm09InJvdGF0ZSg2MCA1MCA1MCkiPg0KICA8cmVjdCB4PSI0NyIgeT0iMjQiIHJ4PSI5LjQiIHJ5PSI0LjgiIHdpZHRoPSI2IiBoZWlnaHQ9IjEyIiBmaWxsPSIjMTg1MGRkIj4NCiAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJvcGFjaXR5IiB2YWx1ZXM9IjE7MCIgdGltZXM9IjA7MSIgZHVyPSIxcyIgYmVnaW49Ii0wLjc1cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiPjwvYW5pbWF0ZT4NCiAgPC9yZWN0Pg0KPC9nPjxnIHRyYW5zZm9ybT0icm90YXRlKDkwIDUwIDUwKSI+DQogIDxyZWN0IHg9IjQ3IiB5PSIyNCIgcng9IjkuNCIgcnk9IjQuOCIgd2lkdGg9IjYiIGhlaWdodD0iMTIiIGZpbGw9IiMxODUwZGQiPg0KICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9Im9wYWNpdHkiIHZhbHVlcz0iMTswIiB0aW1lcz0iMDsxIiBkdXI9IjFzIiBiZWdpbj0iLTAuNjY2NjY2NjY2NjY2NjY2NnMiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIj48L2FuaW1hdGU+DQogIDwvcmVjdD4NCjwvZz48ZyB0cmFuc2Zvcm09InJvdGF0ZSgxMjAgNTAgNTApIj4NCiAgPHJlY3QgeD0iNDciIHk9IjI0IiByeD0iOS40IiByeT0iNC44IiB3aWR0aD0iNiIgaGVpZ2h0PSIxMiIgZmlsbD0iIzE4NTBkZCI+DQogICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0ib3BhY2l0eSIgdmFsdWVzPSIxOzAiIHRpbWVzPSIwOzEiIGR1cj0iMXMiIGJlZ2luPSItMC41ODMzMzMzMzMzMzMzMzM0cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiPjwvYW5pbWF0ZT4NCiAgPC9yZWN0Pg0KPC9nPjxnIHRyYW5zZm9ybT0icm90YXRlKDE1MCA1MCA1MCkiPg0KICA8cmVjdCB4PSI0NyIgeT0iMjQiIHJ4PSI5LjQiIHJ5PSI0LjgiIHdpZHRoPSI2IiBoZWlnaHQ9IjEyIiBmaWxsPSIjMTg1MGRkIj4NCiAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJvcGFjaXR5IiB2YWx1ZXM9IjE7MCIgdGltZXM9IjA7MSIgZHVyPSIxcyIgYmVnaW49Ii0wLjVzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSI+PC9hbmltYXRlPg0KICA8L3JlY3Q+DQo8L2c+PGcgdHJhbnNmb3JtPSJyb3RhdGUoMTgwIDUwIDUwKSI+DQogIDxyZWN0IHg9IjQ3IiB5PSIyNCIgcng9IjkuNCIgcnk9IjQuOCIgd2lkdGg9IjYiIGhlaWdodD0iMTIiIGZpbGw9IiMxODUwZGQiPg0KICAgIDxhbmltYXRlIGF0dHJpYnV0ZU5hbWU9Im9wYWNpdHkiIHZhbHVlcz0iMTswIiB0aW1lcz0iMDsxIiBkdXI9IjFzIiBiZWdpbj0iLTAuNDE2NjY2NjY2NjY2NjY2N3MiIHJlcGVhdENvdW50PSJpbmRlZmluaXRlIj48L2FuaW1hdGU+DQogIDwvcmVjdD4NCjwvZz48ZyB0cmFuc2Zvcm09InJvdGF0ZSgyMTAgNTAgNTApIj4NCiAgPHJlY3QgeD0iNDciIHk9IjI0IiByeD0iOS40IiByeT0iNC44IiB3aWR0aD0iNiIgaGVpZ2h0PSIxMiIgZmlsbD0iIzE4NTBkZCI+DQogICAgPGFuaW1hdGUgYXR0cmlidXRlTmFtZT0ib3BhY2l0eSIgdmFsdWVzPSIxOzAiIHRpbWVzPSIwOzEiIGR1cj0iMXMiIGJlZ2luPSItMC4zMzMzMzMzMzMzMzMzMzMzcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiPjwvYW5pbWF0ZT4NCiAgPC9yZWN0Pg0KPC9nPjxnIHRyYW5zZm9ybT0icm90YXRlKDI0MCA1MCA1MCkiPg0KICA8cmVjdCB4PSI0NyIgeT0iMjQiIHJ4PSI5LjQiIHJ5PSI0LjgiIHdpZHRoPSI2IiBoZWlnaHQ9IjEyIiBmaWxsPSIjMTg1MGRkIj4NCiAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJvcGFjaXR5IiB2YWx1ZXM9IjE7MCIgdGltZXM9IjA7MSIgZHVyPSIxcyIgYmVnaW49Ii0wLjI1cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiPjwvYW5pbWF0ZT4NCiAgPC9yZWN0Pg0KPC9nPjxnIHRyYW5zZm9ybT0icm90YXRlKDI3MCA1MCA1MCkiPg0KICA8cmVjdCB4PSI0NyIgeT0iMjQiIHJ4PSI5LjQiIHJ5PSI0LjgiIHdpZHRoPSI2IiBoZWlnaHQ9IjEyIiBmaWxsPSIjMTg1MGRkIj4NCiAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJvcGFjaXR5IiB2YWx1ZXM9IjE7MCIgdGltZXM9IjA7MSIgZHVyPSIxcyIgYmVnaW49Ii0wLjE2NjY2NjY2NjY2NjY2NjY2cyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiPjwvYW5pbWF0ZT4NCiAgPC9yZWN0Pg0KPC9nPjxnIHRyYW5zZm9ybT0icm90YXRlKDMwMCA1MCA1MCkiPg0KICA8cmVjdCB4PSI0NyIgeT0iMjQiIHJ4PSI5LjQiIHJ5PSI0LjgiIHdpZHRoPSI2IiBoZWlnaHQ9IjEyIiBmaWxsPSIjMTg1MGRkIj4NCiAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJvcGFjaXR5IiB2YWx1ZXM9IjE7MCIgdGltZXM9IjA7MSIgZHVyPSIxcyIgYmVnaW49Ii0wLjA4MzMzMzMzMzMzMzMzMzMzcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiPjwvYW5pbWF0ZT4NCiAgPC9yZWN0Pg0KPC9nPjxnIHRyYW5zZm9ybT0icm90YXRlKDMzMCA1MCA1MCkiPg0KICA8cmVjdCB4PSI0NyIgeT0iMjQiIHJ4PSI5LjQiIHJ5PSI0LjgiIHdpZHRoPSI2IiBoZWlnaHQ9IjEyIiBmaWxsPSIjMTg1MGRkIj4NCiAgICA8YW5pbWF0ZSBhdHRyaWJ1dGVOYW1lPSJvcGFjaXR5IiB2YWx1ZXM9IjE7MCIgdGltZXM9IjA7MSIgZHVyPSIxcyIgYmVnaW49IjBzIiByZXBlYXRDb3VudD0iaW5kZWZpbml0ZSI+PC9hbmltYXRlPg0KICA8L3JlY3Q+DQo8L2c+PC9zdmc+"

/***/ }),
/* 115 */,
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _react = __webpack_require__(12);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Landing = __webpack_require__(117);
  
  var _Landing2 = _interopRequireDefault(_Landing);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  exports.default = {
  
    path: '/',
  
    action: function action() {
      return _react2.default.createElement(_Landing2.default, null);
    }
  };
  // import App from '../../components/App';

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(40);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(41);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(42);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(43);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(44);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(12);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _reactBootstrap = __webpack_require__(49);
  
  var _Panel = __webpack_require__(70);
  
  var _Panel2 = _interopRequireDefault(_Panel);
  
  var _withStyles = __webpack_require__(19);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _AuthService = __webpack_require__(105);
  
  var _Landing = __webpack_require__(118);
  
  var _Landing2 = _interopRequireDefault(_Landing);
  
  var _loginBackground = __webpack_require__(120);
  
  var _loginBackground2 = _interopRequireDefault(_loginBackground);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  var sectionStyle = {
    width: '100%',
    height: '900px',
    backgroundImage: 'url(' + _loginBackground2.default + ')'
  };
  // import history from '../../core/history';
  
  var title = 'Landing';
  
  var Landing = function (_Component) {
    (0, _inherits3.default)(Landing, _Component);
  
    function Landing(props, context) {
      (0, _classCallCheck3.default)(this, Landing);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (Landing.__proto__ || (0, _getPrototypeOf2.default)(Landing)).call(this, props));
  
      _this.state = {
        email: '',
        password: '',
        error: {
          message: ''
        }
      };
      context.setTitle(title);
      return _this;
    }
  
    (0, _createClass3.default)(Landing, [{
      key: 'submitHandler',
      value: function submitHandler() {
        // e.preventDefault();
        // history.push('/');
        console.log('this.state', this.state);
        var _state = this.state,
            email = _state.email,
            password = _state.password;
  
        console.log('Email:', email);
        console.log('Password:', password);
      }
    }, {
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'section',
          { style: sectionStyle },
          _react2.default.createElement(
            'div',
            { className: 'col-md-4 col-md-offset-4' },
            _react2.default.createElement(
              'div',
              { className: 'text-center' },
              _react2.default.createElement(
                'h1',
                { className: 'login-brand-text' },
                'Tidal Wave Prediction Online Tool'
              )
            ),
            _react2.default.createElement(
              _Panel2.default,
              { header: _react2.default.createElement(
                  'h3',
                  null,
                  'Please Login'
                ), className: 'registration-panel' },
              (0, _AuthService.isLoggedIn)() ? _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                  _reactBootstrap.Breadcrumb,
                  null,
                  'You are already logged in, please logout or return to',
                  _react2.default.createElement(
                    'a',
                    { href: '', onClick: function onClick(e) {
                        e.preventDefault();history.push('/contact');
                      } },
                    'dashboard'
                  )
                ),
                _react2.default.createElement(
                  'button',
                  { className: 'btn btn-danger log', onClick: function onClick() {
                      return (0, _AuthService.logout)();
                    } },
                  'Log out '
                )
              ) : _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                  _reactBootstrap.Breadcrumb,
                  null,
                  'Successfully Logged out!'
                ),
                _react2.default.createElement(
                  'button',
                  { className: 'btn btn-info log', onClick: function onClick() {
                      return (0, _AuthService.login)();
                    } },
                  'Log In'
                )
              )
            )
          )
        );
      }
    }]);
    return Landing;
  }(_react.Component);
  
  Landing.contextTypes = { setTitle: _react.PropTypes.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Landing2.default)(Landing);

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(119);
      var insertCss = __webpack_require__(23);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!../../../node_modules/postcss-loader/index.js?pack=default!./Landing.css", function() {
          content = require("!!../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!../../../node_modules/postcss-loader/index.js?pack=default!./Landing.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(22)();
  // imports
  
  
  // module
  exports.push([module.id, "/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n}\n.Landing_root_11b {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n.Landing_container_2k8 {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 380px;\n}\n.Landing_lead_218 {\n  font-size: 1.25em;\n}\n.Landing_formGroup_sdY {\n  margin-bottom: 15px;\n}\n.Landing_label_1ov {\n  display: inline-block;\n  margin-bottom: 5px;\n  max-width: 100%;\n  font-weight: 700;\n}\n.Landing_input_3Vb {\n  display: block;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  padding: 10px 16px;\n  width: 100%;\n  height: 46px;\n  outline: 0;\n  border: 1px solid #ccc;\n  border-radius: 0;\n  background: #fff;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  color: #616161;\n  font-size: 18px;\n  line-height: 1.3333333;\n  -webkit-transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\n  transition: border-color ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\n  -o-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s, -webkit-box-shadow ease-in-out 0.15s;\n}\n.Landing_input_3Vb:focus {\n  border-color: #0074c2;\n  -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\n          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\n}\n.Landing_button_2hK {\n  display: block;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  margin: 0;\n  padding: 10px 16px;\n  width: 100%;\n  outline: 0;\n  border: 1px solid #373277;\n  border-radius: 0;\n  background: #373277;\n  color: #fff;\n  text-align: center;\n  text-decoration: none;\n  font-size: 18px;\n  line-height: 1.3333333;\n  cursor: pointer;\n}\n.Landing_button_2hK:hover {\n  background: rgba(54, 50, 119, 0.8);\n}\n.Landing_button_2hK:focus {\n  border-color: #0074c2;\n  -webkit-box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\n          box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\n}\n.Landing_facebook_1Wl {\n  border-color: #3b5998;\n  background: #3b5998;\n}\n.Landing_facebook_1Wl:hover {\n  background: #2d4373;\n}\n.Landing_google_1yQ {\n  border-color: #dd4b39;\n  background: #dd4b39;\n}\n.Landing_google_1yQ:hover {\n  background: #c23321;\n}\n.Landing_twitter_1iv {\n  border-color: #55acee;\n  background: #55acee;\n}\n.Landing_twitter_1iv:hover {\n  background: #2795e9;\n}\n.Landing_icon_3_G {\n  display: inline-block;\n  margin: -2px 12px -2px 0;\n  width: 20px;\n  height: 20px;\n  vertical-align: middle;\n  fill: currentColor;\n}\n.Landing_lineThrough_3aY {\n  position: relative;\n  z-index: 1;\n  display: block;\n  margin-bottom: 15px;\n  width: 100%;\n  color: #757575;\n  text-align: center;\n  font-size: 80%;\n}\n.Landing_lineThrough_3aY::before {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  z-index: -1;\n  margin-top: -5px;\n  margin-left: -20px;\n  width: 40px;\n  height: 10px;\n  background-color: #fff;\n  content: '';\n}\n.Landing_lineThrough_3aY::after {\n  position: absolute;\n  top: 49%;\n  z-index: -2;\n  display: block;\n  width: 100%;\n  border-bottom: 1px solid #ddd;\n  content: '';\n}\n", "", {"version":3,"sources":["/./routes/landing/Landing.css","/./components/variables.css"],"names":[],"mappings":"AAAA;;;;;;;GAOG;ACPH;;;;;;;GAOG;AAEH;EACE;;gFAE8E;;EAI9E;;gFAE8E;;EAI9E;;gFAE8E,EAErD,gCAAgC,EAChC,2BAA2B,EAC3B,6BAA6B,CAC7B,iCAAiC;CAC3D;ADpBD;EACE,mBAAmB;EACnB,oBAAoB;CACrB;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,iBAAiB;CAClB;AAED;EACE,kBAAkB;CACnB;AAED;EACE,oBAAoB;CACrB;AAED;EACE,sBAAsB;EACtB,mBAAmB;EACnB,gBAAgB;EAChB,iBAAiB;CAClB;AAED;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,WAAW;EACX,uBAAuB;EACvB,iBAAiB;EACjB,iBAAiB;EACjB,yDAAiD;UAAjD,iDAAiD;EACjD,eAAe;EACf,gBAAgB;EAChB,uBAAuB;EACvB,yFAAyE;EAAzE,iFAAyE;EAAzE,4EAAyE;EAAzE,yEAAyE;EAAzE,+GAAyE;CAC1E;AAED;EACE,sBAAsB;EACtB,yFAAiF;UAAjF,iFAAiF;CAClF;AAED;EACE,eAAe;EACf,+BAAuB;UAAvB,uBAAuB;EACvB,UAAU;EACV,mBAAmB;EACnB,YAAY;EACZ,WAAW;EACX,0BAA0B;EAC1B,iBAAiB;EACjB,oBAAoB;EACpB,YAAY;EACZ,mBAAmB;EACnB,sBAAsB;EACtB,gBAAgB;EAChB,uBAAuB;EACvB,gBAAgB;CACjB;AAED;EACE,mCAAmC;CACpC;AAED;EACE,sBAAsB;EACtB,mDAA2C;UAA3C,2CAA2C;CAC5C;AAED;EACE,sBAAsB;EACtB,oBAAoB;CAErB;AAED;EACE,oBAAoB;CACrB;AAED;EACE,sBAAsB;EACtB,oBAAoB;CAErB;AAED;EACE,oBAAoB;CACrB;AAED;EACE,sBAAsB;EACtB,oBAAoB;CAErB;AAED;EACE,oBAAoB;CACrB;AAED;EACE,sBAAsB;EACtB,yBAAyB;EACzB,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,mBAAmB;CACpB;AAED;EACE,mBAAmB;EACnB,WAAW;EACX,eAAe;EACf,oBAAoB;EACpB,YAAY;EACZ,eAAe;EACf,mBAAmB;EACnB,eAAe;CAChB;AAED;EACE,mBAAmB;EACnB,SAAS;EACT,UAAU;EACV,YAAY;EACZ,iBAAiB;EACjB,mBAAmB;EACnB,YAAY;EACZ,aAAa;EACb,uBAAuB;EACvB,YAAY;CACb;AAED;EACE,mBAAmB;EACnB,SAAS;EACT,YAAY;EACZ,eAAe;EACf,YAAY;EACZ,8BAA8B;EAC9B,YAAY;CACb","file":"Landing.css","sourcesContent":["/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n@import '../../components/variables.css';\n\n.root {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.container {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 380px;\n}\n\n.lead {\n  font-size: 1.25em;\n}\n\n.formGroup {\n  margin-bottom: 15px;\n}\n\n.label {\n  display: inline-block;\n  margin-bottom: 5px;\n  max-width: 100%;\n  font-weight: 700;\n}\n\n.input {\n  display: block;\n  box-sizing: border-box;\n  padding: 10px 16px;\n  width: 100%;\n  height: 46px;\n  outline: 0;\n  border: 1px solid #ccc;\n  border-radius: 0;\n  background: #fff;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);\n  color: #616161;\n  font-size: 18px;\n  line-height: 1.3333333;\n  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;\n}\n\n.input:focus {\n  border-color: #0074c2;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075), 0 0 8px rgba(0, 116, 194, 0.6);\n}\n\n.button {\n  display: block;\n  box-sizing: border-box;\n  margin: 0;\n  padding: 10px 16px;\n  width: 100%;\n  outline: 0;\n  border: 1px solid #373277;\n  border-radius: 0;\n  background: #373277;\n  color: #fff;\n  text-align: center;\n  text-decoration: none;\n  font-size: 18px;\n  line-height: 1.3333333;\n  cursor: pointer;\n}\n\n.button:hover {\n  background: rgba(54, 50, 119, 0.8);\n}\n\n.button:focus {\n  border-color: #0074c2;\n  box-shadow: 0 0 8px rgba(0, 116, 194, 0.6);\n}\n\n.facebook {\n  border-color: #3b5998;\n  background: #3b5998;\n  composes: button;\n}\n\n.facebook:hover {\n  background: #2d4373;\n}\n\n.google {\n  border-color: #dd4b39;\n  background: #dd4b39;\n  composes: button;\n}\n\n.google:hover {\n  background: #c23321;\n}\n\n.twitter {\n  border-color: #55acee;\n  background: #55acee;\n  composes: button;\n}\n\n.twitter:hover {\n  background: #2795e9;\n}\n\n.icon {\n  display: inline-block;\n  margin: -2px 12px -2px 0;\n  width: 20px;\n  height: 20px;\n  vertical-align: middle;\n  fill: currentColor;\n}\n\n.lineThrough {\n  position: relative;\n  z-index: 1;\n  display: block;\n  margin-bottom: 15px;\n  width: 100%;\n  color: #757575;\n  text-align: center;\n  font-size: 80%;\n}\n\n.lineThrough::before {\n  position: absolute;\n  top: 50%;\n  left: 50%;\n  z-index: -1;\n  margin-top: -5px;\n  margin-left: -20px;\n  width: 40px;\n  height: 10px;\n  background-color: #fff;\n  content: '';\n}\n\n.lineThrough::after {\n  position: absolute;\n  top: 49%;\n  z-index: -2;\n  display: block;\n  width: 100%;\n  border-bottom: 1px solid #ddd;\n  content: '';\n}\n","/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  --font-family-base: 'Segoe UI', 'HelveticaNeue-Light', sans-serif;\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  --max-content-width: 1000px;\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */\n\n  --screen-xs-min: 480px;  /* Extra small screen / phone */\n  --screen-sm-min: 768px;  /* Small screen / tablet */\n  --screen-md-min: 992px;  /* Medium screen / desktop */\n  --screen-lg-min: 1200px; /* Large screen / wide desktop */\n}\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Landing_root_11b",
  	"container": "Landing_container_2k8",
  	"lead": "Landing_lead_218",
  	"formGroup": "Landing_formGroup_sdY",
  	"label": "Landing_label_1ov",
  	"input": "Landing_input_3Vb",
  	"button": "Landing_button_2hK",
  	"facebook": "Landing_facebook_1Wl Landing_button_2hK",
  	"google": "Landing_google_1yQ Landing_button_2hK",
  	"twitter": "Landing_twitter_1iv Landing_button_2hK",
  	"icon": "Landing_icon_3_G",
  	"lineThrough": "Landing_lineThrough_3aY"
  };

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

  module.exports = __webpack_require__.p + "routes/landing/loginBackground.jpg?33084a126c418a141191803e8f6063e9";

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _regenerator = __webpack_require__(1);
  
  var _regenerator2 = _interopRequireDefault(_regenerator);
  
  var _asyncToGenerator2 = __webpack_require__(4);
  
  var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);
  
  var _react = __webpack_require__(12);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _Dashboard = __webpack_require__(122);
  
  var _Dashboard2 = _interopRequireDefault(_Dashboard);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  // import fetch from '../../core/fetch';
  
  /**
   * React Starter Kit (https://www.reactstarterkit.com/)
   *
   * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.txt file in the root directory of this source tree.
   */
  
  exports.default = {
  
    path: '/',
  
    action: function action() {
      var _this = this;
  
      return (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt('return', _react2.default.createElement(_Dashboard2.default, null));
  
              case 1:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }))();
    }
  };

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

  'use strict';
  
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  
  var _getPrototypeOf = __webpack_require__(40);
  
  var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
  
  var _classCallCheck2 = __webpack_require__(41);
  
  var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
  
  var _createClass2 = __webpack_require__(42);
  
  var _createClass3 = _interopRequireDefault(_createClass2);
  
  var _possibleConstructorReturn2 = __webpack_require__(43);
  
  var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
  
  var _inherits2 = __webpack_require__(44);
  
  var _inherits3 = _interopRequireDefault(_inherits2);
  
  var _react = __webpack_require__(12);
  
  var _react2 = _interopRequireDefault(_react);
  
  var _propTypes = __webpack_require__(60);
  
  var _propTypes2 = _interopRequireDefault(_propTypes);
  
  var _withStyles = __webpack_require__(19);
  
  var _withStyles2 = _interopRequireDefault(_withStyles);
  
  var _reactBootstrap = __webpack_require__(49);
  
  var _GeoLocation = __webpack_require__(61);
  
  var _GeoLocation2 = _interopRequireDefault(_GeoLocation);
  
  var _Dashboard = __webpack_require__(123);
  
  var _Dashboard2 = _interopRequireDefault(_Dashboard);
  
  var _history = __webpack_require__(53);
  
  var _history2 = _interopRequireDefault(_history);
  
  var _StationsMap = __webpack_require__(65);
  
  var _StationsMap2 = _interopRequireDefault(_StationsMap);
  
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
  
  // import { Link } from 'react-router-dom';
  // import { connect } from 'react-redux';
  // import { userActions } from '../../actions/user.actions';
  var title = 'Dashboard';
  
  var Dashboard = function (_Component) {
    (0, _inherits3.default)(Dashboard, _Component);
  
    function Dashboard(props, context) {
      (0, _classCallCheck3.default)(this, Dashboard);
  
      var _this = (0, _possibleConstructorReturn3.default)(this, (Dashboard.__proto__ || (0, _getPrototypeOf2.default)(Dashboard)).call(this));
  
      context.setTitle(title);
      return _this;
    }
    // componentDidMount() {
    //   this.props.dispatch(userActions.getAll());
    // }
  
    (0, _createClass3.default)(Dashboard, [{
      key: 'render',
      value: function render() {
        return _react2.default.createElement(
          'div',
          null,
          _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(
              'div',
              { className: 'col-lg-12' },
              _react2.default.createElement(
                _reactBootstrap.PageHeader,
                null,
                'Dashboard'
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'row' },
            _react2.default.createElement(
              'div',
              { className: 'col-lg-8 col-md-6 col-sm-4' },
              _react2.default.createElement(
                _reactBootstrap.Panel,
                {
                  header: _react2.default.createElement(
                    'span',
                    null,
                    _react2.default.createElement('i', { className: 'fa fa-location-arrow fa-fw' }),
                    ' Your nearest Stations are:'
                  )
                },
                _react2.default.createElement(_StationsMap2.default, null),
                _react2.default.createElement('br', null),
                _react2.default.createElement('br', null),
                _react2.default.createElement('br', null),
                _react2.default.createElement('br', null),
                _react2.default.createElement('br', null),
                _react2.default.createElement('br', null),
                _react2.default.createElement('br', null),
                _react2.default.createElement('br', null),
                _react2.default.createElement('br', null),
                _react2.default.createElement('br', null),
                _react2.default.createElement('br', null),
                _react2.default.createElement('br', null),
                _react2.default.createElement('br', null),
                _react2.default.createElement('br', null),
                _react2.default.createElement('br', null)
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'col-lg-4 col-md-3 col-sm-2' },
              _react2.default.createElement(
                _reactBootstrap.Panel,
                {
                  header: _react2.default.createElement(
                    'span',
                    null,
                    _react2.default.createElement('i', { className: 'fa fa-location-arrow fa-fw' }),
                    ' Your Current Location is:'
                  )
                },
                _react2.default.createElement(
                  'div',
                  null,
                  _react2.default.createElement(_GeoLocation2.default, null)
                )
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'col-lg-4' },
              _react2.default.createElement(
                _reactBootstrap.Panel,
                {
                  header: _react2.default.createElement(
                    'span',
                    null,
                    _react2.default.createElement('i', { className: 'fa fa-bar-chart fa-fw' }),
                    ' Prediction Chart History'
                  )
                },
                _react2.default.createElement(
                  _reactBootstrap.ListGroup,
                  null,
                  _react2.default.createElement(
                    _reactBootstrap.ListGroupItem,
                    { href: '', onClick: function onClick(e) {
                        e.preventDefault();
                      } },
                    _react2.default.createElement(
                      'div',
                      null,
                      _react2.default.createElement(
                        'p',
                        null,
                        _react2.default.createElement(
                          'strong',
                          null,
                          'Prediction Chart 1'
                        )
                      )
                    ),
                    _react2.default.createElement(
                      'div',
                      null,
                      _react2.default.createElement(
                        'p',
                        null,
                        _react2.default.createElement(
                          'span',
                          { className: 'text-muted' },
                          'Galway Bay, 09-11-16'
                        ),
                        ' '
                      )
                    ),
                    _react2.default.createElement(
                      'span',
                      { className: 'pull-right text-muted small' },
                      _react2.default.createElement(
                        'em',
                        null,
                        '43 minutes ago'
                      )
                    )
                  ),
                  _react2.default.createElement(
                    _reactBootstrap.ListGroupItem,
                    { href: '', onClick: function onClick(e) {
                        e.preventDefault();
                      } },
                    _react2.default.createElement(
                      'div',
                      null,
                      _react2.default.createElement(
                        'p',
                        null,
                        _react2.default.createElement(
                          'strong',
                          null,
                          'Prediction Chart 2'
                        )
                      )
                    ),
                    _react2.default.createElement(
                      'div',
                      null,
                      _react2.default.createElement(
                        'p',
                        null,
                        _react2.default.createElement(
                          'span',
                          { className: 'text-muted' },
                          'Kinsale Harbour, 12-11-16'
                        )
                      )
                    ),
                    _react2.default.createElement(
                      'span',
                      { className: 'pull-right text-muted small' },
                      _react2.default.createElement(
                        'em',
                        null,
                        '11:32 AM'
                      )
                    )
                  ),
                  _react2.default.createElement(
                    _reactBootstrap.ListGroupItem,
                    { href: '', onClick: function onClick(e) {
                        e.preventDefault();
                      } },
                    _react2.default.createElement(
                      'div',
                      null,
                      _react2.default.createElement(
                        'p',
                        null,
                        _react2.default.createElement(
                          'strong',
                          null,
                          'Prediction Chart 3'
                        )
                      )
                    ),
                    _react2.default.createElement(
                      'div',
                      null,
                      _react2.default.createElement(
                        'p',
                        null,
                        _react2.default.createElement(
                          'span',
                          { className: 'text-muted' },
                          'Kinsale Harbour, 12-11-16'
                        )
                      )
                    ),
                    _react2.default.createElement(
                      'span',
                      { className: 'pull-right text-muted small' },
                      _react2.default.createElement(
                        'em',
                        null,
                        '11:13 AM'
                      )
                    )
                  ),
                  _react2.default.createElement(
                    _reactBootstrap.ListGroupItem,
                    { href: '', onClick: function onClick(e) {
                        e.preventDefault();
                      } },
                    _react2.default.createElement(
                      'div',
                      null,
                      _react2.default.createElement(
                        'p',
                        null,
                        _react2.default.createElement(
                          'strong',
                          null,
                          'Prediction Chart 4'
                        )
                      )
                    ),
                    _react2.default.createElement(
                      'div',
                      null,
                      _react2.default.createElement(
                        'p',
                        null,
                        _react2.default.createElement(
                          'span',
                          { className: 'text-muted' },
                          'Killybegs, 01-12-16'
                        )
                      )
                    ),
                    _react2.default.createElement(
                      'span',
                      { className: 'pull-right text-muted small' },
                      _react2.default.createElement(
                        'em',
                        null,
                        '10:57 AM'
                      )
                    )
                  ),
                  _react2.default.createElement(
                    _reactBootstrap.ListGroupItem,
                    null,
                    _react2.default.createElement(
                      'a',
                      {
                        href: '',
                        onClick: function onClick(e) {
                          e.preventDefault();_history2.default.push('/chartHistory');
                        }
                      },
                      '\xA0View All Charts'
                    )
                  )
                )
              )
            )
          )
        );
      }
    }]);
    return Dashboard;
  }(_react.Component);
  
  Dashboard.propTypes = {
    // news: PropTypes.arrayOf(PropTypes.shape({
    //   title: PropTypes.string.isRequired,
    //   link: PropTypes.string.isRequired,
    //   contentSnippet: PropTypes.string,
    // })).isRequired,
  };
  Dashboard.contextTypes = { setTitle: _propTypes2.default.func.isRequired };
  
  exports.default = (0, _withStyles2.default)(_Dashboard2.default)(Dashboard);

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

  
      var content = __webpack_require__(124);
      var insertCss = __webpack_require__(23);
  
      if (typeof content === 'string') {
        content = [[module.id, content, '']];
      }
  
      module.exports = content.locals || {};
      module.exports._getCss = function() { return content.toString(); };
      module.exports._insertCss = function(options) { return insertCss(content, options) };
    
      // Hot Module Replacement
      // https://webpack.github.io/docs/hot-module-replacement
      // Only activated in browser context
      if (false) {
        var removeCss = function() {};
        module.hot.accept("!!../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!../../../node_modules/postcss-loader/index.js?pack=default!./Dashboard.css", function() {
          content = require("!!../../../node_modules/css-loader/index.js?{\"sourceMap\":true,\"modules\":true,\"localIdentName\":\"[name]_[local]_[hash:base64:3]\",\"minimize\":false}!../../../node_modules/postcss-loader/index.js?pack=default!./Dashboard.css");
  
          if (typeof content === 'string') {
            content = [[module.id, content, '']];
          }
  
          removeCss = insertCss(content, { replace: true });
        });
        module.hot.dispose(function() { removeCss(); });
      }
    

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

  exports = module.exports = __webpack_require__(22)();
  // imports
  
  
  // module
  exports.push([module.id, "/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */  /* Extra small screen / phone */  /* Small screen / tablet */  /* Medium screen / desktop */ /* Large screen / wide desktop */\n}\n\n.Dashboard_root_3_5 {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.Dashboard_container_1N4 {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 1000px;\n}\n\n.Dashboard_news_2yD {\n  padding: 0;\n}\n\n.Dashboard_newsItem_1q0 {\n  list-style-type: none;\n  padding-bottom: 6px;\n}\n\n.Dashboard_newsTitle_Cj5 {\n  font-size: 1.125em;\n}\n\n.Dashboard_newsTitle_Cj5,\n.Dashboard_newsDesc_3jg {\n  display: block;\n}\n", "", {"version":3,"sources":["/./routes/dashboard/Dashboard.css","/./components/variables.css"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;ACPH;;;;;;;GAOG;;AAEH;EACE;;gFAE8E;;EAI9E;;gFAE8E;;EAI9E;;gFAE8E,EAErD,gCAAgC,EAChC,2BAA2B,EAC3B,6BAA6B,CAC7B,iCAAiC;CAC3D;;ADnBD;EACE,mBAAmB;EACnB,oBAAoB;CACrB;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,kBAAoC;CACrC;;AAED;EACE,WAAW;CACZ;;AAED;EACE,sBAAsB;EACtB,oBAAoB;CACrB;;AAED;EACE,mBAAmB;CACpB;;AAED;;EAEE,eAAe;CAChB","file":"Dashboard.css","sourcesContent":["/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n@import '../../components/variables.css';\n\n.root {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.container {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: var(--max-content-width);\n}\n\n.news {\n  padding: 0;\n}\n\n.newsItem {\n  list-style-type: none;\n  padding-bottom: 6px;\n}\n\n.newsTitle {\n  font-size: 1.125em;\n}\n\n.newsTitle,\n.newsDesc {\n  display: block;\n}\n","/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  --font-family-base: 'Segoe UI', 'HelveticaNeue-Light', sans-serif;\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  --max-content-width: 1000px;\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */\n\n  --screen-xs-min: 480px;  /* Extra small screen / phone */\n  --screen-sm-min: 768px;  /* Small screen / tablet */\n  --screen-md-min: 992px;  /* Medium screen / desktop */\n  --screen-lg-min: 1200px; /* Large screen / wide desktop */\n}\n"],"sourceRoot":"webpack://"}]);
  
  // exports
  exports.locals = {
  	"root": "Dashboard_root_3_5",
  	"container": "Dashboard_container_1N4",
  	"news": "Dashboard_news_2yD",
  	"newsItem": "Dashboard_newsItem_1q0",
  	"newsTitle": "Dashboard_newsTitle_Cj5",
  	"newsDesc": "Dashboard_newsDesc_3jg"
  };

/***/ })
/******/ ]);
//# sourceMappingURL=server.js.map