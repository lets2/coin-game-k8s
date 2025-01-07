export class Renderer {
    static updateAvatarPosition(avatar) {
        const containerAvatar = document.querySelector("#avatar");

        containerAvatar.style.left = `${avatar.coordX - 40}px`;
        containerAvatar.style.bottom = `${avatar.coordY - 40}px`;
    }

    static updateAvatarDirection(direction) {
        const containerAvatar = document.querySelector("#my-image");

        containerAvatar.classList.remove(
            "face-up",
            "face-down",
            "face-left",
            "face-right"
        );

        const directionMap = {
            ArrowUp: "face-up",
            ArrowDown: "face-down",
            ArrowLeft: "face-left",
            ArrowRight: "face-right",
        };

        if (directionMap[direction]) {
            containerAvatar.classList.add(directionMap[direction]);
        }
    }

    static playAvatarAnimation() {
        const avatarImg = document.querySelector("#my-image");

        avatarImg.classList.add("animation-sheet");
        setTimeout(() => {
            avatarImg.classList.remove("animation-sheet");
        }, 125);
    }

    static updateScore(score) {
        const scoreElement = document.querySelector("#coin-score");

        scoreElement.innerText = score.toString().padStart(2, "0");
    }

    static renderCoin(coin) {
        const board = document.querySelector("#board");
        const newCoin = document.createElement("div");

        newCoin.style.left = `${coin.coordX - 20}px`;
        newCoin.style.bottom = `${coin.coordY - 20}px`;
        newCoin.classList.add("coin-container");
        newCoin.id = "myNewCoin";

        board.appendChild(newCoin);
    }
}

function changeAvatarPosition(newPosition) {
    myImg.classList.remove("face-up");
    myImg.classList.remove("face-down");
    myImg.classList.remove("face-left");
    myImg.classList.remove("face-right");

    myImg.classList.add(newPosition);
}
