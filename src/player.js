import { Hand } from "./hand.js";

export class Player {
  hand = new Hand();
  //Add Chips later
}

export class Dealer {
  hand = new Hand();
  mustHit() {
    return this.hand.getValues()[0] < 17;
  }
}
