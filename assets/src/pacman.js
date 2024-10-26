class Pacman {


  constructor(ctx, size = 10) {
    this.ctx = ctx;
    this.x = Math.round(p_positions[0][0] * 20);
    this.y =Math.round(p_positions[0][1] * 20);
    this.vx = -1;
    this.vy = 0;
    this.size = size;  // Tamaño del cuadrado
    this.color = '#800080';  // Color morado para Pac-Man
    this.currentDirection = LEFT;
}

     

draw() {

  this.ctx.beginPath();
  this.ctx.fillStyle = this.color;
  this.ctx.fillRect(this.x, this.y, this.size, this.size);  // Dibuja un cuadrado
  this.ctx.closePath();

  
}

onKeyDown(e) {


 
   switch (e.keyCode) {
    case UP:
      if(this.currentDirection != UP) {
        this.vy = -1;
        this.vx = 0;
        this.currentDirection = UP;
      }    
    break;

    case DOWN:
      if(this.currentDirection != DOWN) {
        this.vy = 1;
        this.vx = 0;
        this.currentDirection = DOWN;
      }        
    break;

    case LEFT:
      if(this.currentDirection != LEFT) {
        this.vy = 0;
        this.vx = -1;
        this.currentDirection = LEFT;
      }    
    break;

    case RIGHT:
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


  
  move() {

    this.x += this.vx;
    this.y += this.vy;
  }

}
