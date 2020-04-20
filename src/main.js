/*

Xiao Qing Yu
xyu44@ucsc.edu

It's a little slow to start, please give it a few seconds..
-------------------------------------------------------------------------------------
(100) Points breakdown:
- Implemented a simultaneous two-player mode (50) S-Rank TIER
The modded game is a 2 player game. A & D to move and W to shoot for player 1, 
LEFT arrow & RIGHT arrow to move and UP arrow to shoot for player 2. There's a point system
that keeps track of both players' scores and announces a winner when the game finished.

- User Phaser's particle emitter to create a particle explosion when the rocket hits the spaceship (25) Intermediate TIER
When the rocket hits the stars, the stars explodes into multiple star pieces.

- Create a new title screen (15) Novice TIER
The new title screen has the new title of the modded game and keyboard directions for 
both players as well as selected level difficulty instructions.

- Create an effect that draws an image onto the canvas where the spaceship got hit (10) FACADE TIER
I created this effect that every time a star is destroyed, it leaves behind a random nebula 
sprite along with a random starburst sprite. I think that this is starting tier level,
because I just added the images right after the explosion effect and so I think 10 points are justified. 
------------------------------------------------------------------------------------
My mod of Rocket Patrol is inspired by fireworks and summer festivals. So I decided to have
a blank black background and every time the players hit a star, it explodes into many stars and 
leaves behind a nebula sprite and a starburst sprite. The nebula sprite and starburst sprite is selected
randomly at time of collision. I want the players to fill up the canvas with the 'fire works' the more
they shoot the star. I wanted players to feel like they are shooting stars in the night sky and creating fireworks!
------------------------------------------------------------------------------------
Credits:
Stardropper is a mod of Professor Altice's Rocket Patrol.
Theme music by Emily A. Sprague from Youtube free audio library.
Explosion and shooting sound effects are also from Youtube free audio library, creator unknown
Menu selection sound effect from Professor Altice's Rocket Patrol.
Shadows Into Light font by Kimberly Geswein from https://fonts.google.com/specimen/Shadows+Into+Light?query=shadows
Burst effect sprites, star sprites, title screen are created by me using Procreate and its tools.
Rocket sprites are created by me using pixilart.com 
Some code are taken from Phaser tutorials and examples.

*/








let config = {

    type: Phaser.CANVAS, 
    width: 640,
    height: 480,
    scene: [Menu, Play] // order of the classes matter, phaser does the first one first

};


let game = new Phaser.Game(config);

//define game settings
game.settings = {
    spaceshipSpeed: 3,
    gameTimer: 60000
}
//reserve player1 keyboard variables
let keyW, keyA, keyD;
//reserve player2 keyboard variables
let keyUP, keyLEFT, keyRIGHT;
//reset key
let keyF;

//loading google text, taken from: https://phaser.io/examples/v2/text/google-webfonts
let WebFontConfig = {
    active: function() { game.time.events.add(Phaser.Timer.SECOND,createText, this);},

    google: {
        families: ['Shadows Into Light', 'Permanent Marker']
    }

};


