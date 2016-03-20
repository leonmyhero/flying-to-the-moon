(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); },
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

var PlayerW = 100;
var PlayerH = 150;
var squarePositions = [[498,28],[334,51],[658, 52],[500, 246],[262,216],[728, 213],[162, 381],[344, 444],[621, 434],[827, 385],[481, 557]];


function Player(imagesouce, x, y, w, h, state, id, oldx, oldy) {
	this.imagesouce = imagesouce;
	this.x = x || 0;
	this.y = y || 0;
	this.w = w || 0;
	this.h = h || 1;
	this.oldx = oldx;
	this.oldy = oldy;
	this.state = state;
	this.id = id;
};

Player.prototype.draw = function(ctx, optioncolor){
	var imageW = this.w;
	var imageH = this.h;
	var img = this.imagesouce;
	//var img = document.getElementById(this.imgid);
	//img.onload = function(){
	ctx.drawImage(img, this.x, this.y, imageW, imageH);
	//img.src = this.imgsrc;
	//console.log("x: " + this.x + "y: " + this.y + "w: " + imageW + "h: " + imageH);
};

Player.prototype.meets = function(x, y) {
	return (this.x <= x) && (this.x + this.w >= x) && (this.y <= y) && (this.y + this.h >= y) ||
		   (this.x <= x + this.w) && (this.x + this.w >= x + this.w) && (this.y <= y) && (this.y + this.h >= y) ||
		   (this.x <= x) && (this.x + this.w >= x) && (this.y <= y + this.h) && (this.y + this.h >= y + this.h) ||
		   (this.x <= x + this.w) && (this.x + this.w >= x + this.w) && (this.y <= y + this.h) && (this.y + this.h >= y + this.h);
}

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
	this.mousex;
	this.mousey;
	  // This complicates things a little but but fixes mouse co-ordinate problems
  // when there's a border or padding. See getMouse for more detail
  var stylePaddingLeft, stylePaddingTop, styleBorderLeft, styleBorderTop,
      html, myState, i;
  if (document.defaultView && document.defaultView.getComputedStyle) {
    this.stylePaddingLeft = parseInt(document.defaultView.getComputedStyle(canvas, null).paddingLeft, 10)      || 0;
    this.stylePaddingTop  = parseInt(document.defaultView.getComputedStyle(canvas, null).paddingTop, 10)       || 0;
    this.styleBorderLeft  = parseInt(document.defaultView.getComputedStyle(canvas, null).borderLeftWidth, 10)  || 0;
    this.styleBorderTop   = parseInt(document.defaultView.getComputedStyle(canvas, null).borderTopWidth, 10)   || 0;
  }
  // Some pages have fixed-position bars (like the stumbleupon bar) at the top or left of the page
  // They will mess up mouse coordinates and this fixes that
  html = document.body.parentNode;
  this.htmlTop = html.offsetTop;
  this.htmlLeft = html.offsetLeft;

  // **** Keep track of state! ****
  this.valid = false; // when set to false, the canvas will redraw everything
  this.dragging = false; // Keep track of when we are dragging

  // the current selected object. In the future we could turn this into an array for multiple selection
  this.selection = null;
  this.dragoffx = 0; // See mousedown and mousemove events for explanation
  this.dragoffy = 0;
  
  // **** Then events! ****
  // This is an example of a closure!
  // Right here "this" means the CanvasState. But we are making events on the Canvas itself,
  // and when the events are fired on the canvas the variable "this" is going to mean the canvas!
  // Since we still want to use this particular CanvasState in the events we have to save a reference to it.
  // This is our reference!
  myState = this;
  
  //fixes a problem where double clicking causes text to get selected on the canvas
  canvas.addEventListener('selectstart', function(e) { e.preventDefault(); return false; }, false);
  // Up, down, and move are for dragging
  canvas.addEventListener('mousedown', function(e) {
    var mouse, mx, my, players, l, i, mySel, indexofplayer, player;
    mouse = myState.getMouse(e);
    mx = mouse.x;
    my = mouse.y;
	this.mousex = mx;
	this.mousey = my;
    players = myState.players;
    l = players.length;
    for (i = l-1; i >= 0; i -= 1) {
      if (players[i].contains(mx, my)) {
        mySel = players[i];
		indexofplayer = i;
		myState.dragoffx = mySel.x - mx;
		myState.dragoffy = mySel.y - my;
		if (indexofplayer !== (l-1)) {
			player = players[l-1];
			myState.players[l-1] = mySel;
			myState.players[indexofplayer] = player;
		}
        // Keep track of where in the object we clicked
        // so we can move it smoothly (see mousemove)
        myState.dragging = true;
        myState.selection = mySel;
		console.log("x: " + mySel.x + "y: " + mySel.y);
		//myState.selection.w = myState.selection.w * 1.1;
		//myState.selection.h = myState.selection.h * 1.1;
        myState.valid = false;
        return;
      }
    }
	
    // havent returned means we have failed to select anything.
    // If there was an object selected, we deselect it
    //if (myState.selection) {
     // myState.selection = null;
      //myState.valid = false; // Need to clear the old selection border
    //}
  }, true);
  
  canvas.addEventListener('mousemove', function(e) {
    var mouse = myState.getMouse(e),
        mx = mouse.x,
        my = mouse.y,
        oldx, oldy, i, cur;
    if (myState.dragging && this.mousex !== mx && this.mousey !== my){
      mouse = myState.getMouse(e);
      // We don't want to drag the object by its top-left corner, we want to drag it
      // from where we clicked. Thats why we saved the offset and use it here
      myState.selection.x = mouse.x + myState.dragoffx;
      myState.selection.y = mouse.y + myState.dragoffy;   
	  //console.log("x: " + myState.selection.x + "y: " + myState.selection.y);
      myState.valid = false; // Something's dragging so we must redraw
    } 
  
    // if there's a selection see if we grabbed one of the selection handles
  }, true);
  
  canvas.addEventListener('mouseup', function(e) {
	var mx, my, selectx, selecty, selectid, targetx, targety, targetid, found;
	var mouse = myState.getMouse(e),
    mx = mouse.x,
    my = mouse.y;
    
	if (myState.selection !== null) {
		selectx = myState.selection.oldx;
		selecty = myState.selection.oldy;
		selectid = myState.selection.id;
		console.log(selectx + " " + selecty + " " + selectid);
		//console.log(myState.players.length);
		for (var i=0; i<myState.players.length; i++) {
			//console.log (myState.players[i].id);
			if(myState.players[i].meets(myState.selection.x, myState.selection.y) && myState.players[i].id !== selectid) {
				found = true;
				myState.selection.x = myState.players[i].oldx;
				myState.selection.y = myState.players[i].oldy;
				myState.selection.oldx = myState.players[i].oldx;
				myState.selection.oldy = myState.players[i].oldy;
				myState.players[i].x = selectx;
				myState.players[i].y = selecty;
				myState.players[i].oldx = selectx;
				myState.players[i].oldy = selecty;
				console.log(selectx + " " + selecty + " " + selectid);
			}
		}
		if (!found) {
			myState.selection.x = myState.selection.oldx;
			myState.selection.y = myState.selection.oldy;
		}
	}
	myState.dragging = false;
    //if (myState.selection !== null) {
    //  if (myState.selection.w < 0) {
    //      myState.selection.w = -myState.selection.w;
    //      myState.selection.x -= myState.selection.w;
    //  }
    //  if (myState.selection.h < 0) {
     //     myState.selection.h = -myState.selection.h;
     //     myState.selection.y -= myState.selection.h;
     // }
	  //myState.selection.w = 50;
	  //myState.selection.h = 75;
    //}
  }, true);
  // double click for making new shapes
  canvas.addEventListener('dblclick', function(e) {
	myState.valid = false;
    var mouse = myState.getMouse(e);
    myState.addPlayer(new Player(imagegold, mouse.x - 10, mouse.y - 10, PlayerW, PlayerH, myState, myState.players.length,  mouse.x - 10, mouse.y-10));
  }, true);  
  
  this.selectionColor = '#CC0000';
  this.selectionWidth = 2;  
  this.selectionBoxSize = 6;
  this.selectionBoxColor = 'darkred';
  this.interval = 30;
  this.render = function() {
	requestAnimationFrame(this.render);
	this.draw();
  }
  //setInterval(function() { myState.draw(); }, myState.interval);
};

CanvasState.prototype.addPlayer = function(Player) {
  "use strict";
  this.players.push(Player);
};

CanvasState.prototype.draw = function() {
	var ctx, shapes, l, i, shape, mySel, strokestyle;
	if (!this.valid) {
		ctx = this.ctx;
		this.clear();
		for (var i = 0; i<this.players.length; i++) {
			this.players[i].draw(ctx);
		};
	}
    if (this.selection !== null) {
      this.ctx.strokeStyle = this.selectionColor;
      this.ctx.lineWidth = this.selectionWidth;
      mySel = this.selection;
      this.ctx.strokeRect(mySel.x,mySel.y,mySel.w,mySel.h);
    }
	
	//this.valid = true;

};

CanvasState.prototype.clear = function() {
  "use strict";
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

CanvasState.prototype.getMouse = function(e) {
  "use strict";
  var element = this.canvas, offsetX = 0, offsetY = 0, mx, my;
  
  // Compute the total offset
  if (element.offsetParent !== undefined) {
    do {
      offsetX += element.offsetLeft;
      offsetY += element.offsetTop;
      element = element.offsetParent;
    } while (element);
  }

  // Add padding and border style widths to offset
  // Also add the <html> offsets in case there's a position:fixed bar
  offsetX += this.stylePaddingLeft + this.styleBorderLeft + this.htmlLeft;
  offsetY += this.stylePaddingTop + this.styleBorderTop + this.htmlTop;

  mx = e.pageX - offsetX;
  my = e.pageY - offsetY;
  
  // We return a simple javascript object (a hash) with x and y defined
  return {x: mx, y: my};
};
var s = new CanvasState(document.getElementById("canvas1"));
function render() {
	s.draw();
	requestAnimationFrame(render);
}
function init() {
	var x, y;
	var ramID;
	
	for (var i=0; i<squarePositions.length; i++) {
		x = squarePositions[i][0];
		y = squarePositions[i][1];
		ramID = Math.trunc(Math.random()*10);
		
		switch (true) {
			case (ramID > 0 && ramID < 3):
				console.log(ramID);
				s.addPlayer(new Player(imagegold, x, y, PlayerW, PlayerH, s, i, x, y));
				break;
			case (ramID >= 3 && ramID <5):
				console.log(ramID);
				s.addPlayer(new Player(imageblack, x, y, PlayerW, PlayerH, s, i, x, y));
				break;
			case (ramID >= 5 && ramID < 7):
				console.log(ramID);
				s.addPlayer(new Player(imageblue, x, y, PlayerW, PlayerH, s, i, x, y));
				break;
			case (ramID >=7 && ramID < 10):
				console.log(ramID);
				s.addPlayer(new Player(imagehero, x, y, PlayerW, PlayerH, s, i, x, y));
				break;
			default:
				console.log("default: " + ramID);
				s.addPlayer(new Player(imageempty, x, y, PlayerW, PlayerH, s, i, x, y));
				break;
		}
		render();
		getimageboard();
		
		//s.addPlayer(new Player(imagegold, x, y, PlayerW, PlayerH, s, i, x, y));
	}
};
var imagegold; 
var imageempty;
var imagehero;
var imageblue;
var imagehero;

function preCachImages() {
	imageempty = new Image();
    imageempty.src = "pitch_player.png";
	imageblue = new Image();
	imageblue.src = "small-toty.png";
	imagegold = new Image();
	imagegold.src = "small-gold-rare.png";
	imageblack = new Image();
	imageblack.src = "small-if-gold.png";
	imagehero = new Image();
	imagehero.src = "small-hero.png";
}

var transparentColor = {
    r : 255,
    g : 0,
    b : 255
};

var transparentPath = [];
function getimageboard() {
	var canvas, ctx;
	canvas = document.getElementById("canvas2");
	ctx = canvas.getContext("2d");
	ctx.drawImage(imageempty,0,0,100,150);
	var pixels = ctx.getImageData(0,0,100, 150);
	var p1, p2, p3, p4, p5;
	//  p4
	//p2p1p3
	//  p5
	
	for (var i= 0; i<pixels.data.length; i+=4) {
		p1 = pixels.data[i+3];
		p2 = pixels.data[i-1] || 0;
		p3 = pixels.data[i+7] || 0;
		p4 = pixels.data[i - 401] || 0;
		p5 = pixels.data[i+403] || 0;
		
		if (p2) p2=1;
		if (p3) p3=1;
		if (p4) p4=1;
		if (p5) p5=1;
		console.log("1:"+p1+"2:"+p2+"3:"+p3+"4:"+p4+"5:"+p5);
		if ((p1 === 0) && ((p2+p3+p4+p5) === 1)) {
			transparentPath.push(i);
		}
	}
	for (i=0; i<transparentPath.length; i++) {
		console.log(transparentPath[i]);
	}
}
window.onload = preCachImages();

init();

