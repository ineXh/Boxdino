module.exports = exports = Network;
var WorldHelper = require('./GameObjects/WorldHelper.js');
window.socket = null;
//var io = require('socket.io');
//const io = require('socket.io')();
import io from 'socket.io-client';

//const socket = io('http://localhost:3000');
var socket = null;
function Network(){
	this.create();
}
Network.prototype = {
	create: function(){
	},
	connect: function(){
		socket = io.connect('http://localhost:80/', {reconnection: false});
		//socket = io.connect('https://ancient-cove-94904.herokuapp.com/', {reconnection: false});
		var network = this;
		setTimeout( function(){
			if(socket.connected){
				network.setupConnection();
				network.joinServer();
			}else{
				console.log('Connection Timed Out! :(');
				socket.io._reconnection =false;
			}
		}, 1000 );
	},
	joinServer: function(){
		console.log('Playground joins server')
    	socket.emit('join server', {name: 'Playground', id: 0});
	},
	onJoinServerSuccess: function(msg){
		console.log('Playground join server success')
	},
	onSpawn: function(msg){
		console.log('onSpawn')
		console.log(msg)
		var side = width/25;
		WorldHelper.spawnPoly(msg.x*width, msg.y*height);
	},
	setupConnection: function(){
		socket.on('joinServerSuccess', this.onJoinServerSuccess);
		socket.on('spawn', this.onSpawn);
	// socket.on('news', onNews);
	// socket.on('player list', onPlayerList);
	// socket.on('joinGameSuccess', onJoinGameSuccess);
	// socket.on('player joins game', onPlayerJoin); // other player joins
	// socket.on('player changes direction', onPlayerChangeDirection);
	},

} // end Network
