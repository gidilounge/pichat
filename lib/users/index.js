var express = require('express');
var request = require('request');
var fs = require('fs');
var format = require('util').format;

var app = module.exports = express();
var apikey = 'UqW3E6RTScskwkfxXt7ek3X2bqTckQki5gculYuR';

app.set('views', __dirname);
app.set('view engine', 'html');

app.use(express.bodyParser());
app.use(express.multipart());


app.get('/newuser', function(req, res){

	res.render('newuser');

});

app.post('/newuser', function(req, res){

	console.log('Username: ' + req.body.username);	
	console.log('Password: ' + req.body.emailaddress);
	console.log('Password: ' + req.body.password);

});




app.get('/users', function(req, res){

newjson = {};
songarray = [];

var firstRequest = function(){
		
		request('http://gplayer.herokuapp.com/api/playlist/cloudafrica', function (error, response, body) {
		  
		if (!error && response.statusCode == 200) {
		    console.log('Response Good and Received');
		    var jsonified = JSON.parse(body);
		    
		    
		    for(var i = 0; i < jsonified.tracks.length; i++)
			{
			    console.log(jsonified.tracks[i].thumbnail);
			    songarray.push(jsonified.tracks[i].thumbnail);
			    
			}


			track = jsonified.tracks[0].thumbnail;  

			console.log(jsonified);
		  	res.render('users', {jsonified: jsonified});
		  };

		});

	}


var tracks = firstRequest();


		


});


app.get('/upload', function(req, res){ 

	res.render('upload');


});


app.post('/upload', function(req, res, next){

	var tmp_path = req.files.image.path;
	var target_path = '/tmp/';

	 res.send(format('\nuploaded %s (%d Kb) to %s as %s'
	    , req.files.image.name
	    , req.files.image.size / 1024 | 0 
	    , req.files.image.path
	    ));

	





	});

 




