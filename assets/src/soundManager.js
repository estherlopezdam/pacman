class SoundManager {
    constructor(ctx) {
        this.ctx = ctx;
        this.gameOver = new Audio ("assets/music/gameOver.mp3");
        this.gameOver.volume = 0.03;
        this.levelUp = new Audio ("assets/music/levelUp.mp3");
        this.levelUp.volume = 0.02;
        this.looseLive = new Audio ("assets/music/looseLive.mp3");
        this.looseLive.volume = 0.02;
        this.eatPellet = new Audio ("assets/music/pellet.mp3");
        this.eatPellet.volume = 0.03;
        this.eatPowerPellet = new Audio ("assets/music/powerPellet.mp3");
        this.eatPowerPellet.volume = 0.03;
        this.gameLoop = new Audio ("assets/music/gameLoop.mp3");
        this.gameLoop.volume = 0.02;
    }

    playEatPelletSound(soundOn) {
        if(soundOn) {
            const audioClone = this.eatPellet.cloneNode();
            audioClone.volume = 0.01;
            audioClone.play();
        }
        
    }

    tooggleSound(soundOn) {
        if(soundOn) {
            this.levelUp.muted = false; 
            this.gameLoop.muted = false;
            this.gameOver.muted = false;
            this.looseLive.muted = false; 
            this.eatPellet.muted = false;
            this.eatPowerPellet.muted = false;
        } else {
            this.levelUp.muted = true; 
            this.gameLoop.muted = true;
            this.gameOver.muted = true;
            this.looseLive.muted = true; 
            this.eatPellet.muted = true;
            this.eatPowerPellet.muted = true;

        }

    }

}

