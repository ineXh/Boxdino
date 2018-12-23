var constants = require('./../Constants.js');
var Utils = require('./../Utils.js');
var Helper = require('./../Helper.js');
var Assets = require('./../loadAssets.js');
//var World = require('./../WorldFlat.js');
var WorldHelper = require('./WorldHelper.js');
module.exports = exports = RoadBlock;

// let 10 m per block
function RoadBlock(){
    this.create();
}
RoadBlock.prototype = {
    create: function(){
        this.sprite = Helper.buttonCreate(Assets.textures.roadBlockTexture,
        0, 0, width/20);
        this.shape = createRect(width*0.0, height*0.0,
            this.sprite.width*1.00, this.sprite.height/2, Box2D.b2_dynamicBody, true);
    },
    init: function(x, y){
        //tempb2Vec2
        //console.log('roadblock init')
        this.shape.enable();
        this.shape.setPosition(x/METER, y/METER);
        //this.shape.setAngle(PI/2+PI);
        this.shape.setAngle(0);
        //this.shape.setAngle(PI/2);
        this.sprite.x = x;
        this.sprite.y = y;
        stageBb.addChild(this.sprite);
        updateQueue.add(this);
        //backObjects.roadBlocks.push(this);
    },
    update: function(){
        //console.log('update roadblock')
            this.sprite.rotation = this.shape.body.GetAngle();
            this.sprite.x = this.shape.body.GetPosition().get_x()*METER;
            this.sprite.y = this.shape.body.GetPosition().get_y()*METER;
    },
    clean: function(){
        //console.log('roadblock clean')
        pool.return(constants.BoxObjectType.RoadBlock, this);
        updateQueue.remove(this);
        this.shape.disable();
        stageBb.removeChild(this.sprite);
    }, // end clean
} // end RoadBlock