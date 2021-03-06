// Purpose of this file:
// 1. Instead of displaying the name of the game in white text, we display “YOU WON!” in green text.
// 2. All texts that reference ‘Starting’ the game, are changed to reference ‘Restarting’ the game.
// 3. Instead of calling the Play State, we call the Menu State.

var winState = {

    create: function () {

        var winLabel = game.add.text(80, 80, 'YOU WON!',
            { font: '50px Arial', fill: '#00ff00' });

        var startLabel = game.add.text(80, 160, 'press the "W" key to restart',
            { font: '25px Arial', fill: '#ffffff' });

        var wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);

        wKey.onDown.addOnce(this.restart, this);
    },

    restart: function () {
        game.state.start('menu');
    }
};