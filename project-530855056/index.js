import { Project } from "https://unpkg.com/leopard@^1/dist/index.esm.js";

import Stage from "./Stage/Stage.js";
import Sprite1 from "./Sprite1/Sprite1.js";
import Sprite2 from "./Sprite2/Sprite2.js";
import Addition from "./Addition/Addition.js";
import Subtraction from "./Subtraction/Subtraction.js";
import Multiplication from "./Multiplication/Multiplication.js";
import Random from "./Random/Random.js";
import Division from "./Division/Division.js";

const stage = new Stage({ costumeNumber: 1 });

const sprites = {
  Sprite1: new Sprite1({
    x: 0,
    y: 0,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: true,
    layerOrder: 1
  }),
  Sprite2: new Sprite2({
    x: -189.95,
    y: 149,
    direction: 90,
    costumeNumber: 1,
    size: 110.00000000000001,
    visible: false,
    layerOrder: 7
  }),
  Addition: new Addition({
    x: -165,
    y: -34,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 2
  }),
  Subtraction: new Subtraction({
    x: 148,
    y: -113,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 5
  }),
  Multiplication: new Multiplication({
    x: -162,
    y: -114,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 4
  }),
  Random: new Random({
    x: 147,
    y: -33,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 3
  }),
  Division: new Division({
    x: -4,
    y: -113,
    direction: 90,
    costumeNumber: 1,
    size: 100,
    visible: false,
    layerOrder: 6
  })
};

const project = new Project(stage, sprites, {
  frameRate: 30 // Set to 60 to make your project run faster
});
export default project;
