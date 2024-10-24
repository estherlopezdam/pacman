class Ghost {
    constructor(ctx, name,startPosition, color, releaseTime) {
        this.ctx = ctx
        this.name = name;
        this.color = color;
        this.position = startPosition; // [x, y]
        this.releaseTime = releaseTime;
        this.objectType = 'ghost';
        this.size = 20;
        this.tick = 0;  
        this.currentDirection = 'up';

        //this.level = level;  // Nivel del fantasma
       // this.factorAceleration = factorAceleration;  // Factor de aceleración para ajustar la velocidad

        
          
        // Inicializar posición y velocidad
        this.x = this.position[0] * this.size;  // Posición inicial en el eje X
        this.y = this.position[1] * this.size;  // Posición inicial en el eje Y
        this.vx = 0;  // Velocidad en el eje X
        this.vy = 0;  // Velocidad en el eje Y
}

// Método para actualizar el movimiento del fantasma
updatePosition() {
 // Aquí puedes ajustar las velocidades vx y vy según las direcciones del movimiento
    this.x += this.vx;
    this.y += this.vy;
}

// Método para dibujar el fantasma
draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x , this.y, this.size, this.size);  // Dibuja un cuadrado
    
}

move(pacman) {
   
    
}

}