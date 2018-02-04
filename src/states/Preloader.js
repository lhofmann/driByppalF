import RainbowText from 'objects/RainbowText';

class Preloader extends Phaser.State {

    preload() {        
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

        let center = { x: this.game.world.centerX, y: this.game.world.centerY }
        this.text = new RainbowText(this.game, center.x, center.y, "Loading");
        this.text.anchor.set(0.5);

        this.game.load.image('background-day', 'assets/sprites/background-day.png');
        this.game.load.image('base', 'assets/sprites/base.png');
        this.game.load.image('message', 'assets/sprites/message.png');
    }

    create() {
        this.state.start('Menu');
    }

    shutdown() {
        this.text.kill();
    }

}

export default Preloader;
