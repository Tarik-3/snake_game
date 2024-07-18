class Snake {

    constructor(scene) {
        this.scene = scene;
        this.lastTimeMove = 0;
        this.moveInterval = 100;
        this.direction = Phaser.Math.Vector2.RIGHT;
        this.box = []
        this.box.push(this.scene.add.rectangle(10, 10, 17, 17, 0xff0000).setOrigin(0));
        this.box.push(this.scene.add.rectangle(25, 10, 17, 17, 0x0000ff).setOrigin(0));
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
        console.log(time, "time")
        if(time >= this.lastTimeMove + this.moveInterval){
            this.lastTimeMove = time;
            this.move();
        }
    }
    
    move(){
        for( let i = 0 ; i< 2; i++) {
            this.box[i].x += this.direction.x;
            this.box[i].y += this.direction.y;
    
    
        }
        // console.log(this.box[0].x)
        if(this.box[0].x == 650){
            let c = 0;
            this.box.forEach(p=> {
               p.x = c;
               c=+17;
               console.log(p.x)
            } )
        }

    }
}

export default Snake