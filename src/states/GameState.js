class GameState extends Phaser.State {

    create() {
        this.background = this.game.add.tileSprite(0, 0, 288, 512, 'background-day');
        this.background.autoScroll(-100, 0);

        this.grass = this.game.add.tileSprite(0, 512 - 112, 288, 112, 'base');
        this.grass.autoScroll(-200, 0);        

        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.bird = this.game.add.sprite(100, 245, 'bird');
        this.bird.anchor.setTo(-0.2, 0.5);
        this.game.physics.arcade.enable(this.bird);
        this.bird.body.setCircle(Math.ceil(this.bird.height / 2));
        this.bird.body.gravity.y = 1000;
        this.bird.body.bounce.setTo(0.5, 0.5);
        this.bird.alive = true;
        this.bird.angle_min = -10;
        this.bird.angle_max = 10;

        this.pipes = this.game.add.group(); 
        this.score_text = this.game.add.group();

        this.game.input.onTap.add(this.onTap, this);

        this.pipe_width = this.game.cache.getImage('pipe').width;
        this.pipe_height = this.game.cache.getImage('pipe').height;
        this.last_pipe = null;

        this.score = 0;
        this.updateScore();

        // this.createFlapTimer();

        // delay appearance of first pipes
        this.game.time.events.add(this.game.rnd.integerInRange(1000, 2000), this.addRowOfPipes, this); 
    }

    onHit() {
        if (!this.bird.alive)
            return;

        this.bird.alive = false;
        this.background.autoScroll(0, 0);
        this.grass.autoScroll(0, 0);
        this.pipes.forEach(function(pipe){
            pipe.body.velocity.x = 0;
        }, this);
        this.game.time.events.remove(this.timer);
    }

    createFlapTimer() {
        this.timer = this.game.time.events.add(this.game.rnd.integerInRange(250, 1000), this.autoFlap, this); 
    }

    autoFlap() {        
        this.flap();
        this.createFlapTimer();
    }

    addPipe(x, y, top) {
        var pipe = this.game.add.sprite(x, y - (top ? 100 : 0), 'pipe');
        if (top)
            pipe.scale.y *= -1;

        this.pipes.add(pipe);
        this.game.physics.arcade.enable(pipe);
        pipe.body.velocity.x = -200;
        pipe.body.immovable = true;
        pipe.count_score = top;
        this.last_pipe = pipe;
    }

    addRowOfPipes() {
        let pipe_offset = this.game.rnd.integerInRange(150, this.game.cache.getImage('pipe').height);
        let hole = this.game.world.height - pipe_offset;
        this.addPipe(this.game.world.width, hole, false);
        this.addPipe(this.game.world.width, hole, true);

        this.game.world.bringToTop(this.grass);
        this.game.world.bringToTop(this.score_text);
    }

    updateScore() {
        this.score_text.removeAll();
        let n = this.score;
        let x = 0;
        do {
            let digit = (n % 10).toString();
            n = Math.floor(n / 10);
            x -= this.game.cache.getImage(digit).width;
            this.score_text.add(this.game.add.sprite(x, 20, digit));
        } while (n > 0);
        this.score_text.x = Math.floor(this.world.centerX - x / 2);
    }

    update() {    
        if (this.bird.alive)
            this.game.physics.arcade.overlap(this.bird, this.pipes, this.onHit, null, this);
        else
            this.game.physics.arcade.collide(this.bird, this.pipes);

        if (this.last_pipe) {
            this.pipes.forEachAlive((function(pipe) {
                if (pipe.count_score && this.bird.x > this.last_pipe.x + this.pipe_width) {
                    pipe.count_score = false;
                    this.score += 1;
                    this.updateScore();
                }
                if (pipe.x < -this.pipe_width)
                    pipe.kill();
            }), this);

            if (this.last_pipe.x < 15)
                this.addRowOfPipes();
        }

        if (this.bird.alive) {
            if (this.bird.angle < 20)
                this.bird.angle += 1; 
            if (this.bird.y > this.game.world.height - 150)
                this.flap();
        } else {            
            if (this.bird.bottom > this.grass.y) {
                this.bird.bottom = this.grass.y;
                this.bird.body.velocity.y = 0;
            }
        }
    }

    flap() {
        if (!this.bird.alive)
            return;

        if (this.bird.y > 75) {
            this.bird.body.velocity.y = -350;
            this.game.add.tween(this.bird).to({angle: -20}, 100).start();
        }
    }

    onTap() {
        if (this.bird.alive)
            this.flap();
        else
            this.game.state.restart();
    }

}

export default GameState;
