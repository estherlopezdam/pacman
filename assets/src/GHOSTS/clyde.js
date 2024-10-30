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
        
        super.move(pacman);
    }

    changeDirection(pacman) {

       
        // Calcular las distancias en los ejes X e Y entre Pac-Man y el fantasma
        const distanceX = Math.abs(pacman.x - this.x);
        const distanceY = Math.abs(pacman.y - this.y);

        // Evaluar la distancia menor para decidir la dirección a seguir
        if (distanceX > distanceY && (!this.forbiddenDirections.includes(RIGHT) && !this.forbiddenDirections.includes(LEFT)) ) {
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
            if (pacman.y > this.y && !this.forbiddenDirections.includes(DOWN)) {
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
  