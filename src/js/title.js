class Title extends GameElement{
    constructor(){
        
        super()
        
    }

    update(){
       if(game.is_start){
        game.gameItems = game.gameItems.filter(obj => {
            if (obj == this) {
                return false;
            } else {
                return true;
            }
        });
       }
    }
    render(){
        
        game.ctx.drawImage(game.imgCache["title"],game.viewWidth/4, game.viewHeight/8,game.viewWidth/2,game.viewWidth/2*(48/178));
        game.ctx.drawImage(game.imgCache["tutorial"],game.viewWidth/2-49, game.viewHeight/2)
        
        
    }
}