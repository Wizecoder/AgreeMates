// Contains the code to start the server

var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var compress = require('compression');
var Bookshelf  = require('bookshelf');
var router = require('./routes');
var config = require('./config');

var app = express();

Bookshelf.DB = Bookshelf.initialize({
  client: 'pg',
  connection: {
    host     : config.db.host,
    user     : config.db.user,
    password : config.db.password,
    database : config.db.database,
    port	 : config.db.port,
    charset  : 'utf8'
  }
});

app.set('views', __dirname + './../public/app');
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);
app.use(logger());
app.use(compress());
app.use(bodyParser());
app.use(cookieParser());
router(app);
app.use(express.static(path.join(__dirname + './../public/app')));

app.listen(config.port, function() {
  console.log('Server running on port ' + config.port);
});
