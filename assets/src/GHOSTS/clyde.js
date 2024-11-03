class Clyde extends Ghost {
    constructor(ctx, level) {
        const [name, position, color, releaseTime] = ghost_positions.C;
        super(ctx, level, name, position, color, releaseTime);
        this.vy = 0;
        this.vx = 0;
        this.image.src = 'assets/img/clyde/stop.png';

        
    }

    draw(powerPelletActive) {
        super.draw(powerPelletActive);
    }

    move(pacman, powerPelletActive) {
        super.move(pacman, powerPelletActive);    
    }
    changeDirection(pacman, powerPelletActive) {
         super.changeDirection(pacman, powerPelletActive);
    }

    // changeDirection(pacman) {
    //     // Calculate the distances in the X and Y axes between Pac-Man and the ghost
    //     const distanceX = Math.abs(pacman.x - this.x);
    //     const distanceY = Math.abs(pacman.y - this.y);

    //     // Evaluate the less distance to decide the direction to follow
    //     if (distanceX > distanceY && (!this.forbiddenDirections.includes(RIGHT) && !this.forbiddenDirections.includes(LEFT)) ) {
    //         // If the distance in X is greater, choose to move in the X axis
    //         if (pacman.x > this.x) {
    //             // Pac-Man is in the right
    //             this.vx = 1;
    //             this.vy = 0;
    //             this.currentDirection = RIGHT;
    //         } else {
    //             // Pac-Man is in the left
    //             this.vx = -1;
    //             this.vy = 0;
    //             this.currentDirection = LEFT;
    //         }
    //     } else {
    //         // If the distance in Y is greater or equal, choose to move in the Y axis
    //         if (pacman.y > this.y && !this.forbiddenDirections.includes(DOWN)) {
    //             // Pac-Man is below
    //             this.vx = 0;
    //             this.vy = 1;
    //             this.currentDirection = DOWN;
                

    //         } else {
    //             // Pac-Man is above
    //             this.vx = 0;
    //             this.vy = -1;
    //             this.currentDirection = UP;
    //         }
    //     }
    // }

    onKeyDown(e) {
        super.onKeyDown(e);
    }
  
}
  