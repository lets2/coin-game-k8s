const UNIT_MEASURE = 80; //"40px is the length of avatar
const HEIGHT_BOARD = 400; //400px
const WIDTH_BOARD = 560; //560px
const X_INITIAL = 280;
const Y_INITIAL = 200;

const possibleCoordX = [40, 120, 200, 280, 360, 440, 520];
const possibleCoordY = [40, 120, 200, 280, 360];
//next draw is forced to be different from last draw
let lastX;
let lastY;
const containerAvatar = document.querySelector("#avatar");
const board = document.querySelector("#board");

//CLASS COIN

class Coin {
    constructor(_x, _y, _value) {
        this.x = _x;
        this.y = _y;
        this.value = _value;
    }
    get coordX() {
        return this.x;
    }
    get coordY() {
        return this.y;
    }
    get innerValue() {
        return this.value;
    }
}
//CLASS AVATAR
class Avatar {
    constructor(_x, _y, _coinBag) {
        this.x = _x;
        this.y = _y;
        this.coinBag = _coinBag;
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
    addCoin(_value) {
        this.coinBag += _value;
        if (this.coinBag % 10 === 0) {
            const get10CoinAudio = new Audio(
                "./assets/sounds/collect-10-coins.mp3"
            );
            get10CoinAudio.play();
        } else {
            const getCoinAudio = new Audio("./assets/sounds/collect-coin.wav");
            getCoinAudio.play();
        }
    }

    moveForward(_quant) {
        if (HEIGHT_BOARD - this.y > UNIT_MEASURE) {
            this.y = this.y + UNIT_MEASURE * _quant;
        } else {
            const bump = new Audio("./assets/sounds/bump-on-wall.mp3");
            bump.play();
        }
    }
    moveBackward(_quant) {
        if (this.y > UNIT_MEASURE) {
            this.y = this.y - UNIT_MEASURE * _quant;
        } else {
            const bump = new Audio("./assets/sounds/bump-on-wall.mp3");
            bump.play();
        }
    }

    moveRight(_quant) {
        if (WIDTH_BOARD - this.x > UNIT_MEASURE) {
            this.x = this.x + UNIT_MEASURE * _quant;
        } else {
            const bump = new Audio("./assets/sounds/bump-on-wall.mp3");
            bump.play();
        }
    }
    moveLeft(_quant) {
        if (this.x > UNIT_MEASURE) {
            this.x = this.x - UNIT_MEASURE * _quant;
        } else {
            const bump = new Audio("./assets/sounds/bump-on-wall.mp3");
            bump.play();
        }
    }
}
///testes de aleatoriedade
let existCoin = false;
let money;
const person1 = new Avatar(X_INITIAL, Y_INITIAL, 0);
updatePosition(person1.coordX, person1.coordY);
createCoin();

const myImg = document.querySelector("#my-image");

window.addEventListener("keydown", (event) => {
    const keyClicked = event.key;
    let x_antigo = person1.coordX;
    let y_antigo = person1.coordY;

    switch (keyClicked) {
        case "ArrowUp":
            person1.moveForward(1);
            changeAvatarPosition("face-up");
            break;
        case "ArrowDown":
            person1.moveBackward(1);
            changeAvatarPosition("face-down");
            break;
        case "ArrowLeft":
            person1.moveLeft(1);
            changeAvatarPosition("face-left");
            break;
        case "ArrowRight":
            person1.moveRight(1);
            changeAvatarPosition("face-right");
            break;
    }

    myImg.classList.add("animation-sheet");
    setTimeout(() => {
        myImg.classList.remove("animation-sheet");
    }, 125);

    // console.log(
    // 	"Informações:",
    // 	person1.coordX,
    // 	person1.coordY,
    // 	person1.coinInBag
    // );

    const x_novo = person1.coordX;
    const y_novo = person1.coordY;
    let variacaoX = (x_novo - x_antigo) / 10;
    let variacaoY = (y_novo - y_antigo) / 10;

    const idInterval = setInterval(() => {
        updatePosition(x_antigo + variacaoX, y_antigo + variacaoY);
        verifyIfAvatarIsSamePositionCoin(
            x_antigo + variacaoX,
            y_antigo + variacaoY,
            money.coordX,
            money.coordY
        );
        //createCoin();
        if (
            x_antigo + variacaoX === x_novo &&
            y_antigo + variacaoY === y_novo
        ) {
            clearInterval(idInterval);
            createCoin();
        }
        x_antigo += variacaoX;
        y_antigo += variacaoY;
    }, 12.5);
    // console.log("A mudança de coordenada foi:");
    // console.log("<", x_antigo, y_antigo, ">", "<", x_novo, y_novo, ">");
});

function updatePosition(_coordX, _coordY) {
    const left = _coordX - UNIT_MEASURE / 2 + "px";
    const bottom = _coordY - UNIT_MEASURE / 2 + "px";
    // console.log(left, bottom);
    // console.log(_coordX, _coordY);
    containerAvatar.style.left = left;
    containerAvatar.style.bottom = bottom;
}

function createCoin() {
    if (existCoin === false) {
        existCoin = true;

        lastX = person1.coordX;
        lastY = person1.coordY;
        let flag = true;

        while (flag) {
            possibleCoordX.sort((a, b) => {
                return Math.random() - 0.5;
            });
            possibleCoordY.sort((a, b) => {
                return Math.random() - 0.5;
            });
            if (possibleCoordX[0] !== lastX && possibleCoordX[0] !== lastY) {
                flag = false;
                // console.log("VIROU FALSO");
            }
        }

        money = new Coin(possibleCoordX[0], possibleCoordY[0], 1);

        const newCoin = document.createElement("div");
        const left = money.coordX - UNIT_MEASURE / 4 + "px";
        const bottom = money.coordY - UNIT_MEASURE / 4 + "px";
        newCoin.style.left = left;
        newCoin.style.bottom = bottom;
        newCoin.classList.add("coin-container");
        newCoin.id = "myNewCoin";
        board.appendChild(newCoin);
    }
}

function verifyIfAvatarIsSamePositionCoin(person1X, person1Y, moneyX, moneyY) {
    if (person1X == moneyX && person1Y == moneyY) {
        person1.addCoin(money.innerValue); //add money in bag
        // console.log("adicionei,groundon agora tem:", person1.coinInBag);
        money = null;
        existCoin = false;
        document.querySelector("#myNewCoin").remove();
        updateScore(person1.coinBag);
    }
}
const scoreElement = document.querySelector("#coin-score");
function updateScore(score) {
    scoreElement.innerText = score.toString().padStart(2, "0");
}

//edit image

function changeUrlAvatar(position) {
    const address = `./assets/${position}-fixed.PNG`;
    containerAvatar.style.backgroundImage = `url(${address})`;
}

function changeAvatarPosition(newPosition) {
    myImg.classList.remove("face-up");
    myImg.classList.remove("face-down");
    myImg.classList.remove("face-left");
    myImg.classList.remove("face-right");

    myImg.classList.add(newPosition);
}
