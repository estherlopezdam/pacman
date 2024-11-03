class Pellet {
    constructor(ctx, x, y) {
      this.ctx = ctx;
      this.x = x;
      this.y = y;
      this.color = '#FFD700';  // Gold color for the pellets
      this.objectType = 'pellet';
      this.size = 6;
      this.image = new Image();
      this.image.src = 'assets/img/pellet.png';
      
    }
  
    draw() {
      
        this.ctx.drawImage(this.image, this.x, this.y, 6, 6);
    
      // this.ctx.beginPath();
      // this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
      // this.ctx.fillStyle = this.color;
      // this.ctx.fill();
      // this.ctx.closePath();
    }
  
    // Specific method to create pellets
    static createPellets(ctx, pellet_positions) {
      const pellets = [];
      const size = 20;  // Size of the grid
  
      for (let i = 0; i < pellet_positions.length; i++) {
        const position = pellet_positions[i];
        const x = position[0] * size + size / 2;  // Adjust the position to center the pellet in the grid 
        const y = position[1] * size + size / 2;
        const newPellet = new Pellet(ctx, x, y);
        pellets.push(newPellet);
      }
  
      return pellets;
    }
  }
  