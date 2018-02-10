class ScoreDisplay extends Phaser.Group {
	constructor(game) {
		super(game);
		this.score = 0;
		this.game.add.existing(this);
	}

	get score() {
		return this.score_;
	}

	set score(score) {
		this.score_ = score;

        this.removeAll();
        let n = this.score_;
        let x = 0;
        do {
            let digit = (n % 10).toString();
            n = Math.floor(n / 10);
            x -= this.game.cache.getImage(digit).width;
            this.add(this.game.add.sprite(x, 20, digit));
        } while (n > 0);
        this.x = Math.floor(this.game.world.centerX - x / 2);        
    }
}

export default ScoreDisplay;