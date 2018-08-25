var constants = function(){};
module.exports = exports = constants;

window.METER = 100;
window.PXPM = 10;
window.PI = Math.PI;

constants.ShapeType = function(){};
//function ShapeType(){}
constants.ShapeType.Invalid = -1;
constants.ShapeType.Circle = 0;
constants.ShapeType.Rect = 1;
constants.ShapeType.Tri = 2;
constants.ShapeType.Poly = 3;
constants.ShapeType.Line = 4;
constants.ShapeType.Vertices = 5;

constants.BoxObjectType = function(){};

//function BoxObjectType(){}
constants.BoxObjectType.Invalid = -1;
constants.BoxObjectType.Car = 0;
constants.BoxObjectType.TrackTrigger = 1;
constants.BoxObjectType.Obstacle = 2;
constants.BoxObjectType.Wall = 3;
constants.BoxObjectType.Field = 4;
constants.BoxObjectType.RoadBlock = 5;
constants.BoxObjectType.Puddle = 6;
constants.BoxObjectType.Flag = 7;
constants.BoxObjectType.Tire = 8;

constants.CharacterType = function(){};
constants.CharacterType.Cat = 0;
constants.CharacterType.Frog = 1;
constants.CharacterType.Thug = 2;
constants.CharacterType.Police = 3;
constants.CharacterType.Cat3 = 4;

constants.Character = function(){};
constants.Character.Left = 0;

constants.AudioType = function(){};
constants.AudioType.None = 0;
constants.AudioType.AudioContext = 1;
constants.AudioType.Cordova = 2;
constants.AudioType.SoundJS = 3;

constants.SoundType = function(){};
constants.SoundType.Dot = 0;
constants.SoundType.Drift = 1;
constants.SoundType.MenuClick = 2;