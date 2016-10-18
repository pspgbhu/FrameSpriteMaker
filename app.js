var express = require('express');
var ejs = require('ejs');
var path = require('path');

var app = express();

app.engine('.html', require('ejs').__express);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'views')));

app.get('/', function (req, res) {
  res.render('index');
})
app.listen(3000, function () {
  console.log('app is listening at port 3000')
})

// module.exports = app;
