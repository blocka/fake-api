"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
  Make a Progress like function before serve the requested data
*/
var makeProgress = function makeProgress(duration, progress, done) {
  var startTime = Date.now();
  var cur = 0; // current
  var to = 100; // The number should be

  function check() {
    if (cur != to) {

      cur + to / 60 > to ? cur = to : cur += to / 60;

      if (progress) progress(cur); // callback

      setTimeout(function () {
        return check();
      }, duration / 60); // 60 FPS
    } else {
      if (done) done();
    }
  }

  return check();
};

/**
  Get Random Duration if the duration is not being set
*/
var getRandomDuration = function getRandomDuration() {
  return Math.floor(Math.random() * 4) * 1000;
};

exports.makeProgress = makeProgress;
exports.getRandomDuration = getRandomDuration;