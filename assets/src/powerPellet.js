class PowerPellet extends Pellet {
    constructor(ctx, x, y) {
        // Llamamos al constructor de Pellet, pero con un radio mayor
        super(ctx, x, y, 7); // Radio más grande, ajustable
        this.color = 'lightyellow';
        this.objectType = "powerpellet";
    }

    static createPellets(ctx, powerPellet_positions) {
        const powerPellets = [];
        const size = 20;  // Tamaño de la cuadrícula
    
        for (let i = 0; i < powerPellet_positions.length; i++) {
          const position = powerPellet_positions[i];
          const x = position[0] * size + size / 2;  // Ajustar la posición para centrar el pellet
          const y = position[1] * size + size / 2;
          const newPellet = new PowerPellet(ctx, x, y);
          powerPellets.push(newPellet);
        }
    
        return powerPellets;
    }
}