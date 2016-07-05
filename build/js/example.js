'use strict';

var _ = require('./');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Make a New API for GET Method
_2.default.add('GET', '/post/{postId}/comments/{commentId}', function (args) {
  var database = args.database;

  return database.get();
});

// Make a New API for POST
_2.default.add('POST', '/post/{postId}', function (args) {

  // Check The passing data
  console.log(args);

  // Destructure
  var database = args.database;

  // Be Careful, It will replace your data

  database.set({ hai: "woy" });
  // The data now is { hai: "woy" }

  // So, you need to assigned it before place it
  var data = database.get();
  var newData = database.assign(data, { hai: "hai", halo: "bro" });

  // set new data
  database.set(newData);
  // The data now is { hai: "hai", halo: "bro" }

  // Get the datas
  return database.get();
});

// Make a Request, Just like the Jquery AJAX request
_2.default.ajax({
  url: '/post/1',
  method: "POST",
  data: { id: 1 },
  progress: function progress(percent) {
    console.log(percent);
  },
  done: function done(data) {
    console.log(data);
  }
});