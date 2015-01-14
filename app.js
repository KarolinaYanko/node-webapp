var express = require('express');
var http = require('http');
var path = require('path');
var config = require('config');
var log = require('libs/log')(module);

var app = express();
app.set('port', config.get('port'));

app.set('views', path.join(__dirname, '/template'));
app.set('view engine', 'ejs');

app.use(express.favicon());
if(app.get('env') == 'development'){
	app.use(express.logger('dev'));
} else {
	app.use(express.logger('default'));
}

app.use(express.json()); // instead of bodyParser() form application/json

app.use(app.router);
// app.use(express.session()); //req.cookie
app.get('/', function(req, res, next){
	res.render('index', {
		body: '<b>Hello<b>'
	});
});

// app.use(express.urlencoded());

app.use(express.static(path.join(__dirname, 'public')));


app.use(function(err, req, res, next){ //обработчик ошибок
	// NODE_ENV = 'production'
	if (app.get('env') == 'development'){
	  var errorHandler = express.errorHandler();
		errorHandler(err, req, res, next);
	} else{
		res.send(500);
	}
});

// var routes = require('./routes');
// var user = require('./routes/user');
// // all environments

// app.get('/', routes.index);
// app.get('/users', user.list);

http.createServer(app).listen(config.get('port'), function(){
  log.info('Express server listening on port ' + config.get('port'));
});
