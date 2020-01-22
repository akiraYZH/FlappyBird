class Background extends GameElement{
    constructor(){
        
        super()
        //randomly pick the bg img.
        this.img = this.pickBg();
        this.is_picked=true;
        this.numToFill=Math.ceil(game.viewWidth/(game.viewHeight*0.5625));
 
    }

    update(){
        
    }
    render(){
        
        for(let i = 0; i<this.numToFill;i++){
            game.ctx.drawImage(game.imgCache[this.img],i*game.viewHeight*0.5625,0,game.viewHeight*0.5625,game.viewHeight);
        }
        
        
    }
    pickBg(){
        return (['bg_day', 'bg_night'])[this.getRdm(0,1)];
    }

    start(){
        (!this.is_picked)&&(this.img = this.pickBg());
        
    }
}