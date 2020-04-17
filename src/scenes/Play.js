class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

 


    preload(){
        //load images/tiles sprite
        //load google webfont loader script
        this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

        //texture
        this.load.image('rocket', 'assets/rocket.png');
        this.load.image('star1', 'assets/star1.png');
        this.load.image('star4', 'assets/star4.png');
        this.load.image('star5', 'assets/star5.png');
        this.load.image('star3', 'assets/star3.png');
        this.load.image('starfield', 'assets/sky.png');
        //load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame:0, endFrame: 9});
    }
    create() {
    //override create() from phaser, which is blank
        //console.log(this);

        //place tile sprite
        this.starfield = this.add.tileSprite(0,0,640,480,"starfield").setOrigin(0,0);
        // white rectangle borders (x, y, width, height, color)
        
        //this.add.rectangle(5,5,630,32,0xFFD85E).setOrigin(0,0) 
        this.add.rectangle(5,433,630,32,0xFFD85E).setOrigin(0,0) 
        //this.add.rectangle(5,5,32,455,0xFFFFFF).setOrigin(0,0) 
        //this.add.rectangle(603,5,32,455,0xFFFFFF).setOrigin(0,0) 
     
        // green UI background
        //this.add.rectangle(37,42,566,64,0X00FF00).setOrigin(0,0);
                                             
        // add rocket (p1)
        // constructor(scene, x, y, texture, frame)
        this.p1Rocket = new Rocket(this, game.config.width/2, 420, 'rocket').setScale(0.5,0.5).setOrigin(0,0);

        //add spaceship
        this.ship01 = new Spaceship(this, game.config.width +192, 132, 'star5', 0, 30).setOrigin(0,0);
        this.ship02 = new Spaceship(this, game.config.width +92, 196, 'star4', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width , 260, 'star1', 0, 10).setOrigin(0,0);
        //define keyboard keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);


        this.anims.create({
            key: 'explode', 
            frames: this.anims.generateFrameNumbers('explosion',{start:0, end:9, first:0}),
            frameRate: 30
        });

        //score 
        this.p1Score = 0;

        //score display
      
        let scoreConfig = {
            fontFamily: 'Shadows Into Light',
            //fontStyle: 'cursive',
            fontSize: '28px',
            //backgroundColor: '#FFD85E',
            color: '#FFD85E',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100

        }

        this.scoreLeft = this.add.text(-10, 15, this.p1Score + " ★", scoreConfig).setOrigin(0,0);


        // game over flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, ()=>{
            this.add.text(game.config.width/2, game.config.height/2 - 120, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 100, '(F)ire to restart or ← for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

        /*
         // particle effect from https://phaser.io/examples/v3/view/game-objects/particle-emitter/particle-processor
        var particles = this.add.particles('star1');
        particles.createEmitter({
            frame: ['star1'],
            x: 500,
            y: 30,
            lifespan: 400,
            speed:20,
            scale: {start: 0.7, end: 0},
            blendMode: 'ADD'
            
        });
        */


    }

  


    update(){
        //check key input for restart
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyF)){
            this.scene.restart(this.p1Score);
        }
        //scroll starfield
        this.starfield.tilePositionX -=4;

        if (!this.gameOver){
             //update rocket
            this.p1Rocket.update();
            //update spaceship
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)){
            this.scene.start("menuScene");
        }


        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)){
            //console.log('kaboom ship 03');
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }

        if(this.checkCollision(this.p1Rocket, this.ship02)){
            //console.log('kaboom ship 02');
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }

        if(this.checkCollision(this.p1Rocket, this.ship01)){
            //console.log('kaboom ship 02');
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }



        
    }
    checkCollision(rocket,ship){
        //simple AABB checking
        if(rocket.x < ship.x + ship.width &&
           rocket.x + rocket.width > ship.x && 
           rocket.y < ship.y + ship.height &&
           rocket.height + rocket.y > ship.y){
               return true;
        } else {
            return false;
        }
    }

    shipExplode(ship){
        //temporarily hide ship
        ship.alpha=0; 





        //REPLACE WITH PARTICLE EFFECT
        //create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0,0);
        boom.anims.play('explode');  //play eplode animation
        boom.on('animationcomplete', () => { //callback after animation completes
            //draws a star where last star died
            this.effect = this.add.image(ship.x, ship.y,'star3').setOrigin(0,0);
            ship.reset(); //reset ship position
            ship.alpha =1; //make ship visible again
            boom.destroy(); //remove explosion sprite
        });
        
      
        //score increment and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score + " ★";
        this.sound.play('sfx_explosion');

    }

   
}