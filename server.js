// =================================
// MODULE DEPENDENCIES
// =================================
var express        = require('express');
var logger         = require('morgan');
var cookieParser   = require('cookie-parser');
var bodyParser     = require('body-parser');
var fileSys        = require('fs');
var methodOverride = require('method-override');
var database       = require('mysql')
var cliColor       = require('cli-color');
var app            = express();

// Controller vars.
var site           = require('./controllers/site');
var zeelieden      = require('./controllers/zeelieden');

module.exports =  app;

// =================================
// CONFIG
// =================================

// MySQL config.
global.MySQL = database.createConnection({
    host           : '',
    user           : '',
    password       : '',
    database       : '',
    connectTimeout : 700000
  });

// Other config stuff
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.use(methodOverride('_method'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/assets'));

// =================================
// LOGGING
// =================================
var productionLogStream = fileSys.createWriteStream(__dirname + '/logs/access.log', {flags: 'a'});

app.use(logger('tiny', {stream: productionLogStream}));

// =================================
// ROUTING
// =================================

app.get('/', site.index);
app.get('/zeelieden', zeelieden.index);
app.get('/zeelied/:id', zeelieden.sailor);
app.get('/zeelieden/search', function(req, res){
    
    var value = req.param.value;
    
    res.write('From Form:');
    res.write(value);
    res.end();

});

// =================================
// BOOSTRAP APP
// =================================

if (!module.parent) {
  app.listen(3000);
  console.log(cliColor.green('Started on port 3000'));
}
