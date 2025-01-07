import { AudioPlayer } from "../utils/AudioPlayer.js";

export class Avatar {
    constructor(x, y, coinBag = 0) {
        this.x = x;
        this.y = y;
        this.coinBag = coinBag;
    }

    get coordX() {
        return this.x;
    }

    get coordY() {
        return this.y;
    }

    get coinInBag() {
        return this.coinBag;
    }

    addCoin(value) {
        this.coinBag += value;

        const soundPath =
            this.coinBag % 10 === 0
                ? "./assets/sounds/collect-10-coins.mp3"
                : "./assets/sounds/collect-coin.wav";
        AudioPlayer.playSound(soundPath);
    }

    move(xDelta, yDelta, boundaryX, boundaryY) {
        if (this.x + xDelta >= 0 && this.x + xDelta < boundaryX) {
            this.x += xDelta;
        } else {
            AudioPlayer.playSound("./assets/sounds/bump-on-wall.mp3");
        }

        if (this.y + yDelta >= 0 && this.y + yDelta < boundaryY) {
            this.y += yDelta;
        } else {
            AudioPlayer.playSound("./assets/sounds/bump-on-wall.mp3");
        }
    }
}
