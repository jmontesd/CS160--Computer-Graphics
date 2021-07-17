/**
 * Specifies a triangle. A subclass of geometry.
 *
 * @author Lucas N. Ferreira
 * @this {Triangle}
 */
class Triangle extends Geometry {
  /**
   * Constructor for Triangle.
   *
   * @constructor
   * @param {Shader} shader Shading object used to shade geometry
   * @returns {Triangle} Triangle created
   */
  constructor(shader, x, y, ss) {
      super(shader);

      this.vertices = this.generateTriangleVertices(x, y, ss);
      this.faces = {0: [0, 1, 2]};

      // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
      this.interleaveVertices();
  }

  generateTriangleVertices(x,y,ss) {
      var vertices = []

      // Vertex 0
      var vertex0 = new Vertex(x-ss, y-ss, 0.0);
      vertices.push(vertex0);

      // Vertex1
      var vertex1 = new Vertex( x+ss, y-ss, 0.0);
      vertices.push(vertex1);

      // Vertex 2
      var vertex2 = new Vertex( x, y+ss, 0.0);
      vertices.push(vertex2);
      
      return vertices;
   }
}
