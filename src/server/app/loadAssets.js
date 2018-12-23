
var PIXI = require('pixi.js');

var Assets = function(){};
var loadAssets = function(cb){
	PIXI.loader

		.add('chick', 'assets/chick.png')
		.add('cow', 'assets/cow.png')

		.add('blockrow'		, 'assets/blockrow.png')
		.add('block4blue'	, 'assets/block4blue.png')
		.add('block4green'	, 'assets/block4green.png')
		.add('block4red'	, 'assets/block4red.png')
		.add('block4yellow'	, 'assets/block4yellow.png')

		.add('blockblue'	, 'assets/blockblue.png')
		.add('blockgreen'	, 'assets/blockgreen.png')
		.add('blockred'		, 'assets/blockred.png')
		.add('blockyellow'	, 'assets/blockyellow.png')

		.load(cb.bind(this));
} // end loadAssets
var loadTextures = function(){
	Assets.characterTextures = {};
	Assets.cowTexture = PIXI.Texture.fromFrame("cow");

	Assets.blockRowTexture = PIXI.Texture.fromFrame("blockrow");
	Assets.block4BlueTexture = PIXI.Texture.fromFrame("block4blue");
	Assets.block4GreenTexture = PIXI.Texture.fromFrame("block4green");
	Assets.block4RedTexture = PIXI.Texture.fromFrame("block4red");
	Assets.block4YellowTexture = PIXI.Texture.fromFrame("block4yellow");

	Assets.blockBlueTexture = PIXI.Texture.fromFrame("blockblue");
	Assets.blockGreenTexture = PIXI.Texture.fromFrame("blockgreen");
	Assets.blockRedTexture = PIXI.Texture.fromFrame("blockred");
	Assets.blockYellowTexture = PIXI.Texture.fromFrame("blockyellow");

}


Assets.loadAssets = loadAssets;
Assets.loadTextures = loadTextures;
module.exports = exports = Assets;