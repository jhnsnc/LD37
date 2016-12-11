playState.prototype.setupTables = function() {
  var xMin = 250; var yMin = 100; // position
  var xScale = 320; var yScale = 300; // spacing

  var arrTables = [];
  var getTable = (function(x, y) {
    var table = this.room.create(x, y);
    var emptySprite = this.game.add.sprite(0, 0, "table-empty");
    emptySprite.anchor.setTo(TABLE_ANCHOR.x, TABLE_ANCHOR.y);
    emptySprite.animations.add('empty', [0], 60, true);
    emptySprite.animations.add('food', [1], 60, true);
    emptySprite.animations.play('empty');
    emptySprite.scale.setTo(TABLE_SCALE, TABLE_SCALE);
    table.emptySprite = emptySprite;
    table.addChild(emptySprite);
    table.body.setSize(TABLE_BODY.w, TABLE_BODY.h, TABLE_BODY.x, TABLE_BODY.y);
    table.body.immovable = true;
    table.isOccupied = false;
    table.patronContainer = new Phaser.Sprite(this.game, 0, 0);
    table.addChild(table.patronContainer);
    // progress indicators
    table.indicators = this.game.add.sprite(0, 0);
    table.patienceFill = new Phaser.Graphics(this.game, 0, -20);
    table.patienceFill.beginFill(0x6666ff, 1.0);
    table.patienceFill.drawRect(-60, 27, 120, 10);
    table.patienceFill.endFill();
    table.patienceFill.anchor.setTo(0.0, 0.5);
    table.indicators.addChild(table.patienceFill);
    // table.patienceOutline = new Phaser.Graphics(this.game, 0, -20);
    // table.patienceOutline.lineStyle(4.0, 0xffffff, 1.0);
    // table.patienceOutline.drawRect(-60, 27, 120, 20);
    // table.indicators.addChild(table.patienceOutline);
    table.patienceIcon = new Phaser.Sprite(this.game, 0, -10, "ui-patience-indicator");
    table.patienceIcon.anchor.setTo(0.5, 0.5);
    table.indicators.addChild(table.patienceIcon);
    table.eatingFill = new Phaser.Graphics(this.game, 0, -20);
    table.eatingFill.beginFill(0x66ff66, 1.0);
    table.eatingFill.drawRect(-60, 27, 120, 10);
    table.eatingFill.endFill();
    table.eatingFill.anchor.setTo(0.0, 0.5);
    table.eatingFill.alpha = 0.0;
    table.indicators.addChild(table.eatingFill);
    // table.eatingOutline = new Phaser.Graphics(this.game, 0, -20);
    // table.eatingOutline.lineStyle(4.0, 0xffffff, 1.0);
    // table.eatingOutline.drawRect(-60, 27, 120, 20);
    // table.eatingOutline.alpha = 0.0;
    // table.indicators.addChild(table.eatingOutline);
    table.eatingIcon = new Phaser.Sprite(this.game, 0, -10, "ui-hunger-indicator");
    table.eatingIcon.anchor.setTo(0.5, 0.5);
    table.eatingIcon.alpha = 0.0;
    table.indicators.addChild(table.eatingIcon);
    table.addChild(table.indicators);
    table.indicators.alpha = 0.0;
    table.isServed = false;
    // done
    return table;
  }).bind(this);

  arrTables.push(getTable(xMin + 0.0 * xScale,yMin + 0.0 * yScale));
  arrTables.push(getTable(xMin + 1.0 * xScale,yMin + 0.0 * yScale));
  arrTables.push(getTable(xMin + 2.0 * xScale,yMin + 0.0 * yScale));
  arrTables.push(getTable(xMin + 0.5 * xScale,yMin + 0.5 * yScale));
  arrTables.push(getTable(xMin + 1.5 * xScale,yMin + 0.5 * yScale));
  arrTables.push(getTable(xMin + 0.0 * xScale,yMin + 1.0 * yScale));
  arrTables.push(getTable(xMin + 1.0 * xScale,yMin + 1.0 * yScale));
  arrTables.push(getTable(xMin + 2.0 * xScale,yMin + 1.0 * yScale));

  return arrTables;
};

playState.prototype.addNewPatron = function() {
  var emptyTable = this.getRandomEmptyTable();

  // if there is an empty table, claim it
  if (emptyTable) {
    emptyTable.isOccupied = true;
    if (emptyTable.patronSprite) {
      emptyTable.patronSprite.destroy();
    }
    // patron attributes
    var patronData = this.getRandomPatronData();
    emptyTable.billAmount = patronData.billAmount;
    emptyTable.patienceDrainSpeed = patronData.patienceDrainSpeed;
    emptyTable.eatingSpeed = patronData.eatingSpeed;
    emptyTable.patience = 100;
    emptyTable.eating = 0;
    emptyTable.isServed = false;

    // patron sprite
    emptyTable.patronSprite = this.game.add.sprite(0, 0, patronData.sprite);
    emptyTable.patronSprite.anchor.setTo(TABLE_ANCHOR.x, TABLE_ANCHOR.y);
    emptyTable.patronSprite.animations.add('empty', [0], 60, true);
    emptyTable.patronSprite.animations.add('food', [1], 60, true);
    emptyTable.patronSprite.animations.play('empty');
    emptyTable.patronSprite.scale.setTo(TABLE_SCALE, TABLE_SCALE);
    emptyTable.patronSprite.alpha = 0.0;
    emptyTable.patronContainer.addChild(emptyTable.patronSprite);

    // crossfade in
    this.game.add.tween(emptyTable.patronSprite)
      .to({
        alpha: 1.0
      }, 1000, Phaser.Easing.Sinusoidal.InOut, true);
    this.game.add.tween(emptyTable.indicators)
      .to({
        alpha: 1.0
      }, 1000, Phaser.Easing.Sinusoidal.InOut, true);

    console.log("Adding new patron: "+patronData.name);
    console.log("Next patron at: "+this.nextPatronEntrance);
  } else {
    console.log("No empty tables. Trying again at: "+this.nextPatronEntrance);
  }
};

playState.prototype.updateResourceIndicators = function() {
  this.tables.forEach((function(table) {
    if (table.isOccupied) {
      if (!table.isServed) {
        table.patience = Math.max(0, table.patience - (table.patienceDrainSpeed * PATIENCE_DRAIN_MULTIPLIER));
        table.patienceFill.scale.setTo(table.patience / 100, 1.0);
      } else {
        table.eating = Math.min(100, table.eating - (table.eatingSpeed * EATING_SPEED_MULTIPLIER));
        table.eatingFill.scale.setTo(table.eating / 100, 1.0);
      }
    }
  }).bind(this));
};

playState.prototype.getRandomPatronData = function() {
  //TODO: change selection based on level
  return PATRONS[Math.floor(Math.random() * PATRONS.length)];
};

playState.prototype.getRandomEmptyTable = function() {
  // find an empty table
  var i;
  var len = this.tables.length;

  // build random hash
  var hash = [], count = [];
  for (i = 0; i < len; i += 1) { count.push(i); }
  while(count.length) {
    hash.push(count.splice(Math.floor(Math.random() * count.length), 1)[0]);
  }

  while(hash.length) {
    i = hash.shift();
    if (!this.tables[i].isOccupied) {
      return this.tables[i];
    }
  }

  return null;
};
