class Restart extends Phaser.Scene {
    constructor(){
        super('restartScene');
    }
    preload(){
        this.load.setPath("./assets/");
        this.load.image("restart", "game_buttons_restart_-removebg-preview.png");
    }
    create(){
        const restart = this.add.image(390, 450, "restart").setInteractive();
        restart.setScale(0.3);
        restart.on('pointerover', () => {
            restart.setScale(.33);
        });
        restart.on('pointerout', () => {
            restart.setScale(.3);
        });
        restart.on('pointerdown', () => {
            restart.setScale(0.27);
            restart.setAlpha(0.8);
        });
        restart.on('pointerup', () => {
            restart.setScale(0.3);
            restart.setAlpha(1);
            this.scene.start('gameScene');
        });

    }
    update(){
        
    }
}