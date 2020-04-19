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


