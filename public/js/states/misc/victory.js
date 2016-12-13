var victoryState = function(game) {};

(function() {
  victoryState.prototype = {
    //var displayElements;

    create: function() {
      this.game.time.events.add(0.5 * Phaser.Timer.SECOND, function() {
        console.log("Showing victory screen");

        var txtTitle, btnStartGame;

        this.displayElements = this.game.add.group();
        this.displayElements.alpha = 0.0;

        //title
        txtTitle = createGameText({
          x: 540,
          y: 125,
          text: this.game.levelWasSuccess ? 'Success!' : 'Bad Day',
          fontSize: 100, strokeThickness: 8, stroke: '#fcefa4',
          fill: this.game.levelWasSuccess ? '#82db3b' : '#e34341'
        }, this);
        txtTitle.anchor.setTo(0.5, 0.5);
        this.displayElements.add(txtTitle);

        var text, txtInfo;
        //info
        txtInfo = createGameText({
          x: 375, y: 300, text: 'Day: ',
          fontSize: 30, strokeThickness: 0
        }, this);
        txtInfo.anchor.setTo(1.0, 0.5);
        this.displayElements.add(txtInfo);
        txtInfo = createGameText({
          x: 375, y: 300, text: this.game.level,
          fontSize: 30, strokeThickness: 0
        }, this);
        txtInfo.anchor.setTo(0.0, 0.5);
        this.displayElements.add(txtInfo);
        txtInfo = createGameText({
          x: 375, y: 360, text: 'Time: ',
          fontSize: 30, strokeThickness: 0
        }, this);
        txtInfo.anchor.setTo(1.0, 0.5);
        this.displayElements.add(txtInfo);
        txtInfo = createGameText({
          x: 375, y: 360, text: this.game.timeLimit+'s',
          fontSize: 30, strokeThickness: 0
        }, this);
        txtInfo.anchor.setTo(0.0, 0.5);
        this.displayElements.add(txtInfo);
        txtInfo = createGameText({
          x: 375, y: 420, text: 'Target: ',
          fontSize: 30, fill: '#82db3b', //'#49a647'
          strokeThickness: 0
        }, this);
        txtInfo.anchor.setTo(1.0, 0.5);
        this.displayElements.add(txtInfo);
        txtInfo = createGameText({
          x: 375, y: 420, text: '$'+this.game.goal,
          fontSize: 30, fill: '#82db3b', //'#49a647'
          strokeThickness: 0
        }, this);
        txtInfo.anchor.setTo(0.0, 0.5);
        this.displayElements.add(txtInfo);
        txtInfo = createGameText({
          x: 375, y: 480, text: 'Earned: ',
          fontSize: 30, fill: '#82db3b', //'#49a647'
          strokeThickness: 0
        }, this);
        txtInfo.anchor.setTo(1.0, 0.5);
        this.displayElements.add(txtInfo);
        txtInfo = createGameText({
          x: 375, y: 480, text: '$'+this.game.score,
          fontSize: 30, fill: '#82db3b', //'#49a647'
          strokeThickness: 0
        }, this);
        txtInfo.anchor.setTo(0.0, 0.5);
        this.displayElements.add(txtInfo);

        //button
        btnStartGameIcon = this.game.add.sprite(725, 400, "tray-icon");
        this.displayElements.add(btnStartGameIcon);
        btnStartGameIcon.inputEnabled = true;
        btnStartGameIcon.input.useHandCursor = true;
        btnStartGameIcon.anchor.setTo(0.5, 1.0);
        btnStartGameIcon.events.onInputDown.add(this.beginGamePlay, this);
        btnStartGame = createGameText({
          x: 725, y: 400, text: this.game.levelWasSuccess ? 'next level' : 'try again',
          fontSize: 48, strokeThickness: 0, fill: '#ffffff'
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
      }, this);
    },
    beginGamePlay: function(sprite, pointer) {
      this.game.add.tween(this.displayElements)
        .to({
          alpha: 0.0
        }, 500, Phaser.Easing.Sinusoidal.Out, true)
        .onComplete.add(function() {
          if (this.game.levelWasSuccess) {
            this.game.level += 1;
          }
          this.game.state.start("Play");
        }, this);
    }
  };
})();
