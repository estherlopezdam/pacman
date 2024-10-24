class Clyde extends Ghost {
    constructor() {
        const [name, position, color, releaseTime] = ghost_positions.C;
        super(ctx, name, position, color, releaseTime);
        this.vy = 0;
        this.vx = 0;
        this.changeDelay = 10;  // Número de ticks que Clyde debe esperar antes de cambiar de dirección
        this.delayCounter = 0;

        
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
    
        
        console.log("estoy en x " , this.x)
        console.log("estoy en y" , this.y)
    
        for(let i = 0; i < direction_change_positions.length; i++) {
            const puntoClave =  direction_change_positions[i];
            const puntoClaveX = puntoClave[0] * 20;
            const puntoClaveY = (puntoClave[1] * 20) - 1;
            

            if (this.delayCounter < this.changeDelay) {
                this.delayCounter++;  // Incrementa el contador de retardo
            } else {
                if(this.x === puntoClaveX && this.y === puntoClaveY) {
                    console.log("ahora puedo girar");
        
                    console.log(this.currentDirection);
                    
                    this.changeDirection(pacman);
                    console.log(this.currentDirection);// Permitir cambiar de dirección solo si el retardo ha pasado
                this.delayCounter = 0;  // Reiniciamos el contador después de cambiar de dirección
            }  

        } 
            
        }
    }
    

    changeDirection(pacman) {
        switch (this.currentDirection) {
            case 'up':
                if(this.x > pacman.x) {
                    this.vx = -1;
                    this.vy = 0;
    
                    this.currentDirection = 'left';
                }
                else if(this.x < pacman.x){
                    this.vx = 1;
                    this.vy = 0;
                    this.currentDirection = 'right'
                }

                break;
            
            case 'down':
                if(this.x > pacman.x + pacman.sice) {
                    this.vx = -1;
                    this.vy = 0;
                    this.currentDirection = 'left';
                }
                else {
                    this.vx = 1;
                    this.vy = 0;
                    this.currentDirection = 'right'
                }
                break;

            case 'left':
            if(this.y > pacman.y) {
                this.vy = -1;
                this.vx = 0;
                this.currentDirection = 'up';
            }
            else {
                this.vy = 1;
                this.vx = 0;
                this.currentDirection = 'down'
            }
            break;

            case 'right':
            if(this.y >  pacman.y) {
                this.vy = -1;
                this.vx = 0;
                this.currentDirection = 'up';
            }
            else {
                this.vy = 1;
                this.vx = 0;
                this.currentDirection = 'down'
            }
            break;
    
            default:
                break;
        }
    }
}
  