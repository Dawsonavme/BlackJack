// main.ts
import { preloadAll, loadCard } from "./cardLoader.js";
import {  CardConfig } from "./cardTypes.js";
import { Deck } from "./deck.js";
import { Dealer, Player } from "./player.js";
import {drawTextOnArc} from './utils.js'


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

//Background source
const bg = new Image();
bg.src = "Assets/vecteezy_green-casino-poker-table-texture-game-background_24232274_632/vecteezy_green-casino-poker-table-texture-game-background_24232274.jpg"

const size = "Large"; // or "Medium"/"Small"
const deck = new Deck(true, 1); // shuffle=true, 1 deck
const player = new Player();
const dealer = new Dealer();

//Example Function
async function drawExampleCard() {
  //Players Hand POS
  let x = WIDTH * 0.5 - CardConfig.CARD_W;
  let y = HEIGHT - 200;
  const img1 = await loadCard("Large", "1", "Spades");
  const img2 = await loadCard("Large", "1", "Hearts");

  ctx.drawImage(img1, x, y, CardConfig.CARD_W, CardConfig.CARD_H);
  ctx.drawImage(img2, x +50, y, CardConfig.CARD_W, CardConfig.CARD_H);
}


function gameLoop() {
  //Draw Background
  ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
  //Testing displaying cards
  drawExampleCard()
  drawTextOnArc(ctx,"Dealer Must hit on 17 or less", HEIGHT/2, WIDTH/2,500, 200, true);
  requestAnimationFrame(gameLoop);
}

//Call Gameloop
gameLoop()