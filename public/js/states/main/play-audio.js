playState.prototype.setupAudio = function() {
  this.bgm = new Phaser.Sound(this.game, "bgm"),
  
  //  Being mp3 files these take time to decode, so we can't play them instantly
  //  Using setDecodedCallback we can be notified when they're ALL ready for use.
  //  The audio files could decode in ANY order, we can never be sure which it'll be.

  this.game.sound.setDecodedCallback(
    this.bgm,
    this.startLevel, this);
};

playState.prototype.startMusic = function() {
  this.bgm.play(undefined, 0, MIN_VOLUME, true);

  this.bgm.fadeTo(MUSIC_FADE_TIME,
    (urlParams.volume && !isNaN(urlParams.volume)) ? parseFloat(urlParams.volume) : VOLUME
  );
};

playState.prototype.fadeMusic = function(fadeOutTime) {
  if (this.bgm.fadeTween) {
    this.bgm.fadeTween.stop();
  }
  this.bgm.fadeTo(fadeOutTime, 0.0);
};
