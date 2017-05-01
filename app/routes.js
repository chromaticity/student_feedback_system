// routing system for the entire application. where voting is handled
// these api routes can be then hooked up to the android app's buttons, and requests will be scanned realtime

// need mongoose and my feedback models
var Feedbacks = require('./models/feedback');
var mongoose = require('mongoose');

function getFeedbacks(res) {
    Feedbacks.find(function (err, votes) {
        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }
        res.json(votes);
    });
};

// pass in the socket io instance so we can monitor in real time when route is hit
module.exports = function (app, io) {
    // api calls for all specified buttons
    app.get('/api/feedback', function (req, res) {
        // use mongoose to get all todos in the database
        getFeedbacks(res);
    });

    // create feedback and send back all todos after creation
    app.post('/api/thumbsup', function (req, res) {
        // create a feedback, information comes from AJAX request from Angular
        Feedbacks.count({"type": "thumbsup"}, function(err, c) {
            var no_zero = c + 1;
            io.sockets.emit("thumbsup_sent", { thumbsup: no_zero });
        });

        Feedbacks.create({
            text: req.body.text,
            type: "thumbsup",
            done: false
        }, function (err, feedback) {
            if (err)
                res.send(err);

            // get and return all the todos after you create another
            getFeedbacks(res);
        });
    });

    app.post('/api/thumbsdown', function (req, res) {
        // create a feedback, also pass the value of the total amount of votes.
        Feedbacks.count({"type": "thumbsdown"}, function(err, c) {
            var no_zero = c + 1;
            io.sockets.emit("thumbsdown_sent", { thumbsdown: no_zero });
        });

        Feedbacks.create({
            text: req.body.text,
            type: "thumbsdown",
            done: false
        }, function (err, feedback) {
            if (err)
                res.send(err);
            // get and return all the todos after you create another
            getFeedbacks(res);
        });
    });

    // speak louder api route
    app.post('/api/speaklouder', function (req, res) {
        // create a feedback, also pass the value of the total amount of votes.
        Feedbacks.count({"type": "speaklouder"}, function(err, c) {
            var no_zero = c + 1;
            io.sockets.emit("speaklouder_sent", { speaklouder: no_zero });
        });

        Feedbacks.create({
            text: req.body.text,
            type: "speaklouder",
            done: false
        }, function (err, feedback) {
            if (err)
                res.send(err);
            // get and return all the todos after you create another
            getFeedbacks(res);
        });
    });

    // speak slower api route
    app.post('/api/speakslower', function (req, res) {
        // create a feedback, also pass the value of the total amount of votes.
        Feedbacks.count({"type": "speakslower"}, function(err, c) {
            var no_zero = c + 1;
            io.sockets.emit("speakslower_sent", { speakslower: no_zero });
        });

        Feedbacks.create({
            text: req.body.text,
            type: "speakslower",
            done: false
        }, function (err, feedback) {
            if (err)
                res.send(err);
            // get and return all the todos after you create another
            getFeedbacks(res);
        });
    });


    // delete a feedback
    app.delete('/api/feedback', function (req, res) {
        mongoose.connect('mongodb://localhost/studentfeedback',function(){
             /* Drop the DB, gone forever. 
                A new one will be created shortly after, but empty. */
            mongoose.connection.db.dropDatabase();
        });
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};
