var constants = require('./../Constants.js');
var Helper = require('./../Helper.js');
var Assets = require('./../loadAssets.js');
//var Wall = require('./Wall.js');
var RoadBlock = require('./RoadBlock.js');
var WorldHelper = function(){};
module.exports = exports = WorldHelper;
WorldHelper.clean = function(){
    for (var i = stageSprites.length - 1; i >= 0; i--) {
            var sprite = stageSprites[i];
            stage.removeChild(sprite);
            //stageB.removeChild(sprite);
            //stageBb.removeChild(sprite);
            //stageSprites.splice(i,1);
    }
    for(id in backObjects){
        for (var i = backObjects[id].length - 1; i >= 0; i--) {
            var obj = backObjects[id][i];
            if (obj.hasOwnProperty("updated")){
                //debugger;
                obj.clean();
                //pool.return(obj);
            }else{
                if (obj.hasOwnProperty("sprite")){
                    stageB.removeChild(obj.sprite);
                    //stageBb.removeChild(obj.sprite);
                    //obj.sprite = null;
                }
                if (obj.hasOwnProperty("shape")){
                    obj.shape.disable();
                    //obj.shape = null;
                }
            }
            backObjects[id].splice(i,1);
        }
        backObjects[id].length = 0;
    }
} // end clean

WorldHelper.createBackFrontObjects = function(data){
    WorldHelper.createCows(data.cow);
    WorldHelper.createStumps(data.stump);
    WorldHelper.createFlags(data.flags);
    WorldHelper.createTires(data.tires);
    WorldHelper.createRoadBlocks(data.roadBlock);
    WorldHelper.createPuddles(data.puddles);

    WorldHelper.createTrees(data.tree1);
    WorldHelper.createTrees2(data.tree2);
}
WorldHelper.createTires = function(array){
    if(!array) return;
    if(!backObjects.tires) backObjects.tires = [];
    for(var i = 0; i+1 < array.length; i = i+2){
        object = pool.borrow(constants.BoxObjectType.Tire)
        if(!object) return;
        object.init(array[i]*width, array[i+1]*height);
        backObjects.tires.push(object);
    }
}
WorldHelper.createFlags = function(array){
    if(!array) return;
    if(!backObjects.flags) backObjects.flags = [];
    for(var i = 0; i+1 < array.length; i = i+2){
        object = pool.borrow(constants.BoxObjectType.Flag)
        if(!object) return;
        object.init(array[i]*width, array[i+1]*height);
        backObjects.flags.push(object);
    }
}
WorldHelper.createPuddles = function(array){
    if(!array) return;
    //console.log('createPuddles')
    if(!backObjects.puddles) backObjects.puddles = [];
    for(var i = 0; i+1 < array.length; i = i+2){
        puddle = pool.borrow(constants.BoxObjectType.Puddle)
        if(!puddle) return;
        puddle.init(array[i]*width, array[i+1]*height);
        backObjects.puddles.push(puddle);
        //debugger;
        //WorldHelper.createRoadBlock(array[i]*width, array[i+1]*height);
    }
}

WorldHelper.createRoadBlocks = function(array){
    if(!array) return;
    if(!backObjects.roadBlocks) backObjects.roadBlocks = [];
    for(var i = 0; i+1 < array.length; i = i+2){
        roadBlock = pool.borrow(constants.BoxObjectType.RoadBlock)
        roadBlock.init(array[i]*width, array[i+1]*height);
        backObjects.roadBlocks.push(roadBlock);
        //debugger;
        //WorldHelper.createRoadBlock(array[i]*width, array[i+1]*height);
    }
}
WorldHelper.cleanRoadBlocks = function(){
    for (var i = backObjects.roadBlocks.length - 1; i >= 0; i--) {
        var obj = backObjects.roadBlocks[i];
            stageB.removeChild(obj.sprite);
            obj.sprite = null;
            obj.shape.clean();
            obj.shape = null;
            backObjects.roadBlocks.splice(i,1);
    }
    backObjects.roadBlocks.length = 0;
}
WorldHelper.createRoadBlock = function(x, y){
    if(!backObjects.roadBlocks) backObjects.roadBlocks = [];
    var sprite = Helper.buttonCreate(Assets.textures.roadBlockTexture,
    x, y, width/30);
    stageB.addChild(sprite);
    var shape = createRect(x, y,
        sprite.width*0.95, sprite.height/2, Box2D.b2_dynamicBody, true);
    backObjects.roadBlocks.push({sprite: sprite, shape: shape});
}


WorldHelper.createBackObjects = function(data){
    for(id in data){
            if(data[id].type == "sprite"){
                for(var i = 0; i < data[id].data.length; i++){
                    var dataObj = data[id].data[i];
                    var sprite = Helper.buttonCreate(Assets.textures[id], dataObj.x*width, dataObj.y*height, dataObj.width*width);
                    //debugger;
                    sprite.rotation = dataObj.rotation;
                    //sprite.scale.set(dataObj.scale);
                    sprite.type = "sprite";
                    stageB.addChild(sprite);
                    stageSprites.push(sprite);
                }
            }
        }
     if(data.trackArrow){
        for(var i = 0; i < data.trackArrow.length; i++){
            var sprite = Helper.buttonCreate(Assets.textures.trackARROW,
                data.trackArrow[i].x*width, data.trackArrow[i].y*height, data.trackArrow[i].width*width);
            sprite.rotation = data.trackArrow[i].angle;
            stageB.addChild(sprite);
            stageSprites.push(sprite);
        }
    }
    if(data.goal){
        var sprite = Helper.buttonCreate(Assets.textures.goalTexture,
                data.goal.x*width, data.goal.y*height, data.goal.width*width);
        sprite.rotation = data.goal.angle;
        stageB.addChild(sprite);
        stageSprites.push(sprite);
    }

    WorldHelper.createFlowers(data.flowers);
    WorldHelper.createRocks(data.rock);
    //stageB.cacheAsBitmap = true;
}
WorldHelper.createCows = function(array){
    if(!array) return;
    for(var i = 0; i+1 < array.length; i = i+2){
        WorldHelper.createCow(array[i]*width, array[i+1]*height);
    }
}
WorldHelper.cleanCows = function(){
    for (var i = backObjects.cows.length - 1; i >= 0; i--) {
        var obj = backObjects.cows[i];
            stageBb.removeChild(obj.sprite);
            obj.sprite = null;
            obj.shape.clean();
            obj.shape = null;
            backObjects.cows.splice(i,1);
    }
    backObjects.cows.length = 0;
}
WorldHelper.createCow = function(x, y){
    if(!backObjects.cows) backObjects.cows = [];
    var sprite = new PIXI.extras.AnimatedSprite(Assets.textures.cowTexture);
    sprite.animationSpeed = 4;
    sprite.play();
    sprite.anchor.x = sprite.anchor.y = 0.5;
    sprite.x = x;
    sprite.y = y;
    sprite.scale.set( width/20 / sprite.width);
    stageBb.addChild(sprite);
    stageSprites.push(sprite);
    var shape = WorldHelper.createStaticFloor(x, y,
        sprite.width*0.95, sprite.height/2, true);
    backObjects.cows.push({sprite: sprite, shape: shape});
}
WorldHelper.createFlowers = function(array){
    if(!array) return;
    for(var i = 0; i+1 < array.length; i = i+2){
        WorldHelper.createFlower(array[i]*width, array[i+1]*height);
    }
}
WorldHelper.cleanFlowers = function(){
    for (var i = backObjects.flowers.length - 1; i >= 0; i--) {
        var obj = backObjects.flowers[i];
            stageB.removeChild(obj.sprite);
            obj.sprite = null;
            backObjects.flowers.splice(i,1);
    }
    backObjects.flowers.length = 0;
}
WorldHelper.createFlower = function(x, y){
    if(!backObjects.flowers) backObjects.flowers = [];
    var sprite = Helper.buttonCreate(Assets.textures.flowersTexture,
    x, y, width/25);
    stageB.addChild(sprite);
    backObjects.flowers.push({sprite: sprite});
}
WorldHelper.createRocks = function(array){
    if(!array) return;
    for(var i = 0; i+1 < array.length; i = i+2){
        WorldHelper.createRock(array[i]*width, array[i+1]*height);
    }
}
WorldHelper.cleanRocks = function(){
    for (var i = backObjects.rocks.length - 1; i >= 0; i--) {
        var obj = backObjects.rocks[i];
            stageB.removeChild(obj.sprite);
            obj.sprite = null;
            backObjects.rocks.splice(i,1);
    }
    backObjects.rocks.length = 0;
}
WorldHelper.createRock = function(x, y){
    if(!backObjects.rocks) backObjects.rocks = [];
    var sprite = Helper.buttonCreate(Assets.textures.rockTexture,
    x, y, width/60);
    stageB.addChild(sprite);
    backObjects.rocks.push({sprite: sprite});
}





WorldHelper.createStumps = function(array){
    if(!array) return;
    for(var i = 0; i+1 < array.length; i = i+2){
        WorldHelper.createStump(array[i]*width, array[i+1]*height);
    }
}
WorldHelper.cleanStumps = function(){
    for (var i = backObjects.stumps.length - 1; i >= 0; i--) {
        var obj = backObjects.stumps[i];
            stageB.removeChild(obj.sprite);
            obj.sprite = null;
            obj.shape.clean();
            obj.shape = null;
            backObjects.stumps.splice(i,1);
    }
    backObjects.stumps.length = 0;
}
WorldHelper.createTrees = function(array){
    if(!array) return;
    for(var i = 0; i+1 < array.length; i = i+2){
        WorldHelper.createTree(array[i]*width, array[i+1]*height);
    }
}
WorldHelper.createTrees2 = function(array){
    if(!array) return;
    for(var i = 0; i+1 < array.length; i = i+2){
        WorldHelper.createTree2(array[i]*width, array[i+1]*height);
    }
}
WorldHelper.cleanTrees = function(){
    for (var i = backObjects.trees.length - 1; i >= 0; i--) {
        var obj = backObjects.trees[i];
            stageB.removeChild(obj.sprite);
            stage.removeChild(obj.sprite);
            obj.sprite = null;
            obj.shape.clean();
            obj.shape = null;
            backObjects.trees.splice(i,1);
    }
    backObjects.trees.length = 0;
}


WorldHelper.createStump = function(x, y){
    if(!backObjects.stumps) backObjects.stumps = [];
    var sprite = Helper.buttonCreate(Assets.textures.stumpTexture,
    x, y, width/30);
    stageB.addChild(sprite);
    var shape = WorldHelper.createStaticFloor(x, y,
        sprite.width*0.95, sprite.height/2, true);
    backObjects.stumps.push({sprite: sprite, shape: shape});
}
WorldHelper.createTree = function(x, y){
    if(!backObjects.trees) backObjects.trees = [];
    var sprite = Helper.buttonCreate(Assets.textures.tree1Texture,
    x, y, width/30);
    stageB.addChild(sprite);
    var shape = WorldHelper.createStaticFloor(x, y + sprite.height/4,
        sprite.width*0.95, sprite.height/2, true);
    backObjects.trees.push({sprite: sprite, shape: shape});
}
WorldHelper.createTree2 = function(x, y){
    if(!backObjects.trees) backObjects.trees = [];
    var sprite = Helper.buttonCreate(Assets.textures.tree2Texture,
    x, y, width/10);
    stage.addChild(sprite);
    stageSprites.push(sprite);
    var shape = WorldHelper.createStaticFloor(x-sprite.width*0.05, y + sprite.height/4,
        sprite.width*0.75, sprite.height/2, true);
    backObjects.trees.push({sprite: sprite, shape: shape});
}
WorldHelper.createStaticFloor = function(world, x,y,w,h, usedForDebug){
    x = x/METER;
    y = y/METER;
    w = w/METER;
    h = h/METER;

    var ZERO = new b2Vec2(0, 0);
    var temp = new b2Vec2(0, 0);

    var bd  = new b2BodyDef();
    bd.set_type(Box2D.b2_staticBody);//b2_staticBody //b2_dynamicBody
    var body = world.CreateBody(bd);

    var shape = new Box2D.b2PolygonShape();
    shape.SetAsBox(w/2, h/2);

    var fixtureDef = new b2FixtureDef();
    fixtureDef.set_density( 0 );
    fixtureDef.set_shape( shape );
    var fixture = body.CreateFixture( fixtureDef );

    temp.Set(x, y);//16*(Math.random()-0.5), 4.0 + 2.5*index);
    body.SetTransform(temp, 0.0);
    body.SetLinearVelocity(ZERO);
    body.SetAwake(1);
    body.SetActive(1);

    bodies.push(body);
    var shape = spawnRect(stage, x, y, w*METER, h*METER, usedForDebug);
    shape.body = body;
    shape.fixture = fixture;
    fixture.shape = shape;
    shape.fixtureDef = fixtureDef;
    return shape;
}
WorldHelper.createSensorRect = function(x,y,w,h){
    usedForDebug = true;
    shape = WorldHelper.createStaticFloor(x,y,w,h, usedForDebug);
    shape.fixture.SetSensor(true);
    return shape;
}



WorldHelper.createPoly = function(world, numVerts, x, y, r){
    x = x/METER;
    y = y/METER;
    r = r/METER;
    var ZERO = new b2Vec2(0, 0);
    var temp = new b2Vec2(0, 0);

    var bd  = new b2BodyDef();
    bd.set_type(Box2D.b2_dynamicBody);
    var body = world.CreateBody(bd);
    //var shape = new Box2D.b2PolygonShape();
    //shape.SetAsBox(85/2/METER, 85/2/METER);

    var verts = [];
    var width = 85;
    var height = 85;
    /*verts.push( new b2Vec2( width/2/METER, height/3 /2 /METER) );
    verts.push( new b2Vec2( 0,-2*height/3/2/METER) );
    verts.push( new b2Vec2( -width/2/METER, height/3 /2 /METER) );*/
    //radius = 85/2/METER;
    for (var i = 0; i < numVerts; i++) {
        var angle = i / numVerts * 360.0 * Math.PI / 180;
        verts.push( new b2Vec2( r * Math.sin(angle), r * -Math.cos(angle) ) );
    }

    var shape = createPolygonShape(verts);

    var fixtureDef = new b2FixtureDef();
    fixtureDef.set_density( 1 );
    fixtureDef.set_friction( 1 );
    fixtureDef.set_restitution(0.4);
    fixtureDef.set_shape( shape );
    var fixture = body.CreateFixture( fixtureDef );

    temp.Set(x, y);//16*(Math.random()-0.5), 4.0 + 2.5*index);
    body.SetTransform(temp, 0.0);
    body.SetLinearVelocity(ZERO);
    body.SetAwake(1);
    body.SetActive(1);

    bodies.push(body);
    //shape = spawnTri(stage, 25, 5, 85, 85);
    var shape = spawnPoly(stage, 0, 0, numVerts, r*METER);
    //debugger;
    shape.body = body;
    //shapes.push(shape) // already pushed in spawnPoly
    return shape;
}
WorldHelper.spawnPoly = function(x, y){
    var poly = pool.borrow(constants.BoxObjectType.Poly);
    if(poly == null){
        //console.log('no more poly in pool')
        return;
    }
    poly.init(x, y);
    if(stageObjects[constants.BoxObjectType.Poly] == undefined) stageObjects[constants.BoxObjectType.Poly] = [];
    stageObjects[constants.BoxObjectType.Poly].push(poly);
    // poly.enable();
    // poly.setPosition(x/METER, y/METER);
    // //this.shape.setAngle(PI/2+PI);
    // poly.setAngle(0);
    // //this.shape.setAngle(PI/2);
    // //this.sprite.x = x;
    // //this.sprite.y = y;
    // stage.addChild(this.sprite);
    // updateQueue.add(this);
}

WorldHelper.cleanStageObjects = function(){
    console.log('cleanStageObjects')
    for(var type in stageObjects){
        //debugger;
        for (var i = stageObjects[type].length - 1; i >= 0; i--) {
            var obj = stageObjects[type][i];
            //if (obj.hasOwnProperty("clean")){
            if (obj.clean != undefined){
                //debugger;
                obj.clean();
                //console.log('obj clean')
                //pool.return(obj);
            }else{
                if (obj.hasOwnProperty("sprite")){
                    stage.removeChild(obj.sprite);
                    //stageBb.removeChild(obj.sprite);
                if (obj.hasOwnProperty("shape")){
                    //obj.sprite = null;
                }
                    obj.shape.disable();
                    //obj.shape = null;
                }
            }
            stageObjects[type].splice(i,1);
        }
        stageObjects[type].length = 0;
    }   
} // end cleanStageObjects
window.clean = WorldHelper.cleanStageObjects;