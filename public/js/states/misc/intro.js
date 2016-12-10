var introState = function(game) {};

(function() {
  introState.prototype = {
    //var displayElements;

    create: function() {
      console.log("Showing intro screen");

      var txtTitle, txtParagraph, btnStartGame;
      var text;

      this.displayElements = this.game.add.group();
      this.displayElements.alpha = 0.0;

      //title
      txtTitle = createGameText({
        x: 540,
        y: 110,
        text: 'HOW TO PLAY',
        fontSize: 60,
        strokeThickness: 8
      }, this);
      txtTitle.fontWeight = 700;
      txtTitle.anchor.setTo(0.5, 0.5);
      this.displayElements.add(txtTitle);

      //paragraph intro text
      text = 'Intro text will go here.';
      txtParagraph = createGameText({
        x: 140,
        y: 175,
        text: text,
        fontSize: 30,
        strokeThickness: 5
      }, this);
      txtParagraph.wordWrap = true;
      txtParagraph.wordWrapWidth = 800;
      this.displayElements.add(txtParagraph);

      text = "code by Chris Johnson (@jhnsnc) \nfor Ludum Dare 37";
      txtParagraph = createGameText({
        x: 140,
        y: 500,
        text: text,
        fontSize: 20,
        strokeThickness: 5
      }, this);
      txtParagraph.fontWeight = 300;
      this.displayElements.add(txtParagraph);

      //start game button
      btnStartGame = createGameText({
        x: 540,
        y: 420,
        text: 'begin',
        fontSize: 40,
        strokeThickness: 0,
        fill: '#00ff00'
      }, this);
      this.displayElements.add(btnStartGame);
      btnStartGame.inputEnabled = true;
      btnStartGame.input.useHandCursor = true;
      btnStartGame.anchor.setTo(0.5, 0.0);
      btnStartGame.events.onInputDown.add(this.beginGamePlay, this);

      //fade in elements
      this.game.add.tween(this.displayElements)
        .to({
          alpha: 1.0
        }, 1250, Phaser.Easing.Sinusoidal.InOut, true);

      //fullscreen toggle
      createFullscreenToggle(this);
    },
    beginGamePlay: function() {
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
