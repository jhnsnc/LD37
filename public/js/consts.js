var MUSIC_FADE_TIME = 2000;
var VOLUME = 1.0;
var MIN_VOLUME = 0.001;

var HALF_PI = Math.PI / 2;
var DEG_TO_RAD = Math.PI / 180;

var PLAYER_SPEED = 300;
var PLAYER_BODY = {
  x: 62,
  y: 107,
  w: 52,
  h: 32
};

var TABLE_BODY = {
  x: -95,
  y: -35,
  w: 190,
  h: 80
};
var TABLE_ANCHOR = {
  x: 0.5,
  y: 0.2
};

var INTERACTION_TETHER_DISTANCE = 15;

var PATIENCE_DRAIN_MULTIPLIER = 0.002;
var EATING_SPEED_MULTIPLIER = 0.002;

var CASH_INDICATOR_LIFESPAN = 600;

var PATRONS = [
  {
    name: 'Young Family',
    sprite: 'patron-a',
    patienceDrainSpeed: 26,
    eatingSpeed: 60,
    billAmount: 25
  },
  {
    name: 'Old Couple',
    sprite: 'patron-b',
    patienceDrainSpeed: 18,
    eatingSpeed: 60,
    billAmount: 25
  },
  {
    name: 'Let Me See the Manager Lady',
    sprite: 'patron-c',
    patienceDrainSpeed: 32,
    eatingSpeed: 60,
    billAmount: 25
  },
  {
    name: 'Smelly Guy',
    sprite: 'patron-d',
    patienceDrainSpeed: 21,
    eatingSpeed: 60,
    billAmount: 25
  }
];
