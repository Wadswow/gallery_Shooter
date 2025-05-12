// Nicholas Wadsworth
// Created: 5/12/2025
// Phaser: 3.70.0
//
// gallery_Shooter
//
// A gallery shooter involving a chicken shooting savanah animals to save the coop
// 
// Art assets from Kenny Assets "Shape Characters" set:
// https://kenney.nl/assets/animal-pack-redux

// debug with extreme prejudice
"use strict"

// game config
let config = {
    parent: 'phaser-game',
    type: Phaser.CANVAS,
    render: {
        pixelArt: true  // prevent pixel art from getting blurred when scaled
    },
    width: 800,
    height: 600,
    scene: [Intro_Screen, Game_Shooter]
}

const game = new Phaser.Game(config);