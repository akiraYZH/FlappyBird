

class Game{
    constructor(id){
        this.myCanvas = document.querySelector('#game');
        this.ctx= this.myCanvas.getContext('2d');
        this.viewWidth = parseInt(window.innerWidth||document.documentElement.clientWidth);
        this.viewHeight = parseInt(window.innerHeight||document.documentElement.clientHeight);
        this.dataURL = '../js/resourses.json';
        this.imgsURL={};
        this.imgCache={};
        this.timer=null;
        this._interval=20;
        // this.frameNum = 0;
        this.is_built = false;
        this.is_crashed=false;
        this.is_start =false;
        this.gameItems = [];
        this.speed=0;
        this.score=0;
        this.best=0;




        this.myCanvas.setAttribute('width', this.viewWidth);
        this.myCanvas.setAttribute('height', this.viewHeight);
        this.getData(this.init);
    }

    getData(callback){
        let xhr = new XMLHttpRequest();
        xhr.open('GET', this.dataURL);
        xhr.send();
        xhr.addEventListener('readystatechange', ()=>{
            if(xhr.readyState==4&&(xhr.status==200||xhr.status==304)){
                // console.log(JSON.parse(xhr.responseText));
                this.imgsURL = {...JSON.parse(xhr.responseText)};
                let count = 0;
                let imgsAmount = Object.keys(this.imgsURL).length;
                for(let k in this.imgsURL){
                    // Create image tags
                    this.imgCache[k] = new Image();
                    //Cache the images
                    this.imgCache[k].src = this.imgsURL[k];

                    this.imgCache[k].addEventListener('load',()=>{
                        this.ctx.clearRect(0, 0, this.viewWidth, this.viewHeight);
                        count++;
                        //write lodaing text
                        this.ctx.font='30px impact';
                        this.ctx.fillStyle='white';
                        this.ctx.textAlign='center';
                        this.ctx.fillText(`Loading...(${count}/${imgsAmount})`,this.viewWidth/2, this.viewHeight*(1-0.618));

                        //loading complete
                        if(count==imgsAmount){
                            // alert('载入完成'); 
                            
                            callback.call(this);
                        }
                    })
                }
            }
        })
    }

    

    

    init(){
        this.bg = new Background();
        this.floor = new Floor();
        this.bird  = new Bird();
        this.title= new Title();
        this.gameover = new Gameover();
        this.myCanvas.onclick = this.start.bind(this);
       

        this.timer = setInterval(() => {
            //clear everything
            this.ctx.clearRect(0,0, this.viewWidth,this.viewHeight);
            //when crashed
            if(this.is_crashed){
                this.speed = 0;
                this.myCanvas.onclick=null;
                this.bird.is_picked=false;
                this.bg.is_picked=false;
                
            }
            
            if(!this.is_built&&this.is_start){
                this.is_built=true;
                setTimeout(() => {
                    this.is_built=false;
                }, 3000);
                new Pipes();
            }
            
            //Update every game items here
            this.gameItems.forEach(item=>{
                item.update();
                item.render();

            })
            
            // write score
            this.ctx.save()
            this.ctx.textAlign='center';
            this.ctx.fillStyle = 'white';
            this.ctx.strokeStyle = 'grey';
            this.ctx.lineWidth = 2;
            this.ctx.fillText(this.score, this.viewWidth/2,50);
            this.ctx.strokeText(this.score, this.viewWidth/2,50);
            this.ctx.restore();
            //write.best
            (this.score>this.best)&&(this.best=this.score);
            this.ctx.save()
            this.ctx.font='14px impact';
            this.ctx.textAlign='center';
            this.ctx.fillStyle = 'white';
            this.ctx.fillText('Best: '+this.best, this.viewWidth*7/8,38);
            this.ctx.restore();


        }, this._interval);
    }

    //Game starts!!
    start(){
        this.is_start=true;
        this.is_crashed=false;
        this.speed=parseFloat((this._interval/1000).toFixed(2))*100;
        this.bird.start();
        this.bg.start();
        this.myCanvas.onclick=this.bird.jump.bind(this.bird);
        this.score=0;

        
    }
}


