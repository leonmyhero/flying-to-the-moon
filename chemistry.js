function chemistryObj() {
	this.p1 = {x:0, y:0};
	this.p2 = {x:0, y:0};
	this.color = '#0077DD';
	this.percent = 0;
	this.st;
}

var chemistrylines = new Array();

chemistryObj.prototype.drawlink = function(ctx) {
	this.percent += 0.025;
	//console.log(deltatime *0.01);
	var gradient = ctx.createLinearGradient(0,0, 100, 0)
	gradient.addColorStop("0","#73C137");
	gradient.addColorStop("0.5","#BAED84");
	gradient.addColorStop("1","#B6ED6E");

	if (this.percent <= 0.6) {
		var dx = this.p2.x - this.p1.x;
		var dy = this.p2.y - this.p1.y;

		var sx = this.p1.x + dx * this.percent;
		var sy = this.p1.y + dy * this.percent;
		ctx.clearRect(0, 0, canvasW, canvasH);
		
		ctx.beginPath();
		ctx.moveTo(this.p1.x, this.p1.y);
		ctx.strokeStyle = gradient;
		ctx.lineCap = "round";
		ctx.lineWidth=7;
		ctx.lineTo(sx, sy);
		ctx.closePath();
		ctx.stroke();
		
		var dx = this.p2.x - this.p1.x;
		var dy = this.p2.y - this.p1.y;

		var ex = this.p2.x - dx * this.percent;
		var ey = this.p2.y - dy * this.percent;
		//ctx.clearRect(0, 0, canvasW, canvasH);
		
		ctx.beginPath();
		ctx.moveTo(this.p2.x, this.p2.y);
		ctx.strokeStyle = gradient;
		ctx.lineCap = "round";
		ctx.lineWidth=7;
		ctx.lineTo(ex, ey);
		ctx.closePath();
		ctx.stroke();
		
	}
}

function generateChemistryStrokes() {
	var st = new chemistryObj;
	st.p1.x = squarePositions[0].x
	st.p1.y = squarePositions[0].y-baseH*3/5;
	//st.p1.y -= baseH*3/5;
	st.p2.x = squarePositions[1].x;
	st.p2.y = squarePositions[1].y-baseH*3/5;
	chemistrylines.push(st);
}

function drawStrokes() {
	for (var i=0; i<chemistrylines.length; i++) {
		chemistrylines[i].drawlink(ctx2);
	}
}
function drawstrokanimation() {
	chemistrylines[0].drawlink(ctx2);
	if (chemistrylines[0].percent <= 1) {
		requestAnimationFrame(drawstrokanimation);
	}
	//chemistrylines[0].drawlink(ctx2);
	
}

