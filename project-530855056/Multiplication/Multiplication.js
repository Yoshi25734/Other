import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Multiplication extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume2", "./Multiplication/costumes/costume2.svg", {
        x: 57.80978680174729,
        y: 18.8125
      })
    ];

    this.sounds = [new Sound("pop", "./Multiplication/sounds/pop.wav")];

    this.triggers = [
      new Trigger(
        Trigger.BROADCAST,
        { name: "startgame" },
        this.whenIReceiveStartgame
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "choosegame" },
        this.whenIReceiveChoosegame
      ),
      new Trigger(Trigger.CLICKED, this.whenthisspriteclicked),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2)
    ];
  }

  *whenIReceiveStartgame() {
    this.visible = false;
  }

  *whenIReceiveChoosegame() {
    this.visible = true;
  }

  *whenthisspriteclicked() {
    this.broadcast("startgame");
    this.broadcast("startmultiplecation");
  }

  *whenGreenFlagClicked() {
    this.visible = false;
  }

  *whenGreenFlagClicked2() {
    while (true) {
      if (this.touching("mouse")) {
        this.size = 85;
      } else {
        this.size = 100;
      }
      yield;
    }
  }
}
