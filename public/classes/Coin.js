export class Coin {
    constructor(x, y, value) {
        this.x = x;
        this.y = y;
        this.value = value;
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

    static lastPosition = { x: null, y: null };

    static generateRandomPosition(possibleCoordX, possibleCoordY) {
        let flag = true;

        while (flag) {
            // gera nova coordenada x,y aleatorias
            possibleCoordX.sort(() => Math.random() - 0.5);
            possibleCoordY.sort(() => Math.random() - 0.5);

            this.x = possibleCoordX[0];
            this.y = possibleCoordY[0];

            // garante que não seja a mesma posição da ultima moeda
            if (
                this.x !== Coin.lastPosition.x ||
                this.y !== Coin.lastPosition.y
            ) {
                flag = false;
            }
        }

        // atualiza a ultima posição
        Coin.lastPosition = { x: this.x, y: this.y };

        return { x: this.x, y: this.y };
    }
}
