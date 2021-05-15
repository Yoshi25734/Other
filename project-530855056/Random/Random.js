import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Random extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Random/costumes/costume1.png", {
        x: 114,
        y: 38
      })
    ];

    this.sounds = [new Sound("pop", "./Random/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "choosegame" },
        this.whenIReceiveChoosegame
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "startgame" },
        this.whenIReceiveStartgame
      ),
      new Trigger(Trigger.CLICKED, this.whenthisspriteclicked),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2)
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

  *whenthisspriteclicked() {
    this.broadcast("startgame");
    this.stage.vars.randomgame = this.random(1, 4);
    if (this.stage.vars.randomgame == 1) {
      this.broadcast("startaddition");
    }
    if (this.stage.vars.randomgame == 2) {
      this.broadcast("startsubtraction");
    }
    if (this.stage.vars.randomgame == 3) {
      this.broadcast("startmultiplecation");
    }
    if (this.stage.vars.randomgame == 4) {
      this.broadcast("startdivision");
    }
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
