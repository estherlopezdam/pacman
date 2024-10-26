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
        this.currentDirection = UP;
        this.canChangeDirection = false;
        this.minDistance = (3 / 4) * this.size;
        this.lastChangeX = 0;
        this.lastChangeY = 0;
        this.currentGhost = null;

        //this.level = level;  // Nivel del fantasma
       // this.factorAceleration = factorAceleration;  // Factor de aceleración para ajustar la velocidad

        
          
        // Inicializar posición y velocidad
        this.x = this.position[0] * 20;  // Posición inicial en el eje X
        this.y = this.position[1] * 20;  // Posición inicial en el eje Y
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
    this.ctx.fillRect(this.x , this.y, 20, 20);  // Dibuja un cuadrado
    
}

move(pacman) {
    
    this.x += this.vx;
    this.y += this.vy;
   
    
}

onKeyDown(e) {
    switch (e.keyCode) {
        case GHOST_UP:
          if(this.currentDirection != UP) {
            this.vy = -1;
            this.vx = 0;
            this.currentDirection = UP;
          }    
        break;
    
        case GHOST_DOWN:
          if(this.currentDirection != DOWN) {
            this.vy = 1;
            this.vx = 0;
            this.currentDirection = DOWN;
          }        
        break;
    
        case GHOST_LEFT:
          if(this.currentDirection != LEFT) {
            this.vy = 0;
            this.vx = -1;
            this.currentDirection = LEFT;
          }    
        break;
    
        case GHOST_RIGHT:
          if(this.currentDirection != RIGHT) {
            this.vy = 0;
            this.vx = 1;
            this.currentDirection = RIGHT;
          }
        
        break;
       
        default:
          break;
       
        }
    }
}

