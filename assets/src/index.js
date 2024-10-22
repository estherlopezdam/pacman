const canvas = document.getElementById('pacmanCanvas');
const ctx = canvas.getContext('2d');

const game = new Game(ctx);

document.addEventListener('keydown', (e) => {
    game.onKeyDown(e);  // Llama al método onkeydown de game pasando el evento
});

game.start();