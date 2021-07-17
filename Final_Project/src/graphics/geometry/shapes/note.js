/**
 * Specifies a Note. A subclass of geometry.
 *
 * @author Lucas N. Ferreira
 * @this {Note}
 */
class Note extends Geometry {
  /**
   * Constructor for Note
   *
   * @constructor
   * @param {Shader} shader Shading object used to shade geometry
   * @returns {Note} Notee created
   */
  constructor(shader, image, x , y, z, num) {
      super(shader);
      //needed for color picking
      this.selectColor = new Vector3([(1.0/num), 0.0, 0.0]);
      this.image = image;

      this.vertices = this.generateSquareVertices(x, y, z);
      this.faces = {0: this.vertices};

      // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
      this.interleaveVertices();
  }

  generateSquareVertices(x, y, z) {
      var vertices = []

      var vertex1 = new Vertex(x, y, z);
      vertex1.texCoord = [0.0,0.0];
      var vertex2 = new Vertex(x+1, y+1, z);
      vertex2.texCoord = [1.0,1.0];
      var vertex3 = new Vertex(x+1, y, z);
      vertex3.texCoord = [1.0,0.0];

      var vertex4 = new Vertex(x, y, z);
      vertex4.texCoord = [0.0,0.0];
      var vertex5 = new Vertex(x, y+1, z);
      vertex5.texCoord = [0.0,1.0];
      var vertex6 = new Vertex(x+1, y+1, z);
      vertex6.texCoord = [1.0,1.0];

      vertices.push(vertex1);
      vertices.push(vertex2);
      vertices.push(vertex3);
      vertices.push(vertex4);
      vertices.push(vertex5);
      vertices.push(vertex6);

      for (var i = 0; i < 6; i++) {
        vertices[i].normal = [0.0,0.0,-1.0];
      }

      return vertices;
    }
}
