var Feedbacks = require('./models/feedback');

function getFeedbacks(res) {
    Feedbacks.find(function (err, todos) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err) {
            res.send(err);
        }

        res.json(todos); // return all todos in JSON format
    });
};

module.exports = function (app) {

    // api ---------------------------------------------------------------------
    // get all responses
    app.get('/api/feedback', function (req, res) {
        // use mongoose to get all todos in the database
        getFeedbacks(res);
    });

    // create feedback and send back all todos after creation
    app.post('/api/thumbsup', function (req, res) {

        // create a feedback, information comes from AJAX request from Angular
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

        // create a feedback, information comes from AJAX request from Angular
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


    // delete a feedback
    app.delete('/api/feedback/:feedback_id', function (req, res) {
        Feedbacks.remove({
            _id: req.params.feedback_id
        }, function (err, feedback) {
            if (err)
                res.send(err);

            getFeedbacks(res);
        });
    });

    // application -------------------------------------------------------------
    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });
};
