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
const game = new Game(ctx);
document.addEventListener('DOMContentLoaded', function() {
 
   game.createScore();
 
});



document.addEventListener('keydown', (e) => {
    game.onKeyDown(e);  // Call the onKeyDown method of the game object with the event object as the argument
});

game.initialize();
