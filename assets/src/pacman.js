class Pacman {

  constructor(ctx, size = 15) {
    this.ctx = ctx;
    this.x = Math.round(p_positions[0][0] * 20);
    this.y =Math.round(p_positions[0][1] * 20);
    this.vx = -1;
    this.vy = 0;
    this.size = size;  // Square size
    this.currentDirection = LEFT;
    this.image = new Image();
    this.image.src = 'assets/img/pacman/LEFT.png';
    this.name = 'pacman';
}

     

draw() {
  this.resetImage();
  this.ctx.drawImage(this.image, this.x, this.y, 15, 15);
  
}

resetImage() {
  switch (this.currentDirection) {
      case UP:
          this.image.src = `assets/img/${this.name}/UP.png`;          
          
          break;
      case DOWN:
          this.image.src = `assets/img/${this.name}/DOWN.png`;          
          
          break;
      case LEFT:
          this.image.src = `assets/img/${this.name}/LEFT.png`;          
          
          break;
      case RIGHT:
          this.image.src = `assets/img/${this.name}/RIGHT.png`;          
          
          break;
  
      default:
          break;
  }
}
moveContinues() {
  switch (this.currentDirection) {
    case UP:
      this.vy = -1;
      this.vx = 0;     
      break;
    case DOWN:
      this.vy = 1;
      this.vx = 0;  
      break;
    case LEFT:
      this.vy = 0;
      this.vx = -1;  
      break;
    case RIGHT:
      this.vy = 0;
      this.vx = 1;    
      break;
  
    default:
      break;
  }

}

move() {
  
  this.x += this.vx;
  this.y += this.vy;

  if (this.vx !== 0 && this.x % 20 === 0) {
      this.vx = 0; 
      this.moveContinues();
  }
  if (this.vy !== 0 && this.y % 20 === 0) {
      this.vy = 0; 
      this.moveContinues();
  }
 
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

}
