var preloadState = function(game) {};

(function() {
  preloadState.prototype = {
    preload: function() {
      var game = this.game;

      // Load the Google WebFont Loader script
      this.fontReady = false;
      game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js', function() {
        WebFont.load({
          google: {
            families: ['Droid Sans', 'Droid Serif']
          },
          active: (function() {
            this.fontReady = true;
            if (this.startAfterFonts) {
              console.log("Font ready and preloading complete. Launching.");
              his.game.time.events.add(2 * Phaser.Timer.SECOND, this.launchTitle, this);
            } else {
              console.log("Font ready and but not preloading. Wait.");
            }
          }).bind(this)
        });
      }, this);

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
      game.load.image("dummy", "assets/ui/transparent.png");
      game.load.image("ui-FullscreenToggle", "assets/ui/ui-fullscreen-toggle.png");
      game.load.image("ui-interaction-prompt", "assets/ui/interaction-prompt.png");
      game.load.image("cash-icon", "assets/ui/cash-icon.png");
      game.load.image("tray-icon", "assets/ui/tray-icon.png");
      game.load.image("keys-wasd", "assets/ui/keys-wasd.png");
      game.load.image("keys-arrows", "assets/ui/keys-arrows.png");
      game.load.image("keys-spacebar", "assets/ui/keys-spacebar.png");

      // room
      game.load.image("background", "assets/room/background.jpg");
      game.load.image("counter", "assets/room/counter.png");
      game.load.image("table-empty", "assets/room/table-empty.png");
      game.load.image("patron-a", "assets/room/table-a.png");
      game.load.image("patron-b", "assets/room/table-b.png");
      game.load.image("patron-c", "assets/room/table-c.png");
      game.load.image("patron-d", "assets/room/table-d.png");
      game.load.spritesheet("table-food", "assets/room/table-food.png", 170, 130);

      // player
      game.load.spritesheet("player", "assets/player/waiter.png", 170, 216);

      // music
      game.load.audio("bgm", "assets/audio/LD37-3b.mp3");

      // level
      if (urlParams.level && !isNaN(urlParams.level)) {
        this.game.level = Math.max(1, parseInt(urlParams.level, 10));
      } else {
        this.game.level = 1;
      }
    },
    create: function() {
      console.log("Preloading game assets");

      if (this.fontReady) {
        console.log("Preloading done and font ready. Launch.");
        this.game.time.events.add(2 * Phaser.Timer.SECOND, this.launchTitle, this);
      } else {
        console.log("Preloading done but no fonts. Wait.");
        this.startAfterFonts = true;
      }
    },
    launchTitle: function() {
      if (urlParams.skipIntro === 'true') {
        this.game.state.start("Play");
      } else {
        this.game.state.start("Title");
      }
    }
  };
})();
