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
        this.lives = 0;
        this.rankings = [];        
        this.soundOn = true;
        this.powerPelletActive = false;

        
        this.pacman = new Pacman(this.ctx);     
        this.soundManager = new SoundManager(ctx);   
        
        // Initialize the objects array 
        this.pellets = []; 
        this.powerPellets = [];
        this.walls = [];
        this.ghosts = [];


    }
    initialize() {
        // Create the loading screen
        this.createLoadingScreen();
    }

    createLoadingScreen() {
        // Create the loading screen container
        const loadingScreen = document.createElement('div');
        loadingScreen.id = 'loadingScreen';
        loadingScreen.style.position = 'fixed';
        loadingScreen.style.top = '0';
        loadingScreen.style.left = '0';
        loadingScreen.style.width = '100%';
        loadingScreen.style.height = '100%';
        loadingScreen.style.background = "url('assets/img/loading-background.png') no-repeat center center fixed";
        loadingScreen.style.backgroundSize = 'cover';
        loadingScreen.style.display = 'flex';
        loadingScreen.style.justifyContent = 'center';
        loadingScreen.style.alignItems = 'center';

        // Content of the loadingScreen
        const loadingContent = document.createElement('div');
        loadingContent.style.textAlign = 'center';
        loadingContent.style.background = 'rgba(0, 0, 0, 0.7)';
        loadingContent.style.padding = '30px';
        loadingContent.style.borderRadius = '15px';

        // Title
        const title = document.createElement('h1');
        title.textContent = 'Welcome to Pac-Adventures!';
        title.style.color = '#FFD700';
        title.style.marginBottom = '20px';
        loadingContent.appendChild(title);

        // Input blank for the player's name
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

        // Start button
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

        // Sound button ON/OFF
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
        soundButton.addEventListener('click', () => this.tooggleSound(soundButton));
        buttonsDiv.appendChild(soundButton);

        // Controls button
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
        
        // Add the loading screen to the body
        document.body.appendChild(loadingScreen);
    }

    startGame(playerName) {
        if (!playerName.trim()) {
            alert('Please enter your name to start the game!');
            return;
        }
    
        // Save the player's name 
        this.playerName = playerName;
        localStorage.setItem('playerName', playerName);
    
        // Ocultar la pantalla de carga
        const loadingScreen = document.getElementById('loadingScreen');
        if (loadingScreen) {
            loadingScreen.style.display = 'none';
        }
    
        // Mostrar el canvas del juego
        let canvas = document.getElementById('pacmanCanvas');
        if (canvas) {
            canvas.style.display = 'block';
        } else {
            // Si el canvas no existe, crearlo
            canvas = document.createElement('canvas');
            canvas.id = 'pacmanCanvas';
            canvas.width = 800;
            canvas.height = 600;
            document.body.appendChild(canvas);
            this.ctx = canvas.getContext('2d');
        }
    
        // Iniciar el juego
        const scoreContainer = document.getElementById('scoreContainer');
        if(!scoreContainer) this.createScore();
        scoreContainer.style.display = 'block';
        this.start();
        this.soundManager.levelUp.play();
    }

    tooggleSound(button) {
        this.soundOn = !this.soundOn;
        button.textContent = `Sound: ${this.soundOn ? 'ON' : 'OFF'}`;
        this.soundManager.tooggleSound(this.soundOn);
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
        const blinky = new Blinky(this.ctx, this.level);
        const pinky = new Pinky(this.ctx, this.level);
        const inky = new Inky(this.ctx, this.level);
        const clyde = new Clyde(this.ctx, this.level);
        this.ghosts.push(blinky);
        this.ghosts.push(pinky);
        this.ghosts.push(inky);
        this.ghosts.push(clyde);
        
    }

    looseLive() {
        // Reduce the number of life and update the screen
        if (this.lives > 0) {
            this.lives--;
            this.soundManager.looseLive.play();
            this.initializeLives(); // Update the lives on the screen
        }

        // If the player loses all lives, end the game
        if (this.lives <= 0) {
            this.soundManager.gameLoop.pause();
            this.gameOver();
        }
    }

    restartGame() {
        // Limpiar el contenido de la pantalla de game over
        const gameOverContainer = document.querySelector('.game-over-container');
        if (gameOverContainer) {
            gameOverContainer.remove(); // Eliminar la pantalla de game over del DOM
        }
    
        // Restablecer el estado del juego
        this.score = 0;
        this.level = 1;
        this.lives = 3;
        this.ghosts = [];
        this.pellets = [];
        this.powerPellets = [];
        this.walls = [];
    
        // Limpiar canvas y recrearlo
        let canvas = document.getElementById('pacmanCanvas');
        if (!canvas) {
            canvas = document.createElement('canvas');
            canvas.id = 'pacmanCanvas';
            canvas.width = 800; // Ajusta el tamaño según el juego
            canvas.height = 600;
            document.body.appendChild(canvas);
        }
        this.ctx = canvas.getContext('2d');
    
        // Iniciar el juego
        this.startGame(this.playerName);
    }

    nextLevel() {
        if (this.powerPellets.length === 0 && this.pellets.length === 0) {
            this.level++;
            this.pacman = new Pacman(this.ctx);
            this.startGame();
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

    createScore() {
          // Crear el contenedor de puntaje y agregarlo al DOM
     const scoreContainer = document.createElement('div');
     scoreContainer.id = 'scoreContainer';
 
     const score = document.createElement('div');
     score.id = 'score';
     score.textContent = 'Score: 0';
 
     const bestScore = document.createElement('div');
     bestScore.id = 'bestScore';
     bestScore.textContent = 'Best Score: 0';
 
     scoreContainer.appendChild(score);
     scoreContainer.appendChild(bestScore);
      
     // Insertar el contenedor de puntaje debajo del canvas
     const canvas = document.getElementById('pacmanCanvas');
     canvas.insertAdjacentElement('afterend', scoreContainer);
    }
   
    

    start() {    

        this.clear();
        this.soundManager.gameLoop.play();
        this.initGhost();
        this.initWalls(wall_position);
        this.initPellets(pellet_positions, powerPellets_positions);
        
       
        this.intervalID = setInterval(() => {
        
            this.clear();
            

            this.draw();
            this.move();
            this.initializeLives();


            this.checkCollisions(this.pacman, this.walls, this.powerPellets,this.pellets, this.ghosts);
            this.nextLevel();
            this.updateScore();
            this.increaseScore();
         
 
        }, 1000 / 60);
    }
        

    gameOver() {
        clearInterval(this.intervalID);
        
        this.clear();
        this.soundManager.gameLoop.pause();
        this.soundManager.gameOver.play();
       
        // Update the ranking with the current score
        this.updateRanking();

        // Show the ranking of the best players
        this.showRanking();
    }
   


    updateRanking() {
        // Get the current ranking from localStorage or initialize an empty array if it doesn't exist
        this.rankings = JSON.parse(localStorage.getItem('rankings')) || [];

        // Add the current score to the ranking
        this.rankings.push({ name: this.playerName, score: this.score });

        // Sort the ranking in descending order based on the score
       this.rankings.sort((a, b) => b.score - a.score);

        // Keep the top 10 scores if necessary
        if (this.rankings.length > 5) this.rankings.pop();

        // Save the updated ranking to localStorage
        localStorage.setItem('rankings', JSON.stringify(this.rankings));
    }

    showRanking() {

        const canvas = document.getElementById('pacmanCanvas');
        if (canvas) {
            canvas.style.display = 'none';
        }
    
        const scoreContainer = document.getElementById('scoreContainer');
        if (scoreContainer) {
            scoreContainer.style.display = 'none';
        }
        const gameOverContainer = document.createElement('div');
        gameOverContainer.classList.add('game-over-container');
        gameOverContainer.style.textAlign = 'center';
    
        // Game Over Title
        const gameOverTitle = document.createElement('h1');
        gameOverTitle.classList.add('game-over-title');
        gameOverTitle.textContent = 'Game Over';
        gameOverContainer.appendChild(gameOverTitle);
    
        // Ranking Title
        const rankingTitle = document.createElement('h2');
        rankingTitle.classList.add('ranking-title');
        rankingTitle.textContent = 'Ranking Top Five';
        gameOverContainer.appendChild(rankingTitle);
    
        // Ranking list
        const rankingList = document.createElement('ul');
        rankingList.classList.add('ranking-list');
    
        // Get the ranking from localStorage and display it
        this.rankings = JSON.parse(localStorage.getItem('rankings')) || [];

         // Supposing that the scores are stored in `this.highScores`
         this.rankings
         .sort((a, b) => b.score - a.score)
         .slice(0, 5)
         .forEach((score, index) => {
           const listItem = document.createElement('li');
           
           // Position
           const position = document.createElement('span');
           position.classList.add('position');
           position.textContent = `#${index + 1}`;
           listItem.appendChild(position);
           
           // Player's Name
           const name = document.createElement('span');
           name.classList.add('name');
           name.textContent = score.name;
           listItem.appendChild(name);
           
           // Player's Score
           const scoreElement = document.createElement('span');
           scoreElement.classList.add('score');
           scoreElement.textContent = score.score;
           listItem.appendChild(scoreElement);
   
           rankingList.appendChild(listItem);
         });
   
           gameOverContainer.appendChild(rankingList);
       
           // Retry button
           const retryButton = document.createElement('button');
           retryButton.classList.add('retry-button');
           retryButton.textContent = 'Reintentar';
           retryButton.addEventListener('click', () => {
           this.restartGame();
           });
           gameOverContainer.appendChild(retryButton);
           const flexContainer = document.getElementById("title-container");
       
           flexContainer.appendChild(gameOverContainer);

    }

    draw() {
        
        this.walls.forEach(wall => wall.draw());

        this.pellets.forEach(pellet => pellet.draw());
        this.powerPellets.forEach(powerPellet => powerPellet.draw());
        this.pacman.draw();
        
        this.ghosts.forEach(ghost => {
            if(ghost.edibleCounter >= 10000) this.powerPelletActive = false;
           
            ghost.draw(this.powerPelletActive)});
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

        ghosts.forEach(ghost => {
            if(ghost.x + ghost.size < 0) ghost.vx = 1;
            if(ghost.x - ghost.size > this.ctx.canvas.width) ghost.vx = -1;
        })
      

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
                if (wall.y + wall.size > ghost.y // The bottom edge of the object is below the top edge of Pac-Man
                    && wall.y < ghost.y + ghost.size // The top edge of the object is above the bottom edge of Pac-Man
                    && wall.x + wall.size > ghost.x // The right edge of the object is to the right of the left edge of Pac-Man
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
            // Detect collision with walls (Pac-Man square vs square wall)
            if (object.objectType === 'wall' || object.objectType === 'ghost' || object.objecType === 'powerpellet' || object.objecType === 'pellet') {
                if (object.y + object.size > pacmanY // The bottom edge of the Pac-Man is below the top edge of the object
                    && object.y < pacmanY + pacman.size // The top edge of the Pac-Man is above the bottom edge of the object
                    && object.x + object.size > pacmanX // The right edge of the Pac-Man is to the right of the left edge of the object
                    && pacmanX + pacman.size > object.x) { // The left edge of the Pac-Man is to the left of the right edge of the object 
                    this.vy = 0;
                    this.vx = 0;
                    if (object.objectType === 'wall') this.handleCollisionWithWall(pacman, object);
                    if (object.objectType === 'ghost') {
                        this.handleCollisionWithGhost(pacman, object);
                        this.looseLive();
                    }    
                    if (object.objectType === 'powerpellet') {
                        this.score += 10;
                        this.powerPelletActive = true;
                        this.powerPellets = this.powerPellets.filter(p => !(p === object));
                        this.soundManager.eatPowerPellet.play();
                    }                    
                    if(object.objecType === 'pellet') {
                        this.score += 5;
                        this.pellets = this.pellets.filter(p => !(p === object));
                        this.soundManager.playEatPelletSound(this.soundOn);
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
                    // Ghost moves down, adjust it up
                    ghost.y = wall.y - ghost.size;
                    break;
        
                case LEFT:
                    // Ghost moves to the left, adjust it to the right
                    ghost.x = wall.x + wall.width;
                    break;
        
                case RIGHT:
                    // Ghost moves to the right, adjust it to the left
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
                // Pac-Man moves up, adjust it down
                pacman.y = wall.y + wall.height;
                break;
    
            case DOWN:
                // Pac-Man moves down, adjust it up
                pacman.y = wall.y - pacman.size;
                break;
    
            case LEFT:
                // Pac-Man moves to the left, adjust it to the right
                pacman.x = wall.x + wall.width;
                break;
    
            case RIGHT:
                // Pac-Man moves to the right, adjust it to the left
                pacman.x = wall.x - pacman.size;
                break;
    
            default:
                break;
        }
    }  
        
    handleCollisionWithGhost(pacman, collideGhost) {
        // Reset the Pac-Man's position
        this.pacman = new Pacman(this.ctx);

        // Reset the position of the ghost involved in the collision
        this.ghosts = this.ghosts.map(ghost => {
            if (ghost === collideGhost) {
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
            }
            return ghost; 
        });
    }

    initializeLives() {
        // Create the lives container if it doesn't exist
        let livesContainer = document.getElementById('livesContainer');
        if (!livesContainer) {
            livesContainer = document.createElement('div');
            livesContainer.id = 'livesContainer';
            livesContainer.style.display = 'flex';
            livesContainer.style.justifyContent = 'center';
            livesContainer.style.marginBottom = '20px';
            // Add the lives container at the start of the game-container
            const gameContainer = document.querySelector('.title-container');
            if (gameContainer) {
                gameContainer.appendChild(livesContainer);
            } 
        }

        // Clean everything in the lives container
        livesContainer.innerHTML = '';

        // Add hearts based on the current lives
        for (let i = 0; i < this.lives; i++) {
            const heart = document.createElement('span');
            heart.className = 'life-heart';
            heart.innerHTML = '❤️'; // You can use any character you want to represent a heart
            heart.style.fontSize = '24px';
            heart.style.margin = '0 5px';
            livesContainer.appendChild(heart);
        }
    }


}