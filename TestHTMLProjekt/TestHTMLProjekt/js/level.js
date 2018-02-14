// Purpose of this file:
// 1. Intermediate to next level

var levelState = {

    create: function () {
        var nextLabel = game.add.text(80, 80, 'You are great! But you are not done yet!',
            { font: '50px Arial', fill: '#00ff00' });

        var startNextLabel = game.add.text(80, 160, 'press the "W" key to start',
            { font: '25px Arial', fill: '#ffffff' });

        var wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);

        wKey.onDown.addOnce(this.next, this);
    },

    next: function () {
        game.state.start('play');
    }
}