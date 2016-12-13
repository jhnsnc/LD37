var titleState = function(game) {};

(function() {
  titleState.prototype = {
    //var displayElements;

    create: function() {
      console.log("Showing title screen");

      var txtTitle, opacity;

      this.displayElements = this.game.add.group();
      this.displayElements.alpha = 0.0;

      //background
      var background = this.game.add.sprite(0, 0, "background");
      background.anchor.setTo(0.0, 0.0);
      this.displayElements.add(background);

      //title
      txtTitle = createGameText({
        x: 540, y: 170, text: 'GAME NAME',
        fontSize: 120, fill: '#e34341',
        strokeThickness: 6, stroke: '#fcefa4'
      }, this);
      txtTitle.anchor.setTo(0.5, 0.5);
      txtTitle.font = 'Montserrat';
      txtTitle.fontWeight = 700;
      this.displayElements.add(txtTitle);

      //waiter
      var waiter = this.game.add.sprite(460, 420, "player");
      waiter.anchor.setTo(0.5, 0.5);
      waiter.animations.add('idle', [0], 60, true);
      waiter.animations.play('idle');
      this.displayElements.add(waiter);

      //start game button
      btnStartGame = createGameText({
        x: 600, y: 420, text: 'play',
        fontSize: 50, fill: '#ffffff',
        strokeThickness: 7
      }, this);
      btnStartGame.anchor.setTo(0.5, 0.5);
      this.displayElements.add(btnStartGame);
      btnStartGame.inputEnabled = true;
      btnStartGame.input.useHandCursor = true;
      btnStartGame.events.onInputDown.add(this.startGame, this);

      //fade in elements
      this.game.add.tween(this.displayElements)
        .to({
          alpha: 1.0
        }, 1250, Phaser.Easing.Sinusoidal.InOut, true);

      //fullscreen toggle
      createFullscreenToggle(this);
    },
    startGame: function(sprite, pointer) {
      this.game.add.tween(this.displayElements)
        .to({
          alpha: 0.0
        }, 500, Phaser.Easing.Sinusoidal.Out, true)
        .onComplete.add(function() {
          this.game.state.start("Intro");
        }, this);
    }
  };
})();
