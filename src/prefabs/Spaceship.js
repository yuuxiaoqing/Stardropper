// Spaceship prefab

class Spaceship extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, pointValue){
        super(scene, x, y, texture, frame);
        // add obj to existing scene, displayList, updateList
        scene.add.existing(this); 
        this.points = pointValue;
    }
    update(){   
        // move spaceship left
        this.x -=game.settings.spaceshipSpeed;
        // wrap around screen bounds
        if(this.x <=0 - this.width){
            this.reset();
            //this.x =game.config.width;
        }
       
    }

    reset(){
        this.x = game.config.width;
    }

}