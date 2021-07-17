var _inputHandler = null;

/**
 * Specifies a Input Handler. Used to parse input events from a HTML page.
 *
 * @author Lucas N. Ferreira
 * @this {Scene}
 */

class InputHandler {
    /**
     * Initializes the event handeling functions within the program.
     */
    constructor(canvas, scene, camera, renderer, light) {
      this.canvas = canvas;
      this.scene  = scene;
      this.camera = camera;
      this.light = light;


      this.front = 1;
      this.back = 1;
      this.left = 1;
      this.right = 1;
      this.move;
      // Looking Straight = 1;
      // Looking Left = 2;
      // Looking Back = 3;
      // Looking Right = 4;
      this.direction = 1;


      var flag = 0;
      _inputHandler = this;

      // Camera Initial Position
      // Starting in center and all the way back of world
      this.cameraX = 30;
      this.cameraY = 15;
      // this.cameraX = 29;
      // this.cameraY = 26;

      // // Mouse Events
      // this.canvas.onmousedown = function(ev) {flag = 1};
      // this.canvas.onmouseup = function(ev) {flag = 0};
      // this.canvas.onmousemove = function(ev) {
      //   if (flag == 1){
      //     _inputHandler.click(ev);
      //   }
      // }
      // Keyboard Events
      document.addEventListener('keydown', function(ev) { _inputHandler.collisionDetection(ev); }, false);
      document.addEventListener('keyup',   function(ev) { _inputHandler.keyUp(ev);   }, false);

      //re renders in ID colors every mouseclick to check if we clicked on a note obj
      this.canvas.onmousedown = function(ev) {
         var rect = ev.target.getBoundingClientRect();
         //alert("X&Y before: " + ev.clientX + " " + ev.clientY);
         renderer.picking((ev.clientX - rect.left), (rect.bottom - ev.clientY));
      };
    }

    /**
     * Function called upon mouse click.
     */

    click(ev){
      this.moveX = ev.movementX;
        //console.log("movementX", movementX);

      this.moveY = ev.movementY;
        console.log("movementY", this.moveY);
        // Pan
        if(this.moveX != 0){
          this.camera.pan(-this.moveX);
        }
        // if(this.moveY != 0){
        //   this.camera.tilt(this.moveY);
        // }

        // //Tilt
        //  if(movementY <= 200){
        //   this.camera.tilt(-0.1);
        // }else{
        //   this.camera.tilt(0.1);
        // }


    }

    keyUp(ev) {
        var keyName = event.key;
        //console.log("key up", keyName);
        console.log("me:", this.cameraX, this.cameraY);
        console.log("World", world[this.cameraX][this.cameraY]);
        console.log("Direction:", this.direction);


    }

    keyDown(ev,F,B,L,R, D) {
        var keyName = event.key;

        if(this.direction == 2){
          this.tr
        }

          if(keyName == "a") {
            if(L == 1){
              if(D == 1){
                this.cameraY = this.cameraY - 1;
              }else if(D == 2){
                this.cameraX = this.cameraX + 1;
              }else if(D == 3){
                this.cameraY = this.cameraY + 1;
              }else{
                this.cameraX = this.cameraX - 1;
              }
            }
            //stores the amount to truck to pass to light
            var movement = this.camera.truck(-L);
            this.light.addToPos(movement);
          }
          else if(keyName == "d") {
            if(R == 1){
              if(D == 1){
                this.cameraY = this.cameraY + 1;
              }else if(D == 2){
                this.cameraX = this.cameraX - 1;
              }else if(D == 3){
                this.cameraY = this.cameraY - 1;
              }else{
                this.cameraX = this.cameraX + 1;
              }
            }
            //stores the amount to truck to pass to light
            var movement = this.camera.truck(R);
            this.light.addToPos(movement);
          }
          else if(keyName == "w") {
            if(F == 1){
              if(D == 1){
                this.cameraX = this.cameraX - 1;
              }else if(D == 2){
                this.cameraY = this.cameraY - 1;
              }else if(D == 3){
                this.cameraX = this.cameraX + 1;
              }else{
                this.cameraY = this.cameraY + 1;
              }
            }
            //stores the amount to dolly to pass to light
            var movement = this.camera.dolly(-F);
            this.light.addToPos(movement);
          }
          else if(keyName == "s") {
            if(B == 1){
              if(D == 1){
                this.cameraX = this.cameraX + 1;
              }else if(D == 2){
                this.cameraY = this.cameraY + 1;
              }else if(D == 3){
                this.cameraX = this.cameraX - 1;
              }else{
                this.cameraY = this.cameraY - 1;
              }
            }
            //stores the amount to dolly to pass to light
            var movement = this.camera.dolly(B);
            this.light.addToPos(movement);
          }

          // Looking left

          else if(keyName == "j"){
            if (this.direction == 4){
              this.direction = 1;
            }else{
              this.direction = this.direction + 1;
            }

            for( var i = 0; i <90; i++){
              this.camera.pan(1);
            }

           }

         //  Look Right
          else if(keyName == "k"){
            if (this.direction == 1){
              this.direction = 4;
            }else{
              this.direction = this.direction - 1;
            }

            for( var i = 0; i <90; i++){
              this.camera.pan(-1);
            }

           }

    }



    collisionDetection(ev){

        //Check front
        if(this.cameraX-1 == -1){
          this.front = 0;
          console.log("COLLISION");
        }else if(world[this.cameraX-1][this.cameraY] != 0){
          this.front = 0;
          console.log("COLLISION");
        }else{
          this.front = 1;
        }

        // Check back
        if(this.cameraX+1 == 32){
          this.back = 0;
          console.log("COLLISION");
        }else if(world[this.cameraX+1][this.cameraY] != 0){
          this.back = 0;
          console.log("COLLISION");
        }else{
          this.back = 1;
        }

        // Check left
        if(this.cameraY-1 == -1){
          this.left = 0;
         console.log("COLLISION");
       }else if(world[this.cameraX][this.cameraY-1]  != 0){
         this.left = 0;
         console.log("COLLISION");
        }else{
          this.left = 1;
        }

        // Check right
        if(this.cameraY+1 == 32){
          this.right = 0;
          console.log("COLLISION");
        }
        if(world[this.cameraX][this.cameraY+1]  != 0){
          this.right = 0;
          console.log("COLLISION");
        }else{
          this.right = 1;
        }

        // console.log("Front", this.front);

      if( this.direction == 1){
        _inputHandler.keyDown(ev,this.front,this.back,this.left,this.right, this.direction);
      }else if(this.direction == 2){
        _inputHandler.keyDown(ev,this.left,this.right,this.back,this.front, this.direction);
      }else if(this.direction == 3){
        _inputHandler.keyDown(ev,this.back,this.front,this.right,this.left, this.direction);
      }else{
        _inputHandler.keyDown(ev,this.right,this.left,this.front,this.back, this.direction);
      }

    }


    /**
     * Function called to read a selected file.
     */
    readSelectedFile() {
        var fileReader = new FileReader();
        var objFile = document.getElementById("fileInput").files[0];

        if (!objFile) {
            alert("OBJ file not set!");
            return;
        }

        fileReader.readAsText(objFile);
        fileReader.onloadend = function() {
            alert(fileReader.result);
        }
    }

    readTexture(src, onTexLoad) {
        // Create the image object
        var image = new Image();
        if (!image) {
          console.log('Failed to create the image object');
          return false;
        }

        // Register the event handler to be called on loading an image
        image.onload = function() {
            _inputHandler.image = image;
            onTexLoad(image);
        };

        // Tell the browser to load an image
        image.src = src
        return true;
    }
}



var world = [
   // [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
   // [0,0,4,0,0,0,0,0,0,0,4,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
   // [0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
   // [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
   // [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,2,0,0,0,4,0,0],
   // [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
   // [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
   // [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
   // [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
   // [0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
   // [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
   // [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0],
   // [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
   // [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
   // [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
   // [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
   // [0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0],
   // [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
   // [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
   // [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
   // [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
   // [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
   // [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
   // [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
   // [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
   // [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
   // [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
   // [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
   // [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
   // [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
   // [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
   // [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]


   [0,0,2,0,0,1,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
   [0,0,2,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
   [0,0,2,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
   [0,0,2,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
   [0,0,2,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0],
   [0,0,2,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
   [0,0,2,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
   [0,0,2,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
   [0,0,2,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0],
   [0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0],
   [0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0],
   [0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0],
   [0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0],
   [0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0],
   [0,0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,2,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,7,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,2,2,2,2,2,2,2,2,2,2,2,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0],
   [0,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,2,0,0,0,0,0,0,0,0,0,0,0,0,0]

   ]
 //
