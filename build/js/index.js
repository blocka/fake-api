'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
/*! Copyright (c) 2016 Naufal Rabbani (http://github.com/BosNaufal)
* Licensed Under MIT (http://opensource.org/licenses/MIT)
*
* 
*  fake-api @Version 0.0.1
*
*
*/

var _storage = require('./storage.js');

var _storage2 = _interopRequireDefault(_storage);

var _utils = require('./utils.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var routes = [];

var Router = function () {
  function Router(args) {
    _classCallCheck(this, Router);

    this.args = args;
    return this;
  }

  // Add new Route


  _createClass(Router, [{
    key: 'addRoute',
    value: function addRoute() {
      var route = {};
      route.url = this.args.url;
      route.method = this.args.method;
      route.response = this.args.response;

      if (routes.length !== 0) {
        routes.forEach(function (item) {
          if (item.url === route.url && item.method === route.method) console.warn("[Fake API]: The route has been defined before");
        });
      }

      // Define the block
      var regex = new RegExp('\/[a-zA-Z0-9|\{a-zA-Z0-9\}]+', 'gi');

      var routeRegex = [];
      var pass = [];
      var blocks = [];
      var matchy = void 0;
      while (matchy = regex.exec(route.url)) {
        // Separated the blocks
        var block = matchy[0].substr(1);
        blocks.push(block);

        // Make a Regex
        var variable = block.indexOf('{');
        var isVariable = variable !== -1;
        if (isVariable) {
          routeRegex.push('[\\w\\W]+');
          pass.push(true);
        } else {
          routeRegex.push('\\/' + block + '\\/');
          pass.push(false);
        }
      }

      // Regex has been made
      route.regex = routeRegex.join('');
      route.pass = pass;
      route.blocks = blocks;

      routes.push(route);
    }

    // Find Match Route and Do a callback!

  }, {
    key: 'findMatch',
    value: function findMatch() {
      var _args = this.args;
      var data = _args.data;
      var done = _args.done;
      var url = _args.url;
      var method = _args.method;

      // Find the destination

      var destination = {};
      routes.forEach(function (route) {
        var regex = new RegExp(route.regex, 'ig');
        var match = url.match(regex);

        // Check Match and the method
        if (match && route.method === method) destination = route;
      });

      // If destination is not found
      if (!destination.url) return console.warn("[Fake API]: The route is not found");else {

        // Define the block
        var regex = new RegExp('\/[a-zA-Z0-9]+', 'gi');

        var blocks = [];
        var matchy = void 0;
        while (matchy = regex.exec(url)) {
          // Separated the blocks
          var block = matchy[0].substr(1);
          blocks.push(block);
        }

        // Find the variables should pass to the callback
        var args = {};
        for (var i = 0; i < destination.pass.length; i++) {
          if (destination.pass[i]) {
            var argName = destination.blocks[i].replace(/\{|\}/ig, '');
            var notNumber = isNaN(parseFloat(blocks[i]));
            if (notNumber) args[argName] = blocks[i];else args[argName] = parseFloat(blocks[i]);
          }
        }

        // Passing Data From AJAX request
        if (data) args.req = data;

        // Make new Database
        args.database = new _storage2.default();

        // Get the Data and Bind the callback
        if (typeof destination.response === "function") return done(destination.response(args));else return console.warn("[Fake API]: The route has no callback function");
      }
    }

    // Static method to add new Route

  }], [{
    key: 'add',
    value: function add(method, url, response) {
      return new Router({ method: method, url: url, response: response }).addRoute();
    }

    // Static method to make Fake Ajax Call

  }, {
    key: 'ajax',
    value: function ajax(args) {
      var url = args.url;
      var method = args.method;
      var duration = args.duration;
      var progress = args.progress;
      var done = args.done;
      var data = args.data;

      // method "GET" as default

      method = method ? method : "GET";

      // Make new Instance
      var fake = void 0;
      if (data) fake = new FakeAPI({ url: url, method: method, done: done, data: data });else fake = new FakeAPI({ url: url, method: method, done: done });

      // DO IT!
      return (0, _utils.makeProgress)(duration ? duration : (0, _utils.getRandomDuration)(), function (percent) {
        return progress ? progress(percent) : false;
      }, function () {
        return fake.findMatch();
      });
    }
  }]);

  return Router;
}();

var FakeAPI = Router;
exports.default = FakeAPI;