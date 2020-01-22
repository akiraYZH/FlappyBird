class GameElement{
    constructor(){
        game.gameItems.push(this);
    }

    update(){

    }
    render(){
        throw new Error('render function must be rewritten.');
    }

    getRdm(min, max){
        return Math.floor(Math.random()*(max-min+1)+min)
    }
}