var cardW = 110;
var cardH = 160;
var squarePositions = [
	{x:498, y:28},
	{x:334, y:51},
	{x:658, Y:52},
	{x:500, y:246},
	{x:262, y:216},
	{x:728, y:213},
	{x:162, y:381},
	{x:344, y:444},
	{x:621, y:434},
	{x:827, y:385},
	{x:481, y:557}
];

function SpriteProto() {
	this.filename = "";
	this.cardtype = "";
	this.imgHandle=null;
	this.size = {w:0, h:0};
	this.load = function(filename, w, h, cardtype) {
		var targetSpriteProto = this;
		this.size.w = w;
		this.size.h = h;
		var img = new Image();
		img.onload = function() {
			targetSpriteProto.imgHandle = img;
		}
		img.src = filename;
	}
}

var protoSprites = new Array();

function loadProtos() {
	var imgs=[
		{nm:"pitch_player.png",w:cardW, h:cardH, ct:"empty"},
		{nm:"small-gold-rare.png",w:cardW, h:cardH, ct:"goldrare"},
		{nm:"small-hero.png",w:cardW, h:cardH, ct:"hero"},
		{nm:"small-if-gold.png",w:cardW, h:cardH, ct:"black"},
		{nm:"small-toty.png",w:cardW, h:cardH, ct:"toty"}
	];
	
	for(var i=0; i<imgs.length; i++) {
		var sp = new SpriteProto();
		sp.load(imgs[i].nm, imgs[i].w, imgs[i].h, imgs[i].ct);
		protoSprites.push(sp);
		console.log (sp);
	}
}

function SpriteInstance() {
	this.id =0;
	this.zIndex = 50;
	this.pos={x:0,y:0};
	this.size={w:0,h:0};
	this.spriteHandle=null;
}

var spriteInstances = new Array();

function generateInstances() {
	//var numSprites = 4096;
	for (var i=0; i<squarePositions.length; i++) {
		var sp = new SpriteInstance();
		sp.id = i;
		sp.zIndex = i;
		sp.pos.x = squarePositions[i].x;
		sp.pos.y = squarePositions[i].y;
		var idx = Math.floor(Math.random()*(protoSprites.length));
		sp.spriteHandle = protoSprites[idx];
		sp.size = sp.spriteHandle.size;
		console.log(protoSprites[idx].src);
		spriteInstances.push(sp);
	}
}

function drawSprites() {
	var can = document.getElementById("canvas1");
	var ctx = can.getContext("2d");
	for(var i=0; i<spriteInstances.length;i++) {
		var sp = spriteInstances[i];
		var ps = sp.spriteHandle;
		console.log (sp.src);
		ctx.drawImage(ps.imgHandle,sp.pos.x, sp.pos.y);
	}
}
window.onload = loadProtos();
function init() {
	//loadProtos();
	generateInstances()
	drawSprites();
}
init();
