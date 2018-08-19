
var PIXI = require('pixi.js');

var Assets = function(){};
var loadAssets = function(cb){
	PIXI.loader
		
		.add('chick', 'src/client/assets/chick.png')
		.add('cow', 'src/client/assets/cow.png')

		.load(cb.bind(this));
} // end loadAssets
var loadTextures = function(){
	Assets.characterTextures = {};
	Assets.cowTexture = PIXI.Texture.fromFrame("cow");

}


Assets.loadAssets = loadAssets;
Assets.loadTextures = loadTextures;
module.exports = exports = Assets;