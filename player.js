function imageObj() {
	this.filename = "";
	this.cardtype = "";
	//this.imgHandle=new Image();
	this.imgHandle = new Image();
	this.size = {w:0, h:0};
	this.load = function(filename, w, h) {
		var targetSpriteProto = this;
		this.size.w = w;
		this.size.h = h;
		this.filename = filename;
		//var img = new Image();
		this.imgHandle.src = filename;
	}
}

var protoImages = new Array();


function loadImages(imgs) {	
	for(var i=0; i<imgs.length; i++) {
		var sp = new imageObj();
		sp.load(imgs[i].nm, imgs[i].w, imgs[i].h);
		protoImages.push(sp);
	}
}

var playerObj = function() {
	this.id;
	this.x;
	this.y;
	this.w;
	this.h;
	this.bg;
	this.offsidex = 0;
	this.offsidey = 0;
	this.oldx;
	this.oldy;
	this.selected = false;
}

var playerCards = new Array();

function generatePlayers(squarePositions) {
	for (var i=0; i<squarePositions.length; i++) {
		var sp = new playerObj();
		sp.id = i;
		sp.x = squarePositions[i].x - cardW/2;
		sp.y = squarePositions[i].y - cardH - baseH/2;
		sp.oldx = squarePositions[i].x - cardW/2;
		sp.oldy = squarePositions[i].y - cardH - baseH/2;
		var idx = Math.floor(Math.random()*(protoImages.length));
		sp.bg = protoImages[idx].imgHandle;
		sp.w = cardW;
		sp.h = cardH;
		//console.log(protoSprites[idx].imgHandle);
		playerCards.push(sp);
	}	
}

playerObj.prototype.draw = function(ctx){
	var imageW = this.w;
	var imageH = this.h;
	var img = this.bg;
	ctx.drawImage(img, this.x, this.y, imageW, imageH);
};

function drawCards(ctx) {
	for (var i=0;i<playerCards.length;i++) {
		var pl = playerCards[i];
		//console.log(pl);
		if (!pl.selected) {
			ctx.drawImage(pl.bg, pl.x, pl.y, pl.w, pl.h);
		}
	}
	if (selectedid !== 100) {
		var dl = playerCards[selectedid];
		ctx.drawImage(dl.bg, dl.x, dl.y, dl.w, dl.h);
	}
}

playerObj.prototype.meets = function(x, y) {
	return (this.x <= x) && (this.x + this.w >= x) && (this.y <= y) && (this.y + this.h >= y) ||
		   (this.x <= x + this.w) && (this.x + this.w >= x + this.w) && (this.y <= y) && (this.y + this.h >= y) ||
		   (this.x <= x) && (this.x + this.w >= x) && (this.y <= y + this.h) && (this.y + this.h >= y + this.h) ||
		   (this.x <= x + this.w) && (this.x + this.w >= x + this.w) && (this.y <= y + this.h) && (this.y + this.h >= y + this.h);
}

playerObj.prototype.contains = function(mx, my) {
  "use strict";
  // All we have to do is make sure the Mouse X,Y fall in the area between
  // the shape's X and (X + Height) and its Y and (Y + Height)
  return  (this.x <= mx) && (this.x + this.w >= mx) &&
          (this.y <= my) && (this.y + this.h >= my);
};

function updateCards(mx, my) {
	if (selectedid !== 100) {
		playerCards[selectedid].x = mx-playerCards[selectedid].offsidex;
		playerCards[selectedid].y = my-playerCards[selectedid].offsidey;
	}
}

function switchcards() {
	console.log(selectedid);
	if (selectedid !== 100) {
		var found = false;
		var x = playerCards[selectedid].x;
		var y = playerCards[selectedid].y;
		var oldx = playerCards[selectedid].oldx;
		var oldy = playerCards[selectedid].oldy;
		for(var i=0;i<playerCards.length;i++) {
			if(playerCards[i].meets(x,y) && i !== selectedid) {
				found = true;
				var selectedx = oldx;
				var selectedy = oldy;
				playerCards[selectedid].x = playerCards[i].oldx;
				playerCards[selectedid].y = playerCards[i].oldy;
				playerCards[selectedid].oldx = playerCards[i].oldx;
				playerCards[selectedid].oldy = playerCards[i].oldy;
				playerCards[i].x = selectedx;
				playerCards[i].y = selectedy;
				playerCards[i].oldx = selectedx;
				playerCards[i].oldy = selectedy;
				playerCards[selectedid].selected = false;
				selectedid = 100;
				return;
			}
		}
		if (!found) {
			playerCards[selectedid].x = playerCards[selectedid].oldx;
			playerCards[selectedid].y = playerCards[selectedid].oldy;
			playerCards[selectedid].selected = false;
			selectedid = 100;
		}
	}
}

function checkselected(mx, my) {
	for (var i=0; i<playerCards.length; i++) {
		var pl = playerCards[i];
		if (pl.contains(mx, my)) {
			pl.selected = true;
			pl.offsidex = mx - pl.x;
			pl.offsidey = my - pl.y;
			selectedid = pl.id;
			//dragging = true;
			return;
		} 
	}
}
