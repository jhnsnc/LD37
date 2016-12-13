var MUSIC_FADE_TIME = 2000;
var VOLUME = 1.0;
var MIN_VOLUME = 0.001;

var HALF_PI = Math.PI / 2;
var DEG_TO_RAD = Math.PI / 180;

var PLAYER_SPEED = 400;
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
  y: 0.48
};

var INTERACTION_TETHER_DISTANCE = 15;

var PATIENCE_DRAIN_MULTIPLIER = 0.004;
var EATING_SPEED_MULTIPLIER = 0.004;

var CASH_INDICATOR_LIFESPAN = 600;

var PATRONS = [
  {
    name: 'Old Couple',
    sprite: 'patron-a',
    patienceDrainSpeed: 25,
    eatingSpeed: 50,
    billAmount: 25
  },
  {
    name: 'Young Family',
    sprite: 'patron-b',
    patienceDrainSpeed: 30,
    eatingSpeed: 75,
    billAmount: 20
  },
  {
    name: 'Corporate Lunch',
    sprite: 'patron-c',
    patienceDrainSpeed: 40,
    eatingSpeed: 60,
    billAmount: 30
  },
  {
    name: 'Latin Couple',
    sprite: 'patron-d',
    patienceDrainSpeed: 15,
    eatingSpeed: 40,
    billAmount: 45
  }
];
