class Game extends Phaser.Scene {
    constructor() {
        super("gameScene");
        this.my = {sprite: {}}
        this.bodyX = 400;
        this.bodyY = 540;
    }
    preload(){
        this.load.setPath("./assets/");
        this.load.image("back", "top-aerial-view-road-sandy-260nw-1832891947.png");
        this.load.image("p_bullet", "Particles/flame.png");
    }
    create(){
        //background
        this.add.image(0, 0, "back").setOrigin(0, 0).setDisplaySize(800, 600);
        //char and bullets
        this.char = this.add.sprite(this.bodyX, this.bodyY, "animals", "chicken.png").setScale(0.4);
        this.bullets = [];
        this.pathEnemy = [];
        //key binding
        this.Akey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.Dkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.Spacekey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        //shooting mechanics
        this.Spacekey.on('down', () => {
            let bullet = this.add.image(this.char.x, this.char.y-20, 'p_bullet').setScale(0.3).setFlipY(true);
            this.bullets.push(bullet);
        });
        //path creation (zigzag)
        this.zig1 = this.add.path(50, 50);
        this.zig2 = this.add.path(750, 50);
        let dir1 = 1;
        let dir2 = -1;
        for (let i = 1; i <= 5; i++) {
            const x = dir1 > 0 ? 750 : 50;
            const y = 100 + 100 * i;
            this.zig1.lineTo(x, y);
            dir1 *= -1;
        }
        for (let i = 1; i <= 5; i++){
            const x = dir2 > 0 ? 750 : 50;
            const y = 100 + 100 * i;
            this.zig2.lineTo(x, y);
            dir2 *= -1;
        }
        //enemy creation
            //sloth: this.physics.add.sprite(Phaser.Math.Between(150, 650), 50, 'animals', 'sloth.png').setScale(0.4),
            //rhino: this.physics.add.sprite(Phaser.Math.Between(150, 650), 50, 'animals', 'rhino.png').setScale(0.4),
            //gorilla: this.physics.add.sprite(Phaser.Math.Between(150, 650), 50, 'animals', 'gorilla.png').setScale(0.4),
            //cow: this.physics.add.sprite(Phaser.Math.Between(150, 650), 50, 'animals', 'cow.png').setScale(0.4)
        this.spawnEnemies();
    }
    spawnEnemies() {
        const randPath = Phaser.Math.Between(0, 1);
        const path = randPath === 0 ? this.zig1 : this.zig2;
        let snake = this.add.follower(path, path.startPoint.x, 50, 'animals', 'snake.png').setScale(0.4);
        let moose = this.add.follower(path, path.startPoint.x, 50, 'animals', 'moose.png').setScale(0.4);
        this.pathEnemy.push(snake);
        this.pathEnemy.push(moose);
        snake.startFollow({
            duration: 12000,
            onComplete: () => this.despawnEnemy(snake)
        });
        moose.startFollow({
            duration: 7000,
            onComplete: () => this.despawnEnemy(moose)
        });
    }
    despawnEnemy(enemy){
        enemy.setVisible(false);
        enemy.setActive(false);
    }
    update(){
        if(this.Akey.isDown){
            this.char.x -= 3;
            if (this.char.x <= 150){
                this.char.x = 150;
            }
        }
        if(this.Dkey.isDown){
            this.char.x += 3;
            if (this.char.x >= 650){
                this.char.x = 650;
            }
        }
        for (let i = this.bullets.length - 1; i >= 0; i--) {
            let bullet = this.bullets[i];
            bullet.y -= 3;
            if (bullet.y < 0) {
                bullet.destroy();
                this.bullets.splice(i, 1);
                continue;
            }
            for (let j = this.pathEnemy.length - 1; j >= 0; j--) {
                let enemy = this.pathEnemy[j];
                if (!enemy.active || !enemy.visible) continue;
                if (Phaser.Geom.Intersects.RectangleToRectangle(bullet.getBounds(), enemy.getBounds())) {
                    bullet.destroy();
                    this.bullets.splice(i, 1);
                    enemy.setVisible(false);
                    enemy.setActive(false);
                    enemy.stopFollow();
                    this.time.delayedCall(2000, () => {
                        this.spawnEnemies();
                    })
                    break;
                }
            }
        }
    }
}