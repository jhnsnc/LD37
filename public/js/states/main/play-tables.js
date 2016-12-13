playState.prototype.setupTables = function() {
  var xMin = 230; var yMin = 200; // position
  var xScale = 310; var yScale = 300; // spacing

  var arrTables = [];
  var getTable = (function(x, y, id) {
    var table = this.room.create(x, y);
    table.id = id;
    var emptySprite = this.game.add.sprite(0, 0, "table-empty");
    emptySprite.anchor.setTo(TABLE_ANCHOR.x, TABLE_ANCHOR.y);
    table.emptySprite = emptySprite;
    table.addChild(emptySprite);
    table.body.setSize(TABLE_BODY.w, TABLE_BODY.h, TABLE_BODY.x, TABLE_BODY.y);
    table.body.immovable = true;
    table.isOccupied = false;
    table.patronContainer = new Phaser.Sprite(this.game, 0, 0);
    table.addChild(table.patronContainer);
    // table food
    table.tableFood = this.game.add.sprite(0, 0, "table-food");
    table.tableFood.anchor.setTo(TABLE_ANCHOR.x, TABLE_ANCHOR.y);
    table.tableFood.animations.add('empty', [0], 60, true);
    table.tableFood.animations.add('eating', [1], 60, true);
    table.tableFood.animations.add('finished', [2], 60, true);
    table.tableFood.animations.play('empty');
    table.addChild(table.tableFood);
    // progress indicators
    table.indicators = this.game.add.sprite(0, 0);
    table.patienceFill = new Phaser.Graphics(this.game, 0, -20);
    table.patienceFill.beginFill(0xffcc16, 1.0);
    table.patienceFill.drawRect(-60, 27, 120, 10);
    table.patienceFill.endFill();
    table.patienceFill.anchor.setTo(0.0, 0.5);
    table.indicators.addChild(table.patienceFill);
    // table.patienceOutline = new Phaser.Graphics(this.game, 0, -20);
    // table.patienceOutline.lineStyle(4.0, 0xffffff, 1.0);
    // table.patienceOutline.drawRect(-60, 27, 120, 20);
    // table.indicators.addChild(table.patienceOutline);
    table.patienceIcon = new Phaser.Sprite(this.game, -50, -10, "ui-patience-indicator");
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
    table.eatingIcon = new Phaser.Sprite(this.game, -50, -10, "ui-hunger-indicator");
    table.eatingIcon.anchor.setTo(0.5, 0.5);
    table.eatingIcon.alpha = 0.0;
    table.indicators.addChild(table.eatingIcon);
    table.addChild(table.indicators);
    table.indicators.alpha = 0.0;
    table.isServed = false;
    table.isClear = true;
    // done
    return table;
  }).bind(this);

  arrTables.push(getTable(xMin + 0.0 * xScale,yMin + 0.0 * yScale,0));
  arrTables.push(getTable(xMin + 1.0 * xScale,yMin + 0.0 * yScale,1));
  arrTables.push(getTable(xMin + 2.0 * xScale,yMin + 0.0 * yScale,2));
  arrTables.push(getTable(xMin + 0.5 * xScale - 25,yMin + 0.5 * yScale,3));
  arrTables.push(getTable(xMin + 1.5 * xScale - 25,yMin + 0.5 * yScale,4));
  arrTables.push(getTable(xMin + 0.0 * xScale - 50,yMin + 1.0 * yScale,5));
  arrTables.push(getTable(xMin + 1.0 * xScale - 50,yMin + 1.0 * yScale,6));
  arrTables.push(getTable(xMin + 2.0 * xScale - 50,yMin + 1.0 * yScale,7));

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
    emptyTable.patronName = patronData.name;
    emptyTable.billAmount = patronData.billAmount;
    emptyTable.patienceDrainSpeed = patronData.patienceDrainSpeed;
    emptyTable.eatingSpeed = patronData.eatingSpeed;
    emptyTable.patience = 100;
    emptyTable.eating = 0;
    emptyTable.isServed = false;

    // patron sprite
    emptyTable.patronSprite = this.game.add.sprite(0, 0, patronData.sprite);
    emptyTable.patronSprite.anchor.setTo(TABLE_ANCHOR.x, TABLE_ANCHOR.y);
    emptyTable.patronSprite.alpha = 0.0;
    emptyTable.patronContainer.addChild(emptyTable.patronSprite);

    emptyTable.tableFood.animations.play('empty');

    // crossfade in
    this.game.add.tween(emptyTable.patronSprite)
      .to({
        alpha: 1.0
      }, 1000, Phaser.Easing.Sinusoidal.InOut, true);
    this.game.add.tween(emptyTable.indicators)
      .to({
        alpha: 1.0
      }, 1000, Phaser.Easing.Sinusoidal.InOut, true, 500);
    this.game.add.tween(emptyTable.patienceFill).to({ alpha: 1.0 }, 500, Phaser.Easing.Sinusoidal.InOut, true);
    this.game.add.tween(emptyTable.patienceIcon).to({ alpha: 1.0 }, 500, Phaser.Easing.Sinusoidal.InOut, true);
    this.game.add.tween(emptyTable.eatingFill).to({ alpha: 0.0 }, 500, Phaser.Easing.Sinusoidal.InOut, true);
    this.game.add.tween(emptyTable.eatingIcon).to({ alpha: 0.0 }, 500, Phaser.Easing.Sinusoidal.InOut, true);

    console.log("Adding new patron: "+emptyTable.patronName+" at table "+emptyTable.id);
    console.log("Next patron at: "+this.nextPatronEntrance);
  } else {
    console.log("No empty tables. Trying again at: "+this.nextPatronEntrance);
  }
};

playState.prototype.feedTable = function(table) {
  if (table.isOccupied && !table.isServed && this.waiterHasFood) {
    console.log("Feeding patron at table "+table.id+".");

    this.waiterHasFood = false;
    this.updatePlayerDirection();

    table.isServed = true;
    table.isClear = false;
    table.eating = 0;

    table.tableFood.animations.play('eating');

    // crossfade in
    this.game.add.tween(table.patienceFill).to({ alpha: 0.0 }, 500, Phaser.Easing.Sinusoidal.InOut, true);
    this.game.add.tween(table.patienceIcon).to({ alpha: 0.0 }, 500, Phaser.Easing.Sinusoidal.InOut, true);
    this.game.add.tween(table.eatingFill).to({ alpha: 1.0 }, 500, Phaser.Easing.Sinusoidal.InOut, true);
    this.game.add.tween(table.eatingIcon).to({ alpha: 1.0 }, 500, Phaser.Easing.Sinusoidal.InOut, true);
  }
};

playState.prototype.clearTable = function(table) {
  if (!table.isOccupied && !table.isClear && !this.waiterHasFood && !this.waiterHasTrash) {
    console.log("Clearing trash from table "+table.id+".");

    this.waiterHasTrash = true;
    this.updatePlayerDirection();

    table.isClear = true;

    table.tableFood.animations.play('empty');
  }
};

playState.prototype.vacateTable = function(table, leavingHappy) {
  console.log("Patron ("+table.patronName+") leaving table "+table.id+" "+(leavingHappy?"happy and satisfied":"in frustration")+".");

  // crossfade in
  this.game.add.tween(table.patronSprite)
    .to({
      alpha: 0.0
    }, 1000, Phaser.Easing.Sinusoidal.InOut, true)
    .onComplete.add(function(oldPatronSprite) {
      oldPatronSprite.destroy();
    }, this);
  this.game.add.tween(table.indicators)
    .to({
      alpha: 0.0
    }, 1000, Phaser.Easing.Sinusoidal.InOut, true);

  table.isOccupied = false;
  table.patronSprite = null;
  table.patronName = null;

  if (leavingHappy) {
    this.cashEarned += table.billAmount;
    this.updatePointsIndicators();
    table.tableFood.animations.play('finished');

    this.emitCashBurst(table.x, table.y);
  }
};

playState.prototype.interactWithTable = function(targetTable) {
  if (targetTable.isOccupied) {
    this.feedTable(targetTable);
  } else {
    this.clearTable(targetTable);
  }
};

playState.prototype.updateResourceIndicators = function() {
  this.tables.forEach((function(table) {
    if (table.isOccupied) {
      if (!table.isServed) {
        table.patience = table.patience - (table.patienceDrainSpeed * PATIENCE_DRAIN_MULTIPLIER);
        //leave when patience runs out
        if (table.patience < 0) {
          this.vacateTable(table, false);
        } else {
          table.patienceFill.scale.setTo(table.patience / 100, 1.0);
        }
      } else {
        table.eating = table.eating + (table.eatingSpeed * EATING_SPEED_MULTIPLIER);
        if (table.eating > 100) {
          table.eatingFill.scale.setTo(1.0, 1.0);
          this.vacateTable(table, true);
        } else {
          table.eatingFill.scale.setTo(table.eating / 100, 1.0);
        }
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
    if (!this.tables[i].isOccupied && this.tables[i].isClear) {
      return this.tables[i];
    }
  }

  return null;
};
