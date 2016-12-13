playState.prototype.setupTimingIndicators = function() {
  this.timePreLabel = createGameText({
    x: 170, y: 40, text: 'Time',
    fontSize: 30, strokeThickness: 4
  }, this);
  this.timePreLabel.fontWeight = 400;
  this.timePreLabel.anchor.setTo(1.0, 0.5);
  this.timeLabel = createGameText({
    x: 170, y: 40,
    text: '0',
    fontSize: 30, strokeThickness: 4
  }, this);
  this.timeLabel.fontWeight = 400;
  this.timeLabel.anchor.setTo(0.0, 0.5);
  this.game.time.events.add(0.5 * Phaser.Timer.SECOND, function() {
    this.timePreLabel.text = "Time: ";
  }, this);
};

playState.prototype.updateTimers = function() {
  // var timeMs = '' + Math.max(0.0, (this.timeLimit - (this.game.time.now - this.startTime)) / 1000);
  // var i = timeMs.indexOf('.');
  // if (i === -1) {
  //   timeMs += '.0';
  // } else {
  //   timeMs = timeMs.slice(0, i + 2);
  // }
  // this.timeLabel.text = timeMs;
  var timeMs = Math.max(0, Math.floor((this.timeLimit - (this.game.time.now - this.startTime)) / 1000));
  this.timeLabel.text = timeMs;
};

playState.prototype.checkEndCondition = function() {
  if ((this.game.time.now - this.startTime) > this.timeLimit) {
    this.completeLevel();
  }
};

playState.prototype.getNewPatronEntranceTime = function() {
  //TODO: change depending on level progress / level number
  return (Math.random() * 2000) + (3000) + this.game.time.now; //3-5s
};
