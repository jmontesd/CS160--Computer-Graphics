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
        
        // Calculate the n camera axis
        var n = this.eye.sub(this.center);
        n = n.normalize()

        // Calculate the u camera axis
        var u = this.up.cross(n);
        u = u.normalize();

        // Scale the u axis to the desired distance to move
        u = u.mul(dir * this.speed);

        // Add the direction vector to both the eye and center positions
        this.eye = this.eye.add(u);
        this.center = this.center.add(u);

        this.updateView();

        // console.log("Eye", this.eye);
        // console.log("Center", this.center);
        // console.log("Up", this.up);
    }

    dolly(dir){
        
        // this.eye.elements[2] = this.eye.elements[2] + dir;
        // this.center.elements[2] = this.center.elements[2] + dir;
        // this.updateView();

        // Calculate the n camera axis
        var n = this.eye.sub(this.center);
        n = n.normalize()

        
        // Scale the u axis to the desired distance to move
        n = n.mul(dir * this.speed);

        // Add the direction vector to both the eye and center positions
        this.center = this.center.add(n);
        this.eye = this.eye.add(n);

        this.updateView();
        // console.log("Eye", this.eye);
        // console.log("Center", this.center);
        // console.log("Up", this.up);

    }

    pan(dir) {
        // this.center.elements[0] = this.center.elements[0] - dir;
        // this.updateView();

        var n = this.eye.sub(this.center);
        n = n.normalize();

        var pan = new Matrix4();
        pan.setRotate(dir * this.speed, this.up.elements[0], this.up.elements[1], this.up.elements[2]);
        n = pan.multiplyVector3(n);

        this.center = this.eye.sub(n);
        this.updateView();


        // console.log("Eye", this.eye);
        // console.log("Center", this.center);
        // console.log("Up", this.up);

    }

    tilt(dir){
        // this.center.elements[1] = this.center.elements[1] - dir;
        // //this.up.elements[1] = this.up.elements[1] - dir;
        var n = this.center.sub(this.eye);
        n = n.normalize();

        if(dir < 0){
            if(n.elements[1] > 0.99){
                return
            }
        }else{
            if(n.elements[1] < -0.99){
                return
            }
        }
        var u = this.up.cross(n);
        u = u.normalize();
        //center is changing
        var tilt = new Matrix4();
        tilt.setRotate(dir * this.speed, u.elements[0], u.elements[1], u.elements[2]);
        n = tilt.multiplyVector3(n);
        this.center = n.add(this.eye);


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
