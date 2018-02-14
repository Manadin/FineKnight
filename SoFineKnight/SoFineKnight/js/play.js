// Purpose of this file:
// 1. Create the keyboard input and sprites for the game. 
// 2. Update the game when the player overlaps the sprite.
// 3. Call the win state.

// Controls
var upKey;
var downKey;
var rightKey;
var leftKey;

// Variables
var map;
var enemies;
var player;
var text;
var enemyTimer = 1;
var text = 0;
var death = 0;
var collision_tiles = [];

var currentLevel = 1;
var totalLevels = 4;

var levelData;

var playState = {
    
    create: function () {
        // Prepare the keyboard so that the human player can move.
        var keyboard2 = this.game.input.keyboard;
        upKey       =   keyboard2.addKey(Phaser.Keyboard.W);
        downKey     =   keyboard2.addKey(Phaser.Keyboard.S);
        rightKey    =   keyboard2.addKey(Phaser.Keyboard.D);
        leftKey     =   keyboard2.addKey(Phaser.Keyboard.A);

        // Create the map
        levelData = JSON.parse(this.game.cache.getText('data' + currentLevel));
        map = game.add.tilemap('level' + currentLevel);
        map.addTilesetImage('RuinMap', 'mapTiles');
        map.addTilesetImage('collision', 'mapCollision');

        // Create layers
        this.backgroundLayer = map.createLayer('Background');

        // Moving background in front of background and behind everything else
        movingBackground = game.add.tileSprite(0, 0, 1920, 1080, 'sky');

        // Rest of the layers
        this.foregroundBackLayer = map.createLayer('ForegroundBack');
        this.foregroundFrontLayer = map.createLayer('ForegroundFront');        
        collisionLayer = map.createLayer('Collision');

        // Create collision
        this.collisionLayer = collisionLayer
        map.setCollisionByExclusion([], true, this.collisionLayer);
        collisionLayer.visible = false;
        collisionLayer.resizeWorld();

        // Remove border collision at bottom/left/right
        game.physics.arcade.checkCollision.down = false;
        game.physics.arcade.checkCollision.right = false;
        game.physics.arcade.checkCollision.left = false;

        // Create the win sprite and enable physics.
        this.win = game.add.sprite(levelData.winStart.x, levelData.winStart.y, 'princess');
        game.physics.enable(this.win, Phaser.Physics.ARCADE);
        this.win.animations.add('princ_idle', [0, 1, 2, 3, 4, 5, 6, 7, 9, 10, 11], 10, true);
        this.win.animations.play("princ_idle");

        // Create the player sprite and enable physics.
        player = game.add.sprite(levelData.playerStart.x, levelData.playerStart.y, 'hero');
        player.anchor.setTo(.5, .5);
        game.physics.enable(player, Phaser.Physics.ARCADE);
        player.body.gravity.y = 18000;
        player.body.collideWorldBounds = true;
        player.checkWorldBounds = true;
        player.outOfBoundsKill = true;
        
        // Load player animations
        player.animations.add('idle', [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19], 12, true);
        player.animations.add('walk', [0, 1, 2, 3, 4, 5, 6, 7], 12, true);
        player.animations.add('jump', [1, 2], 2, false);
        player.animations.add('inAir', [3], 2, true);
        player.animations.add('falling', [4], 2, true);
        player.animations.play("idle");

        // Enemies
        enemies = game.add.group();
        game.physics.enable(enemies, Phaser.Physics.ARCADE);
        enemies.enableBody = true;

        levelData.enemyStart.forEach(function (element) {
            var enemy = enemies.create(element.x, element.y, 'skeleton');
            enemy.animations.add('move', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], 12, true);
            enemy.body.gravity.y = 100;
        }, this);

        // Play music
        music = game.add.audio('boden');
        deathSound = game.add.audio('death');
        jumpSound = game.add.audio('jump');
        gotItem = game.add.audio('gotItem');

        music.play();

        // Death counter
        text = game.add.text(levelData.deathText.x, levelData.deathText.y, 'deathCounter', { fontsize: '32px', fill: '#ffffff' });

        //game.forceSingleUpdate = true;

        game.camera.follow(player);
    },

    update: function () {

        //Move the skies left
        movingBackground.tilePosition.x -= 0.5;

        // Music for the game
        music.loop = true;

        player.body.velocity.x = 0;
        player.body.velocity.y = 0;
        //game.debug.bodyInfo(player, 21, 34);

        // Collision
        this.game.physics.arcade.collide(player, this.collisionLayer);
        this.game.physics.arcade.collide(enemies, this.collisionLayer);

        // Death counter
        text.setText('Deaths: ' + death);
        
        // When the player sprite and win sprite overlap, the nextLevel function
        // is called. When all maps are finished the win function is called
        if (currentLevel < 4) {
            game.physics.arcade.overlap(player, this.win, this.NextLevel, null, this);
        } else if (currentLevel = 4) {
            game.physics.arcade.overlap(player, this.win, this.Win, null, this);
        }
        

        if (!player.exists) {
            this.lose(this);
        }

        //Enemies
        enemies.forEach(function (enemy) {
            if (enemyTimer < 60 && enemyTimer > 0) {
                enemy.body.velocity.x = 100;
                enemy.scale.x = 1;

            } else if (enemyTimer > 60) {
                enemyTimer = -59;
            } else {
                enemy.body.velocity.x = -100;
                enemy.scale.x = -1;
            }
            enemy.animations.play('move');
            if (enemy.body.x + 10 > player.body.x && enemy.body.x - 10 < player.body.x && enemy.body.y + 20 >
                player.body.y && enemy.body.y - 20 < player.body.y) {
                playState.lose(playState);
            }
        });
        enemyTimer++;


        // Finally, we give the human player a means to move the sprite.
        // Enabling x-axis movement:
        var speed = 350;

        // Left Key = A
        if (leftKey.isDown) {
            player.body.velocity.x = -speed;
            player.animations.play("walk");
            player.scale.x = -1;
        }
        // Right Key = D
        else if (rightKey.isDown) {
            player.body.velocity.x = speed;
            player.animations.play("walk");
            player.scale.x = 1;
        }
        else{
            player.body.velocity.x = 0;
        }

        // Enabling y-axis movement;
        // Up Key = W
        if (upKey.isDown) {
            if (player.body.onFloor() && jumpTimer === 0) {
                player.body.velocity.y = -625;
                jumpTimer = 1;
                player.animations.play("jump");
            } else if (jumpTimer > 0 && jumpTimer < 30) {
                jumpTimer++;
                player.body.velocity.y = -625 + (jumpTimer * 5)
                player.animations.play("inAir");
            } else if (player.body.velocity.y > 0){
                player.animations.play("falling");
            }
        }
        else {
            jumpTimer = 0;
        }

        // Down Key = S
        //if (downKey.isDown) {
        //    player.body.velocity.y = 400;
        //}

        if (player.body.velocity.x === 0 && player.body.velocity.y === 0) {
            player.animations.play("idle");
        }
    },

    NextLevel: function () {
        // We start the next level state
        game.state.start('nextLevel');
        currentLevel++;
        music.loop = false;
        music.stop();
        gotItem.play();
    },

    Win: function () {

        // We start the win state
        game.state.start('win');

        death = 0;
        currentLevel = 1;
        music.loop = false;
        music.stop();
        gotItem.play();
    },

    lose: function () {
        game.state.start('lose');
        death++;
        music.loop = false;
        music.stop();
        deathSound.play()
    }
};