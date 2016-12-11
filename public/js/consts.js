var MUSIC_FADE_TIME = 2000;
var VOLUME = 1.0;
var MIN_VOLUME = 0.001;

var HALF_PI = Math.PI / 2;
var DEG_TO_RAD = Math.PI / 180;

var SHOW_DEBUG = false;
// var SHOW_DEBUG = true;

var PLAYER_SPEED = 300;
var PLAYER_SCALE = 0.4;
var PLAYER_BODY = {
  x: 137,
  y: 269,
  w: 130,
  h: 80
};

var TABLE_SCALE = 0.4;
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

var PATIENCE_DRAIN_MULTIPLIER = 0.002;
var EATING_SPEED_MULTIPLIER = 0.002;

var PATRONS = [
  {
    name: 'Young Family',
    sprite: 'patron-a',
    patienceDrainSpeed: 20,
    eatingSpeed: 60,
    billAmount: 25
  },
  {
    name: 'Old Couple',
    sprite: 'patron-b',
    patienceDrainSpeed: 20,
    eatingSpeed: 60,
    billAmount: 25
  },
  {
    name: 'Let Me See the Manager Lady',
    sprite: 'patron-c',
    patienceDrainSpeed: 20,
    eatingSpeed: 60,
    billAmount: 25
  },
  {
    name: 'Smelly Guy',
    sprite: 'patron-d',
    patienceDrainSpeed: 20,
    eatingSpeed: 60,
    billAmount: 25
  }
];
