var express = require('express');
var routes = require('./routes');
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname, './../app' )));

app.get('/signup', routes.signup);

// app.use(function (req, res) {
//     res.json({'ok': false, 'status': '404'});
// });

module.exports = app;

app.listen(3000);
console.log('listening on port 3000');