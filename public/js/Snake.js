class Snake {

    constructor(scene) {
        this.scene = scene;
        this.lastTimeMove = 0;
        this.moveInterval = 500;
        this.direction = Phaser.Math.Vector2.RIGHT;
        this.box = []
        this.box.push(this.scene.add.rectangle(40, 10, 17, 17, 0xff0000).setOrigin(0));
        this.box.push(this.scene.add.rectangle(25, 10, 17, 17, 0x0000ff).setOrigin(0));
        this.box.push(this.scene.add.rectangle(10, 10, 17, 17, 0xffffff).setOrigin(0));
        scene.input.keyboard.on('keydown',e => {
            this.keydown(e);
        })
    }

    keydown(event){console.log(event)
        switch (event.keyCode){
            case 37: this.direction = Phaser.Math.Vector2.LEFT;
                break;
            case 38: this.direction = Phaser.Math.Vector2.UP;
                break;
            case 39: this.direction = Phaser.Math.Vector2.RIGHT;
                break;
            case 40: this.direction = Phaser.Math.Vector2.DOWN;
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
    
    move(){
       
    
        console.log(this.direction.x)
        for( let i = this.box.length - 1 ; i > 0; i--) {
            this.box[i].x = this.box[i-1].x;
            this.box[i].y = this.box[i-1].y;
            
        }
            this.box[0].x += this.direction.x * 16;
            this.box[0].y += this.direction.y * 16;
        // console.log(this.box[0].x)
        if(this.box[0].x >= 650){
            let c = 0;
            this.box.forEach(p=> {
               p.x = c;
               c=+17;
            //    console.log(p.x)
            } )
        }

    }
}

export default Snake