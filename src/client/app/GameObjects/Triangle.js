var constants = require('./../Constants.js');
var Utils = require('./../Utils.js');
var Helper = require('./../Helper.js');
var Assets = require('./../loadAssets.js');
//var World = require('./../WorldFlat.js');
var WorldHelper = require('./WorldHelper.js');
module.exports = exports = Triangle;

function Triangle(){
    this.create();
}
Triangle.prototype = {
    create: function(){
        // this.sprite = Helper.buttonCreate(Assets.textures.TriangleTexture,
        // 0, 0, width/40);
        // density = 25000;
        var usedForDebug = true;
        var side = width/25;
        this.shape = WorldHelper.createPoly(world.world, 3, 100, 100, side, side); //shapes.push(item)
        this.shape.disable()
        //this.shape = createBall(width*0.0, height*0.0, this.sprite.width/2, density, usedForDebug);
        //createRect(width*0.0, height*0.0,
        //    this.sprite.width*1.00, this.sprite.height/2, Box2D.b2_dynamicBody, true);
    },
    init: function(x, y){
        //tempb2Vec2
        //console.log('Triangle init')
        this.shape.enable();
        this.shape.setPosition(x/METER, y/METER);
        //this.shape.setAngle(PI/2+PI);
        this.shape.setAngle(0);
        //this.shape.setAngle(PI/2);
        //this.sprite.x = x;
        //this.sprite.y = y;
        //stage.addChild(this.sprite);
        updateQueue.add(this);
        //backObjects.Triangles.push(this);
    },
    update: function(){
        //console.log('update Triangle')
            // this.sprite.rotation = this.shape.body.GetAngle();
            // this.sprite.x = this.shape.body.GetPosition().get_x()*METER;
            // this.sprite.y = this.shape.body.GetPosition().get_y()*METER;
    },
    clean: function(){
        //console.log('Triangle clean')
        pool.return(constants.BoxObjectType.Poly, this);
        updateQueue.remove(this);
        this.shape.disable();
        //stageBb.removeChild(this.sprite);
    }, // end clean
} // end Triangle