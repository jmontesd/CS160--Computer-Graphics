// Vertex Shader
var ASG4_VSHADER =
  `attribute vec4 a_Position;
  attribute vec4 a_Color;
  attribute vec2 a_TexCoord;
  attribute vec4 a_Normal;

  uniform mat4 u_NormalMatrix;
  uniform mat4 u_ModelMatrix;
  uniform mat4 u_ViewMatrix;
  uniform mat4 u_ProjectionMatrix;
  uniform vec3 u_Eye;

  varying vec3 v_Normal;
  varying vec3 v_Position;
  varying vec4 v_Color;
  varying vec2 v_TexCoord;
  varying float v_Dist;


  void main() {
    v_Color = a_Color;
    v_TexCoord = a_TexCoord;
    v_Dist = distance(vec3(u_ModelMatrix * a_Position), u_Eye);
    v_Normal = normalize(vec3(u_NormalMatrix * a_Normal));
    v_Position = vec3(u_ModelMatrix * a_Position);
    gl_Position = u_ProjectionMatrix * u_ViewMatrix * u_ModelMatrix * a_Position;
  }`;

// Fragment Shader
var ASG4_FSHADER =
  `precision mediump float;
  varying vec3 v_Position;
  varying vec4 v_Color;
  varying vec2 v_TexCoord;
  varying vec3 v_Normal;
  varying float v_Dist;

  uniform vec3 u_FogColor; // Color of Fog
  uniform vec2 u_FogDist;  // Distance of Fog (starting point, end point)
  uniform sampler2D u_Sampler;
  uniform vec3 u_EyePos;
  uniform vec3 u_Center;

  uniform vec3 u_LightPos;
  uniform vec3 u_AmbientColor;
  uniform vec3 u_DiffuseColor;
  uniform vec3 u_SpecularColor;

  void main() {
    // Calculation of fog factor (factor becomes smaller as it goes further away from eye point)
    float fogFactor = clamp((u_FogDist.y - v_Dist) / (u_FogDist.y - u_FogDist.x), 0.0, 1.0);
    // Stronger fog as it gets further: u_FogColor * (1 - fogFactor) + v_Color * fogFactor
    //vec3 color = mix(u_FogColor, vec3(v_Color), fogFactor);
    vec3 color = mix(u_FogColor, vec3(texture2D(u_Sampler, v_TexCoord)), fogFactor);

    //gl_FragColor = vec4(color, v_Color.a);//* texture2D(u_Sampler, v_TexCoord);

    // Normalize the normal because it is interpolated and not 1.0 in length any more
    vec3 normal = normalize(v_Normal);

    vec4 baseColor = texture2D(u_Sampler, v_TexCoord);

    vec3 lightDirection = normalize(u_LightPos - v_Position);
    vec3 reflectDir = reflect(-lightDirection, normal);
    vec3 viewDir = normalize(u_EyePos - v_Position);

    // The dot product of the light direction and the normal
    float nDotL = max(dot(lightDirection, normal), 0.0);
    float specAngle = max(dot(reflectDir, viewDir), 0.0);

    float theta = dot(lightDirection, normalize(u_EyePos-u_Center));
    if(theta > 0.96) {
      // Calculate the final color from diffuse reflection and ambient reflection
      vec3 diffuse = u_DiffuseColor * baseColor.rgb * nDotL;
      vec3 ambient = u_AmbientColor * baseColor.rgb;
      vec3 specular = u_SpecularColor * baseColor.rgb * pow(specAngle, 32.0);

      gl_FragColor = vec4(ambient + diffuse + specular, baseColor.a);
      //gl_FragColor.rgb *= color;
      vec3 finalColor = mix(u_FogColor, gl_FragColor.rgb, fogFactor);
      gl_FragColor = vec4(finalColor, v_Color.a);
    }else {
      vec3 ambient = u_AmbientColor * baseColor.rgb;
      gl_FragColor = vec4(ambient, baseColor.a);
      //gl_FragColor.rgb *= color;
      vec3 finalColor = mix(u_FogColor, gl_FragColor.rgb, fogFactor);
      gl_FragColor = vec4(finalColor, v_Color.a);
    }

  }`;

  //Vertex Shader for select color / color picking
  var RED1_VSHADER =
    `precision mediump float;
    attribute vec4 a_Position;
    varying vec4 v_Color;
    uniform mat4 u_ViewMatrix;
    uniform mat4 u_ProjectionMatrix;
    uniform vec3 u_SelectColor;

    void main() {
      v_Color = vec4(u_SelectColor, 1.0);
      gl_Position = u_ProjectionMatrix * u_ViewMatrix * a_Position;
    }`;
  // Fragment Shader
  var RED1_FSHADER =
      `precision mediump float;
      varying vec4 v_Color;

      void main() {
        gl_FragColor = v_Color;
      }`;
