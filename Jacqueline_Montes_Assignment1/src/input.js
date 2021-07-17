var _inputHandler = null;

/**
 * Specifies a Input Handler. Used to parse input events from a HTML page.
 *
 * @author Lucas N. Ferreira
 * @this {Scene}
 */

var button ="triangles";
var shape = null;
var flag = 0;
class InputHandler {
    /**
     * Initializes the event handeling functions within the program.
     */
    constructor(canvas, scene) {
      this.canvas = canvas;
      this.scene = scene;

      _inputHandler = this;


      var circleSlider = document.getElementById("circleSlider");
      var shapeSlider = document.getElementById("shapeSlider");
      // Circle Segment Count
      var sc = circleSlider.value;
      // Shape Size
      var ss = shapeSlider.value/50

      // Mouse Events
      //this.canvas.onmousedown = function(ev) { _inputHandler.click(ev) };

      this.canvas.onmousedown = function(ev) {
        _inputHandler.click(ev);
        flag = 1;
        
      }
      this.canvas.onmouseup = function(ev) {

        if(flag){
          _inputHandler.click(ev);
        }
        flag = 0;
        
      }
      this.canvas.onmousemove = function(ev) {
        if (!flag){
          return;
        }
        _inputHandler.click(ev);
        return 0;
      }
      console.log("flag", flag);
     
    }

    /**
     * Function called upon mouse click.
     */
    click(ev) {
        // Print x,y coordinates.
        console.log(ev.clientX, ev.clientY);

        var x = ev.clientX;
        var y = ev.clientY;
        var rect = ev.target.getBoundingClientRect() ;

        x = ((x - rect.left) - canvas.width/2)/(canvas.width/2);
        y = (canvas.height/2 - (y - rect.top))/(canvas.height/2);


          // Circle Segment Count
        var sc = circleSlider.value;
        // Shape Size
        var ss = shapeSlider.value/200;
        console.log("size", ss);

        if (button == "triangles"){
          shape = new Triangle(shader,x, y, ss);
        }
        else if (button == "squares"){
          shape = new Square(shader,x, y, ss);
        }else{
          shape = new Circle(shader,x, y, 0, ss, sc);
        }
        
         //flag = 1;
        
        this.scene.addGeometry(shape);

    }
}
function clearCanvas() {
  _inputHandler.scene.clearGeometries();
}
function setSquare(){
  button = "squares";
}
function setCircle() {
  button ="circles";
}
function setTriangle(){
  button = "triangles";
}

