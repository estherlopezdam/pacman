class Game {
    constructor(ctx) {
        this.ctx = ctx;
        this.intervalID = null;
        this.level = 1;
        this.tick = 0;

        this.pacman = new Pacman(this.ctx);
        //this.bg = new Background(this.ctx);

        // Inicialización de los arrays de objetos del mapa
        this.pellets = []; 
        this.powerPellets = [];
        this.walls = [];
        this.ghosts = [];


    }

    // Método para crear las paredes en el mapa
      // Método para inicializar las paredes llamando al método estático de Wall
    initWalls(wall_position) {
        this.walls = Wall.createWalls(this.ctx, wall_position);
        
    }

    initPellets(pellet_positions, powerPellets_positions) {
        this.pellets = Pellet.createPellets(this.ctx, pellet_positions);
        this.powerPellets = powerPellet.createPellets(this.ctx, powerPellets_positions);
    }
    

    start() {

        this.initWalls(wall_position);
        this.initPellets(pellet_positions, powerPellets_positions);
        // this.pellets = this.createPellets();  // Llenar el mapa con pellets
        // this.powerPellets = this.createPowerPellets();  // Llenar el mapa con Power Pellets
        // this.walls = this.createWalls();  // Inicializar las paredes
        // this.ghosts = this.createGhosts();  // Inicializar fantasmas    
        this.intervalID = setInterval(() => {
            this.clear();

            this.draw();
           // this.move();

            this.tick++;

           // this.checkCollisions();

        }, 1000 / 60);
    }

    draw() {
        this.walls.forEach(wall => wall.draw());

        this.pellets.forEach(pellet => pellet.draw());
        this.powerPellets.forEach(powerPellet => powerPellet.draw());

        this.pacman.draw();
    }


    move() {

    }

    clear() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }

    checkCollision(pacman, objectsArray) {
        for (let i = 0; i < objectsArray.length; i++) {
            const object = objectsArray[i];

                    // Detectar colisión
            if (detectCollision(pacman, object)) {
                return object; // Si hay colisión, devuelve el objeto con el que colisionó
            }
        }
    return null;

    }

    detectCollision(pacman, object) {
        
        const distX = pacman.x - object.x;
        const distY = pacman.y - object.y;
        const distance = Math.sqrt(distX * distY + distY * distY);
      
        // Si la distancia es menor que la suma de los radios, hay colisión (ajustar si es cuadrado/rectángulo) es decir si es true hay colision si es false no la hay
        return distance < (pacman.radius + object.radius); // Para objetos circulares
    }

    checkCollisions() {
        // Colisión con fantasmas
            const ghostCollision = this.checkCollision(this.pacman, this.ghosts);
            if (ghostCollision) {
            console.log("Pac-Man ha colisionado con un fantasma.");
            this.handleGhostCollision(ghostCollision);
            }
        
            // Colisión con pellets
            const pelletCollision = this.checkCollision(this.pacman, this.pellets);
            if (pelletCollision) {
            console.log("Pac-Man ha comido un pellet.");
            this.handlePelletCollision(pelletCollision);
            }
        
            // Colisión con frutas
            const fruitCollision = this.checkCollision(this.pacman, this.fruits);
            if (fruitCollision) {
            console.log("Pac-Man ha comido una fruta.");
            this.handleFruitCollision(fruitCollision);
            }
        
            // Colisión con power pellets
            const powerPelletCollision = this.checkCollision(this.pacman, this.powerPellets);
            if (powerPelletCollision) {
            console.log("Pac-Man ha comido un Power Pellet.");
            this.handlePowerPelletCollision(powerPelletCollision);
            }

            //colision con los muros
            const wallCollisions = this.checkCollision(this.pacman, this.walls);
            if (wallCollisions) {
            console.log("Pac-Man ha chocado con un muro");
            this.handlePowerWallCollision(wallCollisions);
            }
        }
            
            
     

        // Método genérico que verifica colisiones con una lista de objetos
    checkCollision(pacman, objectsArray) {
        for (let i = 0; i < objectsArray.length; i++) {
        const object = objectsArray[i];
        // Si se detecta colisión, devuelve el objeto colisionado
        if (this.detectCollision(pacman, object)) {
            return object;
        }
        }
        return null;  // Si no hay colisión, devuelve null
    }

    // Método de detección de colisión (puedes adaptarlo según tu lógica)
    detectCollision(pacman, object) {
        const distX = pacman.x - object.x;
        const distY = pacman.y - object.y;
        const distance = Math.sqrt(distX * distX + distY * distY);
        return distance < (pacman.radius + object.radius);  // Si hay colisión, devuelve true
    }

    handleGhostCollision(ghost) {
        console.log('Manejando colisión con un fantasma.');
        // Aquí podrías manejar la pérdida de una vida o el estado de invencibilidad
        }
    
    handlePelletCollision(pellet) {
        console.log('Manejando colisión con un pellet.');
        // Elimina el pellet colisionado del array de pellets
        this.pellets = this.pellets.filter(p => p !== pellet);  // Solo mantiene los pellets que no han colisionado
    }
    
    handleFruitCollision(fruit) {
        console.log('Manejando colisión con una fruta.');
        // Elimina la fruta colisionada del array de frutas
        this.fruits = this.fruits.filter(f => f !== fruit);  // Solo mantiene las frutas que no han colisionado
    }
    
    handlePowerPelletCollision(powerPellet) {
        console.log('Manejando colisión con un Power Pellet.');
        // Elimina el power pellet colisionado del array de power pellets
        this.powerPellets = this.powerPellets.filter(pp => pp !== powerPellet);  // Solo mantiene los power pellets que no han colisionado
    }
    

    
}