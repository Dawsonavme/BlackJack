import { CardConfig} from "./cardTypes.js";


export class Deck{
    cards;
    
    constructor(shuffle = true, numDecks = 1){
        this.cards = [];
        this.reset(numDecks, shuffle);
    }

  reset(numDecks = 1, shuffle = true) {
    this.cards = [];
    for (let d = 0; d < numDecks; d++) {
      for (const suit of CardConfig.suits) {
        for (const rank of CardConfig.ranks) {
          this.cards.push({ rank, suit });
        }
      }
    }
    if (shuffle) this.shuffle();
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  draw() {
    return this.cards.pop(); // undefined if empty
  }

  size() {
    return this.cards.length;
  }
  logDeck(){
    return this.cards;
  }

}