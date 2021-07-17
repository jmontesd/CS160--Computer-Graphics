var shader = null;
var fogColor;
function main() {
  // Retrieve the canvas from the HTML document
  canvas = document.getElementById("webgl");
  hudCan = document.getElementById('hud');
  rain = document.getElementById('rain');

  // Retrieve WebGL rendering context
  var gl = getWebGLContext(canvas);
  if (!gl) {
    console.log("Failed to get WebGL rendering context.");
    return;
  }

  // Retrieve the 2d rendering context
  var ctx = hudCan.getContext('2d');
  if(!ctx){
    console.log("Failed to get 2d rendering");
    return;
  }

  // rain canvas code
  // creating an array of "raindrops"
  var ctx1 = rain.getContext('2d');
  if(!ctx1){
    console.log("Failed to get the 2d rendering");
    return;
  }

  var hud = new Hud(hudCan, ctx);


  var rainArray = [];
  var maxRain = 300;

  for (var i = 0; i < maxRain; i++) {
    rainArray[i] = new Raindrop(rain);
  }

  // Initialize the scene
  var light = new Light(-0.5, 1, 15.5);
  var camera = new Camera();

  var scene = new Scene();
  scene.setLight(light);
  scene.setRain(rainArray);
  scene.setHud(hud);

  //Color of Fog
  // fogColor = new Float32Array([0.137, 0.231, 0.423,]);
  fogColor = new Float32Array([0.18, 0.302, 0.345,]);

  // Distance of fog [where fog starts, where fog completely covers object]
  var fogDist = new Float32Array([9, 40]);

  // Initialize shader
  shader = new Shader(gl, ASG4_VSHADER, ASG4_FSHADER);

  // Add attibutes
  shader.addAttribute("a_Position");
  shader.addAttribute("a_Color");
  shader.addAttribute("a_TexCoord");
  shader.addAttribute("a_Normal");

  shader.addUniform("u_NormalMatrix", "mat4", new Matrix4().elements);
  shader.addUniform("u_ModelMatrix", "mat4", new Matrix4().elements);
  shader.addUniform("u_ViewMatrix", "mat4", new Matrix4().elements);
  shader.addUniform("u_ProjectionMatrix", "mat4", new Matrix4().elements);
  shader.addUniform("u_Eye", "vec3", camera.eye.elements);

  shader.addUniform("u_FogColor","vec3", fogColor);
  shader.addUniform("u_FogDist","vec2", fogDist);
  shader.addUniform("u_Sampler", "sampler2D", new Matrix4().elements);

  shader.addUniform("u_EyePos", "vec3", camera.eye.elements);
  shader.addUniform("u_Center", "vec3", camera.center.elements);

  shader.addUniform("u_LightPos", "vec3", new Vector3().elements);
  shader.addUniform("u_AmbientColor", "vec3", new Vector3().elements);
  shader.addUniform("u_DiffuseColor", "vec3", new Vector3().elements);
  shader.addUniform("u_SpecularColor", "vec3", new Vector3().elements);

  // Initialize renderer with scene and camera
  // Has to be initialized higher up so it can be used in input
  renderer = new Renderer(gl, scene, camera, ctx1, hudCan);
  //moved inputHandler too in order to use renderer
  var inputHandler = new InputHandler(hudCan, scene, camera, renderer, light);
  // Load texture and add floor to the scene with that texture.
  inputHandler.readTexture("objs/forest.jpg", function(image) {
      var shape = new Square(shader, 0, 0, 0, 16, image);
      scene.addGeometry(shape);
  })
  // Load texture and add Sky box to the scene with that texture.
  inputHandler.readTexture("objs/sppoky.jpg", function(image) {
      var shape = new SkyBox(shader, 0, 0, 0, 16, 1, image);
      scene.addGeometry(shape);
  })
  // Load texture and add Walls to the scene with that texture.
  inputHandler.readTexture("objs/stone.jpeg", function(image) {
    for(var i = 0; i < world.length; i++){
      for(var j = 0; j < world.length; j++){
        if(world[i][j] > 0){

            var shape = new Cube(shader, j-15.5, 0.5, i-15.5, 0.5, world[i][j], image);
            scene.addGeometry(shape);
            console.log("Position:", i,j);

        }
      }
    }

  })

  inputHandler.readTexture("objs/page1.jpg", function(image) {
    var note = new Note(shader, image, -1,0.5,1,1.0);
    scene.addGeometry(note);
  })

  inputHandler.readTexture("objs/page2.jpg", function(image) {
    var note2 = new Note(shader, image, 8.5,0.5,-5,2.0);
    scene.addGeometry(note2);
  })

  inputHandler.readTexture("objs/page3.png", function(image) {
    var note3 = new Note(shader, image, -11,1.0,-15.5,3.0);
    scene.addGeometry(note3);
  })

  renderer.start();
}

