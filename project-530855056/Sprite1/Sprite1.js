import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Sprite1 extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("Penguin2-a", "./Sprite1/costumes/Penguin2-a.svg", {
        x: 54,
        y: 61
      }),
      new Costume("Penguin2-b", "./Sprite1/costumes/Penguin2-b.svg", {
        x: 54,
        y: 61
      })
    ];

    this.sounds = [
      new Sound("meow", "./Sprite1/sounds/meow.wav"),
      new Sound("bell cymbal", "./Sprite1/sounds/bell cymbal.wav"),
      new Sound("guitar strum", "./Sprite1/sounds/guitar strum.wav"),
      new Sound("string pluck", "./Sprite1/sounds/string pluck.wav")
    ];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked),
      new Trigger(
        Trigger.BROADCAST,
        { name: "startaddition" },
        this.whenIReceiveStartaddition
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "startmultiplecation" },
        this.whenIReceiveStartmultiplecation
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "startsubtraction" },
        this.whenIReceiveStartsubtraction
      ),
      new Trigger(
        Trigger.BROADCAST,
        { name: "startdivision" },
        this.whenIReceiveStartdivision
      ),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked2),
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked3)
    ];
  }

  *whenGreenFlagClicked() {
    this.stage.watchers.score.visible = false;
    this.stage.costume = "backdrop2";
    this.stage.watchers.score.visible = true;
    yield* this.sayAndWait("Let's play a math game!", 2);
    yield* this.wait(1);
    yield* this.sayAndWait("Choose one of the modes or random", 2);
    yield* this.wait(1);
    yield* this.sayAndWait("Answer the math problems by typing", 2);
    yield* this.wait(1);
    yield* this.sayAndWait("Press quit to stop playing", 3);
    this.broadcast("choosegame");
  }

  *whenIReceiveStartaddition() {
    yield* this.addition();
  }

  *whenIReceiveStartmultiplecation() {
    yield* this.multiplecation();
  }

  *multiplecation() {
    while (true) {
      this.stage.vars.guess = 0;
      this.stage.vars.randomNumber1 = this.random(1, 12);
      this.stage.vars.randomNumber2 = this.random(1, 12);
      this.stage.vars.answertoproblem =
        this.stage.vars.randomNumber1 * this.stage.vars.randomNumber2;
      while (!(this.stage.vars.guess == this.stage.vars.answertoproblem)) {
        yield* this.askAndWait(
          "" +
            this.stage.vars.randomNumber1 +
            ("" + "x" + this.stage.vars.randomNumber2)
        );
        this.stage.vars.guess = this.answer;
        if (
          this.answer ==
          this.stage.vars.randomNumber1 * this.stage.vars.randomNumber2
        ) {
          yield* this.startSound("guitar strum");
          yield* this.thinkAndWait("This is correct!", 2);
          this.stage.vars.score += 1;
        } else {
          yield* this.startSound("string pluck");
          yield* this.thinkAndWait("Wrong number!", 2);
        }
        yield;
      }
      yield;
    }
  }

  *whenIReceiveStartsubtraction() {
    yield* this.subtraction();
  }

  *subtraction() {
    while (true) {
      this.stage.vars.guess = 0;
      this.stage.vars.randomNumber1 = this.random(1, 100);
      this.stage.vars.randomNumber2 = this.random(1, 100);
      while (!(this.stage.vars.guess == this.stage.vars.answertoproblem)) {
        if (this.stage.vars.randomNumber1 > this.stage.vars.randomNumber2) {
          this.stage.vars.answertoproblem =
            this.stage.vars.randomNumber1 - this.stage.vars.randomNumber2;
          yield* this.askAndWait(
            "" +
              this.stage.vars.randomNumber1 +
              ("" + "-" + this.stage.vars.randomNumber2)
          );
        } else {
          this.stage.vars.answertoproblem =
            this.stage.vars.randomNumber2 - this.stage.vars.randomNumber1;
          yield* this.askAndWait(
            "" +
              this.stage.vars.randomNumber2 +
              ("" + "-" + this.stage.vars.randomNumber1)
          );
        }
        this.stage.vars.guess = this.answer;
        if (this.stage.vars.guess == this.stage.vars.answertoproblem) {
          yield* this.startSound("guitar strum");
          yield* this.thinkAndWait("That is correct!", 2);
          this.stage.vars.score += 1;
        } else {
          yield* this.startSound("string pluck");
          yield* this.thinkAndWait("Wrong number!", 2);
        }
        yield;
      }
      yield;
    }
  }

  *whenIReceiveStartdivision() {
    yield* this.division();
  }

  *whenGreenFlagClicked2() {
    this.stage.vars.score = 0;
  }

  *division() {
    while (true) {
      this.stage.vars.guess = 0;
      this.stage.vars.randomNumber1 = this.random(1, 100);
      this.stage.vars.randomNumber2 = this.random(1, 10);
      while (
        !(this.stage.vars.randomNumber1 % this.stage.vars.randomNumber2 == 0)
      ) {
        this.stage.vars.randomNumber1 = this.random(1, 100);
        yield;
      }
      this.stage.vars.answertoproblem =
        this.stage.vars.randomNumber1 / this.stage.vars.randomNumber2;
      while (!(this.stage.vars.guess == this.stage.vars.answertoproblem)) {
        yield* this.askAndWait(
          "" +
            this.stage.vars.randomNumber1 +
            ("" + "/" + this.stage.vars.randomNumber2)
        );
        this.stage.vars.guess = this.answer;
        if (
          this.answer ==
          this.stage.vars.randomNumber1 / this.stage.vars.randomNumber2
        ) {
          yield* this.startSound("guitar strum");
          yield* this.sayAndWait("That is correct!", 2);
          this.stage.vars.score += 1;
        } else {
          yield* this.startSound("string pluck");
          yield* this.sayAndWait("Wrong number!", 2);
        }
        yield;
      }
      yield;
    }
  }

  *whenGreenFlagClicked3() {
    this.stage.watchers.score.visible = false;
    this.stage.costume = "backdrop1";
    this.stage.watchers.score.visible = true;
    this.costume = "Penguin2-b";
    yield* this.wait(2);
    this.costume = "Penguin2-a";
    yield* this.wait(1);
    this.costume = "Penguin2-b";
    yield* this.wait(2);
    this.costume = "Penguin2-a";
    yield* this.wait(1);
    this.costume = "Penguin2-b";
    yield* this.wait(2);
    this.costume = "Penguin2-a";
    yield* this.wait(1);
    this.costume = "Penguin2-b";
    yield* this.wait(2);
    this.costume = "Penguin2-a";
  }

  *addition() {
    while (true) {
      this.stage.vars.guess = 0;
      this.stage.vars.randomNumber1 = this.random(this.random(1, 100), 100);
      this.stage.vars.randomNumber2 = this.random(this.random(1, 100), 100);
      this.stage.vars.answertoproblem =
        this.stage.vars.randomNumber1 + this.stage.vars.randomNumber2;
      while (!(this.stage.vars.guess == this.stage.vars.answertoproblem)) {
        yield* this.askAndWait(
          "" +
            this.stage.vars.randomNumber1 +
            ("" + "+" + this.stage.vars.randomNumber2)
        );
        this.stage.vars.guess = this.answer;
        if (
          this.answer ==
          this.stage.vars.randomNumber1 + this.stage.vars.randomNumber2
        ) {
          yield* this.startSound("guitar strum");
          yield* this.thinkAndWait("That is correct!", 2);
          this.stage.vars.score += 1;
        } else {
          yield* this.startSound("string pluck");
          yield* this.thinkAndWait("Wrong Number!", 2);
        }
        yield;
      }
      yield;
    }
  }
}
