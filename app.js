var express = require('express');
var ejs = require('ejs');

var app = express();

app.set('views', path.join(_dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  res.render('index');
})
