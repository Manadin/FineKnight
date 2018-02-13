// Purpose of this file:
// 1. Load assests.
// 2. Call menu state.

var loadState = {

    // The preload function is another standard Phaser function
    // that defines and loads our assests.
    preload: function() {

        // Add a loading label on the screen.
        var loadingLabel = game.add.text(80, 150, 'loading...', 
                                        {font: '30px Courier', fill: '#ffffff'});

        // Load all assests.
        // Images
        game.load.image('win', 'images/win.png');
        game.load.image('mapTiles', 'images/Map/images/RuinMap.png');
        game.load.image('mapCollision', 'images/Map/images/collision.png');   
        
        // TileMaps
        this.load.text('data1', 'images/Map/tilemaps/MapDavid.json');
        game.load.tilemap('level1', 'images/Map/tilemaps/MapDavid.json', null, Phaser.Tilemap.TILED_JSON);

        // Spritesheets
        game.load.spritesheet('skeleton', 'images/Enemy/Skeleton Walk.png', 22, 33);
        game.load.spritesheet('hero', 'images/Hero/Hero.png', 21, 34, 24);

        // Audio
        game.load.audio('boden', 'Audio/bodenstaendig_2000_in_rock_4bit.mp3');
        game.load.audio('death', 'Audio/gta_5_death.mp3');
        game.load.audio('jump', 'Audio/Jump.wav');
        game.load.audio('gotItem', 'Audio/GotItem.mp3');
    },

    create: function() {

        // Call the menu state
        game.state.start('menu');
    }
};