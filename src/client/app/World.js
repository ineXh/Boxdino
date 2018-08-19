var Utils = require('./Utils.js');
var Helper = require('./Helper.js');
var constants = require('./Constants.js');
var Assets = require('./loadAssets.js');
var Shape = require('./Shape.js');
module.exports = exports = World;

function World(){
  this.create();
}
World.prototype = {
  create: function(){
  	using(Box2D, "b2.+");
    var gravity = new Box2D.b2Vec2(0.0, 10.0);
    this.world = new Box2D.b2World(gravity);
    createGround(this.world)
    var side = width/25;
    for(var i = 0; i < 2; i++){
        //spawnRect(stage, width, -, side, side);
        createPoly(this.world, 3,3*METER, -i*side-height*0.25, side, side);
        //createBall(Math.random()*width, -getRandomInt(50,height/2), getRandomArbitrary(0.5, 1)*width/20);
        //createRect(Math.random()*width, -getRandomInt(50,height/2), getRandomArbitrary(0.5, 1)*width/10, getRandomArbitrary(0.5, 1)*height/10);
        //createPoly(getRandomInt(3,8), Math.random()*width, -getRandomInt(50,height/2), getRandomArbitrary(0.5, 1)*width/10);
    }
  },
  step: function(){
    this.world.Step(1/60, 2, 2)
  }
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

    spawnLine(stage, points);
} // end createGround

function createPoly(world, numVerts, x, y, r){
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
    shape = spawnPoly(stage, 0, 0, numVerts, r*METER);
    //debugger;
    shape.body = body;
    shapes.push(shape)
}
