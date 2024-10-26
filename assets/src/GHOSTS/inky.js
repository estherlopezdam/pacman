class Inky extends Ghost {
    constructor() {
        const [name, position, color, releaseTime] = ghost_positions.I;
        super(ctx, name, position, color, releaseTime);
    }

    draw() {
        super.draw();
    }
    move(pacman) {
        super.move();
    }

    onKeyDown(e) {
        super.onKeyDown(e);
    }
}
  