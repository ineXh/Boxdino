var socket = null;
var width, height = 0;

var getRandomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var connect = function(){
	socket = io.connect('http://localhost:80/', {reconnection: false});
	//socket = io.connect('https://ancient-cove-94904.herokuapp.com/', {reconnection: false});
	setTimeout( function(){
		if(socket.connected){
			setupConnection();
			joinServer();
		}else{
			$("#news").text('Connection Timed Out! :(');
			socket.io._reconnection =false;
		}
	}, 1000 );
} // end connect

var setupConnection = function(){
	socket.on('joinServerSuccess', onJoinServerSuccess);	
	/*socket.on('news', onNews);
	socket.on('player list', onPlayerList);
	socket.on('joinGameSuccess', onJoinGameSuccess);
	socket.on('player joins game', onPlayerJoin); // other player joins
	socket.on('player changes direction', onPlayerChangeDirection);*/
}

var joinServer = function(){
	//name = document.getElementById("Name").value;
	var name = 'Player'
	var id = getRandomInt(2,9);
    console.log(name + ' joins server')
    socket.emit('join server', {name: name, id: id});
}
var onJoinServerSuccess = function(msg){
	name = msg.name;
	id = msg.id;
	sessionStorage.setItem('id', id);
	/*$("#news").text("Welcome " + name + ".");
	$("#ConnectServerButton").text("Disconnect")
	var form = document.getElementById("NameInput");
    form.style.display = "none";
	$("#JoinGameButton").show()*/
}

window.mousePos = {x: 0, y:0, xPct: 0, yPct: 0, px: 0, py: 0, sx: 0, sy: 0, raw_x: 0, raw_y: 0,
				stageX: 0, stageY: 0, stageXPct:0, stageYPct:0, clicked: false, touched: false, multitouched: false};
window.getMouse = function(event, touchobj){
	//console.log(touchobj)
	mousePos.px = mousePos.x;
	mousePos.py = mousePos.y;
	if(touchobj != undefined){
		mousePos.x = touchobj.clientX;
		mousePos.y = touchobj.clientY;
		//console.log(touchobj)
	}else if(event.clientX != undefined) {
		//console.log(event)
		mousePos.x = event.clientX;//data.global.x;
        mousePos.y = event.clientY;//data.global.y;
        //console.log(mousePos);
	}else{
		//console.log(event)
		mousePos.x = event.data.global.x;
		mousePos.y = event.data.global.y;
	}
	mousePos.raw_x = mousePos.x;
	mousePos.raw_y = mousePos.y;	
	mousePos.xPct = mousePos.x / width;
	mousePos.yPct = mousePos.y / height;;

}
var onTouchStart = function(event){
	console.log('onTouchStart')
	getMouse(event, event.changedTouches[0]);
	console.log('mouse pos: x ' + mousePos.xPct + ', y ' + mousePos.yPct);
	socket.emit('spawn', {x: mousePos.xPct, y: mousePos.yPct});
}


var Engine = (function(global) {
    lastTime = Date.now();
    startTime = lastTime;
    width = window.innerWidth;
    height = window.innerHeight;
    connect();
    //document.body.addEventListener("mousedown", onTouchStart, true);
    document.body.addEventListener("touchstart", onTouchStart, true);
    //gameSetup();
	//animate();
})(this);