// main.ts
import { preloadAll, loadCard } from "./cardLoader.js";
import {  CardConfig } from "./cardTypes.js";
import { Game } from "./game.js";
import { Button } from "./utils.js";

let canvas = document.getElementById('canvas') ;
let ctx = canvas.getContext('2d');

let HEIGHT = window.innerHeight
let WIDTH = window.innerWidth;

function fitCanvasToScreen() {
  const dpr = window.devicePixelRatio || 1;
  canvas.width = Math.floor(window.innerWidth * dpr);
  canvas.height = Math.floor(window.innerHeight * dpr);
  canvas.style.width = "100vw";
  canvas.style.height = "100vh";
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0); // crisp text/images
}

fitCanvasToScreen();
window.addEventListener("resize", fitCanvasToScreen);

const size = "Large"; // or "Medium" | "Small"

//Background source
const bg = new Image();
bg.src = "Assets/vecteezy_green-casino-poker-table-texture-game-background_24232274_632/vecteezy_green-casino-poker-table-texture-game-background_24232274.jpg"

//Initialize Game Object
let game = new Game();
game.start();  
//Buttons
const buttons = [
  new Button(canvas.width /2 + 80, canvas.height/2 + 240, 120, 50, "Hit", game.playerHit.bind(game)),
  new Button(canvas.width /2 + 80, canvas.height/2 + 300, 120, 50, "Stand", () => console.log("Stand")),
]


canvas.addEventListener("click", (e) => {
  const rect = canvas.getBoundingClientRect();
  const mouseX = e.clientX - rect.left;
  const mouseY = e.clientY - rect.top;

  for (const button of buttons) {
    if (button.isInside(mouseX, mouseY)) {
      button.onClick();
      break; // stop after first match
    }
  }
});


//Example Function
async function drawCardPile() {
  let x = WIDTH * 0.5 + 150;
  let y = HEIGHT/2 - 350;
  const img1 = await loadCard(size, "1", "Back Blue");
  for(let z = 0; z<3; z++){
  ctx.drawImage(img1, x, y-(z*5), CardConfig.CARD_W, CardConfig.CARD_H);
  }
}

async function drawCards(rank, suit, dx, dy){
  let x = WIDTH * 0.5 - CardConfig.CARD_W;
  let y = HEIGHT - 200;
  const img = await loadCard(size, rank, suit);
  ctx.drawImage(img, x + dx, y - dy, CardConfig.CARD_W, CardConfig.CARD_H);
}



async function gameLoop() {
  //Draw Background
  ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
  
  //Draw Card Pile
  drawCardPile()
  
  drawCards(game.player.hand.cards[0].rank, game.player.hand.cards[0].suit, 0, 0);
  drawCards(game.player.hand.cards[1].rank, game.player.hand.cards[1].suit, 50,0);

  //Hide first Card
  // drawCards(game.dealer.hand.cards[0].rank, game.dealer.hand.cards[0].suit, 0, 400);
  drawCards("1","Back Blue", 0, 400)
  drawCards(game.dealer.hand.cards[1].rank, game.dealer.hand.cards[1].suit, 50, 400);

  buttons.forEach(button => button.draw(ctx));
  
  requestAnimationFrame(gameLoop);
}


   
//Call Gameloop
gameLoop()