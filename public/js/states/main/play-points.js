playState.prototype.setupPointsIndicators = function() {
  this.pointsLabel = createGameText({
    x: 880, y: 40, text: '$X',
    fontSize: 30, fill: '#82db3b',
    stroke: '#49a647', strokeThickness: 4
  }, this);
  this.pointsLabel.fontWeight = 400;
  this.pointsLabel.anchor.setTo(1.0, 0.5);
  this.pointsTarget = 300; // this.level * 300;
  this.pointsTargetLabel = createGameText({
    x: 880, y: 40, text: ' / $X',
    fontSize: 30, fill: '#82db3b',
    stroke: '#49a647', strokeThickness: 4
  }, this);
  this.pointsTargetLabel.fontWeight = 400;
  this.pointsTargetLabel.anchor.setTo(0.0, 0.5);
  this.game.time.events.add(0.5 * Phaser.Timer.SECOND, function() {
    this.pointsLabel.text = '$' + Math.floor(this.cashEarned);
    this.pointsTargetLabel.text = ' / $'+this.pointsTarget;
  }, this);
};

playState.prototype.updatePointsIndicators = function() {
  this.pointsLabel.text = '$' + Math.floor(this.cashEarned);
};

playState.prototype.setupCashEmitter = function() {
  this.cashIndicator = this.game.add.emitter();
  this.cashIndicator.makeParticles("cash-icon");
  this.cashIndicator.lifespan = CASH_INDICATOR_LIFESPAN;
  this.cashIndicator.setScale(0.75, 1.25, 0.75, 1.25);
  this.cashIndicator.setXSpeed(-100, 100);
  this.cashIndicator.setYSpeed(-220, -100);
  this.cashIndicator.setRotation(-120, 120);
  this.cashIndicator.setAlpha(1, 0, CASH_INDICATOR_LIFESPAN*2);
};

playState.prototype.emitCashBurst = function(x, y) {
    // this.cashIndicator.emitParticle(x, y);
    this.cashIndicator.x = x;
    this.cashIndicator.y = y;
    this.cashIndicator.explode(CASH_INDICATOR_LIFESPAN, 2 + Math.floor(4 * Math.random()));
};
