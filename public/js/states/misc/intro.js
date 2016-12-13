var introState = function(game) {};

(function() {
  introState.prototype = {
    //var displayElements;

    create: function() {
      console.log("Showing intro screen");

      var txtTitle, txtParagraph, btnStartGame, btnStartGameIcon;
      var text;

      this.displayElements = this.game.add.group();
      this.displayElements.alpha = 0.0;

      //title
      txtTitle = createGameText({
        x: 540, y: 70, text: 'HOW TO PLAY',
        fontSize: 60, fill: '#e34341',
        strokeThickness: 6, stroke: '#fcefa4'
      }, this);
      txtTitle.fontWeight = 700;
      txtTitle.anchor.setTo(0.5, 0.5);
      this.displayElements.add(txtTitle);

      //paragraph intro text
      //linespacing=35 / paragraphspacing=25
      text = 'All your waiters bailed on their shift, so now you have to cover the whole dining room!';
      txtParagraph = createGameText({
        x: 140, y: 135, text: text,
        fontSize: 24, strokeThickness: 0
      }, this);
      txtParagraph.wordWrap = true;
      txtParagraph.wordWrapWidth = 800;
      this.displayElements.add(txtParagraph);

      text = 'Make sure patrons get their food and flip enough tables so you can earn enough before the end of the night.';
      txtParagraph = createGameText({
        x: 140, y: 230, text: text,
        fontSize: 24, strokeThickness: 0
      }, this);
      txtParagraph.wordWrap = true;
      txtParagraph.wordWrapWidth = 800;
      this.displayElements.add(txtParagraph);

      // text = 'Make sure patrons get their food and flip enough tables so your restaurant can earn enough to stay afloat.';
      // txtParagraph = createGameText({
      //   x: 140, y: 325, text: text,
      //   fontSize: 24, strokeThickness: 0
      // }, this);
      // txtParagraph.wordWrap = true;
      // txtParagraph.wordWrapWidth = 800;
      // this.displayElements.add(txtParagraph);

      text = "for Ludum Dare 37 \nall art/code/audio by Chris Johnson and Jose Paez";
      txtParagraph = createGameText({
        x: 140, y: 500, text: text,
        fontSize: 20, strokeThickness: 0
      }, this);
      this.displayElements.add(txtParagraph);

      var keys;
      keys = this.game.add.sprite(210, 430, "keys-arrows");
      keys.anchor.setTo(0.5, 1.0);
      this.displayElements.add(keys);
      keys = this.game.add.sprite(380, 430, "keys-wasd");
      keys.anchor.setTo(0.5, 1.0);
      this.displayElements.add(keys);
      text = "move";
      txtParagraph = createGameText({
        x: 295, y: 438, text: text,
        fontSize: 20, strokeThickness: 0
      }, this);
      txtParagraph.anchor.setTo(0.5, 0.0);
      this.displayElements.add(txtParagraph);
      keys = this.game.add.sprite(630, 430, "keys-spacebar");
      keys.anchor.setTo(0.5, 1.0);
      this.displayElements.add(keys);
      text = "pick up / drop off";
      txtParagraph = createGameText({
        x: 630, y: 438, text: text,
        fontSize: 20, strokeThickness: 0
      }, this);
      txtParagraph.anchor.setTo(0.5, 0.0);
      this.displayElements.add(txtParagraph);

      //start game button
      btnStartGameIcon = this.game.add.sprite(870, 430, "tray-icon");
      this.displayElements.add(btnStartGameIcon);
      btnStartGameIcon.inputEnabled = true;
      btnStartGameIcon.input.useHandCursor = true;
      btnStartGameIcon.anchor.setTo(0.5, 1.0);
      btnStartGameIcon.events.onInputDown.add(this.beginGamePlay, this);
      btnStartGame = createGameText({
        x: 870, y: 430, text: 'begin',
        fontSize: 32, strokeThickness: 0, fill: '#ffffff'
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
