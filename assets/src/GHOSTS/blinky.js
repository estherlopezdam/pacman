class Blinky extends Ghost {
    constructor() {
        const [name, position, color, releaseTime] = ghost_positions.B;
        super(ctx, name,position, color, releaseTime);
        this.vx = 0;
        this.vy = 0;
        this.image.src = 'assets/img/blinky/stop.png';
    }

    draw() {
        super.draw();
    }

    move(pacman) {
       super.move(pacman);    
    }
    changeDirection(pacman) {
        super.changeDirection(pacman);
    }

    onKeyDown(e) {
        super.onKeyDown(e);
    }
}

