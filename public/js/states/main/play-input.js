playState.prototype.setupInteractionPrompt = function(target) {
  this.interactionTarget = null;

  this.interactionPrompt = this.game.add.sprite(100, 300, "ui-interaction-prompt");
  this.interactionPrompt.anchor.setTo(0.5, 1);
  this.interactionPrompt.alpha = 0.0;
};

playState.prototype.showInteractionPrompt = function(target) {
  this.interactionTarget = target;
  this.interactionPrompt.position.setTo(this.interactionTarget.x, this.interactionTarget.y);
  this.interactionPrompt.alpha = 1.0;
};

playState.prototype.hideInteractionPrompt = function() {
  this.interactionTarget = null;
  this.interactionPrompt.alpha = 0.0;
};
