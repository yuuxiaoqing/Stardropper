//two player mode
class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

 

    preload(){
        //load images/tiles sprite
        //load google webfont loader script
        this.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

        //texture
        //art done with pixilart.com 
        this.load.image('rocket1', 'assets/rocket2.png');
        this.load.image('rocket2', 'assets/rocket1.png');
        this.load.image('star1', 'assets/star1.png');
        this.load.image('star4', 'assets/star4.png');
        this.load.image('star5', 'assets/star5.png');
        this.load.image('star3', 'assets/star3.png');
        this.load.image('sky', 'assets/sky.png');
        //load burst128 atlas
        this.load.atlas('burst128', './assets/burst128.png', './assets/burst128.json');
        //load nebula atlas
        this.load.atlas('nebula', './assets/nebulasprite.png', './assets/nebulasprite.json');
        //load particle atlas
        //this.load.atlas('particle', './assets/particles.png', './assets/particles.json');
    }
    create() {
    //override create() from phaser, which is blank

        //place tile sprite
        this.sky = this.add.tileSprite(0,0,640,480,"sky").setOrigin(0,0);
        
        //top bar
        this.add.rectangle(5,50,630,16,0xFFD85E).setOrigin(0,0);
        //bottom bar
        this.add.rectangle(5,433,630,16,0xFFD85E).setOrigin(0,0); 
       
        //declare rockets
        //P1
        this.p1Rocket = new Rocket(this, game.config.width/2-100, 420, 'rocket1').setScale(0.5,0.5).setOrigin(0,0);
        //P2
        this.p2Rocket = new Rocket2(this, game.config.width/2+100, 420, 'rocket2').setScale(0.5,0.5).setOrigin(0,0);
      

        //add more spaceships FIX HEIGHT
        this.ship01 = new Spaceship(this, game.config.width +192, (Math.floor(game.config.height/4)+10), 'star5', 0, 30).setOrigin(0,0);
        this.ship02 = new Spaceship(this, game.config.width +92, (Math.floor(game.config.height/4)+25), 'star4', 0, 25).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width  , (Math.floor(game.config.height/4)+45), 'star3', 0, 20).setOrigin(0,0);
        this.ship04 = new Spaceship(this, game.config.width +192, (Math.floor(game.config.height/4)+115), 'star4', 0, 10).setOrigin(0,0);
        this.ship05 = new Spaceship(this, game.config.width +92, (Math.floor(game.config.height/4)+175), 'star5', 0, 5).setOrigin(0,0);
        //define keyboard keys for player 1 (WAD)
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        //define keyboard keys for player 2 (UPLEFTRIGHT)
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        //reset key
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);

        //score 
        this.p1Score = 0;

        this.p2Score = 0;
       
        
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

        this.scoreRight = this.add.text(510, 15, this.p1Score + " ★", scoreConfig).setOrigin(0,0);

        // game over flag
        this.gameOver = false;

    
        // endgame message
        scoreConfig.fixedWidth = 0;

       
     
        this.clock = this.time.delayedCall(game.settings.gameTimer, ()=>{
            
            
            //this.add.text(game.config.width/2, game.config.height/2 - 210, winner, scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 225, 'Press F to restart or ← for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

       
    
    }

    
    update(){
        var winner;

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

        // endgame message
        scoreConfig.fixedWidth = 0;
        var t = true;
       
        if(this.gameOver && t == true){
            if(this.p1Score > this.p2Score){winner = "p l a y e r  1  w i n s !";}
            else if (this.p1Score < this.p2Score){winner = 'p l a y e r  2  w i n s !'}
            else { winner = "i t ' s  a  t i e";}
            this.add.text(game.config.width/2, game.config.height/2 - 210, winner, scoreConfig).setOrigin(0.5);
            t = false;
        }
        
        //check key input for restart
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyF)){
            this.scene.restart(this.p1Score);
        }
        //scroll sky
        this.sky.tilePositionX -=4;
       
        if (!this.gameOver ){
             //update rockets
            this.p1Rocket.update();
            this.p2Rocket.update();
            //update spaceships
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
            this.ship04.update();
            this.ship05.update();
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)){
            this.scene.start("menuScene");
        }


        // check collisions for p1
        if(this.checkCollision(this.p1Rocket, this.ship03)){
            //console.log('kaboom ship 03');
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
              //p1 score increment and repaint
            this.p1Score += this.ship03.points;
            this.scoreLeft.text = this.p1Score + " ★";
        }

        if(this.checkCollision(this.p1Rocket, this.ship02)){
            //console.log('kaboom ship 02');
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
              //p1 score increment and repaint
            this.p1Score += this.ship02.points;
            this.scoreLeft.text = this.p1Score + " ★";
        }

        if(this.checkCollision(this.p1Rocket, this.ship01)){
            //console.log('kaboom ship 02');
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
              //p1 score increment and repaint
            this.p1Score += this.ship01.points;
            this.scoreLeft.text = this.p1Score + " ★";
        }

        if(this.checkCollision(this.p1Rocket, this.ship04)){
            //console.log('kaboom ship 02');
            this.p1Rocket.reset();
            this.shipExplode(this.ship04);
              //p1 score increment and repaint
            this.p1Score += this.ship04.points;
            this.scoreLeft.text = this.p1Score + " ★";
        }

        if(this.checkCollision(this.p1Rocket, this.ship05)){
            //console.log('kaboom ship 02');
            this.p1Rocket.reset();
            this.shipExplode(this.ship05);
              //p1 score increment and repaint
            this.p1Score += this.ship05.points;
            this.scoreLeft.text = this.p1Score + " ★";
        }


        // check collisions for p2
        if(this.checkCollision(this.p1Rocket, this.ship03)){
            //console.log('kaboom ship 03');
            this.p2Rocket.reset();
            this.shipExplode(this.ship03);
             //p2 score increment and repaint
            this.p2Score += this.ship03.points;
            this.scoreRight.text = this.p2Score + " ★";
        }

        if(this.checkCollision(this.p2Rocket, this.ship02)){
            //console.log('kaboom ship 02');
            this.p2Rocket.reset();
            this.shipExplode(this.ship02);
             //p2 score increment and repaint
            this.p2Score += this.ship02.points;
            this.scoreRight.text = this.p2Score + " ★";
        }

        if(this.checkCollision(this.p2Rocket, this.ship01)){
            //console.log('kaboom ship 02');
            this.p2Rocket.reset();
            this.shipExplode(this.ship01);
             //p2 score increment and repaint
            this.p2Score += this.ship01.points;
            this.scoreRight.text = this.p2Score + " ★";
        }

        if(this.checkCollision(this.p2Rocket, this.ship04)){
            //console.log('kaboom ship 02');
            this.p2Rocket.reset();
            this.shipExplode(this.ship04);
             //p2 score increment and repaint
            this.p2Score += this.ship04.points;
            this.scoreRight.text = this.p2Score + " ★";
        }

        if(this.checkCollision(this.p2Rocket, this.ship05)){
            //console.log('kaboom ship 02');
            this.p2Rocket.reset();
            this.shipExplode(this.ship05);
             //p2 score increment and repaint
            this.p2Score += this.ship05.points;
            this.scoreRight.text = this.p2Score + " ★";
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
        var particles = this.add.particles(ship.texture); //add stars as particle
        var emitter = particles.createEmitter({ //define emitter
           
            speed:100,
            quantity:1,
            scale: 0.8,
            blendMode: 'ADD'
   
        });
        
      
        //create emitter explode effect 
        emitter.explode(30, ship.x, ship.y);
        //add random burst after effect onto screen
        this.burst01 = this.add.sprite(ship.x, ship.y, 'nebula', 'nebula'+(Math.floor(Math.random()*5)+1));
        //add firework burst
        this.burst02 = this.add.sprite(ship.x, ship.y, 'burst128', 'burst'+(Math.floor(Math.random()*4)+1));
        ship.reset(); //reset ship position
        ship.alpha =1; //make ship visible again

        this.sound.play('sfx_explosion');

    }


   
}