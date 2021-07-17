class Light {
    constructor(x, y, z) {
        this.pos = new Vector3([x, y, z]);

        // light colors
        this.ambient = [0.5,0.5,0.5];
        this.diffuse = [1.0,1.0,0.0];
        this.specular = [1.0,1.0,1.0];

        this.flag = 0;

    }
        // Later you will add specular here too.

        //Function to move light to mimic day to night
        update(){
        if (this.flag == 0){
            this.pos.elements[0] = this.pos.elements[0] + 0.5 // x
            this.pos.elements[2] = this.pos.elements[2] + 0.5 // z
            //this.pos.elements[1] = this.pos.elements[1] + 0.01 // y 



            if(this.pos.elements[0] >= 45){
                this.flag = 1;
            }
        }

        else if (this.flag == 1){
            this.pos.elements[0] = this.pos.elements[0] - 0.5 //x
            this.pos.elements[2] = this.pos.elements[2] - 0.5 //z
            //this.pos.elements[1] = this.pos.elements[1] - 0.01 //y 

           
            if(this.pos.elements[0] <= 1){
                this.flag = 0;
            }
        }      
    }
}
