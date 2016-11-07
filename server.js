/**
 * Modules
 */
var express = require('express');

/**
 * Variables
 */
var Storage = {
  add: function(name) {
    var item = {name: name, id: this.setId};
    this.items.push(item);
    this.setId += 1;
    return item;
  } 
};

var createStorage = function() {
  var storage = Object.create(Storage);
  storage.items = [];
  storage.setId = 1;
  return storage;
};

var storage = createStorage();

storage.add('Broad beans');
storage.add('Tomatoes');
storage.add('Peppers');

var app = express();

/**
 * Routes
 */
app.use(express.static('public'));  // Set the root (/) route to the public directory.

// GET /items
app.get('/items', function(request, response) {
    response.json(storage.items);
});

// Run the local server.
app.listen(process.env.PORT || 8080, process.env.IP);
