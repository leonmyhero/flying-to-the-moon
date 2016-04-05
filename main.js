var can1;
var ctx1;
var can2;
var ctx2;

var canWidth;
var player;
var stationW = 60;
var stationH = 40;
//var empty = new Image();
//var goldrare = new Image();
//var hero = new Image();
//var black = new Image();
//var blue = new Image();

var cardH = 160;
var cardW = 110;

var mx;
var my;

var squarePositions = [
	{x:498, y:28},
	{x:334, y:51},
	{x:658, y:52},
	{x:500, y:246},
	{x:262, y:216},
	{x:728, y:213},
	{x:162, y:381},
	{x:344, y:444},
	{x:621, y:434},
	{x:827, y:385},
	{x:481, y:557}
];

var imgs=[
	{nm:"pitch_player.png",w:cardW, h:cardH, ct:"empty"},
	{nm:"small-gold-rare.png",w:cardW, h:cardH, ct:"goldrare"},
	{nm:"small-hero.png",w:cardW, h:cardH, ct:"hero"},
	{nm:"small-if-gold.png",w:cardW, h:cardH, ct:"black"},
	{nm:"small-toty.png",w:cardW, h:cardH, ct:"toty"}
];

function init() {
	can1 = document.getElementById("canvas1");
	ctx1 = can1.getContext("2d");
	can2 = document.getElementById("canvas2");
	ctx2 = can1.getContext("2d");
	
	loadImages(imgs);
	generatePlayers(squarePositions);
	generateStation(squarePositions, ctx2);
	//empty.src = "pitch_player.png";
	//goldrare.src = "small-gold-rare.png";
	//hero.src = "small-hero.png";
	//black.src = "small-if-gold.png";
	//blue.src = "small-toty.png";
	can1.addEventListener('mousemove', function(evt) {
		var mousePos = getMouse(can1,evt);
		console.log(mousePos.x + " " + mousePos.y);
    }, false);
}

function game() {
	init();
	gameloop();
}

document.body.onload = game;

function gameloop() {
	requestAnimationFrame(gameloop);
	//drawCards(ctx);
}

