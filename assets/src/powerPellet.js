class powerPellet extends Pellet {
    constructor(ctx, x, y) {
        // Llamamos al constructor de Pellet, pero con un radio mayor
        super(ctx, x, y, 7); // Radio más grande, ajustable
        this.color = 'lightyellow';
    }

    static createPellets(ctx, powerPellet_positions) {
        return super.createPellets(ctx, powerPellet_positions);  // Reutiliza el método de Pellet
    }
}