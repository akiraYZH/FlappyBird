class Bird extends GameElement {
    constructor() {

        super()

        //randomly pick the bg img.
        this.bird = this.pickBird();
        this.is_picked =true;
        
        this.count=0;
        this.is_changed = false;
        this.deg = 0;
        this.width=this.height=0.09375*game.viewHeight;
        this.gravity =0;
        this.downSpeed = 0;
        


        
        // coordinations needed to calculate collision
        this.x=game.viewHeight/8;
        this.y=game.viewHeight/3;
        this.radius=this.width*0.28;

    }

    update() {
        //control the rotate angle
        if(this.deg>=Math.PI/2){
            this.deg=Math.PI/2;
        }else{
            this.deg= this.downSpeed*3*parseFloat((game._interval/1000).toFixed(2));
        }

        //fall speed
        this.downSpeed +=this.gravity;
        this.y += this.downSpeed;

        //prevent the bird goes out of the frame
        if(this.y-this.radius<=0){
            this.y=this.radius;
        }
        
        // switch images to 'fly'
       if(!this.is_changed){
           this.is_changed =true;
           
           if(++this.count>3){
               this.count=0;
           }
           setTimeout(() => {
               this.is_changed=false;
           }, 200);
       }

    }
    render() {
        
        game.ctx.save();
        game.ctx.translate(this.x, this.y);
        game.ctx.rotate(this.deg);
        game.ctx.drawImage(game.imgCache[this.bird[this.count]],-this.width/2,-this.height/2, this.width,this.height);
        game.ctx.restore();
        
        
    }


    jump(){
        this.deg=-Math.PI/3;
            
        this.downSpeed=-9*(game.viewHeight/512);
    }

    start(){
        (!this.is_picked)&&(this.bird = this.pickBird());
        this.x=game.viewHeight/8;
        this.y=game.viewHeight/3;
        this.downSpeed = 0;
        this.gravity =34 * (game.viewHeight/512)*parseFloat((game._interval/1000).toFixed(2));
        this.jump();
    }

    pickBird(){
        //randomly pick the bg img.
        
        return ([
            ['yellow1', 'yellow2', 'yellow3','yellow2'], 
            ['blue1', 'blue2', 'blue3', 'blue2'],
            ['red1', 'red2', 'red3', 'red2']
        ])[this.getRdm(0,2)];
    }
}