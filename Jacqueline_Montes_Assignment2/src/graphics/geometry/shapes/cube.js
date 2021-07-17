/**
 * Specifies a cube. A subclass of geometry.
 *
 * @this {Cube}
 */



class Cube extends Geometry {
  /**
   * Constructor for Cube.
   *
   * @constructor
   * @param {Shader} shader Shading object used to shade geometry
   * @returns {Cube} Cube created
   */
  constructor(shader, x, y, ss) {
      super(shader);

      this.vertices = this.generateCubeVertices(x, y, ss);
      this.faces = {0: [0, 1, 2]};

      //New Stuff
      this.rot = 0;
      
      this.rotationMatrix = new Matrix4();
      this.rotationMatrix.setRotate(3,0.5,1.5,0);
      
      this.translationMatrix = new Matrix4();
      this.translationMatrix.setTranslate(x,y,0);


      this.reversetranslationMatrix = new Matrix4();
      this.reversetranslationMatrix.setTranslate(-x,-y,0);
    

      // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
      this.interleaveVertices();
  }

  generateCubeVertices(x,y,ss) {
      var vertices = []

      var vertex1 = new Vertex(x-ss, y+ss, -2*ss);
      var vertex7 = new Vertex(x-ss, y-ss, -2*ss);
      var vertex2 = new Vertex(x+ss, y+ss, -2*ss);
      var vertex5 = new Vertex(x+ss, y-ss, -2*ss);

      var vertex3 = new Vertex(x-ss, y+ss, 0.0);
      var vertex8 = new Vertex(x-ss, y-ss, 0.0);
      var vertex4 = new Vertex(x+ss, y+ss, 0.0);
      var vertex6 = new Vertex(x+ss, y-ss, 0.0);



      vertices.push(vertex1);
      vertices.push(vertex2);
      vertices.push(vertex3);

      vertices.push(vertex2);
      vertices.push(vertex3);
      vertices.push(vertex4);

      vertices.push(vertex3);
      vertices.push(vertex4);
      vertices.push(vertex8);

      vertices.push(vertex4);
      vertices.push(vertex8);
      vertices.push(vertex6);

      vertices.push(vertex8);
      vertices.push(vertex6);
      vertices.push(vertex7);

      vertices.push(vertex5);
      vertices.push(vertex7);
      vertices.push(vertex6);

      vertices.push(vertex4);
      vertices.push(vertex5);
      vertices.push(vertex6);

      vertices.push(vertex4);
      vertices.push(vertex5);
      vertices.push(vertex2);

      vertices.push(vertex1);
      vertices.push(vertex5);
      vertices.push(vertex2);

      vertices.push(vertex1);
      vertices.push(vertex5);
      vertices.push(vertex7);


      vertices.push(vertex1);
      vertices.push(vertex3);
      vertices.push(vertex8);

      vertices.push(vertex1);
      vertices.push(vertex7);
      vertices.push(vertex8);




      return vertices;
   }



   render() {

       this.modelMatrix = this.modelMatrix.multiply(this.translationMatrix);
       this.modelMatrix = this.modelMatrix.multiply(this.rotationMatrix);
       this.modelMatrix = this.modelMatrix.multiply(this.reversetranslationMatrix);


       this.shader.setUniform("u_ModelMatrix", this.modelMatrix.elements);
   }
}
