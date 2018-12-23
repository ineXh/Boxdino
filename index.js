'use strict'
var express = require('express');
var app = express();

var port = process.env.PORT || 80;
app.set('port', port);
app.use(express.static('src'));
app.get('/', function(req, res){
	//res.sendFile(__dirname + '/public/index.html');
	res.sendFile(__dirname + '/src/playground.html');
})
require('./app/routes')(app, __dirname);

var server = app.listen(app.get('port'), function(){
	console.log('Node app is running on port ', app.get('port'));
});
var io = require('socket.io')(server);
var GameServer = require('./app/GameServer.js');
var gameServer = new GameServer(io);

exports = module.exports = app;