class Movement extends Phaser.Scene {
    constructor() {
        super("movementScene");

        this.my = {sprite: {}}
        this.bodyX = 400;
        this.bodyY = 575;
    }
    preload(){
        this.load.setPath("./assets/");
        this.load.image("bullet", "effect_blast.png");
        this.load.image("greenCharacter", "character_roundGreen.png");
    }
    create(){
        let my = this.my;
        my.sprite.bull = this.add.sprite(this.bodyX, this.bodyY-45, "bullet");
        my.sprite.bull.visible = false;
        my.sprite.char = this.add.sprite(this.bodyX, this.bodyY, "greenCharacter");
        
        this.Akey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.Dkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.Spacekey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }
    update(){
        let my = this.my;
        if(this.Akey.isDown){
            for (let piece in my.sprite){
                if (my.sprite.bull.visible){
                    my.sprite.char.x -= 5;
                } else {
                    my.sprite[piece].x -= 10;
                }
                if (my.sprite[piece].x <= 18){
                    my.sprite[piece].x = 18;
                }
            }
        }
        if(this.Dkey.isDown){
            for (let piece in my.sprite){
                if (my.sprite.bull.visible){
                    my.sprite.char.x += 5;
                } else {
                    my.sprite[piece].x += 10;
                }
                if (my.sprite[piece].x >= 782){
                    my.sprite[piece].x = 782;
                }
            }
        }
        if (this.Spacekey.isDown){
            my.sprite.bull.visible = true;
        }
        if (my.sprite.bull.visible){
            my.sprite.bull.y -= 10;
            if (my.sprite.bull.y < 0){
                my.sprite.bull.visible = false;
                my.sprite.bull.y = my.sprite.char.y-45;
                my.sprite.bull.x = my.sprite.char.x;
            }
        }
    }
}