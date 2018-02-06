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
        game.load.image('player', 'images/player.png');
        game.load.image('win', 'images/win.png');
        game.load.image('stoneTile', 'images/Map/singularRock.png');

        game.load.spritesheet('knight_sheet', 'images/Hero/knightSheet.png', 42, 42, 33);
    },

    create: function() {

        // Call the menu state
        game.state.start('menu');
    }
};