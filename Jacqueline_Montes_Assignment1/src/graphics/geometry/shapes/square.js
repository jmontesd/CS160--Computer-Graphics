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

      // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
      this.interleaveVertices();
  }

  generateSquareVertices(x,y,ss) {
      var vertices = []
      
      // Vertex 0
      var vertex0 = new Vertex(x-ss, y-ss, 0.0);
      vertices.push(vertex0);

      // Vertex1
      var vertex1 = new Vertex(x-ss, y+ss, 0.0);
      vertices.push(vertex1);

      // Vertex 2
      var vertex2 = new Vertex(x+ss, y+ss, 0.0);
      vertices.push(vertex2);

      // Vertex 3
      var vertex3 = new Vertex(x+ss, y-ss, 0.0);
      vertices.push(vertex3);

      var vertex4 = new Vertex(x+ss, y-ss, 0.0);
      vertices.push(vertex3);

      return vertices;
   }
}
