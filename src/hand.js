export class Hand {
  cards;

  constructor(){
    this.cards = [];
  }

  add(card) {
    this.cards.push(card);
  }

  clear() {
    this.cards = [];
  }

  getCards() {
    return this.cards;
  }

  // Blackjack scoring logic
  getValues() {
    let total = 0;
    let aces = 0;
    
    for (const card of this.cards) {
      if (card.rank === "1") {
        aces++;
        total += 11;
      } else if (["10", "11", "12", "13"].includes(card.rank)) {
        total += 10;
      } else {
        total += parseInt(card.rank, 10);
      }
    }

    while (total > 21 && aces > 0) {
      total -= 10; // count Ace as 1 instead of 11
      aces--;
    }

    return [total];
  }

  isBust() {
    return this.getValues()[0] > 21;
  }
}
