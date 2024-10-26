class SpriteManager {
    constructor(ctx) {  
        this.ctx = ctx;
        
    }
    
        resetImage(player) {
            switch (this.currentDirection) {
                case UP:
                    this.image.src = `/assets/img/${this.name}/UP.png`;          
                    
                    break;
                case DOWN:
                    this.image.src = `/assets/img/${this.name}/DOWN.png`;          
                    
                    break;
                case LEFT:
                    this.image.src = `/assets/img/${this.name}/LEFT.png`;          
                    
                    break;
                case RIGHT:
                    this.image.src = `/assets/img/${this.name}/RIGHT.png`;          
                    
                    break;
            
                default:
                    break;
            }
        }
    }