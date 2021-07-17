/**
 * Specifies a circle. A subclass of geometry.
 *
 */

class Circle extends Geometry {
  /**
   * Constructor for Circle.
   *
   * @constructor
   * @param {Shader} shader Shading object used to shade geometry
   * @returns {Circle} Circle created
   */
  constructor(shader, x, y, z, radius, numberOfSides) {
      super(shader);

      this.vertices = this.generateCircleVertices(x, y, z, radius, numberOfSides);
      this.faces = {0: [0, 1, 2]};

      // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
      this.interleaveVertices();
  }

  generateCircleVertices(x, y, z, radius, numberOfSides) {
      var vertices = []
      
      var doublePi = 2* Math.PI;
      var size_S = 0.1;

      for(var i = 0; i < numberOfSides; i+=1){

        var vertexi = new Vertex(x + radius * Math.sin(i * doublePi / numberOfSides), y + radius * Math.cos(i * doublePi / numberOfSides), 0.0);
        vertices.push(vertexi);

      }

      return vertices;
   }
}
