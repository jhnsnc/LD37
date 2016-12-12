playState.prototype.setupPlayer = function(target) {
  this.player = this.room.create(100, 400, "player");
  this.player.anchor.setTo(0.5,0.5);
  this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
  this.player.body.setSize(PLAYER_BODY.w, PLAYER_BODY.h, PLAYER_BODY.x, PLAYER_BODY.y);
  this.player.body.collideWorldBounds = true;
  this.player.animations.add('down-empty', [0], 60, true);
  this.player.animations.add('down-food', [1], 60, true);
  this.player.animations.add('down-trash', [2], 60, true);
  this.player.animations.add('up-empty', [3], 60, true);
  this.player.animations.add('up-food', [4], 60, true);
  this.player.animations.add('up-trash', [5], 60, true);
  this.player.animations.add('side-empty', [6], 60, true);
  this.player.animations.add('side-food', [7], 60, true);
  this.player.animations.add('side-trash', [8], 60, true);
  this.player.direction = 'down';
  this.waiterHasFood = false;
  this.waiterHasTrash = false;
  this.player.animations.play('down-empty');
};

playState.prototype.updatePlayerDirection = function(newDirection) {
  if (newDirection) {
    this.player.direction = newDirection;
  }
  switch (this.player.direction) {
    case 'up':
    case 'down':
      this.player.scale.setTo(1, 1);
      this.player.animations.play(newDirection+(this.waiterHasFood?"-food":(this.waiterHasTrash?"-trash":"-empty")));
      break;
    case 'left':
      this.player.scale.setTo(-1, 1);
      this.player.animations.play("side"+(this.waiterHasFood?"-food":(this.waiterHasTrash?"-trash":"-empty")));
      break;
    case 'right':
      this.player.scale.setTo(1, 1);
      this.player.animations.play("side"+(this.waiterHasFood?"-food":(this.waiterHasTrash?"-trash":"-empty")));
      break;
  }
};

playState.prototype.interactWithCounter = function(counter) {
  if (this.waiterHasTrash) {
    this.waiterHasTrash = false;
    this.updatePlayerDirection();
  } else {
    if (this.waiterHasFood) {
      this.waiterHasFood = false;
      this.updatePlayerDirection();
    } else {
      this.waiterHasFood = true;
      this.updatePlayerDirection();
    }
  }
};
