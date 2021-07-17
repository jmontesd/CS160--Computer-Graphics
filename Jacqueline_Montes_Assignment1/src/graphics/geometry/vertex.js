/**
 * Specifies a vertex. Currently only contains the vertex's position.
 *
 * @author Lucas N. Ferreira
 * @this {Vertex}
 */

class Vertex {
  constructor(x, y, z) {

  	  var redSlider = document.getElementById("redSlider");
      var greenSlider = document.getElementById("greenSlider");
      var blueSlider = document.getElementById("blueSlider");


      //console.log("red", redSlider.value/255);
      //console.log("green", greenSlider.value/255);
      //console.log("blue", blueSlider.value/255);

      this.point  = new Vector3([x, y, z]);
      this.color  = [redSlider.value/255, greenSlider.value/255, blueSlider.value/255, 1.0];

      // This class can be extended to support other attributes such as
      // normals and UV coordinates.
  }
}
