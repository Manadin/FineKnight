// Purpose of this file:
// 1. Create the keyboard input and sprites for the game. 
// 2. Update the game when the player overlaps the sprite.
// 3. Call the win state.

var upKey;
var downKey;
var rightKey;
var leftKey;
var platforms;
var enemies;
var text;
var enemyTimer=1;
var playState = {
    
    create: function() {

        // Prepare the keyboard so that the human player can move.
        this.keyboard = game.input.keyboard;
        upKey       =   game.input.keyboard.addKey(Phaser.Keyboard.W);
        downKey     =   game.input.keyboard.addKey(Phaser.Keyboard.S);
        rightKey    =   game.input.keyboard.addKey(Phaser.Keyboard.D);
        leftKey = game.input.keyboard.addKey(Phaser.Keyboard.A);

        game.physics.arcade.checkCollision.down = false;
        game.physics.arcade.checkCollision.right = false;
        game.physics.arcade.checkCollision.left = false;

        //this.map = this.game.add.tilemap('Map1');

        //// The first parameter is the tileset name as specified in Tiled, the second is the key to the asset
        //this.map.addTilesetImage('RuinMap', 'Tiles');

        // Create layer
        //this.backgroundLayer = this.map.createLayer('Background');
        //this.foregroundLayer = this.map.createLayer('Foreground');
        //this.platformsBackLayer = this.map.createLayer('PlatformsBack');
       
        //// Create top layers
        //this.platformsFrontLayer = this.map.createLayer('PlatformsFront');
        //this.collisionLayer = this.map.createLayer('Collision');

        // Set collision
        //this.map.setCollisionBetween(1, 2600, true, 'Collision');

        //resizes the game world to match the layer dimensions
        //this.backgroundlayer.resizeWorld();    

        //Create the background
        skies = game.add.tileSprite(0, 0, 800, 640, 'background');

        // Create the win sprite and enable physics.
        this.win = game.add.sprite(game.world.width - 50, game.world.height - 600, 'win');
        game.physics.enable(this.win, Phaser.Physics.ARCADE);

        // Create the player sprite and enable physics.
        this.player = game.add.sprite(16, game.world.height - 80, 'knight');
        game.physics.enable(this.player, Phaser.Physics.ARCADE);
        this.player.body.gravity.y = 25000;
        this.player.body.collideWorldBounds = true;
        this.player.checkWorldBounds = true;
        this.player.outOfBoundsKill = true;
        
        // Load player animations
        this.player.animations.add('idle', [7, 8, 9, 10], 4, true);
        this.player.animations.add('walk', [22, 23, 24, 25, 26, 27, 28, 29], 5, true);
        //this.player.animations.add('death', [11, 12, 13, 14, 15, 16, 17, 18, 19], 2, false);
        //this.player.animations.add('block', [0, 1, 2, 3, 4, 5, 6], 2, false);
        this.player.animations.play("idle");

        // Enemies
        enemies = game.add.group();
        game.physics.enable(enemies, Phaser.Physics.ARCADE);
        enemies.enableBody = true;

        for (var w = 0; w < 5; w++) {
            var enemy = enemies.create(game.world.randomX, game.world.randomY, 'skeleton', w);
            enemy.animations.add('move', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 12, true);
            enemy.body.gravity.y = 100;


        }

        // Play music
        music = game.add.audio('boden');
        deathSound = game.add.audio('death');
        jumpSound = game.add.audio('jump');
        gotItem = game.add.audio('gotItem');

        music.play();
                
        //// Create a tilesprite (x, y, width, height, key)
        //this.map = game.add.tileSprite(0, 0, 800, 600, 'map');

        //Platforms
        platforms = game.add.group();
        platforms.enableBody = true;

        var ground;

        // 8 tiles next to each other
        for (var d = 0; d < 4; d++) {
            //Platform 1
            ground = platforms.create(game.world.width - 750 + (d * 16), game.world.height - 600, 'stoneTile');
            ground.scale.setTo(1, 1);
            ground.body.immovable = false;
            //Platform 2
            ground = platforms.create(game.world.width - 600 + (d * 16), game.world.height - 600, 'stoneTile');
            ground.scale.setTo(1, 1);
            ground.body.immovable = true;
            //Platform 3
            ground = platforms.create(game.world.width - 400 + (d * 16), game.world.height - 600, 'stoneTile');
            ground.scale.setTo(1, 1);
            ground.body.immovable = true;

            //Platform 3
            ground = platforms.create(game.world.width - 350 + (d * 16), game.world.height - 580, 'stoneTile');
            ground.scale.setTo(1, 1);
            ground.body.immovable = true;

        }


        // 8 tiles next to each other
        for (var d = 0; d < 8; d++) {
            //Platform 1
            ground = platforms.create(game.world.width - 150 + (d * 16), game.world.height - 200, 'stoneTile');
            ground.scale.setTo(1, 1);
            ground.body.immovable = true;
            //Platform 2
            ground = platforms.create(game.world.width - 300 + (d * 16), game.world.height - 250, 'stoneTile');
            ground.scale.setTo(1, 1);
            ground.body.immovable = true;
            //Platform 3
            ground = platforms.create(game.world.width - 600 + (d * 16), game.world.height - 250, 'stoneTile');
            ground.scale.setTo(1, 1);
            ground.body.immovable = true;
            //Platform 4
            ground = platforms.create(game.world.width - 700 + (d * 16), game.world.height - 500, 'stoneTile');
            ground.scale.setTo(1, 1);
            ground.body.immovable = true;

        }
        
        // 15 tiles next to each other
        for (var i = 0; i < 15; i++){
            //Platform 1
            ground = platforms.create(i*16, game.world.height - 30, 'stoneTile');
            ground.scale.setTo(1, 1);
            ground.body.immovable = true;
            //Platform 2
            ground = platforms.create(game.world.width - 250 + (i*16), game.world.height - 30, 'stoneTile');
            ground.scale.setTo(1, 1);
            ground.body.immovable = true;
            //Platform 3
            ground = platforms.create(game.world.width - 550 + (i * 16), game.world.height - 400, 'stoneTile');
            ground.scale.setTo(1, 1);
            ground.body.immovable = true;
            //Platform 4
            ground = platforms.create(game.world.width - 250 + (i * 16), game.world.height - 580, 'stoneTile');
            ground.scale.setTo(1, 1);
            ground.body.immovable = true;
        }
    },

    update: function() {

        // Collision
        //this.game.physics.arcade.collide(this.player, this.collisionLayer);

        //Move the skies left
        skies.tilePosition.x -= 0.5;

        // When the player sprite and sprite overlap, the win function
        // is called.
        game.physics.arcade.overlap(this.player, this.win, this.Win, null, this);

        if (!this.player.exists) {
            this.lose(this);
        }
        //Collision with ground
        var hitPlatform = game.physics.arcade.collide(this.player, platforms);
        game.physics.arcade.collide(enemies, platforms);
        this.player.body.velocity.x = 0;
        this.player.body.velocity.y = 0;

        //Enemies
        enemies.forEach(function (enemy) {
            if (enemyTimer < 100 && enemyTimer > 0) {
                enemy.body.velocity.x = 100;
                enemy.scale.x = 1;

            } else if (enemyTimer > 100) {
                enemyTimer = -99;
            } else {
                enemy.body.velocity.x = -100;
                enemy.scale.x = -1;
            }
            enemy.animations.play('move');
            if (enemy.body.x + 10 > playState.player.body.x && enemy.body.x - 10 < playState.player.body.x && enemy.body.y + 20 >
                playState.player.body.y && enemy.body.y - 20 < playState.player.body.y) {
                playState.lose(playState);
            }
        });
        enemyTimer++;


        // Finally, we give the human player a means to move the sprite.
        // Enabling x-axis movement:

        if (leftKey.isDown) {
            this.player.body.velocity.x = -400;
            this.player.animations.play("walk");
            this.player.scale.x = -1;
        }
        if (rightKey.isDown) {
            this.player.body.velocity.x = 400;
            this.player.animations.play("walk");
            this.player.scale.x = 1;
        }
        //Enabling y-axis movement;
        if (upKey.isDown) {
            if (this.player.body.touching.down && hitPlatform && jumpTimer === 0) {
                this.player.body.velocity.y = -1000;
                jumpTimer = 1;
            } else if (jumpTimer > 0 && jumpTimer < 20) {
                jumpTimer++;
                this.player.body.velocity.y = -1000 + (jumpTimer * 5)
            }
        } else {
            jumpTimer = 0;
        }
        if (downKey.isDown) {
            this.player.body.velocity.y = 400;
        }
        if (downKey.isUp && upKey.isUp && rightKey.isUp && leftKey.isUp) {
            this.player.animations.play("idle");
        }
    },

    Win: function () {

        // We start the win state
        game.state.start('win');

        music.stop();
        gotItem.play();

    },

    lose: function () {
        game.state.start('lose');

        music.stop();
        deathSound.play();
    }
};