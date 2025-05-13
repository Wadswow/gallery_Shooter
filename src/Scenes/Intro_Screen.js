class Intro extends Phaser.Scene {
    constructor(){
        super("introScene");

        this.my = {sprite: {}}
    }
    preload(){
        this.load.setPath("./assets/");
        this.load.image("background", "wmremove-transformed.png");
        this.load.image("chick", "Chicken-5-12-2025.png");
        this.load.image("defence", "Defence-5-12-2025.png");
        this.load.image("start", "game_buttons-removebg-preview.png");
        this.load.atlasXML("animals", "kenney_animal-pack-redux/Spritesheet/round_nodetails.png", "kenney_animal-pack-redux/Spritesheet/round_nodetails.xml");
    }
    create(){
        this.add.image(0, 0, "background").setOrigin(0, 0);
        const chick = this.add.image(380, 120, "chick");
        this.tweens.add({
            targets: chick,
            scale: {from: 0.7, to: 0.75},
            duration: 1500,
            yoyo: true,
            repeat: -1
        });
        const def = this.add.image(380, 260, "defence").setScale(0.55);
        this.tweens.add({
            targets: def,
            scale: {from: 0.55, to: 0.5},
            duration: 1500,
            yoyo: true,
            repeat: -1,
        });
        const start = this.add.image(390, 450, "start").setInteractive();
        start.setScale(0.3);
        start.on('pointerover', () => {
            start.setScale(.33);
        });
        start.on('pointerout', () => {
            start.setScale(.3);
        });
        start.on('pointerdown', () => {
            start.setScale(0.27);
            start.setAlpha(0.8);
        });
        start.on('pointerup', () => {
            start.setScale(0.3);
            start.setAlpha(1);
            this.scene.start('shooterScene');
        });
        const avatar1 = this.add.image(180, 460, "animals", "chicken.png");
        avatar1.angle = -25;
        const avatar2 = this.add.image(600, 460, "animals", "chicken.png");
        avatar2.angle = 25;

    }
    update(){
        
    }
}