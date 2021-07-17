/**
 * Specifies a Camera that can Dolly/Truck and Tilt/Pan.
 *
 * @author Lucas N. Ferreira
 * @this {Renderer}
 */
class Camera {
   /**
    * Constructor for Camera.
    *
    * @constructor
    * @returns {Camera} Camera object created
    */
    constructor(shader) {
        this.speed = 0.5;
        var ortho = false;

        // Camera view attributes
        this.eye     = new Vector3([0, 1, 7.5]);
        this.center  = new Vector3([0, 1, 1]);
        this.up      = new Vector3([0, 1, 0]);

        this.viewMatrix = new Matrix4();
        this.updateView();

        this.projectionMatrix = new Matrix4();
        this.projectionMatrix.setPerspective(60, 1, 1, 50);
    }

    truck(dir) {
        
        this.eye.elements[0] = this.eye.elements[0] + dir;
        this.center.elements[0] = this.center.elements[0] + dir;
        this.updateView();

        console.log("Eye", this.eye);
        console.log("Center", this.center);
        console.log("Up", this.up);
    }

    dolly(dir){
        
        this.eye.elements[2] = this.eye.elements[2] + dir;
        this.center.elements[2] = this.center.elements[2] + dir;
        this.updateView();

        console.log("Eye", this.eye);
        console.log("Center", this.center);
        console.log("Up", this.up);

    }

    pan(dir) {
        this.center.elements[0] = this.center.elements[0] - dir;
        this.updateView();

        console.log("Eye", this.eye);
        console.log("Center", this.center);
        console.log("Up", this.up);

    }

    tilt(dir){
        this.center.elements[1] = this.center.elements[1] - dir;
        //this.up.elements[1] = this.up.elements[1] - dir;
        this.updateView();
    }

    zoom(dir){
        this.eye.elements[2] = this.eye.elements[2] + dir;
        this.updateView();

        console.log("Eye", this.eye);
    }

    setOrtho(){
        this.ortho = !this.ortho;
        if(this.ortho == true){
            this.projectionMatrix.setOrtho(-6,6,-6,6,6,50);
        }else{
            this.projectionMatrix.setPerspective(60, 1, 1, 50);
        }
    }
    updateView() {
        this.viewMatrix.setLookAt(this.eye.elements[0], this.eye.elements[1], this.eye.elements[2],
                                  this.center.elements[0], this.center.elements[1], this.center.elements[2],
                                  this.up.elements[0], this.up.elements[1], this.up.elements[2]);
    }
}
