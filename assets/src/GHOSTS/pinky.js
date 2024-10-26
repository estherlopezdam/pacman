class Pinky extends Ghost {
    constructor() {
        const [name, position, color, releaseTime] = ghost_positions.P;
        super(ctx, name, position, color, releaseTime);
        
        this.image.src = '/assets/img/pinky/stop.png';
        
    }

    draw() {
        super.draw();
    }
    move(pacman) {
        super.move(pacman);
    }
    onKeyDown(e) {
        super.onKeyDown(e);
    }
}