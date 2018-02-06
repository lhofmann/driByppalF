class GameState extends Phaser.State {

    create() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.grass_y = this.game.world.height - this.game.cache.getImage('base').height;

        this.background = this.game.add.tileSprite(0, 0, 288, 512, 'background');
        this.background.autoScroll(-100, 0);

        this.grass = this.game.add.tileSprite(0, this.grass_y, 288, 112, 'base');
        this.grass.autoScroll(-200, 0);       
        this.game.physics.arcade.enable(this.grass); 
        this.grass.body.immovable = true;

        this.bird = this.game.add.sprite(55, 245, 'bird');
        this.bird.anchor.setTo(-0.2, 0.5);
        this.game.physics.arcade.enable(this.bird);
        this.bird.body.setCircle(Math.ceil(this.bird.height / 2));
        this.bird.body.gravity.y = 1000;
        this.bird.body.bounce.setTo(0.5);
        this.bird.alive = true;
        this.bird.angle_min = -10;
        this.bird.angle_max = 10; 

        this.bird.animations.add('blue', [0, 1, 2, 1]);
        this.bird.animations.add('red', [3, 4, 5, 4]);
        this.bird.animations.add('yellow', [6, 7, 8, 7]);

        this.bird.animations.add('flash', [0, 4, 8, 1, 3, 7, 2, 4]);

        this.bird.animations.play('blue', 30, true);

        this.pipes = this.game.add.group(); 
        this.score_text = this.game.add.group();

        this.game.input.onTap.add(this.onTap, this);

        this.pipe_width = this.game.cache.getImage('pipe').width;
        this.pipe_height = this.game.cache.getImage('pipe').height;
        this.last_pipe = null;

        this.score = 0;
        this.updateScore();

        let key_space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        key_space.onDown.add(this.onTap, this);

        // this.createFlapTimer();

        // delay appearance of first pipes
        this.init_timer = this.game.time.events.add(this.game.rnd.integerInRange(1000, 2000), this.addRowOfPipes, this);
    }

    onHit() {
        if (!this.bird.alive)
            return;

        this.bird.alive = false;
        this.bird.animations.stop();
        this.background.autoScroll(0, 0);
        this.grass.autoScroll(0, 0);
        this.pipes.forEach(function(pipe){
            pipe.body.velocity.x = 0;
        }, this);
        this.game.time.events.remove(this.timer);
        this.game.time.events.remove(this.init_timer);
    }

    createFlapTimer() {
        this.timer = this.game.time.events.add(this.game.rnd.integerInRange(0, 750), this.telegraphFlap, this); 
    }

    telegraphFlap() {
        this.bird.animations.play('red', 30, true);
        this.timer = this.game.time.events.add(250, this.autoFlap, this); 
    }

    autoFlap() {        
        this.bird.animations.play('blue', 30, true);
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
        pipe.past_player = false;
        pipe.frame = 0;
        this.last_pipe = pipe;
    }

    addRowOfPipes() {
        let pipe_offset = this.game.rnd.integerInRange(this.grass_y - 250, this.grass_y);
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
        if (this.bird.alive) {
            this.game.physics.arcade.overlap(this.bird, this.pipes, this.onHit, null, this);
            this.game.physics.arcade.overlap(this.bird, this.grass, this.onHit, null, this);
        } else {
            this.game.physics.arcade.collide(this.bird, this.pipes);
            this.game.physics.arcade.collide(this.bird, this.grass);
        }
        if (this.bird.bottom >= this.grass_y) {
            this.bird.bottom = this.grass_y;
            this.bird.body.velocity.y = -this.bird.body.velocity.y * this.bird.body.bounce.y;
            this.onHit();        
        }        

        if (this.bird.alive) {           
            if (this.last_pipe) {
                this.pipes.forEachAlive((function(pipe) {
                    if (this.bird.right > pipe.right) {
                        pipe.past_player = true;
                        pipe.frame = 1;
                        if (pipe.count_score) {
                            pipe.count_score = false;
                            this.score += 1;
                            this.updateScore();
                        }
                    }
                    if (pipe.x < -this.pipe_width)
                        pipe.kill();
                }), this);

                if (this.last_pipe.x < 80)
                    this.addRowOfPipes();
            }

            let delta = 0;     
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP))
                delta = -5;
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
                delta = +5;
            if (delta != 0) {
                this.pipes.forEachAlive((function(pipe) {
                    if (pipe.past_player)
                        return;
                    pipe.y += delta;
                }), this);
            }
        }

        if (this.bird.alive) {
            if (this.bird.angle < this.bird.angle_max)
                this.bird.angle += 1; 
            // if (this.bird.y > this.game.world.height - 150)
            //    this.flap();
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
