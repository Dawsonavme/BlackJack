import { Hand } from "./hand.js";

export class Dealer {
  constructor() {
    this.hand = new Hand();
  }

  resetHand() {
    this.hand = new Hand();
  }
}