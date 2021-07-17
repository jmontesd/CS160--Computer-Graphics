// raindrop.js
// creates raindrops to draw onto a canvas.
// used online tutorial: https://codepen.io/ruigewaard/pen/JHDdF
class Raindrop {
	constructor(canvas) {
		// pass in the ctx canvas to draw onto. 

		// gonna try to make this a constructor for an array to make
		// the program run faster.
		this.canvas = canvas;
		this.x = Math.random() * canvas.width;
		this.y = (Math.random() * canvas.height);
		this.xx = -4 + Math.random()*4 +2;
    	this.yy = Math.random() *10 + 10;
    	
	}

	updateDrop(ctx){
	
		this.x += this.xx;
		this.y += this.yy;
		if (this.x>this.canvas.width || this.y > this.canvas.height){
			this.x = Math.random()*600;
			this.y = -20;

		}
	}

	drawDrop(ctx){
		//ctx.clearRect(0,0, canvas.width, canvas.height);
		ctx.beginPath();
		ctx.strokeStyle = 'rgba(255, 255, 255, 1)';
		ctx.lineWidth = 1;
		ctx.lineCap = "round";
		ctx.moveTo(this.x, this.y);
    	ctx.lineTo(this.x + (Math.random()*this.xx), this.y + (Math.random() *this.yy));
		ctx.stroke();
	}
}