// set up
var express = require('express');
var app = express();
var _http = require('http');
var socketio = require('socket.io');

//attach socket.io
var server = _http.createServer(app);
var io = socketio.listen(server);
app.set('socketio', io);
app.set('server', server);

var mongoose = require('mongoose');
var port = process.env.PORT || 8080;
var database = require('./config/database');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// configuration 
mongoose.connect(database.localUrl); 	

app.use(express.static('./public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended': 'true'}));
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({type: 'application/vnd.api+json'})); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override'));


// routes
require('./app/routes.js')(app);

// listen (start app with node server.js)
app.get('server').listen(port);
console.log("App listening on port " + port);