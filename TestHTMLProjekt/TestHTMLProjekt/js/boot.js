// Purpose of this file:
// 1. Start the physics system.
// 2. Call load state.

var bootState = {

    // The create function is a standard Phase function.
    create: function(){

        // Starting the physics system - in this case we are using
        // the simple ARCADE physics engine.
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // Calling the load state.
        game.state.start('load');
    }
};