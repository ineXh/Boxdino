var constants = require('./../Constants.js');
var Utils = require('./../Utils.js');
var Helper = require('./../Helper.js');
var Assets = require('./../loadAssets.js');
//var World = require('./../WorldFlat.js');
var WorldHelper = require('./WorldHelper.js');
var Effects = require('./../Particle/Effects.js');
module.exports = exports = Puddle;

// let 10 m per block
function Puddle(){
    this.create();
}
Puddle.prototype = {
    create: function(){
        this.pos = new PVector(0, 0);
        this.sprite = Helper.buttonCreate(Assets.textures.puddleTexture,
        0, 0, width/20);
        this.shape = WorldHelper.createSensorRect(0, 0, this.sprite.width, this.sprite.height); //createRect
        this.shape.boxObjectType = constants.BoxObjectType.Puddle;
        this.shape.parent = this;
        this.shape.disable();
        //this.shape = createRect(width*0.0, height*0.0,
          //  this.sprite.width*1.00, this.sprite.height/2, Box2D.b2_dynamicBody, true);
    },
    init: function(x, y){
        //tempb2Vec2
        //debugger;
        //console.log('Puddle init')
        this.shape.enable();
        this.shape.setPosition(x/METER, y/METER);
        //this.shape.setAngle(PI/2+PI);
        //this.shape.setAngle(0);
        this.sprite.x = x;
        this.sprite.y = y;
        stageB.addChild(this.sprite);
        updateQueue.add(this);
        //backObjects.Puddles.push(this);
    },
    update: function(){
        //console.log('update Puddle')
            //this.sprite.rotation = this.shape.body.GetAngle();
            //this.sprite.x = this.shape.body.GetPosition().get_x()*METER;
            //this.sprite.y = this.shape.body.GetPosition().get_y()*METER;
    },
    clean: function(){
        //console.log('Puddle clean')
        pool.return(constants.BoxObjectType.Puddle, this);
        updateQueue.remove(this);
        this.shape.disable();
        stageB.removeChild(this.sprite);
    }, // end clean
    splash: function(){
        this.pos.x = this.shape.body.GetPosition().get_x()*METER;
        this.pos.y = this.shape.body.GetPosition().get_y()*METER;
        Effects.spawnWaterSplash(this);
    }, // end splash
} // end Puddle