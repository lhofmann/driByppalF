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

        this.new_birds = this.game.add.group();
        this.birds = this.game.add.group();
        this.birds.add(new Bird(this.game, 55, 245));

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

    onHit(bird) {
        if (!bird.alive)
            return;

        this.world.camera.flash('0x830303', 100, true);
        this.world.camera.shake(0.02, 100, true);

        bird.alpha = 1;
        bird.alive = false;
        bird.animations.stop();

        if (this.birds.countLiving() <= 0) {
            this.background.autoScroll(0, 0);
            this.grass.autoScroll(0, 0);
            this.pipes.forEach(pipe => pipe.stop());
            this.game.time.events.remove(this.timer);
            this.game.time.events.remove(this.init_timer);
        }
    }

    createFlapTimer() {
        this.timer = this.game.time.events.add(this.game.rnd.integerInRange(0, 500), this.telegraphFlap, this); 
    }

    telegraphFlap() {
        this.birds.forEachAlive(bird => bird.animations.play('red', 30, true));
        this.timer = this.game.time.events.add(250, this.autoFlap, this); 
    }

    autoFlap() {
        this.birds.forEachAlive(bird => bird.animations.play('blue', 30, true));
        this.birds.forEachAlive(bird => bird.flap(this.new_birds));
        this.birds.addMultiple(this.new_birds);
        this.createFlapTimer();
    }

    addPipe() {
        this.last_pipe = new Pipe(this.game, this.pipe_y_min, this.pipe_y_max);
        this.pipes.add(this.last_pipe);

        this.game.world.bringToTop(this.grass);
        this.game.world.bringToTop(this.score_text);
    }

    update() {
        this.birds.forEachAlive(
            bird => this.pipes.forEach(
                pipe => this.game.physics.arcade.overlap(bird, pipe, this.onHit, null, this), 
                this), 
            this);
        this.birds.forEachAlive(
            bird => this.game.physics.arcade.overlap(bird, this.grass, this.onHit, null, this), 
            this);

        this.birds.forEachDead(
            bird => this.pipes.forEach(
                pipe => this.game.physics.arcade.collide(bird, pipe), 
                this), 
            this);
        this.birds.forEachDead(
            bird => this.game.physics.arcade.collide(bird, this.grass), 
            this);

        this.birds.forEach(
            bird => {
                if (bird.bottom >= this.grass_y) {
                    bird.bottom = this.grass_y;
                    bird.body.velocity.y = -bird.body.velocity.y * bird.body.bounce.y;
                    this.onHit(bird);        
                }
            }, 
            this
        );

        if (this.birds.countLiving() > 0) {  
            let alpha = 1 / this.birds.countLiving();
            this.birds.forEachAlive(bird => { bird.alpha = alpha; });

            if (this.last_pipe) {
                this.birds.forEachAlive(
                    bird => this.pipes.forEachAlive(
                        pipe => {
                            if (bird.right > pipe.right) {
                                pipe.deactivate();
                                this.score += 1;
                                this.score_text.score = this.score;
                            }
                        }, 
                        this), 
                    this);

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
        if (this.birds.countLiving() > 0) {            
            this.birds.forEachAlive(bird => bird.flap(this.new_birds));
            this.birds.addMultiple(this.new_birds);
        }
        else
            this.game.state.restart();
    }

}

export default GameState;
