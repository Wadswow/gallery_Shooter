class Game extends Phaser.Scene {
    constructor() {
        super("gameScene");
        this.my = {sprite: {}}
        this.bodyX = 400;
        this.bodyY = 545;
    }
    preload(){
        this.load.setPath("./assets/");
        this.load.image("back", "top-aerial-view-road-sandy-260nw-1832891947.png");
        this.load.image("p_bullet", "Particles/flame.png");
        this.load.atlasXML("animals", "kenney_animal-pack-redux/Spritesheet/round_nodetails.png", "kenney_animal-pack-redux/Spritesheet/round_nodetails.xml");
    }
    create(){
        this.add.image(0, 0, "back").setOrigin(0, 0).setDisplaySize(800, 600);
        this.char = this.add.sprite(this.bodyX, this.bodyY, "animals", "chicken.png").setScale(0.4);
        this.bullets = [];
        this.Akey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.Dkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.Spacekey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.Spacekey.on('down', () => {
            let bullet = this.bullets.find(b => !b.active);
            if (bullet) {
                bullet.setPosition(this.char.x, this.char.y - 20);
                bullet.setScale(0.3);
                bullet.setFlipY(true);
                bullet.setVisible(true);
                bullet.setActive(true);
            } else {
                bullet = this.add.image(this.char.x, this.char.y - 20, 'p_bullet');
                bullet.setScale(0.3);
                bullet.setFlipY(true);
                bullet.setActive(true);
                bullet.setVisible(true);
                this.bullets.push(bullet);
            }
        });
    }
    update(){
        if(this.Akey.isDown){
            this.char.x -= 5;
            if (this.char.x <= 25){
                this.char.x = 25
            }
        }
        if(this.Dkey.isDown){
            this.char.x += 5;
            if (this.char.x >= 775){
                this.char.x = 775
            }
        }
        for (let bullet of this.bullets) {
            if (bullet.active) {
                bullet.y -= 3;
    
                // Deactivate when off-screen
                if (bullet.y < 0) {
                    bullet.setActive(false);
                    bullet.setVisible(false);
                }
            }
        }
    }
}