let config = {

    type: Phaser.CANVAS, 
    width: 640,
    height: 480,
    scene: [Menu, Play], // order of the classes matter, phaser does the first one first

};


let game = new Phaser.Game(config);

//define game settings
game.settings = {
    spaceshipSpeed: 3,
    gameTimer: 60000
}
//reserve some keyboard variables
let keyF, keyLEFT, keyRIGHT;


