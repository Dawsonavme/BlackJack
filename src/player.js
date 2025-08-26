import { Hand } from "./hand";

export class Player {
  constructor(name = "Player", chips = 0) {
    this.name = name;
    this.chips = chips;
    this.hand = new Hand();
  }

  resetHand() {
    this.hand = new Hand();
  }

  // Later you can expand with betting methods
  placeBet(amount) {
    if (amount > this.chips) throw new Error("Not enough chips");
    this.chips -= amount;
    return amount;
  }
}



import { Hand } from "./hand.js";

export class Dealer {
  constructor() {
    this.hand = new Hand();
  }

  resetHand() {
    this.hand = new Hand();
  }

  mustHit() {
    return this.hand.getValues()[0] < 17;
  }
}