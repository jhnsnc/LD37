playState.prototype.setupTimingIndicators = function() {
  this.timePreLabel = createGameText({
    x: 60, y: 40, text: 'Time: ',
    fontSize: 30, strokeThickness: 8
  }, this);
  this.timePreLabel.fontWeight = 300;
  this.timePreLabel.anchor.setTo(0.0, 0.5);
  var timeMs = '' + ((this.game.time.now - this.startTime) / 1000);
  timeMs = timeMs.slice(0, timeMs.indexOf('.') + 2);
  this.timeLabel = createGameText({
    x: 60 + this.timePreLabel.width, y: 40,
    text: timeMs,
    fontSize: 30, strokeThickness: 8
  }, this);
  this.timeLabel.fontWeight = 300;
  this.timeLabel.anchor.setTo(0.0, 0.5);
};

playState.prototype.updateTimers = function() {
  var timeMs = '' + ((this.game.time.now - this.startTime) / 1000);
  timeMs = timeMs.slice(0, timeMs.indexOf('.') + 2);
  this.timeLabel.text = timeMs;
};

playState.prototype.getNewPatronEntranceTime = function() {
  //TODO: change depending on level progress / level number
  return (Math.random() * 3000) + 5000 + this.game.time.now; //5-8s
};
