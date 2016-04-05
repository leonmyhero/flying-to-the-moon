function stationObj() {
	this.x;
	this.y;
	this.text;
	this.polygone = [
		[0,0],
		[0,0],
		[0,0],
		[0,0],
		[0,0],
		[0,0],
	];
}

//   20,0  40,0
// 0,20        60,20
//   20,40 30,40 40,40
stationObj.prototype.draw = function(ctx) {
	var sx, sy;
	sx = this.x - stationW/2;
	sy = this.y - stationH;
	this.polygone[0][0] = sx + stationW/4;
	this.polygone[0][1] = sy;
	this.polygone[1][0] = sx+stationW*3/4;
	this.polygone[1][1] = sy;
	this.polygone[2][0] = sx+stationW;
	this.polygone[2][1] = sy+stationH/2;
	this.polygone[3][0] = sx+stationW*3/4;
	this.polygone[3][1] = sy+stationH;
	this.polygone[4][0] = sx+stationW/4;
	this.polygone[4][1] = sy+stationH;
	this.polygone[5][0] = sx;
	this.polygone[5][1] = sy+stationH/2;
	ctx.fillStyle = '#0025B3';
	ctx.beginPath();
	ctx.moveTo(this.polygone[0][0], this.polygone[0][1]);
	ctx.lineTo(this.polygone[1][0], this.polygone[1][1]);
	ctx.lineTo(this.polygone[2][0], this.polygone[2][1]);
	ctx.lineTo(this.polygone[3][0], this.polygone[3][1]);
	ctx.lineTo(this.polygone[4][0], this.polygone[4][1]);
	ctx.lineTo(this.polygone[5][0], this.polygone[5][1]);
	ctx.lineTo(this.polygone[0][0], this.polygone[0][1]);
	ctx.closePath();
	ctx.fill();
}

var stations = Array();

function generateStation(squarePositions, ctx) {
	var ctx = ctx;
	for (var i=0;i<squarePositions.length; i++) {
		var st = new stationObj();
		st.x = squarePositions[i].x;
		st.y = squarePositions[i].y;
		st.draw(ctx);
		stations.push(st);
	}
}

stationObj.prototype.contain = function(mx, my) {
    var inside = false;
	var vs = this.polygone;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0], yi = vs[i][1];
        var xj = vs[j][0], yj = vs[j][1];

        var intersect = ((yi > my) != (yj > my))
            && (mx < (xj - xi) * (my - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    return inside;
}

