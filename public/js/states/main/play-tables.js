playState.prototype.setupTables = function() {
  var xMin = 250; var yMin = 100; // position
  var xScale = 320; var yScale = 300; // spacing

  var arrTables = [];
  var getTable = (function(x, y) {
    var table = this.room.create(x, y);
    var emptySprite = this.game.add.sprite(0, 0, "table-empty");
    emptySprite.anchor.setTo(0.5, 0.2);
    table.emptySprite = emptySprite;
    table.addChild(emptySprite);
    table.body.setSize(170, 70, -85, -35);
    table.body.immovable = true;
    table.isOccupied = false;
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

    // patron sprite
    emptyTable.patronSprite = this.game.add.sprite(0, 0, patronData.sprite);
    emptyTable.patronSprite.anchor.setTo(0.5, 0.2);
    emptyTable.patronSprite.alpha = 0.0;
    emptyTable.addChild(emptyTable.patronSprite);

    // crossfade in
    this.game.add.tween(emptyTable.patronSprite)
      .to({
        alpha: 1.0
      }, 1000, Phaser.Easing.Sinusoidal.InOut, true);

    console.log("Adding new patron: "+patronData.name);
    console.log("Next patron at: "+this.nextPatronEntrance);
  } else {
    console.log("No empty tables. Trying again at: "+this.nextPatronEntrance);
  }
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
