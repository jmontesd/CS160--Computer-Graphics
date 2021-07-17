// raindrop.js
// creates raindrops to draw onto a canvas.
// used online tutorial: https://codepen.io/ruigewaard/pen/JHDdF
class Hud {
	constructor(canvas, ctx) {
		// pass in the ctx canvas to draw onto. 
		this.canvas = canvas;
		this.ctx = ctx;
		this.pagesCollected = 0;

    	
	}

	updateCount(){
		this.pagesCollected += 1;
	}

	drawHud(){
		//ctx.clearRect(0,0, canvas.width, canvas.height);
		 // HUD stuff, testing, making hud.js in a new file.
		this.ctx.clearRect(0,0, canvas.width, canvas.height);
		this.ctx.font = '18px "Times New Roman" ';
		this.ctx.fillStyle = 'rgba(255, 255, 255, 1)';
		this.ctx.fillText("Pages Collected: " + this.pagesCollected, 400, 500);
		this.ctx.strokeRect(0, 0, 600, 600);

	}
}