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

      
      this.timer = 1;

      this.speedX = Math.random() * (0.03 - 0.01) + 0.01;
      this.speedY = Math.random() * (0.03 - 0.01) + 0.01;

      this.translationMatrix = new Matrix4();
      this.translationMatrix.setTranslate(this.speedX,this.speedY,0);


      

      // CALL THIS AT THE END OF ANY SHAPE CONSTRUCTOR
      this.interleaveVertices();
  }

  generateCircleVertices(x, y, z, radius, numberOfSides) {
      var vertices = []
      
      var doublePi = 2* Math.PI;
      var size_S = 0.1;
      var vertex2 = new Vertex( x, y, 0.0);
      
      for(var i = 0; i < numberOfSides+1; i+=1){
        var j = i-1;
        
        var vertexi = new Vertex(x + radius * Math.sin(i * doublePi / numberOfSides), y + radius * Math.cos(i * doublePi / numberOfSides), 0.0);
        var vertexj = new Vertex(x + radius * Math.sin(j * doublePi / numberOfSides), y + radius * Math.cos(j * doublePi / numberOfSides), 0.0);

        console.log(vertexi);
        vertices.push(vertexi);
        vertices.push(vertex2);

        
        if(i == 0){
          vertices.push(vertexi);
          vertices.push(vertex2);
        }else if (i == 1){
          vertices.push(vertexi);
        }else{
          vertices.push(vertexj);
          vertices.push(vertex2);
          vertices.push(vertexi);
        }
      }

      return vertices;
   }


   render() {       
       
       this.modelMatrix = this.modelMatrix.multiply(this.translationMatrix);
    
       this.timer = this.timer + 0.1;
       console.log("Timer: ", this.timer);
       if(this.timer > 1){

        //Received some help in finishing this random speed implementation from TA
        var randDirX = Math.random() < 0.5 ? 1 : -1;
        this.speedX = Math.random() * (0.03 - 0.01) + 0.01;

        var randDirY = Math.random() < 0.2 ? 1 : -1;
        this.speedY = Math.random() * (0.03 - 0.01) + 0.01;
        

        this.translationMatrix.setTranslate(this.speedX * randDirX, this.speedY * randDirY,0);
        this.timer = 0;

       } 
        //console.log("SpeedX:", this.speedX);
        //console.log("SpeedX:", this.speedX);
        //console.log(this.modelMatrix);

       
       this.shader.setUniform("u_ModelMatrix", this.modelMatrix.elements);
   } 
}
