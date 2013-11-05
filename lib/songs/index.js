var express = require('express');
var app = module.exports = express();

app.get('/songs', function(req, res){
	res.render('list of songs');

});