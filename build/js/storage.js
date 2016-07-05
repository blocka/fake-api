"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var internalStorage = {};

var FakeDatabase = function () {
  function FakeDatabase() {
    _classCallCheck(this, FakeDatabase);

    this.get();
    return this;
  }

  /**
    Get the localStorage data then put it on private variable
  */


  _createClass(FakeDatabase, [{
    key: "get",
    value: function get() {
      if (localStorage.fakeAPI) {
        this.data = JSON.parse(localStorage.fakeAPI);
        return this.data;
      }
    }

    /**
      Set the localStorage data then put it on private variable
    */

  }, {
    key: "set",
    value: function set(obj) {
      this.data = JSON.stringify(obj);
      localStorage.fakeAPI = this.data;
      return this.data;
    }

    /**
      Simple Assign function
    */

  }, {
    key: "assign",
    value: function assign(source, newData) {
      // ASSIGN! Yeey!
      var keys = Object.keys(source);
      var newDataKeys = Object.keys(newData);
      for (var index in keys) {
        for (var indexNew in newDataKeys) {
          var sourceKey = keys[index];
          var newDataKey = newDataKeys[indexNew];
          if (sourceKey === newDataKey) source[sourceKey] = newData[newDataKey];else source[newDataKey] = newData[newDataKey];
        }
      }
      return source;
    }
  }]);

  return FakeDatabase;
}();

exports.default = FakeDatabase;