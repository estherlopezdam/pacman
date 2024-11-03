class Blinky extends Ghost {
    constructor(ctx, level) {
        const [name, position, color, releaseTime] = ghost_positions.B;
        super(ctx, level, name,position, color, releaseTime);
        this.vx = 0;
        this.vy = 0;
        this.image.src = 'assets/img/blinky/stop.png';
    }

    draw(powerPelletActive) {
        super.draw(powerPelletActive);
    }

    move(pacman, powerPelletActive) {
        super.move(pacman, powerPelletActive);    
    }
    changeDirection(pacman, powerPelletActive) {
         super.changeDirection(pacman, powerPelletActive);
    }

    onKeyDown(e) {
        super.onKeyDown(e);
    }
}

