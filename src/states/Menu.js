class Menu extends Phaser.State {

    create() {
        let background = this.game.add.tileSprite(0, 0, 288, 512, 'background');
        background.autoScroll(-100, 0);

        let grass = this.game.add.tileSprite(0, 512 - 112, 288, 112, 'base');
        grass.autoScroll(-200, 0);
        this.game.world.bringToTop(grass);

        let message = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY - 50, 'message');
        message.anchor.setTo(0.5, 0.5);

        let tween = this.game.add.tween(message).to({
            y: message.y + 20
        }, 500, Phaser.Easing.Sinusoidal.InOut).to({
            y: message.y
        }, 500, Phaser.Easing.Sinusoidal.InOut, false, 0);
        tween.loop(true);
        tween.start();

        this.game.input.onTap.add(this.onTap, this);        
    }

    onTap() {
        this.state.start('GameState');
    }

}

export default Menu;
