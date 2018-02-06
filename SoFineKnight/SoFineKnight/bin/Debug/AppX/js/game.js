// Purpose of this file:
// 1. Creates the Phaser.Game object, and maps it to the gameDiv element of the html file.
// 2. Adds the various states.
// 3. Starts the boot state.

// The first two integers are the dimensions of the game screen,
// as x and y values. We are setting it to 640 pixels accross,
// and 480 pixels down. Note also that the 'gameDiv' parameter matches the
// div element defined in our index.html file.
var game = new Phaser.Game(800, 640, Phaser.AUTO, 'gameDiv');

// Here we add each state. We give it a casual name when calling it
// ('boot') and an official name when defining it (bootState).
game.state.add('boot', bootState);
game.state.add('load', loadState);
game.state.add('menu', menuState);
game.state.add('play', playState);
game.state.add('win', winState);
game.state.add('lose', loseState);

// After all the states are added, we start the game by calling boot state.
game.state.start('boot');
