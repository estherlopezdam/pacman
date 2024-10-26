class Pinky extends Ghost {
    constructor() {
        const [name, position, color, releaseTime] = ghost_positions.P;
        super(ctx, name, position, color, releaseTime);
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