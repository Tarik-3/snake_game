class Snake {

    constructor(scene) {
        this.fois = 1;
        this.scene = scene;
        this.lastKey = 39;
        this.tilesize = 16;
        // this.appleX = 104;
        // this.appleY = 106;
        this.lastTimeMove = 0;
        this.moveInterval = 250;
        this.direction = Phaser.Math.Vector2.RIGHT;
        this.box = []
        this.box.push(this.scene.add.rectangle(this.scene.game.config.width / 2,
            this.scene.game.config.height / 2, this.tilesize, this.tilesize, 0xff0000).setOrigin(0));
        // this.box.push(this.scene.add.rectangle(25, 10, 17, 17, 0x0000ff).setOrigin(0));
        // this.box.push(this.scene.add.rectangle(10, 10, 17, 17, 0xffffff).setOrigin(0));
        this.apple = this.scene.add.rectangle(0,0, this.tilesize, this.tilesize, 0x00ff00).setOrigin(0)
        this.positionApple();
        scene.input.keyboard.on('keydown',e => {
            this.keydown(e);
        })
    }

    positionApple() {
        console.log(this.apple)
        this.apple.x = Math.floor(
            (Math.random() * this.scene.game.config.width) / this.tilesize)
             * this.tilesize;
        this.apple.y = Math.floor(
            (Math.random() * this.scene.game.config.height) / this.tilesize) * this.tilesize - 2;
    }

    keydown(event){
        switch (event.keyCode){
            case 37: 
                if(this.lastKey != 39){
                    this.direction = Phaser.Math.Vector2.LEFT;
                    this.lastKey = 37;
                }

                break;
            case 38: 
                if(this.lastKey != 40){
                    this.direction = Phaser.Math.Vector2.UP;
                    this.lastKey = 38;  
                } 
                break;
            case 39: 
                if(this.lastKey != 37){
                    this.direction = Phaser.Math.Vector2.RIGHT;
                    this.lastKey = 39;
                }
                break;
            case 40: 
                if(this.lastKey != 38){
                    this.direction = Phaser.Math.Vector2.DOWN;
                    this.lastKey = 40;
                }
                break;
        }
    }
        
    

    update(time){
        // console.log(time, "time")
        if(time >= this.lastTimeMove + this.moveInterval){
            this.lastTimeMove = time;
            this.move();
        }
    }
    
    wallRetourn() {
        if(this.box[0].x >= this.scene.game.config.width){
            this.box[0].x = 0
            
        }
        if(this.box[0].x <= -4){
            this.box[0].x = this.scene.game.config.width
            
        }
        if(this.box[0].y <= 0){
            this.box[0].y = this.scene.game.config.height - 14
            
        }
        if(this.box[0].y >= this.scene.game.config.height){
            this.box[0].y = -2
            
        }
    }

    
    acceleration() {
        if (this.moveInterval >50){
            console.log("moveInterv", this.moveInterval)
            console.log("fois", this.fois)
            this.moveInterval-= 10*this.fois
            this.fois++;
        }
    }

    move(){
        
        let x = this.box[0].x + this.direction.x * this.tilesize;
        let y = this.box[0].y + this.direction.y * this.tilesize;
        // console.log(x, "x")
        // console.log(this.apple.x, "apple.x")
        // console.log(y, "y")
        // console.log(this.apple.y, "apple.y")
        
        if (this.apple.x === x && this.apple.y === y) {
            this.box.push(
                this.scene.add
                    .rectangle(0,0, this.tilesize, this.tilesize, 0xffffff)
                    .setOrigin(0)
            );
            this.positionApple();
            this.acceleration()
        }

        for( let i = this.box.length - 1 ; i > 0; i--) {
            this.box[i].x = this.box[i-1].x;
            this.box[i].y = this.box[i-1].y;
            
        }
            this.box[0].x = x;
            this.box[0].y = y;
        // console.log(this.box[0].x)
        this.wallRetourn();

        let tail = this.box.slice(1);
        if(tail.filter(s => s.x === this.box[0].x && s.y === this.box[0].y).length >0 
        ) {
            this.scene.scene.restart();
        }

    }
}

export default Snake