class PowerPellet extends Pellet {
    constructor(ctx, x, y) {
        // We call the constructor of the parent class (Pellet) first, but with a bigger radius
        super(ctx, x, y, 7); // Bigger radius, adjustable 
        this.color = 'lightyellow';
        this.objectType = "powerpellet";
        this.size = 20;
        this.image = new Image();
        this.image.src = 'assets/img/powerPellet.png';
    }

    static createPellets(ctx, powerPellet_positions) {
        const powerPellets = [];
        const size = 20;  // Size of the power pellet
    
        for (let i = 0; i < powerPellet_positions.length; i++) {
          const position = powerPellet_positions[i];
          const x = position[0] * size ;  // Adjuste the position to center the pellet
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