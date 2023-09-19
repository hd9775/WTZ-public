import standRabbitBlue from "../../assets/img/rabbit/rabbit_blue.png";
import standRabbitYellow from "../../assets/img/rabbit/rabbit_yellow.png";
import standRabbitPink from "../../assets/img/rabbit/rabbit_pink.png";
import standRabbitGreen from "../../assets/img/rabbit/rabbit_green.png";
import standRabbitPurple from "../../assets/img/rabbit/rabbit_purple.png";
import standRabbitBrown from "../../assets/img/rabbit/rabbit_brown.png";
import standRabbitRed from "../../assets/img/rabbit/rabbit_red.png";
import standRabbitWhite from "../../assets/img/rabbit/rabbit_white.png";

import walkRabbitBlue from "../../assets/img/rabbit/rabbit_walk_blue.gif";
import walkRabbitYellow from "../../assets/img/rabbit/rabbit_walk_yellow.gif";
import walkRabbitPink from "../../assets/img/rabbit/rabbit_walk_pink.gif";
import walkRabbitGreen from "../../assets/img/rabbit/rabbit_walk_green.gif";
import walkRabbitPurple from "../../assets/img/rabbit/rabbit_walk_purple.gif";
import walkRabbitBrown from "../../assets/img/rabbit/rabbit_walk_brown.gif";
import walkRabbitRed from "../../assets/img/rabbit/rabbit_walk_red.gif";
import walkRabbitWhite from "../../assets/img/rabbit/rabbit_walk_white.gif";

import dieRabbitBlue from "../../assets/img/rabbit/rabbit_die_blue.gif";
import dieRabbitYellow from "../../assets/img/rabbit/rabbit_die_yellow.gif";
import dieRabbitPink from "../../assets/img/rabbit/rabbit_die_pink.gif";
import dieRabbitGreen from "../../assets/img/rabbit/rabbit_die_green.gif";
import dieRabbitPurple from "../../assets/img/rabbit/rabbit_die_purple.gif";
import dieRabbitBrown from "../../assets/img/rabbit/rabbit_die_brown.gif";
import dieRabbitRed from "../../assets/img/rabbit/rabbit_die_red.gif";
import dieRabbitWhite from "../../assets/img/rabbit/rabbit_die_white.gif";

export const RABBIT_MAP = [
  {
    IMG: [standRabbitBlue, walkRabbitBlue, dieRabbitBlue],
    DEFAULT_Y1: 100,
    DEFAULT_Y2: 80,
    DEFAULT_X1: 150,
    DEFAULT_X2: 120,
    DEFAULT_DIR: 1,
  },
  {
    IMG: [standRabbitYellow, walkRabbitYellow, dieRabbitYellow],
    DEFAULT_Y1: 0,
    DEFAULT_Y2: 0,
    DEFAULT_X1: 300,
    DEFAULT_X2: 240,
    DEFAULT_DIR: 1,
  },
  {
    IMG: [standRabbitPink, walkRabbitPink, dieRabbitPink],
    DEFAULT_Y1: 0,
    DEFAULT_Y2: 0,
    DEFAULT_X1: 750,
    DEFAULT_X2: 600,
    DEFAULT_DIR: 0,
  },
  {
    IMG: [standRabbitGreen, walkRabbitGreen, dieRabbitGreen],
    DEFAULT_Y1: 100,
    DEFAULT_Y2: 80,
    DEFAULT_X1: 900,
    DEFAULT_X2: 720,
    DEFAULT_DIR: 0,
  },
  {
    IMG: [standRabbitPurple, walkRabbitPurple, dieRabbitPurple],
    DEFAULT_Y1: 200,
    DEFAULT_Y2: 160,
    DEFAULT_X1: 150,
    DEFAULT_X2: 120,
    DEFAULT_DIR: 1,
  },
  {
    IMG: [standRabbitBrown, walkRabbitBrown, dieRabbitBrown],
    DEFAULT_Y1: 300,
    DEFAULT_Y2: 240,
    DEFAULT_X1: 300,
    DEFAULT_X2: 240,
    DEFAULT_DIR: 1,
  },
  {
    IMG: [standRabbitRed, walkRabbitRed, dieRabbitRed],
    DEFAULT_Y1: 300,
    DEFAULT_Y2: 240,
    DEFAULT_X1: 750,
    DEFAULT_X2: 600,
    DEFAULT_DIR: 0,
  },
  {
    IMG: [standRabbitWhite, walkRabbitWhite, dieRabbitWhite],
    DEFAULT_Y1: 200,
    DEFAULT_Y2: 160,
    DEFAULT_X1: 900,
    DEFAULT_X2: 720,
    DEFAULT_DIR: 0,
  },
];
