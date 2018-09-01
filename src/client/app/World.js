var Utils = require('./Utils.js');
var Helper = require('./Helper.js');
var constants = require('./Constants.js');
var Assets = require('./loadAssets.js');
var Shape = require('./Shape.js');

var Wall = require('./GameObjects/Wall.js');
var WorldHelper = require('./GameObjects/WorldHelper.js');



function World(){
  this.create();
}
World.prototype = {
  create: function(){
  	using(Box2D, "b2.+");
    var gravity = new Box2D.b2Vec2(0.0, 10.0);
    this.world  = new Box2D.b2World(gravity);

    //window.MPB = StageData[round-1].width*width / 128;// Meter Per Block
    //window.blockSide = 1 * MPB * PXPM; // 1 block side ==> pixel

    createGround(this.world)

    //wall = new Wall(data.walls[i].x*width, data.walls[i].y*height,
    //        data.walls[i].lengthW*width + data.walls[i].lengthH*height, data.walls[i].angle, 0);    walls.push(wall);
    window.blocksAcrossWidth = 16;
    window.MPB = width/PXPM/blocksAcrossWidth;
    window.blockSide = 1 * MPB * PXPM; // 1 block side ==> pixel
    //var wall = new Wall(this.world, width/2 , 0      , width , 0, 0);    walls.push(wall);
    createBorder(this.world);
    var side = width/25;
    for(var i = 0; i < 2; i++){
        //spawnRect(stage, width, -, side, side);
        //createPoly(this.world, 3, width/2, -i*side-height*0.25, side, side);
        //var poly = createPoly(this.world, 4, width/2, height/2 - i*side, side, side); shapes.push(poly)
        var poly = WorldHelper.createPoly(this.world, 4, width/2, height/2 - i*side, side, side); shapes.push(poly)
        //createBall(Math.random()*width, -getRandomInt(50,height/2), getRandomArbitrary(0.5, 1)*width/20);
        //createRect(Math.random()*width, -getRandomInt(50,height/2), getRandomArbitrary(0.5, 1)*width/10, getRandomArbitrary(0.5, 1)*height/10);
        //createPoly(getRandomInt(3,8), Math.random()*width, -getRandomInt(50,height/2), getRandomArbitrary(0.5, 1)*width/10);
    }
  },
  step: function(){
    this.world.Step(1/60, 2, 2)
  }
}
function createBorder(world){
    var wall = new Wall(world, width/2              , blockSide/2            , width , 0    , 0);               walls.push(wall);
        wall = new Wall(world, width/2              , height - blockSide/2   , width , 0    , wall.clrIndex);   walls.push(wall);
        wall = new Wall(world, blockSide/2          , height/2               , height, PI/2 , wall.clrIndex);   walls.push(wall);
        wall = new Wall(world, width - blockSide/2  , height /2              , height, PI/2 , wall.clrIndex);   walls.push(wall);
}
function createGround(world){
	var bd_ground = new b2BodyDef();
	bd_ground.set_type(Box2D.b2_staticBody);
    var ground = world.CreateBody(bd_ground);

	var shape = new b2EdgeShape();

    var fixtureDef = new b2FixtureDef();
    fixtureDef.set_shape(shape);
    fixtureDef.set_density(0.0);
    fixtureDef.set_friction(0.6);

    var points = [	{x: -1*METER	, y: height*0.8},
    				{x: 3*METER		, y: height*0.8},
    				{x: 5*METER		, y: height*0.8 - 0.25*METER},
    				{x: 6*METER		, y: height*0.8 - 1.0*METER},
    				{x: 9*METER		, y: height*0.8 - 1.25*METER},
    				{x: 11*METER	, y: height*0.8 - 0.0*METER},
    				{x: 13*METER	, y: height*0.8 - 0.0*METER},
    				{x: 15*METER	, y: height*0.8 + 0.5*METER},
    				{x: 17*METER	, y: height*0.8 + 1.25*METER},
    				{x: 28*METER	, y: height*0.8},
    				{x: 30*METER	, y: height*0.8},
    				{x: 36*METER	, y: height*0.8 - 0.25*METER},
    				{x: 37*METER	, y: height*0.8 - 1.0*METER},
    				{x: 44*METER	, y: height*0.8 - 1.25*METER},
    				{x: 46*METER	, y: height*0.8 - 0.0*METER},
    				{x: 50*METER	, y: height*0.8 - 0.0*METER},
    				{x: 52*METER	, y: height*0.8 + 0.5*METER},
    				{x: 54*METER	, y: height*0.8 + 1.25*METER},
    				{x: 75*METER	, y: height*0.5 + 1.25*METER},
    				{x: 100*METER	, y: height*0.8 + 1.25*METER},
    				{x: 100*METER	, y: 0},
    			 ];

    for (var i = 0; i < points.length-1; ++i){
        shape.Set( new b2Vec2(points[i].x/METER, points[i].y/METER), new b2Vec2(points[i+1].x/METER, points[i+1].y/METER));
        ground.CreateFixture(fixtureDef);
    }

    var shape = spawnLine(stage, points);
    return shape;
} // end createGround

/*
function createBorder(width, height){
    wall = new Wall(blockSide*0.5, height/2, height, 3*PI/2, 0);    walls.push(wall);
    wall = new Wall(width/2, height - blockSide*0.5, width, PI, wall.clrIndex); walls.push(wall);
    wall = new Wall(width - blockSide*0.5, height/2, height, PI/2, wall.clrIndex);  walls.push(wall);
    wall = new Wall(width/2, blockSide*0.5, width, 0, wall.clrIndex);   walls.push(wall);
}
function createWalls(data){
    if(data.walls == undefined) return;
    window.MPB = data.width*width / 128 *2/3;// Meter Per Block
    window.blockSide = 1 * MPB * PXPM; // 1 block side ==> pixel

    for(var i = 0; i < data.walls.length; i++){
        wall = new Wall(data.walls[i].x*width, data.walls[i].y*height,
            data.walls[i].lengthW*width + data.walls[i].lengthH*height, data.walls[i].angle, 0);    walls.push(wall);
    }
    //wall = new Wall(width/2, height - blockSide*0.5, width, PI, wall.clrIndex); walls.push(wall);
}*/
module.exports = exports = World;