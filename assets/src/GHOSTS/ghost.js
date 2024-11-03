class Ghost {
    constructor(ctx, level, name,startPosition, color, releaseTime) {
        this.ctx = ctx;
        this.level = level;
        this.incrementFactor = 0.02;
        this.name = name;
        this.color = color;
        this.position = startPosition; // [x, y]
        this.releaseTime = releaseTime - ((this.level - 1) * this.incrementFactor);
        this.objectType = 'ghost';
        this.size = 20;
        this.tick = 0;  
        this.currentDirection = null;
        this.canChangeDirection = false;
        this.minDistance = (3 / 4) * this.size;
        this.lastChangeX = 0;
        this.lastChangeY = 0;
        this.currentGhost = null;
        this.forbiddenDirections = [];
        this.image = new Image();
        this.currentDirection = UP;
        this.name2 = 'blue';
        

        //this.level = level;  // Ghost level
        // this.factorAceleration = factorAceleration;  // Acceleration factor to adjust the speed

          
        // Initialize the direction and the speed
        this.x = this.position[0] * 20;  // Initial position in the X axis
        this.y = this.position[1] * 20;  // Initial position in the Y axis
        this.vx = 0;  // Speed in the X axis
        this.vy = 0;  // Speed in the Y axis
}

// Method for drawing the ghost
draw(powerPelletActive) {
    if(powerPelletActive) {

        setTimeout(() => {
            this.name2 = 'white';          
        }, 7000);
        this.resetImage(this.name2);

       
        

    } else {
        this.resetImage(this.name);
    }
    this.ctx.drawImage(this.image, this.x, this.y, 20, 20);
   
    
    
    
}
resetImage(name) {
    
    
    switch (this.currentDirection) {
        case UP:
            this.image.src = `assets/img/${name}/UP.png`;          
            
            break;
        case DOWN:
            this.image.src = `assets/img/${name}/DOWN.png`;          
            
            break;
        case LEFT:
            this.image.src = `assets/img/${name}/LEFT.png`;          
            
            break;
        case RIGHT:
            this.image.src = `assets/img/${name}/RIGHT.png`;          
            
            break;
    
        default:
            break;
    }
}


move(pacman, powerPelletActive) {
    this.x += this.vx;
    this.y += this.vy;     

    // Wait until the releaseTime has fulfilled
    if (this.tick < this.releaseTime) {
        this.tick++;
        return; // Do nothing until the tick reaches the releaseTime 
    }

    // Once the tick reaches the releaseTime, start the movement
    if (this.tick === this.releaseTime) {
        this.currentDirection = UP;
        this.vy = -1;  // Initiate the movement upwards
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
                
                this.changeDirection(pacman, powerPelletActive);
                this.canChangeDirection = false;
            }
    }
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
    
    changeDirection(pacman, powerPelletActive) {

        if(!powerPelletActive) {
             // Calculate the distances in the X and Y axes between Pac-Man and the ghost
        const distanceX = Math.abs(pacman.x - this.x);
        const distanceY = Math.abs(pacman.y - this.y);

        // Evaluate the less distance to decide the direction to follow
        if (distanceX > distanceY && (!this.forbiddenDirections.includes(RIGHT) && !this.forbiddenDirections.includes(LEFT)) ) {
            // If the distance in X is greater, choose to move in the X axis
            if (pacman.x > this.x) {
                // Pac-Man is in the right
                this.vx = 1;
                this.vy = 0;
                this.currentDirection = RIGHT;
            } else {
                // Pac-Man is in the left
                this.vx = -1;
                this.vy = 0;
                this.currentDirection = LEFT;
            }
        } else {
            // If the distance in Y is greater or equal, choose to move in the Y axis
            if (pacman.y > this.y && !this.forbiddenDirections.includes(DOWN)) {
                // Pac-Man is below
                this.vx = 0;
                this.vy = 1;
                this.currentDirection = DOWN;
                

            } else {
                // Pac-Man is above
                this.vx = 0;
                this.vy = -1;
                this.currentDirection = UP;
            }
        }

        } else {
             // Calculate the distances in the X and Y axes between Pac-Man and the ghost
        const distanceX = Math.abs(pacman.x - this.x);
        const distanceY = Math.abs(pacman.y - this.y);

        // Evaluate the less distance to decide the direction to follow
        if (distanceX > distanceY && (!this.forbiddenDirections.includes(RIGHT) && !this.forbiddenDirections.includes(LEFT)) ) {
            // If the distance in X is greater, choose to move in the X axis
            if (pacman.x > this.x) {
                // Pac-Man is in the right
                this.vx = -0.5;
                this.vy = 0;
                this.currentDirection = LEFT;
            } else {
                // Pac-Man is in the left
                this.vx = 0.5;
                this.vy = 0;
                this.currentDirection = RIGHT;
            }
        } else {
            // If the distance in Y is greater or equal, choose to move in the Y axis
            if (pacman.y > this.y && !this.forbiddenDirections.includes(DOWN)) {
                // Pac-Man is below
                this.vx = 0;
                this.vy = -0.5;
                this.currentDirection = UP;
                

            } else {
                // Pac-Man is above
                this.vx = 0;
                this.vy = 0.5;
                this.currentDirection = DOWN;
            }
        }

        }
       
    }

}

