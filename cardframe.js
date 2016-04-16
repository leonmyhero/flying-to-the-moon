function cardframeObj() {
	this.x;
	this.y;
	this.st;
	this.range;
	this.selected;
	//this.timer = 0;
	this.animeFrame = function(ctx){
		var ctx = ctx;
		if (this.selected) {
			//console.log(mx + " " + my);
			//this.timer++;
			//console.log(this.timer);
			//if (this.timer>=60) {
				//this.timer = 0;
			//}
			//console.log (this.timer);
			var range = Math.floor(frametimer / 5);
			var range = Math.abs(6-range);
			//console.log(ctx);
			//ctx1.clearRect(0, 0, canvasW, canvasH);
			//for (var i=0; i<cardframes.length; i++) {
				//cardframes[i].range = range;
				//cardframes[i].draw(ctx);
			this.range = range;
			this.draw(ctx1);
			//}
			//requestAnimationFrame(this.animeFrame.bind(this));	
		}
	}
}

cardframeObj.prototype.normaldraw = function(ctx) {
	var p1 = {x:0, y:0};
	var p2 = {x:0, y:0};
	var p3 = {x:0, y:0};
	var p4 = {x:0, y:0};
	
	p1.x = this.x;
	p1.y = this.y;
	p2.x = this.x + cardW;
	p2.y = this.y;
	p3.x = this.x;
	p3.y = this.y + cardH;
	p4.x = this.x + cardW;
	p4.y = this.y + cardH;
	
	ctx.strokeStyle = '#DFFFFF';
	ctx.beginPath();
	ctx.moveTo(p1.x, p1.y + (cardH/4));
	ctx.lineTo(p1.x, p1.y);
	ctx.lineTo(p1.x + (cardW/4), p1.y);
	ctx.lineWidth = 6;
	ctx.stroke();
	//ctx.closePath();
	ctx.moveTo(p2.x, p2.y + (cardH/4));
	ctx.lineTo(p2.x, p2.y);
	ctx.lineTo(p2.x - (cardW/4), p2.y);
	ctx.lineWidth = 6;
	ctx.stroke();

	ctx.moveTo(p3.x, p3.y - (cardH/4));
	ctx.lineTo(p3.x, p3.y);
	ctx.lineTo(p3.x + (cardW/4), p3.y);
	ctx.lineWidth = 6;
	ctx.stroke();
	
	ctx.moveTo(p4.x, p4.y - (cardH/4));
	ctx.lineTo(p4.x, p4.y);
	ctx.lineTo(p4.x - (cardW/4), p4.y);
	ctx.lineWidth = 6;
	ctx.stroke();
}
cardframeObj.prototype.contains = function(mx, my) {
  return  (this.x <= mx) && (this.x + cardW >= mx) &&
          (this.y <= my) && (this.y + cardH >= my);
}

cardframeObj.prototype.draw = function(ctx) {
	var p1 = {x:0, y:0};
	var p2 = {x:0, y:0};
	var p3 = {x:0, y:0};
	var p4 = {x:0, y:0};
	var r = this.range;
	
	p1.x = this.x;
	p1.y = this.y;
	p2.x = this.x + cardW;
	p2.y = this.y;
	p3.x = this.x;
	p3.y = this.y + cardH;
	p4.x = this.x + cardW;
	p4.y = this.y + cardH;
	
	ctx.strokeStyle = 'lightblue';
	ctx.beginPath();
	ctx.moveTo(p1.x+r, p1.y + (cardH/4)-r);
	ctx.lineTo(p1.x+r, p1.y+r);
	ctx.lineTo(p1.x + (cardW/4)-r, p1.y+r);
	ctx.lineWidth = 6;
	ctx.stroke();
	//ctx.closePath();
	ctx.moveTo(p2.x-r, p2.y + (cardH/4)-r);
	ctx.lineTo(p2.x-r, p2.y+r);
	ctx.lineTo(p2.x - (cardW/4)+r, p2.y+r);
	ctx.lineWidth = 6;
	ctx.stroke();

	ctx.moveTo(p3.x+r, p3.y - (cardH/4)+r);
	ctx.lineTo(p3.x+r, p3.y-r);
	ctx.lineTo(p3.x + (cardW/4)-r, p3.y-r);
	ctx.lineWidth = 6;
	ctx.stroke();
	
	ctx.moveTo(p4.x-r, p4.y - (cardH/4)+r);
	ctx.lineTo(p4.x-r, p4.y-r);
	ctx.lineTo(p4.x - (cardW/4)+r, p4.y-r);
	ctx.lineWidth = 6;
	ctx.stroke();
}

var cardframes = new Array();
//var timer = 0;

//cardframeObj.prototype.animeFrame(ctx) {
	//var ctx = ctx;
	//this.timer++;
	//if (this.timer>=30) {
//		this.timer = 0;
	//}
	//console.log (timer);
	//var range = Math.floor(this.timer / 2.5);
	//var range = Math.abs(6-range);
	//console.log(ctx);
	//ctx.clearRect(0, 0, canvasW, canvasH);
	//for (var i=0; i<cardframes.length; i++) {
		//cardframes[i].range = range;
		//cardframes[i].draw(ctx);
	//this.range = range;
	//this.draw(ctx);
	//}
//	requestAnimationFrame(this.animeFrame.bind(this));
//}
var frametimer = 0;

function calFrame(ctx, mx, my) {

	frametimer++;
	//console.log(frametimer);
	if (frametimer>=60) {
		frametimer = 0;
	}
	var ctx = ctx;
	for (var i=0; i<playerCards.length; i++) {
		//var pl = playerCards[i];
		var sf = cardframes[i];
		
		if (sf.selected && !(sf.contains(mx, my))) {
			sf.selected = false;
			//ctx.clearRect(0, 0, canvasW, canvasH);
			//st.normalcolor(ctx);		
		}
		if (sf.selected && sf.contains(mx,my)) {
			sf.animeFrame(ctx);
			return;
		}
		if (sf.contains(mx, my)) {
			sf.selected = true;
			sf.animeFrame(ctx);
		}
	}
}

function generateFrame() {
	for (var i=0; i<squarePositions.length; i++) {
		var sf = new cardframeObj();
		sf.x = squarePositions[i].x - cardW/2;
		sf.y = squarePositions[i].y - cardH - baseH/2;
		//console.log(squarePositions[0].x + " " + squarePositions[0].y);
		//console.log (sf.x + " " + sf.y);
		//sf.draw(ctx2);
		cardframes.push(sf);
		
	}
}
