import { Avatar } from "./Avatar.js";
import { Coin } from "./Coin.js";
import { Renderer } from "./Renderer.js";
import {
    POSSIBLE_COORD_X,
    POSSIBLE_COORD_Y,
    WIDTH_BOARD,
    HEIGHT_BOARD,
    X_INITIAL,
    Y_INITIAL,
} from "../utils/Constants.js";

export class Game {
    constructor() {
        this.avatar = new Avatar(X_INITIAL, Y_INITIAL);
        this.coin = null;
        this.existCoin = false;

        Renderer.updateAvatarPosition(this.avatar);

        this.spawnCoin();
    }

    spawnCoin() {
        if (!this.coin) {
            // gera nova posição
            // espera um tempo antes de gerar nova moeda
            setTimeout(() => {
                const { x, y } = Coin.generateRandomPosition(
                    POSSIBLE_COORD_X,
                    POSSIBLE_COORD_Y
                );

                this.coin = new Coin(x, y, 1);

                if (this.coin && x !== null && y !== null) {
                    Renderer.renderCoin(this.coin); // renderiza a moeda
                }
            }, 200);
        }
    }

    checkCollision() {
        if (this.avatar && this.coin) {
            if (
                this.avatar.coordX === this.coin.coordX &&
                this.avatar.coordY === this.coin.coordY
            ) {
                this.avatar.addCoin(this.coin.innerValue);
                this.coin = null;
                this.existCoin = false;

                document.querySelector("#myNewCoin").remove();

                Renderer.updateScore(this.avatar.coinInBag);

                this.spawnCoin();
            }
        }
    }

    moveAvatar(direction) {
        const moves = {
            ArrowUp: () => this.avatar.move(0, 80, WIDTH_BOARD, HEIGHT_BOARD),
            ArrowDown: () =>
                this.avatar.move(0, -80, WIDTH_BOARD, HEIGHT_BOARD),
            ArrowLeft: () =>
                this.avatar.move(-80, 0, WIDTH_BOARD, HEIGHT_BOARD),
            ArrowRight: () =>
                this.avatar.move(80, 0, WIDTH_BOARD, HEIGHT_BOARD),
        };

        moves[direction]?.();

        Renderer.updateAvatarPosition(this.avatar);
        Renderer.updateAvatarDirection(direction); // update visual direction of our avatar
        Renderer.playAvatarAnimation(); // adiciona efeito de animação

        this.checkCollision();
    }
}
