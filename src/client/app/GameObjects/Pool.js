var constants = require('./../Constants.js');
var Assets = require('./../loadAssets.js');
var Flag = require('./Flag.js');
var RoadBlock = require('./RoadBlock.js');
var Puddle = require('./Puddle.js');
var Tire = require('./Tire.js');


module.exports = exports = Pool;
function Pool() {
	this.complete = false;
	this.loadPool();
	this.createLookupTables();
	this.complete = true;
}
Pool.prototype = {
	loadPool: function(){
        this.createRoadBlocks(4);
        this.createPuddles(2);
        this.createFlags(1);
        this.createTires(10);
	},
	createLookupTables: function(){
		this.borrowLookup = {};
		this.borrowLookup[constants.BoxObjectType.RoadBlock] = this.borrowRoadBlock;
		this.borrowLookup[constants.BoxObjectType.Puddle] = this.borrowPuddle;
		this.borrowLookup[constants.BoxObjectType.Flag] = this.borrowFlag;
		this.borrowLookup[constants.BoxObjectType.Tire] = this.borrowTire;

		this.returnLookup = {};
		this.returnLookup[constants.BoxObjectType.RoadBlock] = this.returnRoadBlock;
		this.returnLookup[constants.BoxObjectType.Puddle] = this.returnPuddle;
		this.returnLookup[constants.BoxObjectType.Flag] = this.returnFlag;
		this.returnLookup[constants.BoxObjectType.Tire] = this.returnTire;
	},
	borrow : function(type){
		return this.borrowLookup[type].call(this);
	},
	return : function(type, item){
	//console.log(this.returnLookup[type])
		if(this.returnLookup[type] == undefined){
			item = null;
			return;
		}
		return this.returnLookup[type].call(this, item);
	},
	//
	createFlags: function(num){
		this.flags = [];
		this.addFlags(num);
	},
	addFlags : function(amount) {
	  for (var i = 0; i < amount; i++){
	    var item = new Flag();
	    this.flags.push(item);
	  }
	},
    borrowFlag : function(){
        //console.log("borrowFlag");
        if(this.flags.length >= 1) return this.flags.shift();
        else return null;
    },
    returnFlag: function(item){
        //console.log("returnFlag");
        this.flags.push(item);
    },
	//
	createPuddles: function(num){
		this.puddles = [];
		this.addPuddles(num);
	},
	addPuddles : function(amount) {
	  for (var i = 0; i < amount; i++){
	    var item = new Puddle();
	    this.puddles.push(item);
	  }
	},
    borrowPuddle : function(){
        //console.log("borrowPuddle");
        if(this.puddles.length >= 1) return this.puddles.shift();
        else return null;
    },
    returnPuddle: function(item){
        //console.log("returnPuddle");
        this.puddles.push(item);
    },
    //
    createRoadBlocks: function(num){
		this.roadblocks = [];
		this.addRoadBlocks(num);
	},
	addRoadBlocks : function(amount) {
	  for (var i = 0; i < amount; i++){
	    var item = new RoadBlock();
	    this.roadblocks.push(item);
	  }
	},
    borrowRoadBlock : function(){
        //console.log("borrowRoadBlock");
        if(this.roadblocks.length >= 1) return this.roadblocks.shift();
        else return null;
    },
    returnRoadBlock: function(item){
        //console.log("returnRoadBlock");
        this.roadblocks.push(item);
    },
    //
	createTires: function(num){
		this.tires = [];
		this.addTires(num);
	},
	addTires : function(amount) {
	  for (var i = 0; i < amount; i++){
	    var item = new Tire();
	    this.tires.push(item);
	  }
	},
    borrowTire : function(){
        //console.log("borrowTire");
        if(this.tires.length >= 1) return this.tires.shift();
        else return null;
    },
    returnTire: function(item){
        //console.log("returnTire");
        this.tires.push(item);
    },
} // end Pool
