var constants = require('./../Constants.js');
var Utils = require('./../Utils.js');
var Helper = require('./../Helper.js');
var Assets = require('./../loadAssets.js');
//var World = require('./../WorldFlat.js');
var WorldHelper = require('./WorldHelper.js');
var Effects = require('./../Particle/Effects.js');
module.exports = exports = Flag;

// let 10 m per block
function Flag(){
    this.create();
}
Flag.prototype = {
    create: function(){
        this.pos = new PVector(0, 0);
        this.sprite = Helper.buttonCreate(Assets.textures.flagTexture,
        0, 0, width/20);

    },
    init: function(x, y){

        this.sprite.x = x;
        this.sprite.y = y;
        stageBb.addChild(this.sprite);
        updateQueue.add(this);
        Helper.spriteListener.call(this, this.sprite, this.touchDown, this.touchMove, this.touchUp, this.touchUp);
        //backObjects.Flags.push(this);
    },
    update: function(){
        //console.log('update Flag')

    },
    clean: function(){
        //console.log('Flag clean')
        pool.return(constants.BoxObjectType.Flag, this);
        updateQueue.remove(this);
        //this.shape.disable();
        stageBb.removeChild(this.sprite);
    }, // end clean
    touchDown: function(event){
        //console.log('touch')
        this.touched = true;
        Utils.getMouseBasic(event);    
    },
    touchUp: function(event){
        //console.log('touchUp')
        this.touched = false;
        //Utils.getMouseBasic(event);
    },
    touchMove: function(event){
        if(!this.touched) return;
        //console.log('touchMove')
        Utils.getMouseBasic(event);
        this.sprite.x = mousePos.stageX
        this.sprite.y = mousePos.stageY
    },
} // end Flag