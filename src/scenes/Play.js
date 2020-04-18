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
        this.load.image('sky', 'assets/sky.png');
        //load burst128 atlas
        this.load.atlas('burst128', './assets/burst128.png', './assets/burst128.json');
        //load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame:0, endFrame: 9});
    }
    create() {
    //override create() from phaser, which is blank

        //place tile sprite
        this.sky = this.add.tileSprite(0,0,640,480,"sky").setOrigin(0,0);
       
        //bottom bar
        this.add.rectangle(5,433,630,32,0xFFD85E).setOrigin(0,0) 
       
        //declare rockets
        this.p1Rocket = new Rocket(this, game.config.width/2, 420, 'rocket').setScale(0.5,0.5).setOrigin(0,0);
        //this.p2Rocket = new Rocket(this, game.config.width/2, 420, 'rocket').setScale(0.5,0.5).setOrigin(0,0);
        //add spaceships
        //add more spaceships
        this.shipHeight = (Math.floor(Math.random()*game.config.height-100)+100);
        this.ship01 = new Spaceship(this, game.config.width +192, (Math.floor(Math.random()*game.config.height-80)+30), 'star5', 0, 30).setOrigin(0,0);
        this.ship02 = new Spaceship(this, game.config.width +92, (Math.floor(Math.random()*game.config.height-80)+30), 'star4', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width , (Math.floor(Math.random()*game.config.height-80)+30), 'star3', 0, 10).setOrigin(0,0);
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

       

        //score + endscreen text display settings
        let scoreConfig = {
            fontFamily: 'Shadows Into Light',
            fontSize: '28px',
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
            this.add.text(game.config.width/2, game.config.height/2 - 200, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 100, '(F)ire to restart or ← for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

       
    
    }

  


    update(){
        //check key input for restart
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyF)){
            this.scene.restart(this.p1Score);
        }
        //scroll sky
        this.sky.tilePositionX -=4;

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


        
       
    
        // particle effect from https://phaser.io/examples/v3/view/game-objects/particle-emitter/particle-processor and
        // https://phaser.io/examples/v3/view/game-objects/particle-emitter/create-emitter
        // https://photonstorm.github.io/phaser3-docs/Phaser.GameObjects.Particles.Particle.html
        

        var particles = this.add.particles('star1'); //add image for particle
        
        var emitter = particles.createEmitter({ //define emitter
           
            speed:100,
            quantity:1,
            scale: 0.8,
            blendMode: 'ADD'
   
        });
    
      
        //create emitter explode effect 
        emitter.explode(30, ship.x, ship.y);
        
        //add random burst after effect onto screen
        this.burst01 = this.add.sprite(ship.x, ship.y, 'burst128', 'burst'+(Math.floor(Math.random()*4)+1));
        ship.reset(); //reset ship position
        ship.alpha =1; //make ship visible again

        //score increment and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score + " ★";
        //this.sound.play('sfx_explosion');

    }


   
}