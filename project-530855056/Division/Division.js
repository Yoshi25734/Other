import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Division extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Division/costumes/costume1.png", {
        x: 114,
        y: 38
      })
    ];

    this.sounds = [new Sound("pop", "./Division/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "ChooseGame" },
        this.whenIReceiveChoosegame
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "StartGame" },
        this.whenIReceiveStartgame
      ),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2),
      new Trigger(Trigger.CLICKED, this.whenthisspriteclicked)
    ];
  }

  *whenGreenFlagClicked() {
    this.visible = false;
  }

  *whenIReceiveChoosegame() {
    this.visible = true;
  }

  *whenIReceiveStartgame() {
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

  *whenthisspriteclicked() {
    this.broadcast("StartGame");
    this.broadcast("StartDivision");
  }
}
