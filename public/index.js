import { Game } from "./classes/Game.js";

const game = new Game();

window.addEventListener("keydown", (event) => {
    game.moveAvatar(event.key);
});
