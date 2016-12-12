var playState = function(game) {};

(function() {

  playState.prototype = {
    create: function() {
      console.log("Starting Level Play");

      this.isCompleting = false;

      this.bg = this.game.add.sprite(0, 0, "background");

      // set up objects
      this.game.physics.startSystem(Phaser.Physics.ARCADE);

      // obstacles
      var obstacle;
      this.obstacles = this.game.add.group();
      this.obstacles.enableBody = true;
      this.obstacles.physicsBodyType = Phaser.Physics.ARCADE;
      this.obstacleList = [];
      obstacle = this.obstacles.create(0, 0);
      obstacle.body.setSize(1080, 170, 0, 0);
      obstacle.body.immovable = true;
      this.obstacleList.push(obstacle);
      obstacle = this.obstacles.create(0, 0);
      obstacle.body.setSize(110, 120, 0, 150);
      obstacle.body.immovable = true;
      this.obstacleList.push(obstacle);
      obstacle = this.obstacles.create(0, 0);
      obstacle.body.setSize(130, 55, 950, 150);
      obstacle.body.immovable = true;
      this.obstacleList.push(obstacle);

      // tables
      this.room = this.game.add.group();
      this.room.enableBody = true;
      this.room.physicsBodyType = Phaser.Physics.ARCADE;
      this.tables = this.setupTables();

      // counter
      this.counter = this.room.create(1035, 360, "counter");
      this.counter.anchor.setTo(0.5, 0.07);
      this.counter.body.setSize(95, 260, 0, 0);
      this.counter.body.immovable = true;

      // player
      this.setupPlayer();

      // depth sorting
      this.room.sort('y');

      // setup input
      this.cursors = this.game.input.keyboard.createCursorKeys();
      this.setupInteractionPrompt();

      this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
        .onDown.add(function() {
          if (this.interactionTarget) {
            this.triggerInteraction();
          }
        }, this);

      // points
      this.cashEarned = 0;
      this.setupCashEmitter();
      this.setupPointsIndicators();

      // timers
      this.startTime = this.game.time.now;
      this.setupTimingIndicators();

      // start with 2 patrons
      this.nextPatronEntrance = this.getNewPatronEntranceTime();
      this.addNewPatron();
      this.addNewPatron();

      // fade in cover graphic (black)
      this.introCover = this.game.add.graphics(0, 0);
      this.introCover.beginFill(0x000000, 1.0);
      this.introCover.drawRect(0, 0, 1080, 600);
      this.introCover.endFill();
      this.introCover.alpha = 1.0;

      // fullscreen toggle
      createFullscreenToggle(this);

      // decode audio -- continue setup after decoded
      this.setupAudio();
      // this.startLevel(); gets called after decode
    },
    update: function(evt) {
      if (!this.isCompleting) {
        // tick update

        this.updateTimers();
        this.updatePointsIndicators();

        // handle input
        var newDirection;
        var playerMoved = false;
        this.player.body.velocity.y = 0;
        if (this.cursors.up.isDown) {
          this.player.body.velocity.y = -1 * PLAYER_SPEED;
          playerMoved = true;
          newDirection = 'up';
        } else if (this.cursors.down.isDown) {
          this.player.body.velocity.y = PLAYER_SPEED;
          playerMoved = true;
          newDirection = 'down';
        }
        this.player.body.velocity.x = 0;
        if (this.cursors.left.isDown) {
          this.player.body.velocity.x = -1 * PLAYER_SPEED;
          playerMoved = true;
          newDirection = 'left';
        } else if (this.cursors.right.isDown) {
          this.player.body.velocity.x = PLAYER_SPEED;
          playerMoved = true;
          newDirection = 'right';
        }

        if (this.player.direction !== newDirection) {
          this.updatePlayerDirection(newDirection);
        }

        this.updateResourceIndicators();

        // collision
        var interactionItem, interactionType;
        this.game.physics.arcade.collide(this.player, this.tables, (function(player, table) {
          interactionItem = table;
          interactionType = "table";
        }).bind(this));
        this.game.physics.arcade.collide(this.player, this.obstacles);
        this.game.physics.arcade.collide(this.player, this.counter, (function(player, counter) {
          interactionItem = counter;
          interactionType = "counter";
        }).bind(this));

        // interaction targets
        if (interactionItem) {
          if (interactionItem !== this.interactionTarget) {
            this.showInteractionPrompt(interactionItem, interactionType);
          }
        } else {
          if (playerMoved && this.interactionTarget &&
            distanceBetweenBodies(this.player.body, this.interactionTarget.body) > INTERACTION_TETHER_DISTANCE) {
            this.hideInteractionPrompt();
          }
        }

        // depth
        this.room.sort('y');

        // new patrons
        if (this.game.time.now > this.nextPatronEntrance) {
          this.nextPatronEntrance = this.getNewPatronEntranceTime();
          this.addNewPatron();
        }
      }
    },
    render: function() {
      if (urlParams.debug === 'true') {
        this.game.debug.body(this.player);
        this.tables.forEach((function(table) {
          this.game.debug.body(table);
        }).bind(this));
        this.obstacleList.forEach((function(obstacle) {
          this.game.debug.body(obstacle);
        }).bind(this));
        this.game.debug.body(this.counter);
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
    this.startMusic();
  };

  playState.prototype.completeLevel = function() {
    console.log('Boom! Done. Finishing level');

    this.isCompleting = true;

    var self = this;
    var gfxCover;

    // fade music
    this.fadeMusic(5000);

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
