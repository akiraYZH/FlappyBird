class Pipes extends GameElement {
    constructor() {

        super()

        this.x = 0;
        this.pipeHeight = 0.625 * game.viewHeight;
        this.pipeWidth = 0.1015625 * game.viewHeight;
        this.gap = (120 / 512) * game.viewHeight;
        this.max = this.pipeHeight;
        this.min = this.gap - (game.viewHeight * 0.78125 - this.pipeHeight);

        this.y = this.getRdm(this.min, this.max);
        this.pipe_bottom_height = game.viewHeight * 0.78125 - this.pipeHeight + this.y - this.gap;
        this.is_passed =false;
        // coordinations needed to calculate collision
        this.left_border = game.viewWidth - this.x;
        this.right_border = this.left_border + this.pipeWidth;
        this.gap_top = this.pipeHeight - this.y;
        this.gap_bottom = this.gap_top + this.gap;

    }

    update() {
        this.x += game.speed;
         // coordinations needed to calculate collision
        this.left_border = game.viewWidth - this.x;
        this.right_border = this.left_border + this.pipeWidth;

        //self destroy when you don't see the pipe
        if (this.x > game.viewWidth + this.pipeWidth) {
            game.gameItems = game.gameItems.filter(obj => {
                if (obj == this) {
                    return false;
                } else {
                    return true;
                }
            });
        }
        //destroy all pipes when the bird crashes
        if(game.is_crashed){
            game.gameItems = game.gameItems.filter(obj => {
                if (obj == this) {
                    return false;
                } else {
                    return true;
                }
            });
        }

        //collision detection
        let d_left_border = this.left_border - game.bird.x;
        let d_right_border = this.right_border - game.bird.x;
        let d_gap_top = game.bird.y - this.gap_top;
        let d_gap_bottom = this.gap_bottom - game.bird.y;
        let d_left_top = Math.sqrt(Math.pow(d_left_border, 2) + Math.pow(d_gap_top, 2));
        let d_left_bottom = Math.sqrt(Math.pow(d_left_border, 2) + Math.pow(d_gap_bottom, 2));
        let d_right_top = Math.sqrt(Math.pow(d_right_border, 2) + Math.pow(d_gap_top, 2));
        let d_right_bottom = Math.sqrt(Math.pow(d_right_border, 2) + Math.pow(d_gap_bottom, 2));

        if(d_left_border<game.bird.radius&&d_right_border>0 &&(d_gap_top<game.bird.radius||d_gap_bottom<game.bird.radius)){
            game.is_crashed = true;
        }
        
        
        if(d_left_border<0&&d_right_border>0&&(d_gap_top<=game.bird.radius||d_gap_bottom<=game.bird.radius)){
            game.is_crashed = true;
        }
        if (
            d_left_top < game.bird.radius ||
            d_left_bottom < game.bird.radius ||
            d_right_top < game.bird.radius ||
            d_right_bottom < game.bird.radius
        ) {
            game.is_crashed = true;
        }

       //Add score
       if(this.right_border - game.bird.x+game.bird.radius<0&&!this.is_passed){
           this.is_passed=true;
           game.score++;
       }

    }
    render() {


        game.ctx.drawImage(game.imgCache["pipe_top"], game.viewWidth - this.x, -this.y, this.pipeWidth, this.pipeHeight);
        game.ctx.drawImage(
            game.imgCache["pipe_bottom"],
            //slice coordinations
            0, 0, 52, this.pipe_bottom_height * 512 / game.viewHeight,
            //on screen coordinations
            this.left_border, this.gap_bottom, this.pipeWidth, this.pipe_bottom_height
        );



    }
}