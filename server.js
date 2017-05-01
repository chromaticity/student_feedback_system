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

// mongoose stuff
var Feedbacks = require('./app/models/feedback');
var feedback_schema = mongoose.model("Feedbacks").schema;
var Feedback = mongoose.model("Feedbacks", feedback_schema);

// routes, passing through the socket io instance to it
require('./app/routes.js')(app, io);

// listen (start app with node server.js)
app.get('server').listen(port);
console.log("App listening on port " + port);

// on connection of the actual client... 
io.on('connection', function (socket) {
    Feedback.count({"type": "thumbsdown"}, function(err, c) {
      socket.emit('thumbsdown_sent', { thumbsdown: c });
    });

    Feedback.count({"type": "thumbsup"}, function(err, c) {
      socket.emit('thumbsup_sent', { thumbsup: c });
    });

    Feedback.count({"type": "speaklouder"}, function(err, c) {
      socket.emit('speaklouder_sent', { speaklouder: c });
    });
    
    socket.on('my other event', function (data) {
      console.log(data);
    });
});