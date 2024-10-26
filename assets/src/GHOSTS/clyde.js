class Clyde extends Ghost {
    constructor() {
        const [name, position, color, releaseTime] = ghost_positions.C;
        super(ctx, name, position, color, releaseTime);
        this.vy = 0;
        this.vx = 0;
        this.image.src = '/assets/img/clyde/stop.png';

        
    }

    draw() {        
        super.draw();
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
            this.vy = -1;  // Iniciar movimiento hacia arriba
        }

        this.tick++;
        
       
    
        for(let i = 0; i < direction_change_positions.length; i++) {
           
            const puntoClave =  direction_change_positions[i];
            const puntoClaveX = puntoClave[0] * 20;
            const puntoClaveY = (puntoClave[1] * 20);
            
            const distanceToChangePoint = Math.sqrt(
            Math.pow(this.x - puntoClaveX, 2) + Math.pow(this.y - puntoClaveY, 2)
        );

                if (distanceToChangePoint <= this.minDistance && 
                    (this.lastChangeX !== puntoClaveX || this.lastChangeY !== puntoClaveY)) {
                    
                    this.canChangeDirection = true;
                }
            

            
                if(this.x === puntoClaveX && this.y === puntoClaveY && this.canChangeDirection) {

                    if ((puntoClaveX === 13 * 20 && puntoClaveY === 11 * 20) || (puntoClaveX === 13 * 20 && puntoClaveY === 11 * 20) ) {
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

    changeDirection(pacman) {
        // Calcular las distancias en los ejes X e Y entre Pac-Man y el fantasma
        const distanceX = Math.abs(pacman.x - this.x);
        const distanceY = Math.abs(pacman.y - this.y);

        // Evaluar la distancia menor para decidir la dirección a seguir
        if (distanceX > distanceY) {
            // Si la distancia en X es mayor, elegir moverse en el eje X
            if (pacman.x > this.x) {
                // Pac-Man está a la derecha
                this.vx = 1;
                this.vy = 0;
                this.currentDirection = RIGHT;
            } else {
                // Pac-Man está a la izquierda
                this.vx = -1;
                this.vy = 0;
                this.currentDirection = LEFT;
            }
        } else {
            // Si la distancia en Y es mayor o igual, elegir moverse en el eje Y
            if (pacman.y > this.y) {
                // Pac-Man está abajo
                this.vx = 0;
                this.vy = 1;
                this.currentDirection = DOWN;
                

            } else {
                // Pac-Man está arriba
                this.vx = 0;
                this.vy = -1;
                this.currentDirection = UP;
            }
        }
    }

    onKeyDown(e) {
        super.onKeyDown(e);
    }
}
  