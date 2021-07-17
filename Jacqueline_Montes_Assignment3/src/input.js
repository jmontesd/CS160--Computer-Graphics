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
      
      var flag = 0;

      _inputHandler = this;

      this.image = null;
      this.objFile = null;
      this.objPath = null;

      // Mouse Events
       this.canvas.onmousedown = function(ev) {
         flag = 1;
        _inputHandler.click(ev);
        
      }
      this.canvas.onmouseup = function(ev) {
        flag = 0;
        
      }
      this.canvas.onmousemove = function(ev) {
        if (flag == 1){
          _inputHandler.click(ev);
        }
        
      }

      // HTML Sliders & Buttons
      var circleSlider = document.getElementById("circleSlider");
      var shapeSlider = document.getElementById("shapeSlider");
      var setColor = document.getElementById("setColor");

      //Button Events
      //Received help from TA Lucas & Alfred in adding the texture to the object
      document.getElementById('objInput').onchange = function() {
       _inputHandler.objPath = document.getElementById("objInput").files[0];
      }
      document.getElementById('texInput').onchange = function() {
       _inputHandler.readTexture(); 
      }
      document.getElementById('addObj').onclick = function() {
       	_inputHandler.readSelectedFile(_inputHandler.objPath);
      }
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

        console.log(button);
        if (button == "triangles"){
          shape = new Triangle(shader,x, y, shapeSlider.value/200);
        }
        else if (button == "squares"){
          shape = new Square(shader,x, y, shapeSlider.value/200);
        }else if (button == "circles"){
          shape = new Circle(shader,x, y, 0, shapeSlider.value/200, circleSlider.value);
        }else if (button == "cubes"){

          if(_inputHandler.image == null){
            shape = new Cube(shader,x, y, shapeSlider.value/200, this.image);
          }else{
            shape = new Cube(shader2,x, y, shapeSlider.value/200, _inputHandler.image);
          }
            
        }
        
        this.scene.addGeometry(shape);

    }

    /**
     * Function called to read a selected file.
     */
    readSelectedFile(objFile) {
        var fileReader = new FileReader();
        // var objFile = document.getElementById("objInput").files[0];

        if (!objFile) {
            alert("OBJ file not set!");
            return;
        }

        console.log(objFile);
        fileReader.readAsText(objFile);
        fileReader.onloadend = function() {
            // alert(fileReader.result);
            // _inputHandler.objFile = fileReader.result
            //var customObj = new CustomOBJ(shader2, fileReader.result, _inputHandler.image);
           // _inputHandler.scene.addGeometry(customObj);


           if(_inputHandler.image == null){
            var customObj = new CustomOBJ(shader, fileReader.result, _inputHandler.image);
           }else{
            var customObj = new CustomOBJ(shader2, fileReader.result, _inputHandler.image);
           }
            _inputHandler.scene.addGeometry(customObj);

        }
    }

    readTexture() {
        // Create the image object
        var image = new Image();
        if (!image) {
          console.log('Failed to create the image object');
          return false;
        }

        // Register the event handler to be called on loading an image
        image.onload = function() {
            _inputHandler.image = image;
        };

        var imgPath = document.getElementById("texInput").value;
        var imgPathSplit = imgPath.split("\\");

        // Tell the browser to load an image
        image.src = 'objs/' + imgPathSplit[imgPathSplit.length - 1];
        return true;
    }

    // Got this part from Assignment 4 Base Code
    startTexture(src, onTexLoad){
      // Create the image object
        var image = new Image();
        if (!image) {
          console.log('Failed to create the image object');
          return false;
        }

        // Register the event handler to be called on loading an image
        image.onload = function() {
            _inputHandler.image = image;
            onTexLoad(image);
        };

        // Tell the browser to load an image
        image.src = src
        return true;
    
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
function setColor(){
  if (document.getElementById("setColor").value == "Solid"){
    document.getElementById("setColor").value =  "Rainbow";
  }else{
    document.getElementById("setColor").value =  "Solid";
  }
}
