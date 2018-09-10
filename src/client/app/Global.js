window.width = 0;
window.height = 0;
window.dim = 0;
window.stageWidth = 0;
window.stageHeight = 0;
window.time = {t:0, dt: 0, count: 0};
//var lastTime = startTime = 0;

// window.debug = true;
window.debug = false;

window.worldRenderer = null;
window.loader = null;
window.loaded = false;
window.resources = null;
window.stage0 = null;
window.stage = null;

window.tempb2Vec2 = null;
window.spriteTouched = false;

// Modules
window.updateQueue = null;

// Objects
//var balls = [];
window.soundSystem = null;
window.musicOn = false;
window.soundOn = false;
window.musicVolume = 1.0
window.soundVolume = 1.0
window.audiotype = 0

window.message = null;
window.voices = null;
window.movie = null;
window.speak = null;
window.characters = [];
window.characterLeft = null;
window.characterLeft2 = null;
window.characterRight = null;

window.world = null;
window.pool = null;
window.network = null;
window.stageObjects = {};
window.shapes = [];
window.bodies = [];
window.walls = [];