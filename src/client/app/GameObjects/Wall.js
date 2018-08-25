var constants = require('./../Constants.js');
var Utils = require('./../Utils.js');
var Helper = require('./../Helper.js');
var Assets = require('./../loadAssets.js');
//var World = require('./../WorldFlat.js');
var WorldHelper = require('./WorldHelper.js');
module.exports = exports = Wall;

// let 10 m per block
function Wall(world, x, y, length, angle, clrIndex){
    this.create(world, x, y, length, angle, clrIndex);
}
Wall.prototype = {
    create: function(world, x, y, length, angle, clrIndex){
        //debugger;
        //this.shape = World.create();
            this.clrIndex = 0;
            if(clrIndex) this.clrIndex = clrIndex;
            var blocks = Math.ceil(length/PXPM/MPB);
            this.x = x;
            this.y = y;
            this.angle = angle;
            //console.log('blocks ' + blocks)
            //console.log('blockSide ' + blockSide)
            this.shape = WorldHelper.createStaticFloor(world, x,y,length,blockSide, true);

            this.shape.body.SetTransform(this.shape.body.GetPosition(), angle);

            this.container = new PIXI.Container();
            //this.container.pivot.x = 0.5;
            this.container.x = x;//(x) *Math.cos(angle) - y*Math.sin(angle);
            this.container.y = y;//-(x) *Math.sin(angle) - y*Math.cos(angle)
            this.container.rotation = angle;

            this.num4 = (blocks) >> 2 // divide remaining by 4 and floor
            for(var i = 0; i < this.num4; i++){
                var x = 4*blockSide*i - length/2;
                var asset = this.getClr(4);
                var sprite = Helper.buttonCreate(asset, x, 0, 4*blockSide);
                sprite.anchor.x = 0;
                this.container.addChild(sprite);
            }
            this.num1 = (blocks- this.num4*4)// divide remaining by 4 and floor
            for(var i = 0; i < this.num1; i++){
                var x = 1*blockSide*i - length/2 + this.num4*4*blockSide
                var asset = this.getClr(1);
                var sprite = Helper.buttonCreate(asset, x, 0, 1*blockSide);
                sprite.anchor.x = 0;
                this.container.addChild(sprite);
            }

            //stageB.addChild(this.container);
            stage.addChild(this.container);

        //stageB.addChild(this.sprite);

    },
    clean: function(){
        this.shape.clean();
        stage.removeChild(this.container);
    }, // end clean
    getClr: function(num){
        // red green yellow blue
        var clr = this.clrIndex%16;
        this.clrIndex += num;
        switch(clr){
            case 0: case 1: case 2: case 3:
                if(num == 4) return Assets.block4RedTexture;
                if(num == 1) return Assets.blockRedTexture;
            break;
            case 4: case 5: case 6: case 7:
                if(num == 4) return Assets.block4GreenTexture;
                if(num == 1) return Assets.blockGreenTexture;
            break;
            case 8: case 9: case 10: case 11:
                if(num == 4) return Assets.block4YellowTexture;
                if(num == 1) return Assets.blockYellowTexture;
            break;
            case 12: case 13: case 14: case 15:
                if(num == 4) return Assets.block4BlueTexture;
                if(num == 1) return Assets.blockBlueTexture;
            break;
        }
    }, // end getClr
} // end Wall