class Pellet {
    constructor(ctx, x, y, radius = 3) {
      this.ctx = ctx;
      this.x = x;
      this.y = y;
      this.radius = radius;  // El radio define el tamaño del pellet
      this.color = '#FFD700';  // Color dorado para los pellets
    }
  
    draw() {
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      this.ctx.fillStyle = this.color;
      this.ctx.fill();
      this.ctx.closePath();
    }
  
    // Método estático para crear todos los pellets
    static createPellets(ctx, pellet_positions) {
      const pellets = [];
      const size = 20;  // Tamaño de la cuadrícula
  
      for (let i = 0; i < pellet_positions.length; i++) {
        const position = pellet_positions[i];
        const x = position[0] * size + size / 2;  // Ajustar la posición para centrar el pellet
        const y = position[1] * size + size / 2;
        const newPellet = new this(ctx, x, y);
        pellets.push(newPellet);
      }
  
      return pellets;
    }
  }
  