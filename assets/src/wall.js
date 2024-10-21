class Wall {
    constructor(ctx, x, y) {
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.width = this.ctx.canvas.width / 28;
        this.height = this.ctx.canvas.height / 31;
    }

    draw() {
        this.ctx.fillStyle = "#b3d9ff";
        this.ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    static createWalls(ctx, wall_positions) {
        const walls = [];
        const size = 20;  // Tamaño de cada bloque (ancho y alto de las paredes)
    
        for (let i = 0; i < wall_positions.length; i++) {
            const wall = wall_positions[i];
            const newWall = new Wall(ctx, wall[0] * size, wall[1] * size, size, size);  // Multiplicamos por el tamaño
            walls.push(newWall);
        }
    
        return walls;
    }
    
}
