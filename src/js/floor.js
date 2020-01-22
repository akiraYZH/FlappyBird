class Floor extends GameElement{
    constructor(){
        
        super()
        
        this.numToFill=Math.ceil(game.viewWidth/(game.viewHeight*0.5625))*2;
        this.x=0
        this.floorY=game.viewHeight-game.viewHeight*0.21875;
        // coordinations needed to calculate collision
        
    }

    update(){
        this.x+=game.speed;
        if(this.x>game.viewWidth){
            this.x=0;
        }
        this.d_floor = this.floorY - game.bird.y;
        
        
        if(this.d_floor<game.bird.radius){
            game.is_crashed=true;
        }
    }
    render(){
        
        for(let i = 0; i<this.numToFill;i++){
            game.ctx.drawImage(game.imgCache["floor"],i*game.viewHeight*0.5625 - this.x,this.floorY,game.viewHeight*0.5625,game.viewHeight*0.21875);
        }
        
        
    }
}