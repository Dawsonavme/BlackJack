//Game.js
import { Player, Dealer } from "./player.js";
import { Deck } from "./deck.js";


export class Game{
    
    constructor(){
        this.player = new Player();
        this.dealer = new Dealer();
    }

    
    Start(){

    }

}