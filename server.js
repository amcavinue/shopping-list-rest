/**
 * Modules
 */
var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

/**
 * Variables
 */
var Storage = {
  add: function(name) {
    var item = {name: name, id: this.setId};
    this.items.push(item);
    this.setId += 1;
    return item;
  },
  remove: function(index) {
    if (index) {
      delete this.items[index];
    }
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
// Set the root (/) route to the public directory.
app.use(express.static('public'));

// GET /items
app.get('/items', function(request, response) {
    response.json(storage.items);
});

// POST /items
app.post('/items', jsonParser, function(request, response) {
  if(!('name' in request.body)) {
    return response.sendStatus(400);
  }
  
  var item = storage.add(request.body.name);
  response.status(201).json(item);
});

//DELETE /items/<id>
app.delete('/items/:id', function(request, response) {
  var foundItem = false;
  var arrayIndex;
  
  for (var i = 0; i < storage.items.length; i++) {
    if (Number(request.params.id) === storage.items[i].id) {
      foundItem = true;
      arrayIndex = i;
    }
  }
  
  if (!foundItem) {
    return response.sendStatus(404);
  } else {
    storage.remove(i);
    return response.sendStatus(200);
  }
  
});

// Run the local server.
app.listen(process.env.PORT || process.env.IP);
