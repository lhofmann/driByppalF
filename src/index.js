import Preloader from 'states/Preloader';
import Menu from 'states/Menu';
import GameState from 'states/GameState';

class Game extends Phaser.Game {

    constructor() {
        // super(288, 512, Phaser.AUTO, 'content', null);
        super(288, 512, Phaser.AUTO);

        this.state.add('Preloader', Preloader, false);
        this.state.add('Menu', Menu, false);
        this.state.add('GameState', GameState, false);
        this.state.start('Preloader');        
    }

}

new Game();
