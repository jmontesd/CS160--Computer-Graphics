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

  var light = new Light(0, 10, 0);

  // Initialize the scene
  var scene = new Scene();
  scene.setLight(light);
  var camera = new Camera();

  

  var inputHandler = new InputHandler(canvas, scene, camera);

  // Initialize shader for colors
  shader = new Shader(gl, ASG4_VSHADER, ASG4_FSHADER);

  // Add attibutes
  shader.addAttribute("a_Position");
  shader.addAttribute("a_Color");
  shader.addAttribute("a_Normal");
  shader.addAttribute("a_TexCoord");
  
  shader.addUniform("u_ModelMatrix", "mat4", new Matrix4().elements);
  shader.addUniform("u_ProjectionMatrix", "mat4", new Matrix4().elements);
  shader.addUniform("u_ViewMatrix", "mat4", new Matrix4().elements);
  shader.addUniform("u_NormalMatrix", "mat4", new Matrix4().elements);

  shader.addUniform("u_LightPos", "vec3", new Vector3().elements);
  shader.addUniform("u_AmbientColor", "vec3", new Vector3().elements);
  shader.addUniform("u_DiffuseColor", "vec3", new Vector3().elements);
  shader.addUniform("u_SpecularColor", "vec3", new Vector3().elements);
  shader.addUniform("u_EyeVector", "vec3", new Vector3().elements);
  shader.addUniform("u_Sampler", "sampler2D", new Matrix4().elements);


  // Initialize shader for textures
  shader2 = new Shader(gl, ASG1_VSHADER, ASG1_FSHADER);

  shader2.addAttribute("a_Position");
  shader2.addAttribute("a_Color");
  shader2.addAttribute("a_Normal")
  shader2.addAttribute("a_TexCoord");

  shader2.addUniform("u_ModelMatrix", "mat4", new Matrix4().elements);
  shader2.addUniform("u_ProjectionMatrix", "mat4", new Matrix4().elements);
  shader2.addUniform("u_ViewMatrix", "mat4", new Matrix4().elements);
  shader2.addUniform("u_NormalMatrix", "mat4", new Matrix4().elements);


  shader2.addUniform("u_Sampler", "sampler2D", new Matrix4().elements);
  shader2.addUniform("u_LightPos", "vec3", new Vector3().elements);
  shader2.addUniform("u_AmbientColor", "vec3", new Vector3().elements);
  shader2.addUniform("u_DiffuseColor", "vec3", new Vector3().elements);
  shader2.addUniform("u_EyeVector", "vec3", new Vector3().elements);




  // Load texture and add triangle to the scene with that texture.
  inputHandler.readTexture("objs/grass3.jpg", function(image) {
      var shape = new Square(shader, 0, 0, 0, 16, image);
      scene.addGeometry(shape);
  })
  inputHandler.readTexture("objs/sky7.jpg", function(image) {
      var shape = new Cube(shader, 0, 0, 0, 16, 1, image);
      scene.addGeometry(shape);
  })
  
  inputHandler.readTexture("objs/smiley3.jpeg", function(image) {
    for(var i = 0; i < world.length; i++){
      for(var j = 0; j < world.length; j++){
        if(world[i][j] > 0){
         
            var shape = new Cube(shader, j-16, 0.5, i-16, 0.5, world[i][j], image);
            scene.addGeometry(shape);
            console.log("Position:", i,j);
  
        }
      }
    }
      
  })
 
 var shape  = new Sphere(shader2, 13, 10, 1, 15);
 scene.addGeometry(shape);

 var shape  = new Sphere(shader2, 13, 4, 1, 20);
 scene.addGeometry(shape);

  // Initialize renderer with scene and camera
  renderer = new Renderer(gl, scene, camera);
  renderer.start();
}
