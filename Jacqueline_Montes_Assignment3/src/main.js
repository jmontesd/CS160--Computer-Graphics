
var shader = null;
var shader2 = null;

function main() {
  // Retrieve the canvas from the HTML document
  canvas = document.getElementById("webgl");

  // Retrieve WebGL rendering context
  var gl = getWebGLContext(canvas);
  if (!gl) {
    console.log("Failed to get WebGL rendering context.");
    return;
  }

  // Initialize the scene
  var scene = new Scene();
  var inputHandler = new InputHandler(canvas, scene);

  /*  **** Initialize Original shader **** */
  shader = new Shader(gl, ASG1_VSHADER, ASG1_FSHADER);
  // Add attributes
  shader.addAttribute("a_Position");
  shader.addAttribute("a_Color");
  //Add uniforms
  var idMatrix = new Matrix4();
  shader.addUniform("u_ModelMatrix", "mat4", idMatrix.elements);

  /*  **** Initialize New shader **** */
  shader2 = new Shader(gl, ASG3_VSHADER, ASG3_FSHADER);
  // Add attributes
  shader2.addAttribute("a_Position");
  shader2.addAttribute("a_Color");
  shader2.addAttribute("a_TexCoord");
  //Add uniforms
  shader2.addUniform("u_ModelMatrix", "mat4", idMatrix.elements);
  

   // Load texture and add cube to the scene with that texture.
  inputHandler.startTexture("objs/sky.jpg", function(image) {
      var shape = new Cube2(shader2,0, 0, 0.4, _inputHandler.image);
      scene.addGeometry(shape);
      _inputHandler.image = null;
  })
  
  // Initialize renderer with scene and camera
  renderer = new Renderer(gl, scene, null);
  renderer.start();

 
  
}
