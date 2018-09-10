module.exports = function(app, dirname){
	app.get('/player/', function(req, res, next){
		res.sendFile(dirname + '/src/player.html');
		//res.sendFile(__dirname + '/../src/player.html');
	});
} // end mdoule.exports