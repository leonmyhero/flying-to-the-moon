function Player(imgsrc, x, y, w, h, state) {
	this.imgsrc = imgsrc;
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.state = state;
};

Player.prototype.draw = function(ctx, optioncolor){
	var imageW = this.w;
	var imageH = this.h;
	var img = new Image();
	img.onload = function(){
		ctx.drawImage(img, this.x, this.y, imageW, imageH)};
	img.src = this.imgsrc;
	console.log(this.imgsrc + " " + this.x + this.y + "w: " + imageW + "h: " + imageH);
};

Player.prototype.contains = function(mx, my) {
  "use strict";
  // All we have to do is make sure the Mouse X,Y fall in the area between
  // the shape's X and (X + Height) and its Y and (Y + Height)
  return  (this.x <= mx) && (this.x + this.w >= mx) &&
          (this.y <= my) && (this.y + this.h >= my);
};

function CanvasState(canvas) {
	this.canvas = canvas;
	this.ctx = canvas.getContext("2d");
	this.players = [];
};

CanvasState.prototype.addPlayer = function(Player) {
  "use strict";
  this.players.push(Player);
};

CanvasState.prototype.draw = function() {
	console.log(this.players.length);
	var ctx = this.ctx;
	for (var i = 0; i<this.players.length; i++) {
		this.players[i].draw(ctx);
	};
};

function init() {
	var s = new CanvasState(document.getElementById("canvas1"));
	s.addPlayer(new Player("large-hero.png", 0, 0, 50, 100, s));
	s.draw();
};

init();

var img = new Image();
var canvas = document.getElementById("canvas1");
var ctx = canvas.getContext("2d");

img.onload = function() {
	ctx.drawImage(img, 100, 50, 50, 100);
}
img.src = "large-hero.png";
