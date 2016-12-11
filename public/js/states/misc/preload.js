var preloadState = function(game) {};

(function() {
  preloadState.prototype = {
    preload: function() {
      var game = this.game;

      // Load the Google WebFont Loader script
      game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

      //////////////////////////////
      // show loading indicator
      //////////////////////////////
      var txtTitle;

      this.displayElements = this.game.add.group();
      this.displayElements.alpha = 0.0;

      //title
      txtTitle = createGameText({
        x: 540,
        y: 300,
        text: 'loading...',
        fontSize: 64,
        strokeThickness: 0
      }, this);
      txtTitle.fill = '#fff';
      txtTitle.font = 'sans-serif';
      txtTitle.fontWeight = 400;
      txtTitle.anchor.setTo(0.5, 0.5);
      this.displayElements.add(txtTitle);

      //fade in elements
      this.game.add.tween(this.displayElements)
        .to({
          alpha: 1.0
        }, 1250, Phaser.Easing.Sinusoidal.InOut, true, 0 /* immediate */, -1 /* infinite */, true /* yoyo */);
      //////////////////////////////
      //////////////////////////////

      // ui elements
      game.load.image("ui-FullscreenToggle", "assets/ui/ui-fullscreen-toggle.png");
      game.load.image("ui-patience-indicator", "assets/ui/indicator-patience.png");
      game.load.image("ui-hunger-indicator", "assets/ui/indicator-hunger.png");

      // room
      game.load.image("table-empty", "assets/room/table-empty.png");
      game.load.image("patron-a", "assets/room/table-a.png");
      game.load.image("patron-b", "assets/room/table-b.png");
      game.load.image("patron-c", "assets/room/table-c.png");
      game.load.image("patron-d", "assets/room/table-d.png");

      // player
      game.load.image("player", "assets/player/dude-guy.png");

      // music
      // game.load.audio("bgm", "assets/audio/music/bgm.mp3");
    },
    create: function() {
      console.log("Preloading game assets");

      this.game.time.events.add(Phaser.Timer.SECOND, this.launchTitle, this);
    },
    launchTitle: function() {
      // this.game.state.start("Title");
      this.game.state.start("Play"); //FOOBAR
    }
  };
})();
