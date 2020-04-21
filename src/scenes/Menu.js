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
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
       


    }
    
    update(){
        player2 = false;
        if(Phaser.Input.Keyboard.JustDown(keyF)){
            this.add.text(50, 30, '2 Player Mode').setOrigin(0,0);
            player2 = true;
        }
        
        //tried to make it so it can toggles between two scenes..but doesn't work

        if (Phaser.Input.Keyboard.JustDown(keyLEFT)){
            //EASY level
            game.settings = {
                spaceshipSpeed:3,
                gameTimer:60000
            }
            console.log("two players")
            this.sound.play('sfx_select');
            this.scene.start("playTwoScene");

        }
        // if (Phaser.Input.Keyboard.JustDown(keyLEFT) && !player2){
        //         //EASY level
        //     game.settings = {
        //         spaceshipSpeed:3,
        //         gameTimer:60000
        //     }
        //     console.log("single player")
        //     this.sound.play('sfx_select');
        //     this.scene.start("playScene");
    
        // }
        
        
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)){
            //HARD level
            game.settings = {
                spaceshipSpeed:5,
                gameTimer:25000
            }
            this.sound.play('sfx_select');
            this.scene.start("playTwoScene");
         }
        // if (Phaser.Input.Keyboard.JustDown(keyRIGHT) && !player2){
        //     //HARD level
        //     game.settings = {
        //         spaceshipSpeed:5,
        //         gameTimer:25000
        //     }
        //     this.sound.play('sfx_select');
        //     this.scene.start("playScene");
        // }
 
       
       
    }
}