var PIXI = require('pixi.js');
var assets = require('./loadAssets.js');
var constants = require('./Constants.js');

var UpdateQueue = require('./UpdateQueue.js');
var SoundSystem = require('./SoundSystem.js');
var Helper = require('./Helper.js');
var World = require('./World.js');
var Utils = require('./Utils.js');
var Pool = require('./GameObjects/Pool.js')
import Global from 'script-loader!./Global.js';
//import Box2D from 'script-loader!./lib/Box2D_v2.3.1_min.js';
//import Box2Dhelper from 'script-loader!./lib/embox2d-helpers.js';
//import SoundJS from 'script-loader!./soundjs-NEXT.min.js';
//var SoundJS = require('./soundjs-NEXT.min.js');
//const createjs = require( 'createjs')

var cow = null;
var Engine = (function(global) {
    document.addEventListener('DOMContentLoaded', function() {
    	//debugger;
    	//window.scrollTo(0,1);
    	//document.body.style.overflow = 'hidden';
    	width = window.innerWidth;
    	height = window.innerHeight;

    	var app = new PIXI.Application(width, height,
        {backgroundColor : 0x59b4ff, //,
         transparent : false, antialias: true});
    	var worldRenderer = app.renderer;
    	worldRenderer.view.setAttribute("id", "canvas1");
		document.body.appendChild(worldRenderer.view);

        Utils.addListeners(worldRenderer);


        //debugger;

		stage = new PIXI.Container();

		var initialize = function(){
			//console.log('initialize')
			assets.loadTextures();
            soundSystem = new SoundSystem()
            updateQueue = new UpdateQueue()

            world = new World();
            pool = new Pool();

            // var cowSprite = Helper.buttonCreate(assets.cowTexture,
            //          width/2, height/2, width/5);
            //stage.addChild(cowSprite)
            //console.log('main')
		    //renderApp();
            //renderAwesome();
            //renderPoseTest();
            //renderChatMessages();
		    animate();
		}

		assets.loadAssets(initialize);
		var update = function(){
	        updateQueue.update();
            //character.update();
            world.step();
            shapes.forEach(function(s){
                s.update();
             });
            /*walls.forEach(function(w){
                w.shape.update();
             });*/
	    }
		function animate() {
            requestAnimationFrame(animate);
            update();
            worldRenderer.render(stage);
    	} // end animate
    }); // end DOMContentLoaded
})(this);
