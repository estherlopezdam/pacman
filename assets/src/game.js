class Game {
    constructor(ctx) {
        this.ctx = ctx;
        this.intervalID = null;
        this.level = 1;
        this.currentGhost = null;
        this.stars = [];
        this.score = 0;     
        this.bestScore = localStorage.getItem('bestScore') || 0;
        this.playerName = localStorage.getItem('playerName') || 'Player';
        this.lives = 3;
        this.rankings = [];
        
        this.soundOn = true;

        
        this.pacman = new Pacman(this.ctx);        
        

        // Inicialización de los arrays de objetos del mapa
        this.pellets = []; 
        this.powerPellets = [];
        this.walls = [];
        this.ghosts = [];


    }
    initialize() {
        // Crear pantalla de carga
        this.createLoadingScreen();
    }

    createLoadingScreen() {
        // Crear el contenedor de la pantalla de carga
        const loadingScreen = document.createElement('div');
        loadingScreen.id = 'loadingScreen';
        loadingScreen.style.position = 'fixed';
        loadingScreen.style.top = '0';
        loadingScreen.style.left = '0';
        loadingScreen.style.width = '100%';
        loadingScreen.style.height = '100%';
        loadingScreen.style.background = "url('/assets/img/loading-background.png') no-repeat center center fixed";
        loadingScreen.style.backgroundSize = 'cover';
        loadingScreen.style.display = 'flex';
        loadingScreen.style.justifyContent = 'center';
        loadingScreen.style.alignItems = 'center';

        // Contenido del loadingScreen
        const loadingContent = document.createElement('div');
        loadingContent.style.textAlign = 'center';
        loadingContent.style.background = 'rgba(0, 0, 0, 0.7)';
        loadingContent.style.padding = '30px';
        loadingContent.style.borderRadius = '15px';

        // Título
        const title = document.createElement('h1');
        title.textContent = 'Welcome to Pac-Adventures!';
        title.style.color = '#FFD700';
        title.style.marginBottom = '20px';
        loadingContent.appendChild(title);

        // Campo de entrada del nombre del jugador
        const nameInput = document.createElement('input');
        nameInput.type = 'text';
        nameInput.id = 'playerName';
        nameInput.placeholder = 'Enter your name';
        nameInput.style.fontFamily = 'Press Start 2P, cursive';
        nameInput.style.padding = '10px';
        nameInput.style.marginBottom = '20px';
        nameInput.style.width = '80%';
        loadingContent.appendChild(nameInput);

        // Botones
        const buttonsDiv = document.createElement('div');

        // Botón de inicio
        const startButton = document.createElement('button');
        startButton.id = 'startGameButton';
        startButton.textContent = 'Start Game';
        startButton.style.margin = '10px';
        startButton.style.padding = '10px 20px';
        startButton.style.fontFamily = 'Press Start 2P, cursive';
        startButton.style.backgroundColor = '#4CAF50';
        startButton.style.color = '#ffffff';
        startButton.style.border = 'none';
        startButton.style.cursor = 'pointer';
        startButton.addEventListener('click', () => this.startGame(nameInput.value));
        buttonsDiv.appendChild(startButton);

        // Botón de sonido ON/OFF
        const soundButton = document.createElement('button');
        soundButton.id = 'toggleSoundButton';
        soundButton.textContent = 'Sound: ON';
        soundButton.style.margin = '10px';
        soundButton.style.padding = '10px 20px';
        soundButton.style.fontFamily = 'Press Start 2P, cursive';
        soundButton.style.backgroundColor = '#4CAF50';
        soundButton.style.color = '#ffffff';
        soundButton.style.border = 'none';
        soundButton.style.cursor = 'pointer';
        soundButton.addEventListener('click', () => this.toggleSound(soundButton));
        buttonsDiv.appendChild(soundButton);

        // Botón de controles
        const controlsButton = document.createElement('button');
        controlsButton.id = 'controlsButton';
        controlsButton.textContent = 'Controls';
        controlsButton.style.margin = '10px';
        controlsButton.style.padding = '10px 20px';
        controlsButton.style.fontFamily = 'Press Start 2P, cursive';
        controlsButton.style.backgroundColor = '#4CAF50';
        controlsButton.style.color = '#ffffff';
        controlsButton.style.border = 'none';
        controlsButton.style.cursor = 'pointer';
        controlsButton.addEventListener('click', () => this.showControls());
        buttonsDiv.appendChild(controlsButton);

        loadingContent.appendChild(buttonsDiv);
        loadingScreen.appendChild(loadingContent);

        // Añadir la pantalla de carga al body
        document.body.appendChild(loadingScreen);
    }

    startGame(playerName) {
        if (!playerName.trim()) {
            alert('Please enter your name to start the game!');
            return;
        }

        // Guardar nombre del jugador
        this.playerName = playerName;
        localStorage.setItem('playerName', playerName);

        // Ocultar la pantalla de carga y mostrar el juego
        document.getElementById('loadingScreen').style.display = 'none';
        const gameContainer = document.querySelector('.title-container');
        gameContainer.style.visibility = 'visible';
        gameContainer.display = 'block';

        // Iniciar el juego
        this.updateScore();
        this.start();
    }

    toggleSound(button) {
        this.soundOn = !this.soundOn;
        button.textContent = `Sound: ${this.soundOn ? 'ON' : 'OFF'}`;
    }

    showControls() {
        alert('Use arrow keys to move Pac-Man. Avoid ghosts and collect all pellets!');
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

    loseLife() {
        // Reducir el número de vidas y actualizar la pantalla
        if (this.lives > 0) {
            this.lives--;
            this.initializeLives(); // Actualizar la visualización de las vidas
        }

        // Si el jugador se queda sin vidas, terminar el juego
        if (this.lives <= 0) {
            this.gameOver();
        }
    }

    restartGame() {
        // Reiniciar el puntaje y empezar una nueva partida
        this.score = 0;
        this.level = 1;
        this.lives = 3;
        this.ghosts = [];
        this.start();
    }

    nextLevel() {
        if (this.powerPellets.length === 0 && this.pellets.length === 0) {
            this.level++;
            this.pacman = new Pacman(this.ctx);
            this.start();
        }
        
    }   
    
    
    increaseScore() {
        if (this.score > this.bestScore) {
            this.bestScore = this.score;
            localStorage.setItem('bestScore', this.bestScore);
        }
        this.updateScore();
    }

    updateScore() {
        document.getElementById('score').textContent = `Score: ${this.score}`;
        document.getElementById('bestScore').textContent = `Best Score: ${this.bestScore}`;
    }
   
    

    start() {    

        this.clear();
        this.initGhost();
        this.initWalls(wall_position);
        this.initPellets(pellet_positions, powerPellets_positions);
        
        this.updateScore();
        
       
        this.intervalID = setInterval(() => {
        
            this.clear();
            


            this.draw();
            this.move();
            this.increaseScore();
            
            this.initializeLives();


            this.checkCollisions(this.pacman, this.walls, this.powerPellets,this.pellets, this.ghosts);
            this.nextLevel();

            
                
 
        }, 1000 / 60);
    }
    gameOver() {

        clearInterval(this.intervalID);
        this.clear();
        this.updateRanking();
        // Obtener el contenedor del cuerpo o crear un elemento para mostrar la pantalla de Game Over
        const gameOverContainer = document.createElement('div');
        gameOverContainer.classList.add('game-over-container');
    
        // Título de Game Over
        const gameOverTitle = document.createElement('h1');
        gameOverTitle.classList.add('game-over-title');
        gameOverTitle.textContent = 'Game Over';
        gameOverContainer.appendChild(gameOverTitle);
    
        // Título del ranking
        const rankingTitle = document.createElement('h2');
        rankingTitle.classList.add('ranking-title');
        rankingTitle.textContent = 'Ranking Top 10';
        gameOverContainer.appendChild(rankingTitle);
    
        // Lista del ranking
        const rankingList = document.createElement('ul');
        rankingList.classList.add('ranking-list');
    
        // Suponiendo que los puntajes están almacenados en `this.highScores`
        this.rankings
          .sort((a, b) => b.score - a.score)
          .slice(0, 10)
          .forEach((score, index) => {
            const listItem = document.createElement('li');
            
            // Posición
            const position = document.createElement('span');
            position.classList.add('position');
            position.textContent = `#${index + 1}`;
            listItem.appendChild(position);
            
            // Nombre del jugador
            const name = document.createElement('span');
            name.classList.add('name');
            name.textContent = score.name;
            listItem.appendChild(name);
            
            // Puntaje del jugador
            const scoreElement = document.createElement('span');
            scoreElement.classList.add('score');
            scoreElement.textContent = score.score;
            listItem.appendChild(scoreElement);
    
            rankingList.appendChild(listItem);
          });
    
            gameOverContainer.appendChild(rankingList);
        
            // Botón para reintentar
            const retryButton = document.createElement('button');
            retryButton.classList.add('retry-button');
            retryButton.textContent = 'Reintentar';
            retryButton.addEventListener('click', () => {
            this.resetGame();
            });
            gameOverContainer.appendChild(retryButton);
        
            // Limpiar la pantalla del juego y mostrar el contenedor de Game Over
            document.body.innerHTML = '';
            document.body.appendChild(gameOverContainer);
      }

    gameOver() {
        clearInterval(this.intervalID);
        this.clear();
       

        // Actualizar ranking con el puntaje actual
        this.updateRanking();

        // Mostrar el ranking de los mejores jugadores
        this.showRanking();
    }
   

    

    updateRanking() {
        // Obtener el ranking actual desde localStorage
        this.rankings = JSON.parse(localStorage.getItem('rankings')) || [];

        // Añadir el puntaje del jugador actual
        this.rankings.push({ name: this.playerName, score: this.score });

        // Ordenar el ranking por el puntaje, de mayor a menor
       this.rankings.sort((a, b) => b.score - a.score);

        // Mantener solo los 10 mejores
        if (this.rankings.length > 10) this.rankings.pop();

        // Guardar el ranking actualizado en localStorage
        localStorage.setItem('rankings', JSON.stringify(this.rankings));
    }

    showRanking() {
        const gameOverContainer = document.createElement('div');
        gameOverContainer.classList.add('game-over-container');
    
        // Título de Game Over
        const gameOverTitle = document.createElement('h1');
        gameOverTitle.classList.add('game-over-title');
        gameOverTitle.textContent = 'Game Over';
        gameOverContainer.appendChild(gameOverTitle);
    
        // Título del ranking
        const rankingTitle = document.createElement('h2');
        rankingTitle.classList.add('ranking-title');
        rankingTitle.textContent = 'Ranking Top 10';
        gameOverContainer.appendChild(rankingTitle);
    
        // Lista del ranking
        const rankingList = document.createElement('ul');
        rankingList.classList.add('ranking-list');
    
        // Obtener el ranking desde localStorage y mostrarlo
        this.rankings = JSON.parse(localStorage.getItem('rankings')) || [];

         // Suponiendo que los puntajes están almacenados en `this.highScores`
         this.rankings
         .sort((a, b) => b.score - a.score)
         .slice(0, 10)
         .forEach((score, index) => {
           const listItem = document.createElement('li');
           
           // Posición
           const position = document.createElement('span');
           position.classList.add('position');
           position.textContent = `#${index + 1}`;
           listItem.appendChild(position);
           
           // Nombre del jugador
           const name = document.createElement('span');
           name.classList.add('name');
           name.textContent = score.name;
           listItem.appendChild(name);
           
           // Puntaje del jugador
           const scoreElement = document.createElement('span');
           scoreElement.classList.add('score');
           scoreElement.textContent = score.score;
           listItem.appendChild(scoreElement);
   
           rankingList.appendChild(listItem);
         });
   
           gameOverContainer.appendChild(rankingList);
       
           // Botón para reintentar
           const retryButton = document.createElement('button');
           retryButton.classList.add('retry-button');
           retryButton.textContent = 'Reintentar';
           retryButton.addEventListener('click', () => {
           this.resetGame();
           });
           gameOverContainer.appendChild(retryButton);
       
           // Limpiar la pantalla del juego y mostrar el contenedor de Game Over
           document.body.innerHTML = '';
           document.body.appendChild(gameOverContainer);

    }

    draw() {
        
        this.walls.forEach(wall => wall.draw());

        this.pellets.forEach(pellet => pellet.draw());
        this.powerPellets.forEach(powerPellet => powerPellet.draw());
        this.pacman.draw();
        
        this.ghosts.forEach(ghost => {
           
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
            ghost.forbiddenDirections = [];
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
                    if (object.objectType === 'ghost') {
                        this.handleCollisionWithGhost(pacman);
                        this.loseLife();
                    }    
                    if (object.objectType === 'powerpellet') {

                        this.score += 10;
                        this.powerPellets = this.powerPellets.filter(p => !(p === object));
                    }                    
                    if(object.objecType === 'pellet') {
                        this.score += 5;
                        this.pellets = this.pellets.filter(p => !(p === object));
                    }
                    if( this.pellets.length === 0 && this.powerPellets.length === 0) this.nextLevel();
                }
            }
         
        }
    }

    ghostHandleCollisionWithWall(ghost, wall) {  
               
        
            switch (ghost.currentDirection) {
                case UP:                    
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
            ghost.forbiddenDirections.push(ghost.currentDirection);
            ghost.changeDirection(this.pacman);                
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

    initializeLives() {
        // Crear el contenedor de vidas
        let livesContainer = document.getElementById('livesContainer');
        if (!livesContainer) {
            livesContainer = document.createElement('div');
            livesContainer.id = 'livesContainer';
            livesContainer.style.display = 'flex';
            livesContainer.style.justifyContent = 'center';
            livesContainer.style.marginBottom = '20px';
           // Añadir el contenedor de vidas al comienzo del game-container
            const gameContainer = document.querySelector('.title-container');
            if (gameContainer) {
                gameContainer.appendChild(livesContainer);
            } 
        }

        // Limpiar cualquier corazón existente
        livesContainer.innerHTML = '';

        // Añadir corazones según la cantidad de vidas
        for (let i = 0; i < this.lives; i++) {
            const heart = document.createElement('span');
            heart.className = 'life-heart';
            heart.innerHTML = '❤️'; // Puedes usar un icono de corazón o una imagen
            heart.style.fontSize = '24px';
            heart.style.margin = '0 5px';
            livesContainer.appendChild(heart);
        }
    }


}