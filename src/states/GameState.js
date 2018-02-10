import Bird from '../objects/Bird.js';
import Pipe from '../objects/Pipe.js';
import ScoreDisplay from '../objects/ScoreDisplay.js'

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

        this.bird = new Bird(this.game, 55, 245);

        this.pipes = this.game.add.group(); 
        this.score_text = new ScoreDisplay(this.game);

        this.game.input.onTap.add(this.onTap, this);

        this.pipe_y_min = this.game.world.height - (this.grass_y - 250);
        this.pipe_y_max = this.game.world.height - this.grass_y;
        this.last_pipe = null;

        this.score = 0;
        this.score_text.score = 0;

        let key_space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        key_space.onDown.add(this.onTap, this);

        // this.createFlapTimer();

        // delay appearance of first pipes
        this.init_timer = this.game.time.events.add(this.game.rnd.integerInRange(1000, 2000), this.addPipe, this);
    }

    onHit() {
        if (!this.bird.alive)
            return;

        this.bird.alive = false;
        this.bird.animations.stop();
        this.background.autoScroll(0, 0);
        this.grass.autoScroll(0, 0);
        this.pipes.forEach(pipe => pipe.stop());
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
        this.bird.flap();
        this.createFlapTimer();
    }

    addPipe() {
        this.last_pipe = new Pipe(this.game, this.pipe_y_min, this.pipe_y_max);
        this.pipes.add(this.last_pipe);

        this.game.world.bringToTop(this.grass);
        this.game.world.bringToTop(this.score_text);
    }

    update() {
        if (this.bird.alive) {
            this.pipes.forEach(pipe => this.game.physics.arcade.overlap(this.bird, pipe, this.onHit, null, this));
            this.game.physics.arcade.overlap(this.bird, this.grass, this.onHit, null, this);
        } else {
            this.pipes.forEach(pipe => this.game.physics.arcade.collide(this.bird, pipe));
            this.game.physics.arcade.collide(this.bird, this.grass);
        }
        if (this.bird.bottom >= this.grass_y) {
            this.bird.bottom = this.grass_y;
            this.bird.body.velocity.y = -this.bird.body.velocity.y * this.bird.body.bounce.y;
            this.onHit();        
        }        

        if (this.bird.alive) {           
            if (this.last_pipe) {
                this.pipes.forEachAlive(pipe => {
                    if (this.bird.right > pipe.right) {
                        pipe.deactivate();
                        this.score += 1;
                        this.score_text.score = this.score;
                    }                    
                }, this);

                if (this.last_pipe.left < 80)
                    this.addPipe();
            }

            let delta = 0;     
            if (this.game.input.keyboard.isDown(Phaser.Keyboard.UP))
                delta = -5;
            else if (this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
                delta = +5;
            if (delta != 0) {
                this.pipes.forEachAlive(pipe => { pipe.y += delta; });
            }
        }
    }

    onTap() {
        if (this.bird.alive)
            this.bird.flap();
        else
            this.game.state.restart();
    }

}

export default GameState;
