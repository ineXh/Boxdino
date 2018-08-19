var constants = require('./../Constants.js');
var Utils = require('./../Utils.js');
var Helper = require('./../Helper.js');
var Assets = require('./../loadAssets.js');
//var World = require('./../WorldFlat.js');
var WorldHelper = require('./WorldHelper.js');
module.exports = exports = Tire;

// let 10 m per block
function Tire(){
    this.create();
}
Tire.prototype = {
    create: function(){
        this.sprite = Helper.buttonCreate(Assets.textures.tireTexture,
        0, 0, width/40);
        density = 25000;
        usedForDebug = true;
        this.shape = createBall(width*0.0, height*0.0, this.sprite.width/2, density, usedForDebug);
        //createRect(width*0.0, height*0.0,
        //    this.sprite.width*1.00, this.sprite.height/2, Box2D.b2_dynamicBody, true);
    },
    init: function(x, y){
        //tempb2Vec2
        //console.log('Tire init')
        this.shape.enable();
        this.shape.setPosition(x/METER, y/METER);
        //this.shape.setAngle(PI/2+PI);
        this.shape.setAngle(0);
        //this.shape.setAngle(PI/2);
        this.sprite.x = x;
        this.sprite.y = y;
        stageBb.addChild(this.sprite);
        updateQueue.add(this);
        //backObjects.Tires.push(this);
    },
    update: function(){
        //console.log('update Tire')
            this.sprite.rotation = this.shape.body.GetAngle();
            this.sprite.x = this.shape.body.GetPosition().get_x()*METER;
            this.sprite.y = this.shape.body.GetPosition().get_y()*METER;
    },
    clean: function(){
        //console.log('Tire clean')
        pool.return(constants.BoxObjectType.Tire, this);
        updateQueue.remove(this);
        this.shape.disable();
        stageBb.removeChild(this.sprite);
    }, // end clean
} // end Tire