var createGameText = function(options, ctx) {
  var result;
  var defaults = {
    fill: '#ffffff',
    stroke: '#60635d',
    strokeThickness: 3,
    fontSize: 30
  };

  options = _.extend(defaults, options);
  result = ctx.game.add.text(options.x, options.y, options.text, {
    fill: options.fill,
    stroke: options.stroke,
    strokeThickness: options.strokeThickness
  });
  result.font = 'Montserrat, HelveticaNeue, Helvetica, sans-serif';
  result.fontSize = options.fontSize;

  return result;
};

var createFullscreenToggle = function(ctx) {
  ctx.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;

  var result;

  result = ctx.game.add.sprite(960, 495, "ui-FullscreenToggle");
  result.inputEnabled = true;
  result.input.useHandCursor = true;
  result.events.onInputDown.add(toggleFullscreen, ctx);

  return result;
}

var toggleFullscreen = function(ctx) {
  if (ctx.game.scale.isFullScreen) {
    ctx.game.scale.stopFullScreen();
  } else {
    ctx.game.scale.startFullScreen(false);
  }
};

var intBetween = function(min, max) { //inclusive [min, max]
  return Math.floor((Math.random() * (max + 1 - min)) + min);
}

var disableEvents = function(element) {
  if (element.events) {
    element.events.onInputDown.removeAll();
  }
  if (element.input) {
    element.input.useHandCursor = false;
  }
  element.inputEnabled = false;
};

var getUrlParams = function() {
  var match,
      pl     = /\+/g,  // Regex for replacing addition symbol with a space
      search = /([^&=]+)=?([^&]*)/g,
      decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
      query  = window.location.search.substring(1);
  var urlParams = {};
  while (match = search.exec(query))
     urlParams[decode(match[1])] = decode(match[2]);
  return urlParams;
};
var urlParams = getUrlParams();

var dist = function(x1, y1, x2, y2) {
  return Math.sqrt((x1-=x2)*x1 + (y1-=y2)*y1);
}

var distanceBetweenBodies = function(body1, body2) {
  var isLeft = body1.left > body2.right;
  var isRight = body1.right < body2.left;
  var isTop = body1.bottom < body2.top;
  var isBottom = body1.top > body2.bottom;
  if (isTop && isLeft) {
    return dist(body1.left, body1.bottom, body2.right, body2.top);
  } else if (isLeft && isBottom) {
    return dist(body1.left, body1.top, body2.right, body2.bottom);
  } else if (isBottom && isRight) {
    return dist(body1.right, body1.top, body2.left, body2.bottom);
  } else if (isRight && isTop) {
    return dist(body1.right, body1.bottom, body2.left, body2.top);
  } else if (isLeft) {
    return body1.left - body2.right;
  } else if (isRight) {
    return body2.left - body1.right;
  } else if (isTop) {
    return body2.top - body1.bottom;
  } else if (isBottom) {
    return body1.top - body2.bottom;
  }
  return 0;
}
