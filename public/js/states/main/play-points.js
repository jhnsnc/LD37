playState.prototype.setupPointsIndicators = function() {
  this.pointsPreLabel = createGameText({
    x: 880, y: 40, text: 'Earnings: ',
    fontSize: 30, strokeThickness: 8
  }, this);
  this.pointsPreLabel.fontWeight = 300;
  this.pointsPreLabel.anchor.setTo(1.0, 0.5);
  this.pointsLabel = createGameText({
    x: 880, y: 40,
    text: '$' + Math.floor(this.cashEarned),
    fontSize: 30, strokeThickness: 8
  }, this);
  this.pointsLabel.fontWeight = 300;
  this.pointsLabel.anchor.setTo(0.0, 0.5);
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
