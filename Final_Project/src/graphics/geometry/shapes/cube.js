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
  constructor(shader, x, y, z, ss, height, image) {
      super(shader);

      //needed for our color picking
      this.selectColor = new Vector3([0.0,1.0,0.0]);

      this.image = image;

      this.vertices = this.generateCubeVertices(x, y, z, ss, height);
      this.faces = {0: [0, 1, 2]};


      // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
      this.interleaveVertices();
  }

  generateCubeVertices(x,y,z,ss, height) {
      var vertices = []

      height = height -1;

      // Top
      var vertex1 = new Vertex(x-ss, y+ss+height, z+ss);
      vertex1.texCoord = [0.0, 0.0];
      var vertex2 = new Vertex(x+ss, y+ss+height, z+ss);
      vertex2.texCoord = [1.0, 0.0];
      var vertex3 = new Vertex(x-ss, y+ss+height, z-ss);
      vertex3.texCoord = [0.0, 1.0+height];
      var vertex4 = new Vertex(x+ss, y+ss+height, z-ss);
      vertex4.texCoord = [1.0, 1.0+height];


      // Bottom
      var vertex5 = new Vertex(x-ss, y-ss, z+ss);
      vertex5.texCoord = [0.0, 0.0];
      var vertex6 = new Vertex(x+ss, y-ss, z+ss);
      vertex6.texCoord = [1.0, 0.0];
      var vertex7 = new Vertex(x-ss, y-ss, z-ss);
      vertex7.texCoord = [0.0, 1.0];
      var vertex8 = new Vertex(x+ss, y-ss, z-ss);
      vertex8.texCoord = [1.0, 1.0];

      //Front
      var vertex9 = new Vertex(x-ss, y-ss, z+ss);
      vertex9.texCoord = [0.0, 0.0];
      var vertex10 = new Vertex(x+ss, y-ss, z+ss);
      vertex10.texCoord = [1.0, 0.0];
      var vertex11 = new Vertex(x-ss, y+ss+height, z+ss);
      vertex11.texCoord = [0.0, 1.0+height];
      var vertex12 = new Vertex(x+ss, y+ss+height, z+ss);
      vertex12.texCoord = [1.0, 1.0+height];

      //Back
      var vertex13 = new Vertex(x+ss, y-ss, z-ss);
      vertex13.texCoord = [0.0, 0.0];
      var vertex14 = new Vertex(x-ss, y-ss, z-ss);
      vertex14.texCoord = [1.0, 0.0];
      var vertex15 = new Vertex(x+ss, y+ss+height, z-ss);
      vertex15.texCoord = [0.0, 1.0+height];
      var vertex16 = new Vertex(x-ss, y+ss+height, z-ss);
      vertex16.texCoord = [1.0, 1.0+height];

      // Left Side
      var vertex17 = new Vertex(x-ss, y-ss, z-ss);
      vertex17.texCoord = [0.0, 0.0];
      var vertex18 = new Vertex(x-ss, y-ss, z+ss);
      vertex18.texCoord = [1.0, 0.0];
      var vertex19 = new Vertex(x-ss, y+ss+height, z-ss);
      vertex19.texCoord = [0.0, 1.0+height];
      var vertex20 = new Vertex(x-ss, y+ss+height, z+ss);
      vertex20.texCoord = [1.0, 1.0+height];

      // Right Side
      var vertex21 = new Vertex(x+ss, y-ss, z+ss);
      vertex21.texCoord = [0.0, 0.0];
      var vertex22 = new Vertex(x+ss, y-ss, z-ss);
      vertex22.texCoord = [1.0, 0.0];
      var vertex23 = new Vertex(x+ss, y+ss+height, z+ss);
      vertex23.texCoord = [0.0, 1.0+height];
      var vertex24 = new Vertex(x+ss, y+ss+height, z-ss);
      vertex24.texCoord = [1.0, 1.0+height];

      vertices.push(vertex1);
      vertices.push(vertex2);
      vertices.push(vertex3);


      vertices.push(vertex2);
      vertices.push(vertex3);
      vertices.push(vertex4);

      vertices.push(vertex5);
      vertices.push(vertex6);
      vertices.push(vertex7);


      vertices.push(vertex6);
      vertices.push(vertex7);
      vertices.push(vertex8);


      vertices.push(vertex9);
      vertices.push(vertex10);
      vertices.push(vertex11);


      vertices.push(vertex10);
      vertices.push(vertex11);
      vertices.push(vertex12);


      vertices.push(vertex13);
      vertices.push(vertex14);
      vertices.push(vertex15);

      vertices.push(vertex14);
      vertices.push(vertex15);
      vertices.push(vertex16);

      vertices.push(vertex17);
      vertices.push(vertex18);
      vertices.push(vertex19);

      vertices.push(vertex18);
      vertices.push(vertex19);
      vertices.push(vertex20);


      vertices.push(vertex21);
      vertices.push(vertex22);
      vertices.push(vertex23);

      vertices.push(vertex22);
      vertices.push(vertex23);
      vertices.push(vertex24);

      //initializes normals
      for (var i = 0; i < 6; i++) {4
        //TOP
        vertices[i].normal = [0.0,1.0,0.0];
      }
      for (var i = 0; i < 6; i++) {
        //BOTTOM
        vertices[i + 6].normal = [0.0,-1.0,0.0];
      }
      for (var i = 0; i < 6; i++) {
        //FRONT
        vertices[i + 12].normal = [0.0,0.0, -1.0];
      }
      for (var i = 0; i < 6; i++) {
        //BACK
        vertices[i + 18].normal = [0.0,0.0,1.0];
      }
      for (var i = 0; i < 6; i++) {
        //LEFT
        vertices[i + 24].normal = [-1.0,0.0,0.0];
      }
      for (var i = 0; i < 6; i++) {
        //RIGHT
        vertices[i + 30].normal = [1.0,0.0,0.0];
      }

      return vertices;
   }
}
