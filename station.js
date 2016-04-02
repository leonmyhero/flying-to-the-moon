function stationObj() {
	this.x;
	this.y;
	this.text;
}

//   20,0  40,0
// 0,20        60,20
//   20,40 30,40 40,40
stationObj.prototype.draw = function(ctx) {
	var sx, sy;
	sx = this.x - 30;
	sy = this.y - 40;
	ctx.fillStyle = '#f00';
	ctx.beginPath();
	ctx.moveTo(sx+20,sy);
	ctx.lineTo(sx+40,sy);
	ctx.lineTo(sx+60,sy+20);
	ctx.lineTo(sx+40,sy+40);
	ctx.lineTo(sx+20,sy+40);
	ctx.lineTo(sx,sy+20);
	ctx.lineTo(sx+20,sy);
	ctx.closePath();
	ctx.fill();
}

var stations = Array();

function generateStation(squarePositions) {
	for (var i=0;i<squarePositions.length; i++) {
		var st = new stationObj();
		st.x = squarePositions[i].x;
		st.y = squarePositions[i].y;
		st.draw(ctx);
		stations.push(st);
	}
}
