class Fruit {
    constructor(ctx, fruitPositions) {
        this.i = Math.floor(Math.random() * fruitPositions.length);
        this.ctx = ctx;
        this.x = Math.round(fruitPositions[this.i][0]);
        this.y =Math.round(fruitPositions[this.i][1]);
    }
}