module.exports = exports = Shape;


var constants = require('./Constants.js');
var PVector = require('./lib/pvector.js');
var Utils = require('./Utils.js');

window.shapeTemplate = {x: 0, y: 0, r: 0, width: 0, height: 0, numVerts: 0, shapeType: constants.ShapeType.Invalid,
					points: []};
function Shape(){
	this.create();
}
Shape.prototype = {
	create: function(){
		this.boxObjectType = constants.BoxObjectType.Invalid;
		this.usedForDebug = false;
		this.body = null;
		this.fixture = null;
		this.graphics = null;
		this.pos = new PVector(0, 0);
		this.vel = new PVector(0, 0);
		this.accel = new PVector(0, 0);
		this.r = 50;
		this.alpha = 0.8;
		this.lineThick = 10;
		this.maxSpeed = width/20;
		this.points = [];
		//this.sprite = buttonCreate(resources.circle.texture, 0, 0, this.r*2);
	},
	init: function(container, input, usedForDebug){//x, y, shapeType){
		this.usedForDebug = usedForDebug;
		this.pos.x = input.x;
		this.pos.y = input.y;
		this.shapeType = input.shapeType;
		this.r = input.r;
		this.width = input.width;
		this.height = input.height;
		this.numVerts = input.numVerts;
		this.container = container;
		if(this.body != null) this.body.SetActive(true);

		if(usedForDebug && !debug) return;

		this.clr = Utils.getRndColor();
		this.strokeClr = 0x00; //Utils.getRndColor();

		for(var i = 0; i < input.points.length; i++){
			this.points[i] = new PVector(input.points[i].x, input.points[i].y);
		}
		//console.log(this.clr)
		//console.log(this.strokeClr)
		this.draw();
		this.graphics.alpha = this.alpha;
	},
	enable: function(){
		if(this.graphics) this.container.addChild(this.graphics);
		if(this.body != null) this.body.SetActive(true);
		shapes.push(this);
	},
	disable: function(){
		if(this.graphics) this.container.removeChild(this.graphics);
		if(this.body != null) this.body.SetActive(false);
		var index = shapes.indexOf(this);
		shapes.splice(index,1);
	},
	clean: function(){
		if(this.graphics) this.container.removeChild(this.graphics);
		this.graphics = null;
		this.container = null;
		if(this.body != null){
			//debugger;
			var index = bodies.indexOf(this.body);
			bodies.splice(index,1);
			boxWorld.DestroyBody(this.body);
			this.body = null;
			//console.log("bodies.length: " + bodies.length);
			//console.log("boxWorld.GetBodyCount(): " + boxWorld.GetBodyCount());
		}
		index = shapes.indexOf(this);
		shapes.splice(index,1);
		//console.log("shapes.length: " + shapes.length);
		//this.destroyed = true;
		this.boxObjectType = constants.BoxObjectType.Invalid;
	},
	update: function(){
		//this.move();
		if(this.body != null){
			this.pos.x = this.body.GetPosition().get_x()*METER;
			this.pos.y = this.body.GetPosition().get_y()*METER;
			//if(isNaN(this.pos.x)) debugger;
			if(this.usedForDebug && !debug) return;
			this.graphics.x = this.pos.x;
			this.graphics.y = this.pos.y;
			this.graphics.rotation = this.body.GetAngle();
		}else{this.move();}
	},
	setPosition: function(x, y){
		tempb2Vec2.set_x(x);
		tempb2Vec2.set_y(y);
		if(this.body)
			this.body.SetTransform(tempb2Vec2, this.body.GetAngle());
	},
	setAngle: function(angle){
		if(this.body)
			this.body.SetTransform(this.body.GetPosition(), angle);
	},
	move: function(time){
		this.vel.add(this.accel);
		//this.vel.mult(damping);
		this.vel.limit(this.maxSpeed);
		this.pos.add(this.vel);
		this.accel.mult(0);
		this.graphics.x = this.pos.x;//*METER;
		this.graphics.y = this.pos.y;//*METER;
		//if(this.border)   this.stayinBorder();
	},
	draw: function(input){
		if(this.container == null) return;
		switch(this.shapeType){
			case constants.ShapeType.Circle:
				this.drawCircle();
			break;
			case constants.ShapeType.Rect:
				this.drawRect(input);
			break;
			case constants.ShapeType.Tri:
				this.drawTri();
			break;
			case constants.ShapeType.Poly:
				this.drawPoly();
			break;
			case constants.ShapeType.Line:
				if(this.points.length < 1) return;
				this.drawLine();
			break;
			case constants.ShapeType.Vertices:
				if(this.points.length < 1) return;
				this.drawVertices();
			break;
		}
		this.container.addChild(this.graphics);
	}, // end draw
	drawCircle: function(){
		if(this.graphics) this.graphics.clear();
		else this.graphics = new PIXI.Graphics();
	    this.graphics.x = this.pos.x;
	    this.graphics.y = this.pos.y;
		this.graphics.lineStyle(this.lineThick, this.strokeClr, 1);
		this.graphics.beginFill(this.clr, 1);
		this.graphics.drawCircle(0, 0, this.r);
		this.graphics.endFill();
		this.graphics.moveTo(0, 0);
		this.graphics.lineTo(this.r, 0);
	}, // end drawCircle
	renderCircle: function(){
		//this.context.strokeStyle = '#ffffff';
		this.context.beginPath();
		this.context.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI, false);
		this.context.fillStyle = this.clr;//'green';
		this.context.fill();
		this.context.lineWidth = 5;
		this.context.strokeStyle = '#003300';
		this.context.stroke();
		this.context.closePath();
	}, // end renderCircle
	drawLine: function(){
		if(this.graphics) this.graphics.clear();
		else this.graphics = new PIXI.Graphics();
		this.graphics.lineStyle(this.lineThick, this.strokeClr, 1);
		this.graphics.moveTo(this.points[0].x, this.points[0].y);
		for(var i = 1; i < this.points.length; i++){
			this.graphics.lineTo(this.points[i].x, this.points[i].y);
		}
		this.graphics.alpha = 1.0
	}, // end drawLine
	drawRect: function(notShowDir){
		if(this.graphics) this.graphics.clear();
		else this.graphics = new PIXI.Graphics();
	    this.graphics.x = this.pos.x;
	    this.graphics.y = this.pos.y;
		this.graphics.lineStyle(this.lineThick, this.strokeClr, 1);
		this.graphics.beginFill(this.clr, 1);
		this.graphics.drawRect(-this.width/2, -this.height/2, this.width, this.height);
		this.graphics.endFill();
		if(!notShowDir){
			this.graphics.moveTo(0, 0);
			this.graphics.lineTo(this.width/2, 0);
		}
	}, // end drawRect
	drawTri: function(){
		if(this.graphics) this.graphics.clear();
		else this.graphics = new PIXI.Graphics();
	    this.graphics.x = this.pos.x;
	    this.graphics.y = this.pos.y;
		this.graphics.lineStyle(this.lineThick, this.strokeClr, 1);
		this.graphics.beginFill(this.clr, 1);

		this.graphics.moveTo(this.width/2, this.height/3);
		this.graphics.lineTo(0, -this.height*2/3);
		this.graphics.lineTo(-this.width/2, this.height/3);
		this.graphics.lineTo(this.width/2, this.height/3);

		this.graphics.endFill();
		this.graphics.moveTo(0, 0);
		this.graphics.lineTo(this.width/2/3*2, 0);
	}, // end drawTri
	drawPoly: function(){
		if(this.graphics) this.graphics.clear();
		else this.graphics = new PIXI.Graphics();
	    this.graphics.x = this.pos.x;
	    this.graphics.y = this.pos.y;
		this.graphics.lineStyle(this.lineThick, this.strokeClr, 1);
		this.graphics.beginFill(this.clr, 1);

		var i = 0;
		var angle = i / this.numVerts * 360.0 * Math.PI / 180;
		this.graphics.moveTo(this.r * Math.sin(angle), this.r * -Math.cos(angle));
		for (var i = 1; i < this.numVerts + 1; i++) {
	        var angle = i / this.numVerts * 360.0 * Math.PI / 180;
	        this.graphics.lineTo(this.r * Math.sin(angle), this.r * -Math.cos(angle));
	    }
		this.graphics.endFill();
		this.graphics.moveTo(0, 0);
		this.graphics.lineTo(0, -this.r);
	}, // end drawPoly
	drawVertices: function(){
		var vertices = [];
		for(var i = 0; i < this.points.length; i++){
			vertices.push(this.points[i].x);
			vertices.push(this.points[i].y);
		}
		vertices.push(this.points[0].x);
		vertices.push(this.points[0].y);
		if(this.graphics) this.graphics.clear();
		else this.graphics = new PIXI.Graphics();
	    this.graphics.x = this.pos.x;
	    this.graphics.y = this.pos.y;
		this.graphics.lineStyle(this.lineThick, this.strokeClr, 1);
		this.graphics.beginFill(this.clr, 1);
    	this.graphics.drawPolygon(vertices);
    	this.graphics.endFill();
	}, // end drawVertices
	setRed: function(){
		if(this.usedForDebug && !debug) return;
		this.clr = 0xFF0000;
		this.draw();
	},
	setFlash: function(input){
		//console.log('setFlash ' + input)
		switch(input){
			case 0:
			this.clr = 0xf4dc42;
			this.strokeClr = 0xa3901a;
			this.draw(true);
			if(this.body){
				this.graphics.rotation = this.body.GetAngle();
				this.pos.x = this.body.GetPosition().get_x()*METER;
				this.pos.y = this.body.GetPosition().get_y()*METER;
				this.graphics.x = this.pos.x;
				this.graphics.y = this.pos.y;
			}
			break;
			case 1:
				this.clr = 0xffec00;//0xede144;
				this.strokeClr = 0xf4dc42;
				this.draw(true);
			break;
			case 2:
				if(this.graphics) this.graphics.clear();
				if(this.usedForDebug && debug){
					this.clr = Utils.getRndColor();
					this.strokeClr = Utils.getRndColor();
					this.draw(false);
				}
			break;
		}
	},
	setRandomClr: function(){
		if(this.usedForDebug && !debug) return;
		this.clr = Utils.getRndColor();
		this.draw();
	},
};
window.spawnCircle = function(container, x, y, r, usedForDebug){
	var shape = new Shape();
	shapeTemplate.x = x;
	shapeTemplate.y = y;
	shapeTemplate.r = r;
	shapeTemplate.shapeType = constants.ShapeType.Circle;
	shape.init(container, shapeTemplate, usedForDebug);
	//shapes.push(shape);
	return shape;
}
window.spawnLine = function(container, points){
	var shape = new Shape();
	shapeTemplate.shapeType = constants.ShapeType.Line;
	shapeTemplate.points = points;
	shape.init(container, shapeTemplate);
	//shapes.push(shape);
	return shape;
}
window.spawnPoly = function(container, x, y, numVerts, r){
	var shape = new Shape();
	shapeTemplate.x = x;
	shapeTemplate.y = y;
	shapeTemplate.numVerts = numVerts;
	shapeTemplate.r = r;
	shapeTemplate.shapeType = constants.ShapeType.Poly;
	shape.init(container, shapeTemplate);
	//shapes.push(shape);
	return shape;
}
window.spawnRect = function(container, x, y, width, height, usedForDebug){
	var shape = new Shape();
    shapeTemplate.x = x;
    shapeTemplate.y = y;
    shapeTemplate.shapeType = constants.ShapeType.Rect;
    shapeTemplate.width = width;
    shapeTemplate.height = height;
    if(usedForDebug == undefined) usedForDebug = false;
    shape.init(container, shapeTemplate, usedForDebug);
    //shapes.push(shape);
    return shape;
}
var spawnTri = function(container, x,y,width, height, usedForDebug){
	var shape = new Shape();
    shapeTemplate.x = x;
    shapeTemplate.y = y;
    shapeTemplate.shapeType = constants.ShapeType.Tri;
    shapeTemplate.width = width;
    shapeTemplate.height = height;
    if(usedForDebug == undefined) usedForDebug = false;
    shape.init(container, shapeTemplate, usedForDebug);
    //shapes.push(shape);
    return shape;
}
window.spawnVertices = function(container, x, y, points, usedForDebug){
	var shape = new Shape();
	shapeTemplate.x = x;
    shapeTemplate.y = y;
	shapeTemplate.shapeType = constants.ShapeType.Vertices;
	shapeTemplate.points = points;
	if(usedForDebug == undefined) usedForDebug = false;
	shape.init(container, shapeTemplate, usedForDebug);
	//shapes.push(shape);
	return shape;
}