class Gameover extends GameElement {
    constructor() {

        super()
        this.confirm_left = game.viewWidth / 2- game.viewHeight/8;
        this.confirm_right = this.confirm_left + game.viewHeight / 4;
        this.confirm_top = game.viewHeight / 1.67;
        this.confirm_bottom = this.confirm_top + game.viewHeight / 4 * (28 / 80);
        this.titleY = this.resumeY = this.confirmY = game.viewHeight;
        this.opacity = 0;
        this.showSpeed = 40;
    }

    update() {
        if (!game.is_crashed) {
            this.titleY = this.resumeY = this.confirmY = game.viewHeight ;
            this.opacity = 0;
        } else {
            this.opacity += 0.03;

            if (this.titleY <= game.viewHeight / 4.8) {
                this.titleY = game.viewHeight / 4.8;
            } else {
                if (this.titleY - game.viewHeight / 4.8 < this.showSpeed) {
                    this.titleY -= this.titleY - game.viewHeight / 4.8;
                } else {
                    this.titleY -= 40;
                }

            }

            if (this.resumeY <= game.viewHeight / 3) {
                this.resumeY = game.viewHeight / 3;
            } else {
                setTimeout(() => {
                    if (this.resumeY - game.viewHeight / 3 < this.showSpeed) {
                        this.resumeY -= this.resumeY - game.viewHeight / 3.5;
                    } else {
                        this.resumeY -= 40;
                    }

                }, 100);

            }
            if (this.confirmY <= game.viewHeight / 1.67) {

                this.confirmY = game.viewHeight / 1.67;

                //activate the button when the animation ends
                game.myCanvas.onclick = function (ev) {
                    this.restore(ev);
                }.bind(this);
            } else {
                setTimeout(() => {
                    if (this.confirmY - game.viewHeight / 1.67 < this.showSpeed) {
                        this.confirmY -= this.confirmY - game.viewHeight / 1.67;
                        
                    } else {
                        this.confirmY -= 40;
                    }

                }, 260);

            }
        }


    }
    render() {
        // game.ctx.clearRect(0,0, game.viewWidth,game.viewHeight);
        game.ctx.save();

        game.ctx.globalAlpha = this.opacity;
        game.ctx.drawImage(game.imgCache["gameover"], game.viewWidth/ 2 - game.viewHeight/4, this.titleY, game.viewHeight / 2, game.viewHeight / 2 * (54 / 204));
        game.ctx.drawImage(game.imgCache["resume"], game.viewWidth / 2- game.viewHeight/4, this.resumeY, game.viewHeight / 2, game.viewHeight / 2 * (126 / 238));
        game.ctx.save()
        game.ctx.textAlign='center';
        game.ctx.fillStyle='#533846';
        game.ctx.font='20px Arial';
        game.ctx.fillText(game.score, game.viewWidth/ 2 + game.viewHeight*1/7,this.resumeY+game.viewHeight*105/1000);
        game.ctx.fillText(game.best, game.viewWidth/ 2 + game.viewHeight*1/7,this.resumeY+game.viewHeight*190/1000);
        game.ctx.restore()
        game.ctx.drawImage(game.imgCache["confirm"], game.viewWidth / 2- game.viewHeight/8, this.confirmY, game.viewHeight / 4, game.viewHeight / 4 * (28 / 80));
        game.ctx.restore();

    }

    restore(ev) {

        if (ev.clientX > this.confirm_left &&
            ev.clientX < this.confirm_right &&
            ev.clientY > this.confirm_top &&
            ev.clientY < this.confirm_bottom) {

            game.start();
        }
    }
}