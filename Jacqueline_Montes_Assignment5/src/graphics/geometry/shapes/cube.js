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

      this.image = image;

      this.vertices = this.generateCubeVertices(x, y, z, ss, height);
      this.faces = {0: [0, 1, 2]};

      this.rot = 0;
      // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
      this.interleaveVertices();
  }

  generateCubeVertices(x,y,z,ss, height) {
      var vertices = []

      console.log("Height", height);

      height = height -1;

      // Create a cube
      //    v3----- v4
      //   /|      /|
      //  v1------v2|
      //  | |     | |
      //  | |v7---|-|v8
      //  |/      |/
      //  v5------v6

      // Top
      var vertex1 = new Vertex(x-ss, y+ss+height, z+ss);
      vertex1.texCoord = [0.0, 0.0];  

      vertex1.normal.elements[0] = 0;
      vertex1.normal.elements[1] = 1;
      vertex1.normal.elements[1] = 0;
       // = new Vector3([0.0,1.0,0.0]);
      var vertex2 = new Vertex(x+ss, y+ss+height, z+ss);
      vertex2.texCoord = [1.0, 0.0]; 
      vertex2.normal.elements[0] = 0;
      vertex2.normal.elements[1] = 1;
      vertex2.normal.elements[1] = 0;

      // vertex2.normal = new Vector3([0.0,1.0,0.0]);      
      var vertex3 = new Vertex(x-ss, y+ss+height, z-ss);
      vertex3.texCoord = [0.0, 1.0+height];    
      vertex3.normal.elements[0] = 0;
      vertex3.normal.elements[1] = 1;
      vertex3.normal.elements[1] = 0;
      // vertex3.normal = new Vector3([0.0,1.0,0.0]); 

      var vertex4 = new Vertex(x+ss, y+ss+height, z-ss);
      vertex4.texCoord = [1.0, 1.0+height];  
      vertex4.normal.elements[0] = 0;
      vertex4.normal.elements[1] = 1;
      vertex4.normal.elements[1] = 0;
      // vertex4.normal = new Vector3([0.0,1.0,0.0]);     

      // Bottom
      var vertex5 = new Vertex(x-ss, y-ss, z+ss);
      vertex5.texCoord = [0.0, 0.0];  
      vertex5.normal.elements[0] = 0;
      vertex5.normal.elements[1] = -1;
      vertex5.normal.elements[1] = 0;
      // vertex5.normal = new Vector3([0.0,-1.0,0.0]);
      var vertex6 = new Vertex(x+ss, y-ss, z+ss);  
      vertex6.texCoord = [1.0, 0.0]; 
      vertex6.normal.elements[0] = 0;
      vertex6.normal.elements[1] = -1;
      vertex6.normal.elements[1] = 0;  
      // vertex6.normal = new Vector3([0.0,-1.0,0.0]);    
      var vertex7 = new Vertex(x-ss, y-ss, z-ss); 
      vertex7.texCoord = [0.0, 1.0];  
      vertex7.normal.elements[0] = 0;
      vertex7.normal.elements[1] = -1;
      vertex7.normal.elements[1] = 0;
      // vertex7.normal = new Vector3([0.0,-1.0,0.0]);     
      var vertex8 = new Vertex(x+ss, y-ss, z-ss);  
      vertex8.texCoord = [1.0, 1.0]; 
      vertex8.normal.elements[0] = 0;
      vertex8.normal.elements[1] = -1;
      vertex8.normal.elements[1] = 0;
      // vertex8.normal = new Vector3([0.0,-1.0,0.0]);      
   

      //Front
      var vertex9 = new Vertex(x-ss, y-ss, z+ss);
      vertex9.texCoord = [0.0, 0.0];   
      vertex9.normal.elements[0] = 0;
      vertex9.normal.elements[1] = 0;
      vertex9.normal.elements[1] = 1;
      // vertex9.normal = new Vector3([0.0,0.0,1.0]);    
      var vertex10 = new Vertex(x+ss, y-ss, z+ss);
      vertex10.texCoord = [1.0, 0.0];  
      vertex10.normal.elements[0] = 0;
      vertex10.normal.elements[1] = 0;
      vertex10.normal.elements[1] = 1;
      // vertex10.normal = new Vector3([0.0,0.0,1.0]);
      var vertex11 = new Vertex(x-ss, y+ss+height, z+ss);
      vertex11.texCoord = [0.0, 1.0+height];  
      vertex11.normal.elements[0] = 0;
      vertex11.normal.elements[1] = 0;
      vertex11.normal.elements[1] = 1; 
      // vertex11.normal = new Vector3([0.0,0.0,1.0]);     
      var vertex12 = new Vertex(x+ss, y+ss+height, z+ss); 
      vertex12.texCoord = [1.0, 1.0+height]; 
      vertex12.normal.elements[0] = 0;
      vertex12.normal.elements[1] = 0;
      vertex12.normal.elements[1] = 1;
      // vertex12.normal = new Vector3([0.0,0.0,1.0]);

      //Back 
      var vertex13 = new Vertex(x+ss, y-ss, z-ss);
      vertex13.texCoord = [0.0, 0.0]; 
      vertex13.normal.elements[0] = 0;
      vertex13.normal.elements[1] = 0;
      vertex13.normal.elements[1] = -1;
      // vertex13.normal = new Vector3([0.0,0.0,-1.0]);   
      var vertex14 = new Vertex(x-ss, y-ss, z-ss);
      vertex14.texCoord = [1.0, 0.0];  
      vertex14.normal.elements[0] = 0;
      vertex14.normal.elements[1] = 0;
      vertex14.normal.elements[1] = -1;
      // vertex14.normal = new Vector3([0.0,0.0,-1.0]);  
      var vertex15 = new Vertex(x+ss, y+ss+height, z-ss);
      vertex15.texCoord = [0.0, 1.0+height];
      vertex15.normal.elements[0] = 0;
      vertex15.normal.elements[1] = 0;
      vertex15.normal.elements[1] = -1;
      // vertex15.normal = new Vector3([0.0,0.0,-1.0]);    
      var vertex16 = new Vertex(x-ss, y+ss+height, z-ss);
      vertex16.texCoord = [1.0, 1.0+height];  
      vertex16.normal.elements[0] = 0;
      vertex16.normal.elements[1] = 0;
      vertex16.normal.elements[1] = -1; 
      // vertex16.normal = new Vector3([0.0,0.0,-1.0]); 
      
      // Left Side
      var vertex17 = new Vertex(x-ss, y-ss, z-ss);
      vertex17.texCoord = [0.0, 0.0]; 
      vertex17.normal.elements[0] = -1;
      vertex17.normal.elements[1] = 0;
      vertex17.normal.elements[1] = 0;
      // vertex17.normal = new Vector3([-1.0,0.0,0.0]);      
      var vertex18 = new Vertex(x-ss, y-ss, z+ss);
      vertex18.texCoord = [1.0, 0.0];
      vertex18.normal.elements[0] = -1;
      vertex18.normal.elements[1] = 0;
      vertex18.normal.elements[1] = 0;
      // vertex18.normal = new Vector3([-1.0,0.0,0.0]);       
      var vertex19 = new Vertex(x-ss, y+ss+height, z-ss);
      vertex19.texCoord = [0.0, 1.0+height];
      vertex19.normal.elements[0] = -1;
      vertex19.normal.elements[1] = 0;
      vertex19.normal.elements[1] = 0;
      // vertex19.normal = new Vector3([-1.0,0.0,0.0]);       
      var vertex20 = new Vertex(x-ss, y+ss+height, z+ss);
      vertex20.texCoord = [1.0, 1.0+height];
      vertex20.normal.elements[0] = -1;
      vertex20.normal.elements[1] = 0;
      vertex20.normal.elements[1] = 0;
      // vertex20.normal = new Vector3([-1.0,0.0,0.0]);       

      // Right Side
      var vertex21 = new Vertex(x+ss, y-ss, z+ss);
      vertex21.texCoord = [0.0, 0.0];
      vertex21.normal.elements[0] = 1;
      vertex21.normal.elements[1] = 0;
      vertex21.normal.elements[1] = 0;
      // vertex21.normal = new Vector3([1.0,0.0,0.0]);    
      var vertex22 = new Vertex(x+ss, y-ss, z-ss);
      vertex22.texCoord = [1.0, 0.0]; 
      vertex22.normal.elements[0] = 1;
      vertex22.normal.elements[1] = 0;
      vertex22.normal.elements[1] = 0;
      // vertex22.normal = new Vector3([1.0,0.0,0.0]);   
      var vertex23 = new Vertex(x+ss, y+ss+height, z+ss);
      vertex23.texCoord = [0.0, 1.0+height];
      vertex23.normal.elements[0] = 1;
      vertex23.normal.elements[1] = 0;
      vertex23.normal.elements[1] = 0;
      // vertex23.normal = new Vector3([1.0,0.0,0.0]);    
      var vertex24 = new Vertex(x+ss, y+ss+height, z-ss);
      vertex24.texCoord = [1.0, 1.0+height]; 
      vertex24.normal.elements[0] = 1;
      vertex24.normal.elements[1] = 0;
      vertex24.normal.elements[2] = 0;
      // vertex24.normal = new Vector3([1.0,0.0,0.0]);    
      
      
      

      
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


   

      return vertices;
   }
}
