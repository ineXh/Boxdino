module.exports = exports = SoundSystem;
var constants = require('./Constants.js');
import createjs from "createjs";

function SoundSystem(){
	this.sounds = [];
	this.musicInstance;
	this.motorInstance;
	this.driftInstance;
    this.create();
}
SoundSystem.prototype = {
	create: function(){
    	musicOn = JSON.parse(localStorage.getItem("music"));
        if(musicOn === null) musicOn = true;
        soundOn = JSON.parse(localStorage.getItem("sound"));
        if(soundOn === null) soundOn = true;
        //localStorage.setItem('sound', true);

        musicVolume = JSON.parse(localStorage.getItem("musicVolume"));
        if(musicVolume === null) musicVolume = 0.5;
        soundVolume = JSON.parse(localStorage.getItem("soundVolume"));
        if(soundVolume === null) soundVolume = 0.5;

        if (!createjs.Sound.initializeDefaultPlugins()) {
			addmsg('sound initialize error ')
			return;
		}
		audiotype = constants.AudioType.SoundJS;

		var assetsPath = "src/client/assets/";
		this.sounds = [
		    //{src: "dot.wav", id: constants.SoundType.Dot},
		];
		createjs.Sound.alternateExtensions = ["mp3"];
		createjs.Sound.addEventListener("fileload", createjs.proxy(this.soundjs_loaded, this)); // add an event listener for when load is completed
		createjs.Sound.registerSounds(this.sounds, assetsPath);

    }, // end create
    soundjs_loaded: function(){
    	this.playMusic();
    }, // end soundjs_loaded
    updateSound: function(bool){
        soundOn = bool;
        localStorage.setItem('sound', soundOn);
    },
    playMusic: function(){
    	if(musicOn && this.musicInstance == undefined){
			//this.musicInstance = this.playSound('latin', musicVolume, -1);
		}else if(musicOn){
			//this.musicInstance.play();
		}
    },
    changeMusicVolume: function(){
        if(this.musicInstance != undefined) this.musicInstance.volume = musicVolume;
    },
    stopMusic: function(){
    	if(this.musicInstance != undefined) this.musicInstance.stop();
    },
    playDot: function(){
        if(soundOn && this.dotInstance == undefined){
            this.dotInstance = this.playSound('Dot', 1*soundVolume, 0);
        }else if(soundOn){
            this.dotInstance.play();
        }
    },
    changeDotVolume: function(volume){
    	if(this.dotInstance != undefined) this.dotInstance.volume = volume;
    },
    stopDot: function(){
        if(this.dotInstance != undefined) this.dotInstance.stop();
    },
    playSound: function(target, volume, loop) {
		if(audiotype != constants.AudioType.SoundJS) return;
		target = this.sounds[constants.SoundType[target]];
		var props = {};
		if(volume != undefined){
		  props.volume = volume;
		}
		if(loop != undefined){
		  props.loop = loop;
		}
		//Play the sound: play (src, interrupt, delay, offset, loop, volume, pan)
		var instance = createjs.Sound.play(target.id, props);
		if (instance == null || instance.playState == createjs.Sound.PLAY_FAILED) {
		  return;
		}
		target.className = "gridBox active";

		instance.addEventListener("complete", function (instance) {
		  target.className = "gridBox";
		});
		return instance;
		//return;
	}, // end playSound
} // end SoundSystem
