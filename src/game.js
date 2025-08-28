//Game.js
import { Player} from "./player.js";
import { Dealer } from "./dealer.js";
import { Deck } from "./deck.js";


// console.log(this.player.hand[0].rank);
export class Game{
    
    constructor(){
        this.player = new Player();
        this.dealer = new Dealer();
        this.deck = new Deck();
        this.turn = "player"; // "Player | Dealer" | "end"
        this.result =  null; // "player_blackjack" | "player_bust" | "dealer_bust" | "player_win" | "dealer_win" | "push"
    }

    start(){
        this.player.resetHand();
        this.dealer.resetHand();

        //Dealers Hand
        this.dealer.hand.add(this.deck.draw());
        this.dealer.hand.add(this.deck.draw());

        //Players Hand
        this.player.hand.add(this.deck.draw());
        this.player.hand.add(this.deck.draw());

        // JUST FOR DEBUGGING REMOVE AFTER
        console.log(`Player Hand Value: ${this.playerTotal()}`);
        console.log(`Dealer Hand Value: ${this.dealer.hand.getValues()}`);
        
        console.log(this.deck.cards)
    }

    playerHit(){
        console.log("player Hit");
        console.log(`Player Hand Value: ${this.player.hand.getValues()}`);
        if(this.turn !=="player" || this.result)return;
        this.player.hand.add(this.deck.draw());
        const pv = this.playerTotal();
        if(pv > 21){
            this.result = "bust";
            this.turn = "done";
        }
        this.turn = "dealer";
        
    }

    playerStand(){
        if(this.turn !== "dealer" || this.result)return;
        this.turn = "dealer";
        this.dealerTurn();
    }

    playerDoubleDown(){
        if(this.turn !== "dealer" || this.result)return;
        this.dealerTurn();
        this.turn = "done"
    }

    dealerTurn(){
        while(this.dealerTotal() < 17){
            this.dealer.hand.add(this.deck.draw());
        }
    }

    judgeWinner(){
        const pv = this.playerTotal();
        const dv = this.dealerValue();
        if(dv > 21) this.result = "dealer_bust";
        else if(pv > dv) this.result = "player_win";
        else if(pv < dv) this.result = "dealer_win";
        else this.result = "push";
        this.turn = "done";
    }

    playerTotal(){return (this.player.hand.getValues())}
    dealerTotal(){return (this.dealer.hand.getValues())}

}