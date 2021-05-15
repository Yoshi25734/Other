import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Addition extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Addition/costumes/costume1.png", {
        x: 114,
        y: 38
      })
    ];

    this.sounds = [new Sound("pop", "./Addition/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "startgame" },
        this.whenIReceiveStartgame
      ),
      new Trigger(Trigger.CLICKED, this.whenthisspriteclicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "choosegame" },
        this.whenIReceiveChoosegame
      ),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2)
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = false;
  }

  *whenIReceiveStartgame() {
    this.visible = false;
  }

  *whenthisspriteclicked() {
    this.broadcast("startgame");
    this.broadcast("startaddition");
  }

  *whenIReceiveChoosegame() {
    this.visible = true;
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
