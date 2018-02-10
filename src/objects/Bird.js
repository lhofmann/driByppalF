class Bird extends Phaser.Sprite {
    constructor(game, x, y) {
        super(game, x, y, 'bird');
        this.game.physics.arcade.enable(this);

        this.anchor.setTo(-0.2, 0.5);        
        this.body.setCircle(Math.ceil(this.height / 2));
        this.body.gravity.y = 1000;
        this.body.bounce.setTo(0.5);

        this.alive = true;
        this.angle_min = -10;
        this.angle_max = 10; 

        this.animations.add('blue', [0, 1, 2, 1]);
        this.animations.add('red', [3, 4, 5, 4]);
        this.animations.add('yellow', [6, 7, 8, 7]);
        this.animations.add('flash', [0, 4, 8, 1, 3, 7, 2, 4]);

        this.animations.play('blue', 30, true);       

        this.game.add.existing(this);
    }

    update() {
        if (this.alive) {
            if (this.angle < this.angle_max)
                this.angle += 1; 
            // if (this.y > this.game.world.height - 150)
            //    this.flap();
        }
        if (this.y < 0) {
            this.y = 0;
            if (this.body.velocity.y < 0)
                this.body.velocity.y *= -1;
        }
    }

    flap() {
        if (!this.alive)
            return;

        this.body.velocity.y = -350;
        this.game.add.tween(this).to({angle: -20}, 100).start();
    }
}

export default Bird;