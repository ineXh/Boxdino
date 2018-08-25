
var PIXI = require('pixi.js');

var Assets = function(){};
var loadAssets = function(cb){
	PIXI.loader
		
		.add('chick', 'src/client/assets/chick.png')
		.add('cow', 'src/client/assets/cow.png')

		.add('blockrow'		, 'src/client/assets/blockrow.png')
		.add('block4blue'	, 'src/client/assets/block4blue.png')
		.add('block4green'	, 'src/client/assets/block4green.png')
		.add('block4red'	, 'src/client/assets/block4red.png')
		.add('block4yellow'	, 'src/client/assets/block4yellow.png')

		.add('blockblue'	, 'src/client/assets/blockblue.png')
		.add('blockgreen'	, 'src/client/assets/blockgreen.png')
		.add('blockred'		, 'src/client/assets/blockred.png')
		.add('blockyellow'	, 'src/client/assets/blockyellow.png')

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