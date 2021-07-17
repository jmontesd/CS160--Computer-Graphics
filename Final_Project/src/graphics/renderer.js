var _renderer = null;

/**
 * Specifies a WebGL render. Used alongside Spring 2019 CMPS 160's Scene,
 * Camera, Geometry, and other subclasses.
 *
 * @author Lucas N. Ferreira
 * @this {Renderer}
 */
class Renderer {
   /**
    * Constructor for Renderer.
    *
    * @constructor
    * @returns {Renderer} Renderer object created
    */
    constructor(gl, scene, camera, ctx, hud) {
        this.gl = gl;
        this.hud;
        this.ctx = ctx;
        this.scene = scene;
        this.camera = camera;

        this.textures = {};

        this.initGLSLBuffers();

        // Setting canvas' clear color
        // this.gl.clearColor(fogColor[0], fogColor[1], fogColor[2], 1.0);
        this.gl.clearColor(fogColor[0], fogColor[1], fogColor[2], 1.0);

        // Use the z-buffer when drawing
        this.gl.enable(gl.DEPTH_TEST);

        _renderer = this;

        //init of red shader for use in color picking
        this.redShader = new Shader(gl, RED1_VSHADER, RED1_FSHADER);
        this.redShader.addAttribute("a_Position");
        this.redShader.addUniform("u_ViewMatrix", "mat4", new Matrix4().elements);
        this.redShader.addUniform("u_ProjectionMatrix", "mat4", new Matrix4().elements);
        this.redShader.addUniform("u_SelectColor", "vec3", new Vector3().elements);
    }

    /**
     * Starts an animation loop
     */
    start() {
        _renderer.render();
        _renderer.renderRain();
        requestAnimationFrame(_renderer.start);
    }

    renderRain() {
         if(this.scene.rainArray != null) {
              //console.log("rain is live");
              // once we have an array, need to implement the for loop logic here.
              this.ctx.clearRect(0, 0, 600, 600);
              
              for (var i = 0; i < this.scene.rainArray.length; i++) {
                //this.ctx.clearRect(0, 0, this.ctx.width, this.ctx.height);
                this.scene.rainArray[i].updateDrop(this.ctx);
                this.scene.rainArray[i].drawDrop(this.ctx);              
              } 
         }
    }


    /**
     * Renders all the geometry within the scene.
     */
    render() {
        if (this.scene.hud != null){
          this.scene.hud.drawHud();
        }
        // Clear the geometry onscreen
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        for (var i = 0; i < this.scene.geometries.length; i++) {
            var geometry = this.scene.geometries[i];
            if(geometry == null) {continue;}

            // Switch to shader attached to geometry
            this.gl.useProgram(geometry.shader.program)
            this.gl.program = geometry.shader.program

            geometry.shader.setUniform("u_NormalMatrix", geometry.normalMatrix.elements);
            geometry.shader.setUniform("u_ModelMatrix", geometry.modelMatrix.elements);
            geometry.shader.setUniform("u_ViewMatrix", this.camera.viewMatrix.elements);
            geometry.shader.setUniform("u_ProjectionMatrix", this.camera.projectionMatrix.elements);
            geometry.shader.setUniform("u_Eye", this.camera.eye.elements);

            geometry.shader.setUniform("u_EyePos", this.camera.eye.elements);
            geometry.shader.setUniform("u_Center", this.camera.center.elements);


            if(this.scene.light != null) {
                geometry.shader.setUniform("u_LightPos", this.scene.light.pos.elements);
                geometry.shader.setUniform("u_AmbientColor", this.scene.light.ambient);
                geometry.shader.setUniform("u_DiffuseColor", this.scene.light.diffuse);
                geometry.shader.setUniform("u_SpecularColor", this.scene.light.specular);
            }

            if(geometry.image != null) {
                if(!(geometry.image.src in this.textures)) {
                    // Create a texture object and store id using its path as key
                    this.textures[geometry.image.src] = this.gl.createTexture();
                    this.loadTexture(this.textures[geometry.image.src], geometry.image);
                }else {
                  // Enable texture unit0
                  this.gl.activeTexture(this.gl.TEXTURE0);
                  // Bind the texture object to the target
                  this.gl.bindTexture(this.gl.TEXTURE_2D, this.textures[geometry.image.src]);
                }

            }

            // Callback function in the case user wants to change the
            // geometry before the draw call
            geometry.render();

            // Set attribute buffer with the geometry data
            this.sendVertexDataToGLSL(geometry.data, geometry.dataCounts, geometry.shader);

            // Passes the indices of a geometry to the index buffer a
            this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, geometry.indices, this.gl.STATIC_DRAW);

            // Draw geometries using current buffer data
            this.gl.drawElements(this.gl.TRIANGLES, geometry.indices.length, this.gl.UNSIGNED_SHORT, 0);
        }
    }

    redRender() {
          // Clear the geometry onscreen
          this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

          for (var i = 119; i < this.scene.geometries.length; i++) {
              var geometry = this.scene.geometries[i];
              if(geometry == null) {continue;}

              // Switch to shader attached to geometry
              this.gl.useProgram(this.redShader.program);
              this.gl.program = this.redShader.program;

              this.redShader.setUniform("u_ViewMatrix", this.camera.viewMatrix.elements);
              this.redShader.setUniform("u_ProjectionMatrix", this.camera.projectionMatrix.elements);
              this.redShader.setUniform("u_SelectColor", this.scene.geometries[i].selectColor.elements);

              // Callback function in the case user wants to change the
              // geometry before the draw call
              geometry.render();

              // Set attribute buffer with the geometry data
              this.sendVertexDataToGLSL(geometry.data, geometry.dataCounts, this.redShader);

              // Passes the indices of a geometry to the index buffer a
              this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, geometry.indices, this.gl.STATIC_DRAW);

              // Draw geometries using current buffer data
              this.gl.drawElements(this.gl.TRIANGLES, geometry.indices.length, this.gl.UNSIGNED_SHORT, 0);
          }
      }

      picking(x,y) {
      //draw geometries as red for color picking
      // alert("X&Y after: " + x + " " + y);

      this.redRender();
      var pixels = new Uint8Array(4);
      this.gl.readPixels(x, y, 1, 1, this.gl.RGBA, this.gl.UNSIGNED_BYTE, pixels);
      if(pixels[0] == 255) {
        this.scene.hud.updateCount();
        this.scene.hud.drawHud();
        this.scene.geometries[119] = null;
      }else if(pixels[0] == 128){
        //alert("Page 2 Found")
        this.scene.hud.updateCount();
        this.scene.hud.drawHud();
        this.scene.geometries[120] = null;
      }else if(pixels[0] == 85) {
        //alert("Page 3 Found");
        this.scene.hud.updateCount();
        this.scene.hud.drawHud();
        this.scene.geometries[121] = null;
      }
      //draw geometries back with normal colors/textures
      this.render();
    }

    /**
     * Initializes a single index and single attribute buffer for future use
     */
    initGLSLBuffers() {
        var attributeBuffer = this.gl.createBuffer();
        var indexBuffer = this.gl.createBuffer();

        if (!attributeBuffer || !indexBuffer) {
            console.log("Failed to create buffers!");
            return;
        }

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, attributeBuffer);
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    }

    /**
     * Sends an array of interleaved vertex information the shader.
     *
     * @private
     * @param {Float32Array} data Data being sent to attribute variable
     * @param {Number} dataCount The amount of data to pass per vertex
     * @param {String} attribName The name of the attribute variable
     */
    sendVertexDataToGLSL(data, dataCounts, shader) {
      var FSIZE = data.BYTES_PER_ELEMENT;

      this.gl.bufferData(this.gl.ARRAY_BUFFER, data, this.gl.STATIC_DRAW);

      var dataEnd = 0;
      for (var i = 0; i < dataCounts.length; i++) {
        dataEnd += dataCounts[i];
      }
      dataEnd *= FSIZE;

      var i = 0;
      var currentDataStart = 0;

      // Send attributes
      for (const attributeName in shader.attributes) {
          var attribute = shader.attributes[attributeName].location;

          this.gl.vertexAttribPointer(attribute, dataCounts[i], this.gl.FLOAT, false, dataEnd, currentDataStart);
          this.gl.enableVertexAttribArray(attribute);

          currentDataStart += FSIZE * dataCounts[i];

          i += 1;
       }

       // Send uniforms
       for (const uniformName in shader.uniforms) {
           this.sendUniformToGLSL(shader.uniforms[uniformName]);
        }
    }

    /**
     * Passes a uniform's value to it's saved location
     * @private
     * @param uniform An associative array with the location and value of a uniform
     */
    sendUniformToGLSL(uniform) {
        switch (uniform.type) {
            case "float":
              this.gl.uniform1f(uniform.location, uniform.value);
              break;
            case "vec2":
              this.gl.uniform2fv(uniform.location, uniform.value);
              break;
            case "vec3":
              this.gl.uniform3fv(uniform.location, uniform.value);
              break;
            case "vec4":
              this.gl.uniform4fv(uniform.location, uniform.value);
              break;
            case "mat2":
              this.gl.uniformMatrix2fv(uniform.location, false, uniform.value);
              break;
            case "mat3":
              this.gl.uniformMatrix3fv(uniform.location, false, uniform.value);
              break;
            case "mat4":
              this.gl.uniformMatrix4fv(uniform.location, false, uniform.value);
              break;
            case "sampler2D":
              this.gl.uniform1i(uniform.location, uniform.value);
              break;
        }
    }

    loadTexture(texture, image) {
        // Flip the image's y axis
        this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, 1);

        // Enable texture unit0
        this.gl.activeTexture(this.gl.TEXTURE0);

        // Bind the texture object to the target
        this.gl.bindTexture(this.gl.TEXTURE_2D, texture);

        // Set the texture parameters
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
        this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);

        // Set the texture image
        this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, image);
    }
}

