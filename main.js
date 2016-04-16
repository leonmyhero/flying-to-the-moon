var can1;
var ctx1;
var can2;
var ctx2;

var canWidth;
var player;
var baseW = 60;
var baseH = 40;

var canvasW = 1119;
var canvasH = 800;
//var empty = new Image();
//var goldrare = new Image();
//var hero = new Image();
//var black = new Image();
//var blue = new Image();

var cardH = 160;
var cardW = 110;

var mx;
var my;

var deltatime;
var lasttime;
var selectedid = 100;

var squarePositions = [
	{x:498, y:180},
	{x:334, y:51+160},
	{x:658, y:52+160},
	{x:500, y:246+160},
	{x:262, y:216+160},
	{x:728, y:213+160},
	{x:162, y:381+160},
	{x:344, y:444+160},
	{x:621, y:434+160},
	{x:827, y:385+160},
	{x:481, y:557+160}
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
	ctx2 = can2.getContext("2d");
	
	deltatime = 0;
	loadImages(imgs);
	generatePlayers(squarePositions);
	generateBase(squarePositions, ctx2);
	//empty.src = "pitch_player.png";
	//goldrare.src = "small-gold-rare.png";
	//hero.src = "small-hero.png";
	//black.src = "small-if-gold.png";
	//blue.src = "small-toty.png";
	generateChemistryStrokes();
	//drawstrokanimation();
	generateFrame();
	//animeFrame(ctx1);
	


	
}

function game() {
	init();
	gameloop();
}

document.body.onload = game;

function gameloop() {
	requestAnimationFrame(gameloop);
	var now = new Date().getTime();
	deltatime = now - lasttime;
	lasttime = now;
	//console.log(deltatime);
	ctx1.clearRect(0, 0, canvasW, canvasH);

	can1.addEventListener('mousemove', function(evt) {
		var mousePos = getMouse(can1,evt);
		//console.log(mousePos.x + " " + mousePos.y);
		mx = mousePos.x;
		my = mousePos.y;
		
		//calFrame(ctx2,mousePos.x, mousePos.y);
    }, false);
	
	can1.addEventListener('mousedown', function(evt) {
		//var mousePos = getMouse(can1,evt);
		//console.log(mousePos.x + " " + mousePos.y);
		//mx = mousePos.x;
		//my = mousePos.y;
		var mousePos = getMouse(can1,evt);
		//console.log(mousePos.x + " " + mousePos.y);
		mx = mousePos.x;
		my = mousePos.y;
		checkselected(mx, my);
		//calFrame(ctx2,mousePos.x, mousePos.y);
    }, true);	

	can1.addEventListener('mouseup', function(evt) {
		//var mousePos = getMouse(can1,evt);
		//console.log(mousePos.x + " " + mousePos.y);
		//mx = mousePos.x;
		//my = mousePos.y;
		var mousePos = getMouse(can1,evt);
		//console.log(mousePos.x + " " + mousePos.y);
		mx = mousePos.x;
		my = mousePos.y;
		switchcards();
    }, true);
	
	calBase(ctx2, mx, my);
	calFrame(ctx1,mx, my);
	
	updateCards(mx, my);
	drawCards(ctx1);

	
}

