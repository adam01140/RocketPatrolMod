class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
		
		this.load.image('particle', './assets/particle.png');

        // load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create() {
		
		
		
		 this.currentPlayer = 1; // Start with player 1
        this.p1Score = 0;
        this.p2Score = 0;
		this.scoreLeft = 0;
		this.hey = 0;

		

        // define keys for both players
        this.keyFPlayer1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        this.keyFPlayer2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
		
		
		
		this.timeLeftText = this.add.text(borderUISize + borderPadding, borderUISize * 2 + borderPadding * 2, 'Time Left: 60', { fontSize: '28px', fill: '#FFFFFF' });
		this.hello = this.add.text(borderUISize + borderPadding, borderUISize * 2 + borderPadding * 3, 'hello', { fontSize: '28px', fill: '#FFFFFF' });

        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);

        // green UI background
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0 ,0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0 ,0);

        // add Rocket (p1)
        
		// Pass the currentPlayer as a property of the scene when creating the Rocket object

// Pass this.scoreLeft as a parameter when creating the Rocket object
this.p1Rocket = new Rocket(
    this,
    game.config.width/2,
    game.config.height - borderUISize - borderPadding,
    'rocket',
    0,
    this.currentPlayer,
    this.p1Score,
    this.p2Score,
    this.scoreLeft
	//this.hey
	
);


//this.p1Rocket.currentPlayer = this.currentPlayer; // Set the currentPlayer property

        // add Spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0);
        this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10).setOrigin(0,0);

        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', { 
                start: 0, 
                end: 9, 
                first: 0
            }),
            frameRate: 30
        });

        // initialize score
        this.p1Score = 0;

        // display score
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*1,  this.p1Score, scoreConfig);
		this.hey = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*3.7,  this.p2Score, scoreConfig);
		
		
		
		this.timeLeftText = this.add.text(borderUISize + borderPadding + 150, borderUISize * 1 + borderPadding * 2, 'Time Left: 60', { fontSize: '28px', fill: '#FFFFFF' });
		this.hello = this.add.text(borderUISize + borderPadding + 150, borderUISize * 1.7 + borderPadding * 2, 'hello', { fontSize: '28px', fill: '#FFFFFF' });
		//this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
        // GAME OVER flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← to Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
    }


	
	
    update() {
			

	
	
		if (!this.gameOver) {
            const elapsedTime = this.clock.getElapsed();
            const remainingTime = Math.ceil((this.game.settings.gameTimer - elapsedTime) / 1000);
            this.timeLeftText.setText('Time Left: ' + remainingTime);
			this.hello.setText('Player: ' + this.currentPlayer);
			
			
			if(this.currentPlayer == 1){
				//this.scoreLeft.text = this.p1Score; 
			} else if(this.currentPlayer == 2){  
				//this.scoreLeft.text = this.p2Score; 
			}
        }



        // check key input for restart / menu
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
            this.scene.restart();
        }

        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        this.starfield.tilePositionX -= 4;  // update tile sprite

        if(!this.gameOver) {
            this.p1Rocket.update();             // update p1
             this.ship01.update();               // update spaceship (x3)
            this.ship02.update();
            this.ship03.update();
        }

        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height &&
            rocket.height + rocket.y > ship. y) {
                return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
		
		this.clock.elapsed -= 5000; // Adds 5 seconds to the clock
		
		  let emitter = this.add.particles('particle', {
        x: ship.x,
        y: ship.y,
        speed: 100,
        scale: { start: 1, end: 0 },
        blendMode: 'ADD',
        lifespan: 600
    });

    // Optionally, destroy the emitter after a short duration
    this.time.delayedCall(600, () => {
        emitter.destroy(); // This will remove the emitter from the scene
    });
    
	
        // temporarily hide ship
        ship.alpha = 0;                         
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after anim completes
            ship.reset();                         // reset ship position
            ship.alpha = 1;                       // make ship visible again
            boom.destroy();                       // remove explosion sprite
        });
        // score add and repaint
		
		
		if(this.currentPlayer == 1){
        this.p1Score += ship.points;
        
		this.scoreLeft.setText('P1: ' + this.p1Score);
		this.currentPlayer = 2;
		alert("player 1 turns to player 2");
        } else if(this.currentPlayer == 2){
        this.p2Score += ship.points;
        
		this.hey.setText('P2: ' + this.p2Score);
		this.currentPlayer = 1;
		alert("player 2 turns to player 1");
        }
		
		
        this.sound.play('sfx_explosion');
      }
	  
	  
	  
}

