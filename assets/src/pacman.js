class Pacman {
    constructor(ctx) {
        this.ctx = ctx;        
        this.tick = 0;
        this.vy = 0;
        this.vx = 0;

        this.w = 20;
        this.h = 20;

        const size = 20;  // Tamaño de la cuadrícula
    
        // Seleccionamos una posición aleatoria de o_positions
        const randomPosition = o_positions[Math.floor(Math.random() * o_positions.length)];
    
        // Asignamos las posiciones x e y basadas en el tamaño de la cuadrícula
        this.x = randomPosition[0] * size + size / 2;  // Ajustamos la posición x
        this.y = randomPosition[1] * size + size / 2;  // Ajustamos la posición y

        this.sprite = new Image();
        this.sprite.src = "assets\img\spritePacmanNumerado.webp";
        // sprite setup
        this.sprite.horizontalFrameIndex = 0;
        this.sprite.verticalFrameIndex = 0;
        this.sprite.horizontalFrames = 21;
        this.sprite.verticalFrames = 13;
        this.sprite.onload = () => {
        this.sprite.frameWith = Math.floor(this.sprite.width / this.sprite.horizontalFrames);
        this.sprite.frameHeight = Math.floor(this.sprite.height / this.sprite.verticalFrames);
        this.width = this.sprite.frameWith;
        this.height = this.sprite.frameHeight;
        }


    }

    draw() {
        // draw sprite
        console.log("pinta a pacman");

        
        this.ctx.drawImage(this.sprite, 
          this.sprite.horizontalFrameIndex * this.width,
          this.sprite.verticalFrameIndex * this.height,
          this.width,
          this.height,
          this.x, 
          this.y, 
          this.width,
          this.height
        )
        
        // animate sprite
        
        this.updatePacmanAnimation();

    }

    move() {

    }

    updatePacmanAnimation() {
        // this.tick++;
        // if(this.tick > 15) {
        //     this.tick = 0;
        //     this.sprite.horizontalFrameIndex += 1;
        //   }
          
      
        //   if (this.sprite.horizontalFrameIndex >= this.sprite.horizontalFrames) {
        //     this.sprite.horizontalFrameIndex = 0
        //   }
    }
}