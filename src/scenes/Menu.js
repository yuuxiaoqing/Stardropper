class Menu extends Phaser.Scene{
    constructor(){
        super("menuScene");
    }
    preload(){
        //load audio
        this.load.audio('sfx_select', './assets/blip_select12.wav');
        this.load.audio('sfx_explosion', './assets/explosion38.wav');
        this.load.audio('sfx_rocket', './assets/rocket_shot.wav');
        this.load.image('title', './assets/title.png');
    }
    create() {
         //score display
         let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0

        }
    //override create() from phaser, which is blank
        //console.log(this);
        //display menu text
        //this.add.text(20,20,"Rocket Patrol Menu");
        //launch the next scene "play"
        //this.scene.start("playScene");

        //show menu text
        let centerX = game.config.width/2;
        let centerY = game.config.height/2;
        let textSpacer = 64;

        //stardropper title/menu screen
        this.add.image(game.config.width/2,game.config.height/2,'title');

        
        //this.add.text(centerX, centerY - textSpacer, 'ROCKET PATROL', menuConfig).setOrigin(0.5);
       // this.add.text(centerX, centerY, 'Use ← → arrows to move & (F) to Fire', menuConfig).setScale(1).setOrigin(0.5);
        //menuConfig.backgroundColor = "#00FF00";
        //menuConfig.color = '#000';
       // this.add.text(centerX, centerY + textSpacer, 'Press ← for Easy or → for Hard', menuConfig).setOrigin(0.5);
    

        

        //define keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);



    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keyLEFT)){
            //EASY
            game.settings = {
                spaceshipSpeed:3,
                gameTimer:60000
            }
            this.sound.play('sfx_select');
            this.scene.start("playScene");

        }
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)){
            //HARD
            game.settings = {
                spaceshipSpeed:4,
                gameTimer:45000
            }
            this.sound.play('sfx_select');
            this.scene.start("playScene");
        }
    }
}