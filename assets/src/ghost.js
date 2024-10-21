class Ghost {
    constructor(ctx, name, defaultTime, level, factorAceleration = 0.2) {
        this.ctx = ctx;

        
        this.name = name;
        this.defaultTime = defaultTime;
        this.level = level;
        this.factorAceleration = factorAceleration;
        this.retard = this.setRetard();
          

        this.y = 0;
        this.x = 0;
        this.vy = 0;
        this.vx = 0;
    }

    setRetard() {
        return this.defaultTime / (1 + (this.level - 1) * this.factorAceleration);
    }

    draw() {

    }

    move() {
        
    }

}