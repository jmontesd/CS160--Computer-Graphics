class Light {
    constructor(x, y, z) {
        this.pos = new Vector3([x, y, z]);

        // light colors
        this.ambient  = [0.25,0.25,0.25];
        this.diffuse  = [1.0,1.0,1.0];
        this.specular = [0.5,0.5,0.5];

        // Later you will add specular here too.
    }

    addToPos(dir){
      this.pos = this.pos.add(dir);
    }

    translatePos(x,y,z) {
      var translationMatrix = new Matrix4();
      translationMatrix.setTranslate(x,y,z);
      this.pos = translationMatrix.multiplyVector3(this.pos);
    }
}
