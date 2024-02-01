//Adam Chaabane
//Rocket Patrol 2 The Better One
//Took about 4 hours
//Mods:

// Display the time remaining (in seconds) on the screen (3)
// Create a new title screen (e.g., new artwork, typography, layout) (3)
//Implement an alternating two-player mode (5)
//Implement a new timing/scoring mechanism that adds time to the clock for successful hits and subtracts time for misses (5)
//Implement mouse control for player movement and left mouse click to fire (5)



let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
};

let game = new Phaser.Game(config);

game.settings = {
    gameTimer: 60000
};

let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let keyF, keyR, keyLEFT, keyRIGHT;
