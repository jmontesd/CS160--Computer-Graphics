var _inputHandler = null;

/**
 * Specifies a Input Handler. Used to parse input events from a HTML page.
 *
 * @author Lucas N. Ferreira
 * @this {Scene}
 */

var button ="triangles";
var shape = null;
class InputHandler {
    /**
     * Initializes the event handeling functions within the program.
     */
    constructor(canvas, scene) {
      this.canvas = canvas;
      this.scene = scene;

      _inputHandler = this;

      // Mouse Events
      this.canvas.onmousedown = function(ev) { _inputHandler.click(ev) };

      // HTML Sliders
      var circleSlider = document.getElementById("circleSlider");
      var shapeSlider = document.getElementById("shapeSlider");

      //Button Events
      document.getElementById('fileLoad').onclick = function() { _inputHandler.readSelectedFile() };
     
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

        
        if (button == "triangles"){
          shape = new Triangle(shader,x, y, shapeSlider.value/200);
        }
        else if (button == "squares"){
          shape = new Square(shader,x, y, shapeSlider.value/200);
        }else if (button == "circles"){
          shape = new Circle(shader,x, y, 0, shapeSlider.value/200, circleSlider.value);
        }else if (button == "cubes"){
          shape = new Cube(shader,x, y, shapeSlider.value/200);
        }
        
        this.scene.addGeometry(shape);

    }

    /**
     * Function called to read a selected file.
     */
    readSelectedFile() {
        var fileReader = new FileReader();
        var objFile = document.getElementById("fileInput").files[0];

        if (!objFile) {
            alert("OBJ file not set!");
            return;
        }

        fileReader.readAsText(objFile);
        fileReader.onloadend = function() {
            // alert(fileReader.result);
            var customObj = new CustomOBJ(shader, fileReader.result);
            _inputHandler.scene.addGeometry(customObj);
        }
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
function setCube(){
  button = "cubes";
}

