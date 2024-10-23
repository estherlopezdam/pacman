class Inky extends Ghost {
    constructor() {
        const [name, position, color, releaseTime] = ghost_positions.I;
        super(ctx, name, position, color, releaseTime);
    }

    draw() {
        super.draw();
    }
}
  