var victoryState = function(game) {};

(function() {
  victoryState.prototype = {
    //var displayElements;

    create: function() {
      console.log("Showing victory screen");

      var txtTitle, btnStartGame;

      this.displayElements = this.game.add.group();
      this.displayElements.alpha = 0.0;

      //title
      txtTitle = createGameText({
        x: 540,
        y: 200,
        text: 'COMPLETE',
        fontSize: 80,
        strokeThickness: 8
      }, this);
      txtTitle.anchor.setTo(0.5, 0.5);
      this.displayElements.add(txtTitle);

      //button
      btnStartGame = createGameText({
        x: 540,
        y: 450,
        text: 'play again',
        fontSize: 70,
        strokeThickness: 8,
        fill: '#00ff00'
      }, this);
      btnStartGame.fontWeight = 400;
      btnStartGame.anchor.setTo(0.5, 0.5);
      btnStartGame.inputEnabled = true;
      btnStartGame.input.useHandCursor = true;
      btnStartGame.events.onInputDown.add(this.beginGamePlay, this);
      this.displayElements.add(btnStartGame);

      //fade in elements
      this.game.add.tween(this.displayElements)
        .to({
          alpha: 1.0
        }, 1250, Phaser.Easing.Sinusoidal.InOut, true);

      //fullscreen toggle
      createFullscreenToggle(this);
    },
    beginGamePlay: function(sprite, pointer) {
      this.game.add.tween(this.displayElements)
        .to({
          alpha: 0.0
        }, 500, Phaser.Easing.Sinusoidal.Out, true)
        .onComplete.add(function() {
          this.game.state.start("Play");
        }, this);
    }
  };
})();
