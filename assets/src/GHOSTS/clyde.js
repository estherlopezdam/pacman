class Clyde extends Ghost {
    constructor() {
        const [name, position, color, releaseTime] = ghost_positions.C;
        super(ctx, name, position, color, releaseTime);
        this.vy = 0;
        this.vx = 1;

        
    }

    draw() {        
        super.draw();
    }
    move() {
        this.y += this.vy;
        this.x += this.vx;

    }
}
  