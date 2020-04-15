// Rocket prefab

class Rocket extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        // add obj to existing scene, displayList, updateList
        scene.add.existing(this); 
        // track rocket's firing status
        this.isFiring = false; 
        this.sfxRocket = scene.sound.add('sfx_rocket'); //add rocket sfx
    }
    update(){
        // left/right movement
        if(!this.isFiring){
            if(keyLEFT.isDown && this.x >= 47){
                this.x -= 2;
                
            }else if (keyRIGHT.isDown && this.x <= 598){
                this.x += 2;
            }
        }
        // fire button 
        if(Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring){
            this.isFiring = true;
            this.sfxRocket.play(); //sfx
        }
        // if fired, move up
        if(this.isFiring && this.y >= 108){
            this.y -=2;

        }

        //reset on miss
        if(this.y <= 108){
            this.isFiring = false;
            this.y = 420;
        }
    }
    // reset rocket to "ground"
    reset(){
        this.isFiring = false;
        this.y = 420
    }

}