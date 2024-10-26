class Clyde extends Ghost {
    constructor() {
        const [name, position, color, releaseTime] = ghost_positions.C;
        super(ctx, name, position, color, releaseTime);
        this.vy = 0;
        this.vx = 0;

        
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
    
        
       
    
        // for(let i = 0; i < direction_change_positions.length; i++) {
           
        //     const puntoClave =  direction_change_positions[i];
        //     const puntoClaveX = puntoClave[0] * 20;
        //     const puntoClaveY = (puntoClave[1] * 20) - 1;
            
        //     const distanceToChangePoint = Math.sqrt(
        //     Math.pow(this.x - puntoClaveX, 2) + Math.pow(this.y - puntoClaveY, 2)
        // );

        //         if (distanceToChangePoint <= this.minDistance && 
        //             (this.lastChangeX !== puntoClaveX || this.lastChangeY !== puntoClaveY)) {
                    
        //             this.canChangeDirection = true;
        //             console.log(this.canChangeDirection);
        //         }
            

            
        //         if(this.x === puntoClaveX && this.y === puntoClaveY && this.canChangeDirection) {
        //             console.log("ahora puedo girar");
                    
        //             this.lastChangeX = puntoClaveX;
        //             this.lastChangeY = puntoClaveY;
                    
        //             this.changeDirection(pacman);
        //             this.canChangeDirection = false;
        //             console.log(this.currentDirection);
        //             console.log(this.canChangeDirection);
        //         }
        // }
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
                    this.currentDirection = 'right';
                }

                break;
            
            case 'down':
                if(this.x > pacman.x) {
                    this.vx = -1;
                    this.vy = 0;
                    this.currentDirection = 'left';
                }
                else {
                    this.vx = 1;
                    this.vy = 0;
                    this.currentDirection = 'right';
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
                    this.currentDirection = 'down';
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
                    this.currentDirection = 'down';
                }
                break;
    
                default:
                    break;
            }
    }
    onKeyDown(e) {
        super.onKeyDown(e);
    }
}
  