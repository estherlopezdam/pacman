
const canvas = document.getElementById('pacmanCanvas');


const ctx = canvas.getContext('2d');




document.addEventListener('DOMContentLoaded', function() {
    const starContainer = document.createElement('div');
    starContainer.className = 'stars';
    document.body.appendChild(starContainer);
    
    for (let i = 0; i < 600; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.top = `${Math.random() * window.innerHeight}px`;
      star.style.left = `${Math.random() * window.innerWidth}px`;
      starContainer.appendChild(star);
    }
});

document.addEventListener('DOMContentLoaded', function() {
 

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

    
});


const game = new Game(ctx);
document.addEventListener('keydown', (e) => {
    game.onKeyDown(e);  // Llama al método onkeydown de game pasando el evento
});

game.initialize();
