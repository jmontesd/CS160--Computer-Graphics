/**
 * Specifies a square. A subclass of geometry.
 *
 */


class Square extends Geometry {
  /**
   * Constructor for Square.
   *
   * @constructor
   * @param {Shader} shader Shading object used to shade geometry
   * @returns {Square} Square created
   */
  constructor(shader, x, y, ss) {
      super(shader);


      this.vertices = this.generateSquareVertices(x, y, ss);
      this.faces = {0: [0, 1, 2]};

      //New Stuff
      this.rot = 0;

      
      this.rotationMatrix = new Matrix4();
      this.rotationMatrix.setRotate(2,0,0,1);
      
      this.translationMatrix = new Matrix4();
      this.translationMatrix.setTranslate(x,y,0);


      this.reversetranslationMatrix = new Matrix4();
      this.reversetranslationMatrix.setTranslate(-x,-y,0);

      // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
      this.interleaveVertices();
  }

  generateSquareVertices(x,y,ss) {
      var vertices = []
      
      // Vertex1
      var vertex0 = new Vertex(x-ss, y+ss, 0.0);
      vertices.push(vertex0);

      // Vertex2
      var vertex1 = new Vertex(x-ss, y-ss, 0.0);
      vertices.push(vertex1);

      // Vertex3
      var vertex2 = new Vertex(x+ss, y+ss, 0.0);
      vertices.push(vertex2);

      // Vertex4 
      vertices.push(vertex1);

      // Vertex5
      vertices.push(vertex2);

      // Vertex6
      var vertex5 = new Vertex(x+ss, y-ss, 0.0);
      vertices.push(vertex5);


      return vertices;
   }

  render() {
      this.modelMatrix = this.modelMatrix.multiply(this.translationMatrix);
      this.modelMatrix = this.modelMatrix.multiply(this.rotationMatrix);
      this.modelMatrix = this.modelMatrix.multiply(this.reversetranslationMatrix);

      this.shader.setUniform("u_ModelMatrix", this.modelMatrix.elements);
   }
}
