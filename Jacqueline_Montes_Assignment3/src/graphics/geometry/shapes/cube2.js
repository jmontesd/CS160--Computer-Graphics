/**
 * Specifies a cube. A subclass of geometry.
 *
 * @this {Cube}
 */



class Cube2 extends Geometry {
  /**
   * Constructor for Cube2.
   *
   * @constructor
   * @param {Shader} shader Shading object used to shade geometry
   * @returns {Cube} Cube created
   */
  constructor(shader, x, y, ss, image) {
      super(shader);

      this.image = image;

      this.vertices = this.generateCube2Vertices(x, y, ss);
      this.faces = {0: [0, 1, 2]};

      //New Stuff
      this.rot = 0;
      
      this.rotationMatrix = new Matrix4();
      this.rotationMatrix.setRotate(1,-0.5,1.3,0);
      
      this.translationMatrix = new Matrix4();
      this.translationMatrix.setTranslate(x,y,0);


      this.reversetranslationMatrix = new Matrix4();
      this.reversetranslationMatrix.setTranslate(-x,-y,0);
    

      // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
      this.interleaveVertices();
  }

  generateCube2Vertices(x,y,ss) {
      var vertices = []


      //3x3 Image
      var vertex1 = new Vertex(x-ss, y+ss, -2*ss);
      vertex1.texCoord = [0.0, 0.0];  
      var vertex2 = new Vertex(x+ss, y+ss, -2*ss);
      vertex2.texCoord = [3.0, 0.0];       
      var vertex3 = new Vertex(x-ss, y+ss, 0.0);
      vertex3.texCoord = [0.0, 3.0];       
      var vertex4 = new Vertex(x+ss, y+ss, 0.0);
      vertex4.texCoord = [3.0, 3.0];       

      //3x3 Image
      var vertex5 = new Vertex(x-ss, y-ss, -2*ss);
      vertex5.texCoord = [0.0, 0.0];  
      var vertex6 = new Vertex(x+ss, y-ss, -2*ss);  
      vertex6.texCoord = [3.0, 0.0];         
      var vertex7 = new Vertex(x-ss, y-ss, 0.0);  
      vertex7.texCoord = [0.0, 3.0];     
      var vertex8 = new Vertex(x+ss, y-ss, 0.0); 
      vertex8.texCoord = [3.0, 3.0];      


      //Full Image
      var vertex9 = new Vertex(x-ss, y-ss, -2*ss);
      vertex9.texCoord = [0.0, 0.0];       
      var vertex10 = new Vertex(x+ss, y-ss, -2*ss);
      vertex10.texCoord = [1.0, 0.0];  
      var vertex11 = new Vertex(x-ss, y+ss, -2*ss);
      vertex11.texCoord = [0.0, 1.0];        
      var vertex12 = new Vertex(x+ss, y+ss, -2*ss); 
      vertex12.texCoord = [1.0, 1.0]; 

      // Twice Image
      var vertex13 = new Vertex(x+ss, y-ss, 0.0);
      vertex13.texCoord = [0.0, 1.0];    
      var vertex14 = new Vertex(x-ss, y-ss, 0.0);
      vertex14.texCoord = [2.0, 1.0];    
      var vertex15 = new Vertex(x+ss, y+ss, 0.0);
      vertex15.texCoord = [0.0, 2.0];    
      var vertex16 = new Vertex(x-ss, y+ss, 0.0);
      vertex16.texCoord = [2.0, 2.0];    
      
      // Bottom Half
      var vertex17 = new Vertex(x-ss, y-ss, 0.0);
      vertex17.texCoord = [0.0, 0.0];       
      var vertex18 = new Vertex(x-ss, y-ss, -2*ss);
      vertex18.texCoord = [1.0, 0.0];       
      var vertex19 = new Vertex(x-ss, y+ss, 0.0);
      vertex19.texCoord = [0.0, 0.5];       
      var vertex20 = new Vertex(x-ss, y+ss, -2*ss);
      vertex20.texCoord = [1.0, 0.5];       

      // Top Half
      var vertex21 = new Vertex(x+ss, y-ss, -2*ss);
      vertex21.texCoord = [0.0, 0.5];    
      var vertex22 = new Vertex(x+ss, y-ss, 0.0);
      vertex22.texCoord = [1.0, 0.5];    
      var vertex23 = new Vertex(x+ss, y+ss, -2*ss);
      vertex23.texCoord = [0.0, 1.0];    
      var vertex24 = new Vertex(x+ss, y+ss, 0.0);
      vertex24.texCoord = [1.0, 1.0];    
      
      
      

      
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



   render() {

       this.modelMatrix = this.modelMatrix.multiply(this.translationMatrix);
       this.modelMatrix = this.modelMatrix.multiply(this.rotationMatrix);
       this.modelMatrix = this.modelMatrix.multiply(this.reversetranslationMatrix);


       this.shader.setUniform("u_ModelMatrix", this.modelMatrix.elements);
   }
}
