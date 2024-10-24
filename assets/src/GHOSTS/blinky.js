class Blinky extends Ghost {
    constructor() {
        const [name, position, color, releaseTime] = ghost_positions.B;
        super(ctx, name, position, color, releaseTime);
        this.vx = 1;
    }

    draw() {

       
        super.draw();
    }

    move(pacman) {
        this.x += this.vx;
        this.y += this.vy;
        
        
    }
}

