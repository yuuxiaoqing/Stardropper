class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }
    preload(){
       
        this.load.image('title', './assets/title.png');

         //load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
       
 
    }
    create() {
        
        
        //stardropper title/menu screen
        this.add.image(game.config.width/2,game.config.height/2,'title');

        //define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);



    }

    update(){
       

        if (Phaser.Input.Keyboard.JustDown(keyLEFT)){
                //EASY level
            game.settings = {
                spaceshipSpeed:3,
                gameTimer:60000
            }
            this.sound.play('sfx_select');
            this.scene.start("playScene");
    
        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)){
            //HARD level
            game.settings = {
                spaceshipSpeed:5,
                gameTimer:25000
            }
            this.sound.play('sfx_select');
            this.scene.start("playScene");
        }
        
       
    }
}