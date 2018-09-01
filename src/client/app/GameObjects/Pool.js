var constants = require('./../Constants.js');
var Assets = require('./../loadAssets.js');
var Flag = require('./Flag.js');
var RoadBlock = require('./RoadBlock.js');
var Puddle = require('./Puddle.js');
var Tire = require('./Tire.js');


module.exports = exports = Pool;
function Pool() {
	this.complete = false;
	this.pool = {};
	this.loadPool();
	this.createLookupTables();
	this.complete = true;
}
Pool.prototype = {
	loadPool: function(){
        this.creatPoly(4);

	},
	createLookupTables: function(){
		this.borrowLookup = {};
		this.borrowLookup[constants.BoxObjectType.Poly] = this.borrowPoly;

		this.returnLookup = {};
		this.returnLookup[constants.BoxObjectType.Poly] = this.returnPoly;
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

    createPoly: function(num){
		this.pool[constants.BoxObjectType.Poly] = [];
		this.addPolys(num);
	},
	addPolys : function(amount) {
	  for (var i = 0; i < amount; i++){
	    //var item = new RoadBlock();
	    this.pool[constants.BoxObjectType.Poly].push(item);
	  }
	},
    borrowPoly : function(){
        //console.log("borrowRoadBlock");
        if(this.pool[constants.BoxObjectType.Poly].length >= 1) return this.pool[constants.BoxObjectType.Poly].shift();
        else return null;
    },
    returnPoly: function(item){
        //console.log("returnRoadBlock");
        this.pool[constants.BoxObjectType.Poly].push(item);
    },
    //
} // end Pool
