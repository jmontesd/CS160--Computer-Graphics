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
  constructor(shader, x, y, z, ss, image) {
      super(shader);

      //needed for color picking
      this.selectColor = new Vector3([0.0, 0.0, 1.0]);

      this.vertices = this.generateSquareVertices(x, y, z, ss);
      this.faces = {0: this.vertices};


      this.image = image;

      // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
      this.interleaveVertices();
  }

  generateSquareVertices(x,y,z,ss) {
      var vertices = []

      // Vertex1
      var vertex0 = new Vertex(x-ss, y, z+ss);
      vertex0.texCoord = [0.0,0.0];
      vertices.push(vertex0);

      // Vertex2
      var vertex1 = new Vertex(x-ss, y , z-ss);
      vertex1.texCoord = [0.0,1.0];
      vertices.push(vertex1);

      // Vertex3
      var vertex2 = new Vertex(x+ss, y , z+ss);
      vertex2.texCoord = [1.0,0.0];
      vertices.push(vertex2);

      // Vertex4
      vertices.push(vertex1);

      // Vertex5
      vertices.push(vertex2);

      // Vertex6
      var vertex5 = new Vertex(x+ss, y, z-ss);
      vertex5.texCoord = [1.0,1.0];
      vertices.push(vertex5);

      //initializes normals
      for (var i = 0; i < 6; i++) {
              vertices[i].normal = [0.0,1.0,0.0];
      }

      return vertices;
   }

   /*
  render() {
      this.modelMatrix = this.modelMatrix.multiply(this.translationMatrix);
      this.modelMatrix = this.modelMatrix.multiply(this.rotationMatrix);
      this.modelMatrix = this.modelMatrix.multiply(this.reversetranslationMatrix);

      this.shader.setUniform("u_ModelMatrix", this.modelMatrix.elements);
   }
   */
}
