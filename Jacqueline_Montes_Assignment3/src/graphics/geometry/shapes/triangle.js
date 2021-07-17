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

      //New Stuff
      this.rot = 0;
      
      
      this.translationMatrix = new Matrix4();
      this.translationMatrix.setTranslate(x,y,0);


      this.reversetranslationMatrix = new Matrix4();
      this.reversetranslationMatrix.setTranslate(-x,-y,0);

      
      this.scaling_Up_Matrix = new Matrix4();
      this.scaling_Up_Matrix.setScale(1.01,1.01,1.01);

     
      this.scaling_Down_Matrix = new Matrix4();
      this.scaling_Down_Matrix.setScale(0.99,0.99,0.99);

    
      this.scalingSize = true;

      this.counter = 0;
      // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
      this.interleaveVertices();
  }

  generateTriangleVertices(x,y,ss) {
      var vertices = []

      // Vertex 0
      var vertex0 = new Vertex(x-ss, y-ss, 0);
      vertices.push(vertex0);

      // Vertex1
      var vertex1 = new Vertex( x+ss, y-ss, 0);
      vertices.push(vertex1);

      // Vertex 2
      var vertex2 = new Vertex( x, y+ss, 0);
      vertices.push(vertex2);
      
      return vertices;
   }



   render() {

      this.modelMatrix = this.modelMatrix.multiply(this.translationMatrix);
       
      if(this.scalingSize == true){
        this.modelMatrix = this.modelMatrix.multiply(this.scaling_Up_Matrix);
      }else{
        this.modelMatrix = this.modelMatrix.multiply(this.scaling_Down_Matrix);
      }
        
      this.modelMatrix = this.modelMatrix.multiply(this.reversetranslationMatrix);
      this.counter = this.counter + 1;

        
          
      if (this.counter == 50){
          if(this.scalingSize == true){
            this.scalingSize = false;
          }else{
           this.scalingSize = true;
          }
          this.counter = 0;
        }
      
       this.shader.setUniform("u_ModelMatrix", this.modelMatrix.elements);
   }
}
