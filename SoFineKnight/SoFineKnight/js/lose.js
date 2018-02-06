var loseState = {

    create: function() {

        var loseLabel = game.add.text(80, 80, 'YOU DIED!',
            {font: '50px Arial', fill: '#ff0c00'});

        var startLabel = game.add.text(80, 160, 'press the "W" key to restart',
            {font: '25px Arial', fill: '#ffffff'});

        var wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);

        wKey.onDown.addOnce(this.restart, this);
    },

    restart: function() {
        game.state.start('menu');
    }
}