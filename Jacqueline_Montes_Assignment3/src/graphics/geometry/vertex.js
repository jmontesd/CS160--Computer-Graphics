/**
 * Specifies a vertex. Currently only contains the vertex's position.
 *
 * @author Lucas N. Ferreira
 * @this {Vertex}
 */

class Vertex {
  constructor(x, y, z) {


      this.point  = new Vector3([x, y, z]);
      
      var setColor = document.getElementById("setColor");

      if(setColor.value == "Solid"){
        var redSlider = document.getElementById("redSlider");
        var greenSlider = document.getElementById("greenSlider");
        var blueSlider = document.getElementById("blueSlider");
        this.color  = [redSlider.value/255, greenSlider.value/255, blueSlider.value/255, 1.0];
      }else{
        this.color = [Math.random(), Math.random(), Math.random(), 1.0];
      }

      
      // This class can be extended to support other attributes such as
      // normals and UV coordinates.
      this.texCoord = [0.0, 0.0];
  }
}
