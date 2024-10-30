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
        this.currentDirection = null;
        this.canChangeDirection = false;
        this.minDistance = (3 / 4) * this.size;
        this.lastChangeX = 0;
        this.lastChangeY = 0;
        this.currentGhost = null;
        this.image = new Image();
        

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
    this.resetImage();
    this.ctx.drawImage(this.image, this.x, this.y, 20, 20);
    // this.ctx.fillStyle = this.color;
    // this.ctx.fillRect(this.x , this.y, 20, 20);  // Dibuja un cuadrado
    
}
resetImage() {
    switch (this.currentDirection) {
        case UP:
            this.image.src = `/assets/img/${this.name}/UP.png`;          
            
            break;
        case DOWN:
            this.image.src = `/assets/img/${this.name}/DOWN.png`;          
            
            break;
        case LEFT:
            this.image.src = `/assets/img/${this.name}/LEFT.png`;          
            
            break;
        case RIGHT:
            this.image.src = `/assets/img/${this.name}/RIGHT.png`;          
            
            break;
    
        default:
            break;
    }
}


move(pacman) {
    this.x += this.vx;
    this.y += this.vy;     

    // Esperar hasta que se cumpla el releaseTime
    if (this.tick < this.releaseTime) {
        this.tick++;
        return;  // No hacer nada hasta que el tick alcance el releaseTime
    }

    // Una vez que el tick alcanza el releaseTime, comenzar el movimiento
    if (this.tick === this.releaseTime) {
        this.currentDirection = UP;
        this.vy = -1;  // Iniciar movimiento hacia arriba
    }

    this.tick++;
    
   

    for(let i = 0; i < direction_change_positions.length; i++) {
       
        const puntoClave =  direction_change_positions[i];
        const puntoClaveX = puntoClave[0] * 20;
        const puntoClaveY = puntoClave[1] * 20;
        
        const distanceToChangePoint = Math.sqrt(
        Math.pow(this.x - puntoClaveX, 2) + Math.pow(this.y - puntoClaveY, 2)
    );

            if (distanceToChangePoint <= this.minDistance && 
                (this.lastChangeX !== puntoClaveX || this.lastChangeY !== puntoClaveY)) {
                
                this.canChangeDirection = true;
            }
        

        
            if(this.x === puntoClaveX && this.y === puntoClaveY && this.canChangeDirection) {

                if ((puntoClaveX === 13 * 20 && puntoClaveY === 11 * 20) || (puntoClaveX === 14 * 20 && puntoClaveY === 11 * 20) ) {
                    this.canChangeDirection = false;
                    if(pacman.x > puntoClaveX) {
                        this.vx = 1;
                        this.vy = 0;
                        this.currentDirection = RIGHT;
                        break;
                    } else {
                        this.vx = - 1;
                        this.vy = 0;
                        this.currentDirection = LEFT;
                        break;
                    }
                }
                
                this.lastChangeX = puntoClaveX;
                this.lastChangeY = puntoClaveY;
                
                this.changeDirection(pacman);
                this.canChangeDirection = false;
            }
    }
}
// move(pacman) {
        
//     this.x += this.vx;
//     this.y += this.vy;     

//     // Esperar hasta que se cumpla el releaseTime
//     if (this.tick < this.releaseTime) {
//         this.tick++;
//         return;  // No hacer nada hasta que el tick alcance el releaseTime
//     }

//     // Una vez que el tick alcanza el releaseTime, comenzar el movimiento
//     if (this.tick === this.releaseTime) {
//         this.vy = -1;  // Iniciar movimiento hacia arriba
//         this.releaseTime =0;
//     }

//     this.tick++;
    
   

//     for(let i = 0; i < direction_change_positions.length; i++) {
       
//         const puntoClave =  direction_change_positions[i];
//         const puntoClaveX = puntoClave[0] * 20;
//         const puntoClaveY = (puntoClave[1] * 20);
        
//         const distanceToChangePoint = Math.sqrt(
//         Math.pow(this.x - puntoClaveX, 2) + Math.pow(this.y - puntoClaveY, 2)
//     );
//             if(distanceToChangePoint <= this.minDistance && this.tick > 2000) {
//                 this.canChangeDirection = true;
//                 this.tick = 1;

//             } 

//             if (distanceToChangePoint <= this.minDistance && 
//                 (this.lastChangeX !== puntoClaveX || this.lastChangeY !== puntoClaveY)) {
//                     this.tick = 1;
                
//                 this.canChangeDirection = true;
//             }
        

        
//             if(this.x === puntoClaveX && this.y === puntoClaveY && this.canChangeDirection) {

//                 if ((puntoClaveX === 13 * 20 && puntoClaveY === 11 * 20) || (puntoClaveX === 13 * 20 && puntoClaveY === 11 * 20) ) {
//                     this.canChangeDirection = false;
//                     if(pacman.x > puntoClaveX) {
//                         this.vx = 1;
//                         this.vy = 0;
//                         this.currentDirection = RIGHT;
//                         this.image.src = '/assets/img/RIGHT.png';
//                         break;
//                     } else {
//                         this.vx = - 1;
//                         this.vy = 0;
//                         this.currentDirection = LEFT;
//                         this.image.src = '/assets/img/LEFT.png';
//                         break;
//                     }
//                 }
                
//                 this.lastChangeX = puntoClaveX;
//                 this.lastChangeY = puntoClaveY;
                
//                 this.changeDirection(pacman);
//                 this.canChangeDirection = false;
//             }
//     }
// }

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
    changeDirection(pacman) {

    }

    goArround () {


    }
}

