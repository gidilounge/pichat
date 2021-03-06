var express = require('express'),
	app = express(),
	server = require('http').createServer(app),
	io = require('socket.io').listen(server);
	users = {};

var login = require('login');
var signup = require('signup');
var userlist = require('user-list');

app.use(login);
app.use(signup);
app.use(userlist);
app.use(express.static(__dirname+'/static'));


server.listen(3000);
console.log('listening on port 3000');

app.get('/', function(req, res) {

	res.sendfile(__dirname + '/static/index.html');


});

io.sockets.on('connection', function(socket){

socket.on('new user', function(data, callback){

	if (data in users) {
		callback(false);
	} else {
		callback(true);
		socket.nickname = data;
		users[socket.nickname] = socket;
		updateNicknames();
	}

	});

	function updateNicknames() {

		io.sockets.emit('usernames', Object.keys(users));
		
	}

socket.on('send message', function(data, callback){
	var msg = data.trim();

		if(msg.substr(0,3) === '/w ') {
			msg = msg.substr(3);
			var ind = msg.indexOf(' ');
			
			if(ind !== -1){

				var name = msg.substring(0, ind);
				var msg = msg.substring(ind + 1);
				if(name in users) {
					users[name].emit('whisper', {msg: msg, nick : socket.nickname});
					console.log('Whisper!');
				} else {
					callback('Error! Enter a valid user.');
				}
			} else {
				callback('Error! Please enter a message for ur whisper');

			}
		}
		else
		{
		io.sockets.emit('new message', {msg: msg, nick : socket.nickname});
		console.log('Regular msg');
	}		
	});

	socket.on('disconnect', function(data){

		if (!socket.nickname) return;
		delete users[socket.nickname]
		updateNicknames();
	})

});