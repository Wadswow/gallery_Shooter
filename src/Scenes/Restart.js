class Restart extends Phaser.Scene {
    constructor(){
        super('restartScene');
    }
    preload(){
        this.load.setPath("./assets/");
        this.load.image("restart", "game_buttons_restart_-removebg-preview.png");
    }
    create(){
        this.scoreText = this.add.text(300, 100, 'Score: ' + this.registry.get('score'), {
            fontFamily: 'Arial',
            fontSize: '44px',
            color: '#FFFFFF',
            fontStyle: 'bold'
        });
        this.add.text(50, 250, 'Well, you did what you could to defend the coop,\n you think you can do better?\n Then try again', {
            align: 'center',
            fontSize: '24px'
        });
        const restart = this.add.image(390, 450, "restart").setInteractive();
        restart.setScale(0.5);
        restart.on('pointerover', () => {
            restart.setScale(.53);
        });
        restart.on('pointerout', () => {
            restart.setScale(.5);
        });
        restart.on('pointerdown', () => {
            restart.setScale(0.47);
            restart.setAlpha(0.8);
        });
        restart.on('pointerup', () => {
            restart.setScale(0.5);
            restart.setAlpha(1);
            this.scene.start('gameScene');
        });

    }
    update(){
        
    }
}