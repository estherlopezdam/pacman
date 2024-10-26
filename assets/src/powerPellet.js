class PowerPellet extends Pellet {
    constructor(ctx, x, y) {
        // Llamamos al constructor de Pellet, pero con un radio mayor
        super(ctx, x, y, 7); // Radio más grande, ajustable
        this.color = 'lightyellow';
        this.objectType = "powerpellet";
        this.size = 20;
        this.image = new Image();
        this.image.src = '/assets/img/powerPellet.png';
    }

    static createPellets(ctx, powerPellet_positions) {
        const powerPellets = [];
        const size = 20;  // Tamaño de la cuadrícula
    
        for (let i = 0; i < powerPellet_positions.length; i++) {
          const position = powerPellet_positions[i];
          const x = position[0] * size ;  // Ajustar la posición para centrar el pellet
          const y = position[1] * size ;
          const newPellet = new PowerPellet(ctx, x, y);
          powerPellets.push(newPellet);
        }
    
        return powerPellets;
    }

    draw() {
        this.ctx.drawImage(this.image, this.x, this.y, 20, 20);
    }
}