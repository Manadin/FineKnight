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
        leftKey     =   game.input.keyboard.addKey(Phaser.Keyboard.A);
        
        // Create the win sprite and enable physics.
        this.win = game.add.sprite(game.world.width - 50, game.world.height - 60, 'win');
        game.physics.enable(this.win, Phaser.Physics.ARCADE);


        //// Create a tilesprite (x, y, width, height, key)
        //this.map = game.add.tileSprite(0, 0, 800, 600, 'map');

        //Platforms
        platforms = game.add.group();
        platforms.enableBody = true;

        var ground;

        for (var i = 0; i < 15; i++){
            ground = platforms.create(i*16, game.world.height - 30, 'stoneTile');
            ground.scale.setTo(1, 1);
            ground.body.immovable = true;

            ground = platforms.create(game.world.width - 250 + (i*16), game.world.height - 30, 'stoneTile');
            ground.scale.setTo(1, 1);
            ground.body.immovable = true;
        }
        //Enemies
        enemies = game.add.group();
        game.physics.enable(enemies, Phaser.Physics.ARCADE);
        enemies.enableBody = true;

        for (var i = 0; i < 5; i++)
        {
            var enemy = enemies.create(game.world.randomX, game.world.randomY, 'skeleton',i);
            enemy.animations.add('move', [0,1,2,3,4,5,6,7,8,9,10,11,12], 12, true);
            enemy.body.gravity.y = 100;


        }

        // Create the player sprite and enable physics.
        this.player = game.add.sprite(16, game.world.height - 80, 'player');
        game.physics.enable(this.player, Phaser.Physics.ARCADE);
        this.player.body.gravity.y = 25000;
        this.player.checkWorldBounds = true;
        this.player.outOfBoundsKill = true;


        text = game.add.text(16, 16, 'test', {fontSize: '32px', fill: '#ffffff'})
    },

    update: function() {

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


        enemies.forEach(function(enemy) {
            if(enemyTimer<100&&enemyTimer>0){
                enemy.body.velocity.x = 100;
                enemy.scale.x = 1;

            }else if(enemyTimer>100){
                enemyTimer=-99;
            }else{
                enemy.body.velocity.x = -100;
                enemy.scale.x = -1;
            }
            enemy.animations.play('move');
            if(enemy.body.x+10>playState.player.body.x&&enemy.body.x-10<playState.player.body.x&&enemy.body.y+10>
                playState.player.body.y&&enemy.body.y-10<playState.player.body.y){
                playState.lose(playState);
            }
        });
        enemyTimer++;
        // Finally, we give the human player a means to move the sprite.
        // Enabling x-axis movement:

        if (leftKey.isDown){
            this.player.body.velocity.x = -400;
        }
        if (rightKey.isDown){
            this.player.body.velocity.x = 400;
        }
        //Enabling y-axis movement;
        if (upKey.isDown){
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
        if (downKey.isDown){
            this.player.body.velocity.y = 400;
        }
    },

    Win: function() {

        // We start the win state
        game.state.start('win');
    },

    lose: function () {
        game.state.start('lose');
    }
};