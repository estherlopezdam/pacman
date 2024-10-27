class Game {
    constructor(ctx) {
        this.ctx = ctx;
        this.intervalID = null;
        this.level = 1;
        this.tick = 0;
        this.currentGhost = null;

        ; 
        this.pacman = new Pacman(this.ctx);    

        // Inicializar el SpriteManager con la hoja de sprites y el número de frames
        this.spriteManager = new SpriteManager(this.ctx);
        
        //this.bg = new Background(this.ctx);

        // Inicialización de los arrays de objetos del mapa
        this.pellets = []; 
        this.powerPellets = [];
        this.walls = [];
        this.ghosts = [];


    }


   
    initWalls(wall_position) {
        this.walls = Wall.createWalls(this.ctx, wall_position);
        
    }

    initPellets(pellet_positions, powerPellets_positions) {
        this.pellets = Pellet.createPellets(this.ctx, pellet_positions);
        this.powerPellets = PowerPellet.createPellets(this.ctx, powerPellets_positions);
    }

    initGhost() {
        const blinky = new Blinky(this.ctx);
        const pinky = new Pinky(this.ctx);
        const inky = new Inky(this.ctx);
        const clyde = new Clyde(this.ctx);
        this.ghosts.push(blinky);
        this.ghosts.push(pinky);
        this.ghosts.push(inky);
        this.ghosts.push(clyde);
        
    }

    nextLevel() {
        if (this.powerPellets.length === 0 && this.pellets.length === 0) {
            this.level++;
            this.initGhost();
            this.initWalls(wall_position);
            this.initPellets(pellet_positions, powerPellets_positions);
            this.pacman = new Pacman(this.ctx);
        }

        
    }
    

    start() {    

       
        this.initGhost();
        this.initWalls(wall_position);
        this.initPellets(pellet_positions, powerPellets_positions);
        
       
        this.intervalID = setInterval(() => {
        
            this.clear();
            


            this.draw();
            this.move();

            this.tick++;


            this.checkCollisions(this.pacman, this.walls, this.powerPellets,this.pellets, this.ghosts);
            this.nextLevel();

            
                
 
        }, 1000 / 60);
    }

    draw() {
        this.walls.forEach(wall => wall.draw());

        this.pellets.forEach(pellet => pellet.draw());
        this.powerPellets.forEach(powerPellet => powerPellet.draw());
        //this.spriteManager.resetImage(this.pacman);
        this.pacman.draw();
        
        this.ghosts.forEach(ghost => {
           // this.spriteManager.resetImage(ghost) 
            ghost.draw()});
    }
    


    move() {
        this.pacman.move();
        this.ghosts.forEach(ghost => ghost.move(this.pacman));

    }

    clear() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }

    onKeyDown(e) {
        this.pacman.onKeyDown(e);
        this.ghosts.forEach(ghost => {
            if(this.currentGhost === ghost.name) ghost.onKeyDown(e);
        })


       
        switch (e.keyCode) {
            case BLINKY:
                this.currentGhost = 'blinky';
                
                break;
            case PINKY:
                this.currentGhost = 'pinky';
                break;
            case INKY:
                this.currentGhost = 'inky';
                break;
            case CLYDE:
                this.currentGhost = 'clyde';
                break;

        
            default:
               
                break;
        }
       
        
    }

    checkCollisions(pacman, walls, powerpellets, pellets, ghosts) {

        if(pacman.x + pacman.size < 0) pacman.x = this.ctx.canvas.width;
        if(pacman.x - pacman.size > this.ctx.canvas.width) pacman.x = 0;
        this.checkCollision(pacman, walls);
        this.checkCollision(pacman, powerpellets);
        this.checkCollision(pacman, pellets);
        this.checkCollision(pacman, ghosts);
        this.checkGhostCollision(ghosts, walls);
    }

    checkGhostCollision(ghosts, walls) {
        ghosts.forEach(ghost => {
            walls.forEach(wall => {
                if (wall.y + wall.size > ghost.y // El borde inferior del objeto está por debajo del borde superior de Pac-Man
                    && wall.y < ghost.y + ghost.size // El borde superior del objeto está por encima del borde inferior de Pac-Man
                    && wall.x + wall.size > ghost.x // El borde derecho del objeto está a la derecha del borde izquierdo de Pac-Man
                    && ghost.x + ghost.size > wall.x) {
                        ghost.vy = 0;
                        ghost.vx = 0;
                        this.ghostHandleCollisionWithWall(ghost, wall);
                    }

            

            })
        })
    }
    

    checkCollision(pacman, objectsArray) {

        const pacmanX = pacman.x;
        const pacmanY = pacman.y;
        for (let i = 0; i < objectsArray.length; i++) {
            const object = objectsArray[i];
    
            // Detectar colisión con paredes (Pac-Man cuadrado vs pared cuadrada)
            if (object.objectType === 'wall' || object.objectType === 'ghost' || object.objecType === 'powerpellet' || object.objecType === 'pellet') {
                if (object.y + object.size > pacmanY // El borde inferior del objeto está por debajo del borde superior de Pac-Man
                    && object.y < pacmanY + pacman.size // El borde superior del objeto está por encima del borde inferior de Pac-Man
                    && object.x + object.size > pacmanX // El borde derecho del objeto está a la derecha del borde izquierdo de Pac-Man
                    && pacmanX + pacman.size > object.x) { // El borde izquierdo de Pac-Man está a la izquierda del borde derecho del objeto
                    this.vy = 0;
                    this.vx = 0;
                    if (object.objectType === 'wall') this.handleCollisionWithWall(pacman, object);
                    if (object.objectType === 'ghost') this.handleCollisionWithGhost(pacman);
                    if (object.objectType === 'powerpellet') this.powerPellets = this.powerPellets.filter(p => !(p === object));                    
                    if(object.objecType === 'pellet') this.pellets = this.pellets.filter(p => !(p === object));
                }
            }
            // // Colisión entre Pac-Man (cuadrado) y pellets/power pellets (círculos)
            // else if (object.objectType === 'pellet') {
            //     const distX = Math.abs(object.x - (pacman.x + pacman.size / 2)); // Distancia en X desde el centro del pellet al centro de Pac-Man
            //     const distY = Math.abs(object.y - (pacman.y + pacman.size / 2)); // Distancia en Y desde el centro del pellet al centro de Pac-Man
    
            //     // Si la distancia es mayor que la mitad del cuadrado más el radio, no hay colisión
            //     if (distX > (pacman.size / 2 + object.radius) || distY > (pacman.size / 2 + object.radius)) {
            //         continue;
            //     }
    
            //     // Si la distancia en X o Y es menor que la mitad del cuadrado, hay colisión
            //     if (distX <= (pacman.size / 2) || distY <= (pacman.size / 2)) {
            //         if (object.objectType === 'pellet') {
            //             this.pellets = this.pellets.filter(p => !(p.x === object.x && p.y === object.y));
            //         } else if (object.objectType === 'powerpellet') {
            //             this.powerPellets = this.powerPellets.filter(p => !(p.x === object.x && p.y === object.y));
            //         }
            //     }
    
            //     // Comprobación final si hay colisión en las esquinas del cuadrado
            //     const dx = distX - pacman.size / 2;
            //     const dy = distY - pacman.size / 2;
            //     if ((dx * dx + dy * dy) <= (object.radius * object.radius)) {
            //         if (object.objectType === 'pellet') {
            //             this.pellets = this.pellets.filter(p => !(p.x === object.x && p.y === object.y));
            //         } else if (object.objectType === 'powerpellet') {
            //             this.powerPellets = this.powerPellets.filter(p => !(p.x === object.x && p.y === object.y));
            //         }
            //     }
            // }
        }
    }

    ghostHandleCollisionWithWall(ghost, wall) {         
        
            switch (ghost.currentDirection) {
                case UP:
                    // Pac-Man se mueve hacia arriba, ajústalo hacia abajo
                    ghost.y = wall.y + wall.height;
                    break;
        
                case DOWN:
                    // Pac-Man se mueve hacia abajo, ajústalo hacia arriba
                    ghost.y = wall.y - ghost.size;
                    break;
        
                case LEFT:
                    // Pac-Man se mueve hacia la izquierda, ajústalo hacia la derecha
                    ghost.x = wall.x + wall.width;
                    break;
        
                case RIGHT:
                    // Pac-Man se mueve hacia la derecha, ajústalo hacia la izquierda
                    ghost.x = wall.x - ghost.size;
                    break;
        
                default:
                    break;
            }                        
    }

    handleCollisionWithWall(pacman, wall) {
        // Ajustar la posición de Pac-Man basado en la dirección actual
        switch (pacman.currentDirection) {
            case UP:
                // Pac-Man se mueve hacia arriba, ajústalo hacia abajo
                pacman.y = wall.y + wall.height;
                break;
    
            case DOWN:
                // Pac-Man se mueve hacia abajo, ajústalo hacia arriba
                pacman.y = wall.y - pacman.size;
                break;
    
            case LEFT:
                // Pac-Man se mueve hacia la izquierda, ajústalo hacia la derecha
                pacman.x = wall.x + wall.width;
                break;
    
            case RIGHT:
                // Pac-Man se mueve hacia la derecha, ajústalo hacia la izquierda
                pacman.x = wall.x - pacman.size;
                break;
    
            default:
                break;
        }
    }  
        
    handleCollisionWithGhost(pacman) {
        // Reiniciar la posición de Pac-Man
        this.pacman = new Pacman(this.ctx);
        
        // Reiniciar todos los fantasmas
        this.ghosts = this.ghosts.map(ghost => {
            switch (ghost.name) {
                case 'blinky':
                    return new Blinky(this.ctx);
                case 'pinky':
                    return new Pinky(this.ctx);
                case 'inky':
                    return new Inky(this.ctx);
                case 'clyde':
                    return new Clyde(this.ctx);
                default:
                    return ghost;
            }
        });
    }


}