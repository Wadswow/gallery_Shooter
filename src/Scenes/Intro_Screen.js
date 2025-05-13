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
    }
    create(){
        let my = this.my;
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

    }
    update(){

    }
}