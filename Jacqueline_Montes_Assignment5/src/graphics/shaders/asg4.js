// ALL FROM TXTBOOK & http://www.cs.toronto.edu/~jacobson/phong-demo/
// Vertex Shader
var ASG4_VSHADER =
  `precision mediump float;
  attribute vec4 a_Position;
  attribute vec4 a_Color;
  attribute vec2 a_TexCoord;
  attribute vec4 a_Normal;

  varying vec3 v_Position;
  varying vec4 v_Color;
  varying vec2 v_TexCoord;
  varying vec3 v_Normal;


  uniform mat4 u_ViewMatrix;
  uniform mat4 u_ProjectionMatrix;
  uniform mat4 u_NormalMatrix;
  uniform mat4 u_ModelMatrix;

  void main() {
    v_Color = a_Color;
    v_TexCoord = a_TexCoord;
    v_Position = vec3(u_ModelMatrix * a_Position);
    v_Normal = normalize(vec3(u_NormalMatrix * a_Normal));
    gl_Position = u_ProjectionMatrix * u_ViewMatrix * u_ModelMatrix * a_Position;
  }`;

// Fragment Shader
var ASG4_FSHADER =
  `precision mediump float;
  varying vec3 v_Position;
  varying vec4 v_Color;
  varying vec2 v_TexCoord;
  varying vec3 v_Normal;

  uniform sampler2D u_Sampler;
  uniform vec3 u_LightPos;
  uniform vec3 u_AmbientColor;
  uniform vec3 u_DiffuseColor;
  uniform vec3 u_SpecularColor;
  uniform vec3 u_EyeVector;

  void main() {
    vec3 normal = normalize(v_Normal);
    vec3 lightDirection = normalize(u_LightPos - v_Position);

    float nDotL = max(dot(normal, lightDirection), 0.0);

    vec3 diffuse = u_DiffuseColor * nDotL;
    vec3 ambient = u_AmbientColor; 

    vec3 refDir = reflect(-lightDirection, normal);
    vec3 viewDir = normalize(u_EyeVector - v_Position);

    float specular = 0.0;
    if(nDotL > 0.0){
      vec3 R = reflect(-lightDirection, normal); //Reflected llight vector
      vec3 V = normalize(u_EyeVector - v_Position); //Vector to viewer

      // Compute specular term
      float specAngle = max(dot(R,V), 0.0);
      specular = pow(specAngle, 5.0);
    }

    gl_FragColor = vec4(nDotL*diffuse + ambient +specular*u_SpecularColor, 1.0) * texture2D(u_Sampler, v_TexCoord);
  }`;


var ASG1_VSHADER =
  `precision mediump float;
  attribute vec4 a_Position;
  varying vec3 v_Position;

  attribute vec4 a_Color;
  varying vec4 v_Color;

  attribute vec2 a_TexCoord;
  varying vec2 v_TexCoord;

  attribute vec4 a_Normal;
  varying vec3 v_Normal;

  uniform mat4 u_NormalMatrix;
  uniform mat4 u_ModelMatrix;
  uniform mat4 u_ViewMatrix;
  uniform mat4 u_ProjectionMatrix;

  void main() {
    v_Color = a_Color;
    v_Position = vec3(u_ModelMatrix * a_Position);
    v_Normal = normalize(vec3(u_NormalMatrix * a_Normal));
    gl_Position = u_ProjectionMatrix * u_ViewMatrix * u_ModelMatrix * a_Position;
  }`;

// Fragment Shader
var ASG1_FSHADER =
  `precision mediump float;
  varying vec4 v_Color;
  varying vec3 v_Normal;
  varying vec3 v_Position;
  varying vec2 v_TexCoord;

  uniform vec3 u_LightPos;
  uniform vec3 u_AmbientColor;
  uniform vec3 u_DiffuseColor;
  uniform vec3 u_SpecularColor;
  uniform vec3 u_EyeVector;

  void main() {

    vec3 normal = normalize(v_Normal);
    vec3 lightDirection = normalize(u_LightPos - v_Position);

    float nDotL = max(dot(normal, lightDirection), 0.0);
    vec3 diffuse = u_DiffuseColor * v_Color.rgb * nDotL;
    vec3 ambient = u_AmbientColor * v_Color.rgb;

    vec3 refDir = reflect(-lightDirection, normal);
    vec3 viewDir = normalize(u_EyeVector - v_Position);

    float specular = 0.0;
    if(nDotL > 0.0){
      vec3 R = reflect(-lightDirection, normal); //Reflected llight vector
      vec3 V = normalize(u_EyeVector - v_Position); //Vector to viewer

      // Compute specular term
      float specAngle = max(dot(R,V), 0.0);
      specular = pow(specAngle, 10.0);
    }
 
    gl_FragColor = vec4(diffuse*nDotL + ambient + specular*u_SpecularColor, 1.0);
  }`;