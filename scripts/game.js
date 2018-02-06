!function e(t,i,r){function a(o,n){if(!i[o]){if(!t[o]){var h="function"==typeof require&&require;if(!n&&h)return h(o,!0);if(s)return s(o,!0);var l=new Error("Cannot find module '"+o+"'");throw l.code="MODULE_NOT_FOUND",l}var c=i[o]={exports:{}};t[o][0].call(c.exports,function(e){var i=t[o][1][e];return a(i?i:e)},c,c.exports,e,t,i,r)}return i[o].exports}for(var s="function"==typeof require&&require,o=0;o<r.length;o++)a(r[o]);return a}({1:[function(e,t,i){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var n=e("states/Preloader"),h=r(n),l=e("states/Menu"),c=r(l),u=e("states/GameState"),p=r(u),d=function(e){function t(){a(this,t);var e=s(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,288,512,Phaser.AUTO));return e.state.add("Preloader",h["default"],!1),e.state.add("Menu",c["default"],!1),e.state.add("GameState",p["default"],!1),e.state.start("Preloader"),e}return o(t,e),t}(Phaser.Game);new d},{"states/GameState":3,"states/Menu":4,"states/Preloader":5}],2:[function(e,t,i){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(i,"__esModule",{value:!0});var o=function(){function e(e,t){for(var i=0;i<t.length;i++){var r=t[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,i,r){return i&&e(t.prototype,i),r&&e(t,r),t}}(),n=function(e){function t(e,i,s,o){r(this,t);var n=a(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e,i,s,o,{font:"45px Arial",fill:"#ff0044",align:"center"}));return n._speed=125,n._colorIndex=0,n._colors=["#ee4035","#f37736","#fdf498","#7bc043","#0392cf"],n.colorize(),n.startTimer(),n.game.stage.addChild(n),n}return s(t,e),o(t,[{key:"startTimer",value:function(){this.game.time.events.loop(this._speed,this.colorize,this).timer.start()}},{key:"colorize",value:function(){for(var e=0;e<this.text.length;e++)this._colorIndex===this._colors.length&&(this._colorIndex=0),this.addColor(this._colors[this._colorIndex],e),this._colorIndex++}}]),t}(Phaser.Text);i["default"]=n},{}],3:[function(e,t,i){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(i,"__esModule",{value:!0});var o=function(){function e(e,t){for(var i=0;i<t.length;i++){var r=t[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,i,r){return i&&e(t.prototype,i),r&&e(t,r),t}}(),n=function(e){function t(){return r(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return s(t,e),o(t,[{key:"create",value:function(){this.game.physics.startSystem(Phaser.Physics.ARCADE),this.grass_y=this.game.world.height-this.game.cache.getImage("base").height,this.background=this.game.add.tileSprite(0,0,288,512,"background"),this.background.autoScroll(-100,0),this.grass=this.game.add.tileSprite(0,this.grass_y,288,112,"base"),this.grass.autoScroll(-200,0),this.game.physics.arcade.enable(this.grass),this.grass.body.immovable=!0,this.bird=this.game.add.sprite(55,245,"bird"),this.bird.anchor.setTo(-.2,.5),this.game.physics.arcade.enable(this.bird),this.bird.body.setCircle(Math.ceil(this.bird.height/2)),this.bird.body.gravity.y=1e3,this.bird.body.bounce.setTo(.5),this.bird.alive=!0,this.bird.angle_min=-10,this.bird.angle_max=10,this.bird.animations.add("blue",[0,1,2,1]),this.bird.animations.add("red",[3,4,5,4]),this.bird.animations.add("yellow",[6,7,8,7]),this.bird.animations.add("flash",[0,4,8,1,3,7,2,4]),this.bird.animations.play("blue",30,!0),this.pipes=this.game.add.group(),this.score_text=this.game.add.group(),this.game.input.onTap.add(this.onTap,this),this.pipe_width=this.game.cache.getImage("pipe").width,this.pipe_height=this.game.cache.getImage("pipe").height,this.last_pipe=null,this.score=0,this.updateScore();var e=this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);e.onDown.add(this.onTap,this),this.init_timer=this.game.time.events.add(this.game.rnd.integerInRange(1e3,2e3),this.addRowOfPipes,this)}},{key:"onHit",value:function(){this.bird.alive&&(this.bird.alive=!1,this.bird.animations.stop(),this.background.autoScroll(0,0),this.grass.autoScroll(0,0),this.pipes.forEach(function(e){e.body.velocity.x=0},this),this.game.time.events.remove(this.timer),this.game.time.events.remove(this.init_timer))}},{key:"createFlapTimer",value:function(){this.timer=this.game.time.events.add(this.game.rnd.integerInRange(0,750),this.telegraphFlap,this)}},{key:"telegraphFlap",value:function(){this.bird.animations.play("red",30,!0),this.timer=this.game.time.events.add(250,this.autoFlap,this)}},{key:"autoFlap",value:function(){this.bird.animations.play("blue",30,!0),this.flap(),this.createFlapTimer()}},{key:"addPipe",value:function(e,t,i){var r=this.game.add.sprite(e,t-(i?100:0),"pipe");i&&(r.scale.y*=-1),this.pipes.add(r),this.game.physics.arcade.enable(r),r.body.velocity.x=-200,r.body.immovable=!0,r.count_score=i,r.past_player=!1,r.frame=0,this.last_pipe=r}},{key:"addRowOfPipes",value:function(){var e=this.game.rnd.integerInRange(this.grass_y-250,this.grass_y),t=this.game.world.height-e;this.addPipe(this.game.world.width,t,!1),this.addPipe(this.game.world.width,t,!0),this.game.world.bringToTop(this.grass),this.game.world.bringToTop(this.score_text)}},{key:"updateScore",value:function(){this.score_text.removeAll();var e=this.score,t=0;do{var i=(e%10).toString();e=Math.floor(e/10),t-=this.game.cache.getImage(i).width,this.score_text.add(this.game.add.sprite(t,20,i))}while(e>0);this.score_text.x=Math.floor(this.world.centerX-t/2)}},{key:"update",value:function(){if(this.bird.alive?(this.game.physics.arcade.overlap(this.bird,this.pipes,this.onHit,null,this),this.game.physics.arcade.overlap(this.bird,this.grass,this.onHit,null,this)):(this.game.physics.arcade.collide(this.bird,this.pipes),this.game.physics.arcade.collide(this.bird,this.grass)),this.bird.bottom>=this.grass_y&&(this.bird.bottom=this.grass_y,this.bird.body.velocity.y=-this.bird.body.velocity.y*this.bird.body.bounce.y,this.onHit()),this.bird.alive){this.last_pipe&&(this.pipes.forEachAlive(function(e){this.bird.right>e.right&&(e.past_player=!0,e.frame=1,e.count_score&&(e.count_score=!1,this.score+=1,this.updateScore())),e.x<-this.pipe_width&&e.kill()},this),this.last_pipe.x<80&&this.addRowOfPipes());var e=0;this.game.input.keyboard.isDown(Phaser.Keyboard.UP)?e=-5:this.game.input.keyboard.isDown(Phaser.Keyboard.DOWN)&&(e=5),0!=e&&this.pipes.forEachAlive(function(t){t.past_player||(t.y+=e)},this)}this.bird.alive&&this.bird.angle<this.bird.angle_max&&(this.bird.angle+=1)}},{key:"flap",value:function(){this.bird.alive&&this.bird.y>75&&(this.bird.body.velocity.y=-350,this.game.add.tween(this.bird).to({angle:-20},100).start())}},{key:"onTap",value:function(){this.bird.alive?this.flap():this.game.state.restart()}}]),t}(Phaser.State);i["default"]=n},{}],4:[function(e,t,i){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function s(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(i,"__esModule",{value:!0});var o=function(){function e(e,t){for(var i=0;i<t.length;i++){var r=t[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,i,r){return i&&e(t.prototype,i),r&&e(t,r),t}}(),n=function(e){function t(){return r(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return s(t,e),o(t,[{key:"create",value:function(){var e=this.game.add.tileSprite(0,0,288,512,"background");e.autoScroll(-100,0);var t=this.game.add.tileSprite(0,400,288,112,"base");t.autoScroll(-200,0),this.game.world.bringToTop(t);var i=this.game.add.sprite(this.game.world.centerX,this.game.world.centerY-50,"message");i.anchor.setTo(.5,.5);var r=this.game.add.tween(i).to({y:i.y+20},500,Phaser.Easing.Sinusoidal.InOut).to({y:i.y},500,Phaser.Easing.Sinusoidal.InOut,!1,0);r.loop(!0),r.start(),this.game.input.onTap.add(this.onTap,this)}},{key:"onTap",value:function(){this.state.start("GameState")}}]),t}(Phaser.State);i["default"]=n},{}],5:[function(e,t,i){"use strict";function r(e){return e&&e.__esModule?e:{"default":e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function s(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(i,"__esModule",{value:!0});var n=function(){function e(e,t){for(var i=0;i<t.length;i++){var r=t[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,i,r){return i&&e(t.prototype,i),r&&e(t,r),t}}(),h=e("objects/RainbowText"),l=r(h),c=function(e){function t(){return a(this,t),s(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return o(t,e),n(t,[{key:"preload",value:function(){var e={x:this.game.world.centerX,y:this.game.world.centerY};this.text=new l["default"](this.game,e.x,e.y,"Loading"),this.text.anchor.set(.5);var t=(new Date).getHours();t<7||t>17?this.load.image("background","assets/sprites/background-night.png"):this.load.image("background","assets/sprites/background-day.png"),this.load.image("base","assets/sprites/base.png"),this.load.image("message","assets/sprites/message.png"),this.game.load.spritesheet("bird","assets/sprites/bird.png",34,24),this.game.load.spritesheet("pipe","assets/sprites/pipe.png",52,512);for(var i=0;i<=9;i++)this.load.image(i.toString(),"assets/sprites/"+i.toString()+".png")}},{key:"create",value:function(){this.state.start("Menu")}},{key:"shutdown",value:function(){this.text.kill()}}]),t}(Phaser.State);i["default"]=c},{"objects/RainbowText":2}]},{},[1]);