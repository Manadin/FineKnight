// Purpose of this file:
// 1. Display instructions to the player
// 2. Call play state.

var menuState = {

    // The create function is a standard Phase function.
    create: function(){

        // Add the game name label on the screen.
        var nameLabel = game.add.text(80, 80, 'Controls!', 
                                    {font: '50px Arial', fill: '#ffffff'});
        
        // Add the press enter label on the screen.
        var WLabel = game.add.text(80, 160, 'press "W" to start', 
                                    { font: '25px Arial', fill: '#ffffff' });

        // Add the press enter label on the screen.
        var WLabel = game.add.text(80, 240, 'W A S D to control', 
                                    {font: '25px Arial', fill: '#ffffff'});

        // Add the press enter label on the screen.
        var WLabel = game.add.text(80, 320, 'Hold "W" to go higher',
                                    { font: '25px Arial', fill: '#ffffff' });
        
        // We define the W key so the player can press it.
        var wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);

        //When the player presses the W key, then the start function will be called
        wKey.onDown.addOnce(this.start, this);
    },

    // The start function calls the play state.
    start: function() {
        game.state.start('play');
    }
};