var playState = function(game) {};

(function() {

  playState.prototype = {
    create: function() {
      console.log("Starting Level Play");

      this.isCompleting = false;

      var i;

      // set up objects
      this.game.physics.startSystem(Phaser.Physics.ARCADE);
      this.room = this.game.add.group();
      
      // tables
      this.room = this.game.add.group();
      this.room.enableBody = true;
      this.room.physicsBodyType = Phaser.Physics.ARCADE;
      this.tables = [];
      var getTable = (function(x, y) {
        var table = this.room.create(x, y, "table");
        table.anchor.setTo(0.5, 0.2);
        table.body.setSize(173, 73, -10, -7);
        table.body.immovable = true;
        return table;
      }).bind(this);
      var xMin = 250; var yMin = 100;
      var xScale = 320; var yScale = 300;
      this.tables.push(getTable(xMin + 0.0 * xScale,yMin + 0.0 * yScale));
      this.tables.push(getTable(xMin + 1.0 * xScale,yMin + 0.0 * yScale));
      this.tables.push(getTable(xMin + 2.0 * xScale,yMin + 0.0 * yScale));
      this.tables.push(getTable(xMin + 0.5 * xScale,yMin + 0.5 * yScale));
      this.tables.push(getTable(xMin + 1.5 * xScale,yMin + 0.5 * yScale));
      this.tables.push(getTable(xMin + 0.0 * xScale,yMin + 1.0 * yScale));
      this.tables.push(getTable(xMin + 1.0 * xScale,yMin + 1.0 * yScale));
      this.tables.push(getTable(xMin + 2.0 * xScale,yMin + 1.0 * yScale));
      // this.tables.push(getTable(xMin + 0.5 * xScale,yMin + 1.5 * yScale));
      // this.tables.push(getTable(xMin + 1.5 * xScale,yMin + 1.5 * yScale));
      // this.tables.push(getTable(xMin + 0.0 * xScale,yMin + 2.0 * yScale));
      // this.tables.push(getTable(xMin + 1.0 * xScale,yMin + 2.0 * yScale));
      // this.tables.push(getTable(xMin + 2.0 * xScale,yMin + 2.0 * yScale));

      // player
      this.player = this.room.create(125, 300, "player");
      this.player.anchor.setTo(0.5,0.5);
      this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
      this.player.body.setSize(70, 50, 30, 80);
      this.player.body.collideWorldBounds = true;

      // depth sorting
      this.room.sort('y');

      // setup input
      this.cursors = this.game.input.keyboard.createCursorKeys();

      // fade in cover graphic (black)
      this.introCover = this.game.add.graphics(0, 0);
      this.introCover.beginFill(0x000000, 1.0);
      this.introCover.drawRect(0, 0, 1080, 600);
      this.introCover.endFill();
      this.introCover.alpha = 1.0;

      // fullscreen toggle
      createFullscreenToggle(this);

      // decode audio -- continue setup after decoded
      // this.setupAudio();
      this.startLevel();
    },
    update: function(evt) {
      if (!this.isCompleting) {
        // tick update

        // handle input
        this.player.body.velocity.x = 0;
        if (this.cursors.left.isDown) {
          this.player.body.velocity.x = -1 * PLAYER_VELOCITY;
        } else if (this.cursors.right.isDown) {
          this.player.body.velocity.x = PLAYER_VELOCITY;
        }

        this.player.body.velocity.y = 0;
        if (this.cursors.up.isDown) {
          this.player.body.velocity.y = -1 * PLAYER_VELOCITY;
        } else if (this.cursors.down.isDown) {
          this.player.body.velocity.y = PLAYER_VELOCITY;
        }

        // collision
        this.game.physics.arcade.collide(this.room);

        // depth
        this.room.sort('y');
      }
    },
    render: function() {
      if (SHOW_DEBUG) {
        this.game.debug.body(this.player);
        this.tables.forEach((function(table) {
          this.game.debug.body(table);
        }).bind(this));
      }
    }
  };

  playState.prototype.startLevel = function() {
    console.log("ALL READY -- START LEVEL!");

    // reveal content
    this.game.add.tween(this.introCover)
      .to({
        alpha: 0.0
      }, 1000, Phaser.Easing.Sinusoidal.InOut, true)
      .onComplete.add(function() {
        this.introCover.parent.removeChild(this.introCover);
      }, this);

    // interactivity
    // this.setupKeyboardInput();

    // music
    // this.startAllMusic();
  };

  playState.prototype.completeLevel = function() {
    console.log('Boom! Done. Finishing level');

    this.isCompleting = true;

    var self = this;
    var gfxCover;

    // fade music
    this.fadeAllMusic(5000);

    // fade in cover graphic (black)
    gfxCover = this.game.add.graphics(0, 0);
    gfxCover.beginFill(0x000000, 1.0);
    gfxCover.drawRect(0, 0, 1080, 600);
    gfxCover.endFill();
    gfxCover.alpha = 0.0;
    this.game.add.tween(gfxCover)
      .to({alpha: 1.0}, 5100, Phaser.Easing.Sinusoidal.Out, true)
      .onComplete.add(function() {
        self.game.state.start("Victory");
      }, this);
  };

})();
