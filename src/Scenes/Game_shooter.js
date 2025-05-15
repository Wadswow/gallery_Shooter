class Game extends Phaser.Scene {
    constructor() {
        super("gameScene");
        this.my = {sprite: {}}
        this.bodyX = 400;
        this.bodyY = 540;
        this.names = {
            snake: 'snake.png',
            moose: 'moose.png',
            sloth: 'sloth.png',
            rhino: 'rhino.png',
            gorilla: 'gorilla.png',
            chick: 'chick.png'
        };
        this.hp = {
            snake: 1,
            moose: 3,
            sloth: 1,
            rhino: 3,
            gorilla: 5,
            chick: 1,
            player: 5
        };
        this.enemyScore = {
            snake: 100,
            moose: 250,
            sloth: 50,
            rhino: 100,
            gorilla: 150,
            chick: -150
        }
        this.score = 0
    }
    preload(){
        this.load.setPath("./assets/");
        this.load.image("backdrop", "top-aerial-view-road-sandy-260nw-1832891947.png");
        this.load.image("p_bullet", "Particles/flame.png");
        this.load.image("e_bullet", "Particles/particle_brown.png")
    }
    create(){
        //background
        this.add.image(0, 0, "backdrop").setOrigin(0, 0).setDisplaySize(800, 600);
        //char and bullets
        this.char = this.add.sprite(this.bodyX, this.bodyY, "animals", "chicken.png").setScale(0.4);
        this.char.hp = this.hp['player'];
        this.bullets = [];
        this.rocks = [];
        this.pathEnemy = [];
        //key binding
        this.Akey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.Dkey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.Spacekey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        //text
        this.score = 0;
        this.scoreText = this.add.text(360, 20, 'Score: ' + this.score, {
            fontFamily: 'Arial',
            fontSize: '24px',
            color: '#000000',
            fontStyle: 'bold'
        });
        this.hpText = this.add.text(20, 20, 'HP: ' + this.char.hp, {
            fontFamily: 'Arial',
            fontSize: '24px',
            color: '#000000',
            fontStyle: 'bold'
        });
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
        const randPath = Phaser.Math.Between(0, 1);
        const pathzig = randPath === 0 ? this.zig1 : this.zig2;
        const randnum = Phaser.Math.Between(150, 650);
        const randstr = this.add.path(randnum, 50);
        randstr.lineTo(randstr.startPoint.x, 600);
        this.enemyCreation('snake', pathzig, pathzig.startPoint.x, 50, 12000, 5000);
        this.enemyCreation('moose', pathzig, pathzig.startPoint.x, 50, 7000, 20000);
        this.enemyCreation('sloth', randstr, randstr.startPoint.x, 50, 12000, 2000);
        this.enemyCreation('rhino', randstr, randstr.startPoint.x, 50, 6000, 15000);
        this.enemyCreation('gorilla', randstr, randstr.startPoint.x, 50, 15000, 4000);
        this.enemyCreation('chick', randstr, randstr.startPoint.x, 50, 12000, 10000);
    }
    enemyCreation(type, path, x, y, duration, delay){
        let enemy = this.add.follower(path, x, y, 'animals', this.names[type]).setScale(0.4).setVisible(false).setActive(true);
        enemy.type = type;
        enemy.route = (path === this.zig1 || path === this.zig2) ? 'zig' : 'straight';
        enemy.origDur = duration;
        enemy.origDel = delay;
        enemy.origHp = this.hp[type];
        enemy.hp = enemy.origHp;
        enemy.startFollow({
            duration: duration,
            delay: delay,
            onStart: () => enemy.setVisible(true),
            onComplete: () => {
                this.despawnE(enemy);
                this.respawnE(enemy);
            }
        });
        if (type === 'moose'){
            enemy.fire = this.time.addEvent({
                delay: 500,
                loop: true,
                callback: () => {
                    if (enemy.active && enemy.visible){
                        let bullet = this.add.image(enemy.x, enemy.y + 20, 'e_bullet').setScale(0.5);
                        this.rocks.push(bullet);
                    }
                }
            })
        }
        this.pathEnemy.push(enemy);
        return enemy;
    }
    despawnE(enemy){
        enemy.setVisible(false);
        enemy.setActive(false);
        enemy.stopFollow();
        if (enemy.type === 'moose' && enemy.fire){
            enemy.fire.remove();
        }
    }
    respawnE(enemy){
        this.time.delayedCall(1000, () => {
            let newPath;
            if (enemy.route === 'zig') {
                newPath = Phaser.Math.Between(0, 1) === 0 ? this.zig1 : this.zig2;
            } else {
                const randnum = Phaser.Math.Between(150, 650);
                newPath = this.add.path(randnum, 50);
                newPath.lineTo(randnum, 600);
            }
            enemy.setPath(newPath);
            enemy.setPosition(newPath.startPoint.x, 50);
            enemy.setActive(true);
            enemy.hp = enemy.origHp;
            enemy.startFollow({
                duration: enemy.origDur,
                delay: enemy.origDel,
                onStart: () => enemy.setVisible(true),
                onComplete: () => {
                    this.despawnE(enemy);
                    this.respawnE(enemy);
                }
            });
            if (enemy.type === 'moose'){
                enemy.fire = this.time.addEvent({
                    delay: 500,
                    loop: true,
                    callback: () => {
                        if (enemy.active && enemy.visible){
                            let bullet = this.add.image(enemy.x, enemy.y + 20, 'e_bullet').setScale(0.5);
                            this.rocks.push(bullet);
                        }
                    }
                })
            }
        });
    }
    dead(){
        this.registry.set('score', this.score);
        this.scene.start('restartScene');
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
                    enemy.hp -= 1;
                    if (enemy.hp <= 0){
                        this.score += this.enemyScore[enemy.type];
                        this.scoreText.setText('Score: ' + this.score);
                        this.despawnE(enemy);
                        this.respawnE(enemy);
                    }
                    break;
                }
            }
        }
        for (let i = this.pathEnemy.length - 1; i >= 0; i--){
            let enemy = this.pathEnemy[i];
            if (!enemy.active || !enemy.visible) continue;
            if (enemy.y > 598){
                this.despawnE(enemy);
                this.respawnE(enemy);
                if (enemy.type === 'chick'){
                    this.char.hp += 1;
                    if (this.char.hp == 5){
                        this.char.hp = 5;
                    }
                } else {
                    this.char.hp -= 1;
                }
                this.hpText.setText('HP: ' + this.char.hp);
                if (this.char.hp <= 0){
                    this.dead();
                }
            }
        }
        for (let i = this.rocks.length - 1; i >= 0; i--) {
            let rock = this.rocks[i];
            rock.y += 3;
            if (Phaser.Geom.Intersects.RectangleToRectangle(rock.getBounds(), this.char.getBounds())){
                rock.destroy();
                this.rocks.splice(i, 1);
                this.char.hp -= 1;
                this.hpText.setText('HP: ' + this.char.hp);
                if (this.char.hp <= 0){
                    this.dead();
                }
            }
            if (rock.y > 600) {
                rock.destroy();
                this.rocks.splice(i, 1);
            }
        }
    }
}