class Pipe extends Phaser.Group {
    constructor(game, y_min, y_max) {
        super(game);

        let y = this.game.rnd.integerInRange(y_min, y_max);

        for (var top of [true, false]) {
            var pipe = this.game.add.sprite(this.game.world.width, y - (top ? 100 : 0), 'pipe');
            if (top)
                pipe.scale.y *= -1;
            this.game.physics.arcade.enable(pipe);
            pipe.body.velocity.x = -200;
            pipe.body.immovable = true;
            pipe.frame = 0;
            this.add(pipe);
        }
        this.count_score = true;
        this.past_player = false;
        this.game.add.existing(this);
    }

    update() {
        if (this.right < 0)
            this.destroy();
    }

    stop() {
        this.forEach(pipe => { pipe.body.velocity.x = 0; });
    }

    deactivate() {
        this.alive = false;
        this.forEach(pipe => { pipe.frame = 1; });
    }
}

export default Pipe;