var MUSIC_FADE_TIME = 2000;
var VOLUME = 1.0;
var MIN_VOLUME = 0.001; //to prevent losing sound sync

var HALF_PI = Math.PI / 2;
var DEG_TO_RAD = Math.PI / 180;

var SHOW_DEBUG = false;
// var SHOW_DEBUG = true;

var PLAYER_VELOCITY = 300;

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
