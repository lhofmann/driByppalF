import RainbowText from 'objects/RainbowText';

class GameState extends Phaser.State {

	create() {
		let center = { x: this.game.world.centerX, y: this.game.world.centerY }
		let text = new RainbowText(this.game, center.x, center.y, "Hello, phaser!");
		text.anchor.set(0.5);
	}

}

export default GameState;
