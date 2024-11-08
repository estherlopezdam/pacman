class Pinky extends Ghost {
    constructor(ctx, level) {
        const [name, position, color, releaseTime] = ghost_positions.P;
        super(ctx, level, name, position, color, releaseTime);
        
        this.image.src = 'assets/img/pinky/stop.png';
        
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