var Bomberman = Bomberman || {};

Bomberman.Goal = function (game_state, name, position, properties) {
    "use strict";
    Bomberman.Prefab.call(this, game_state, name, position, properties);
    
    this.anchor.setTo(0.5);
    this.scale.setTo(0.5);
    
    this.game_state.game.physics.arcade.enable(this);
    this.body.immovable = true;
};

Bomberman.Goal.prototype = Object.create(Bomberman.Prefab.prototype);
Bomberman.Goal.prototype.constructor = Bomberman.Goal;

Bomberman.Goal.prototype.update = function () {
    "use strict";
    if (this.game_state.level_data.last_level === true)
        this.game_state.game.physics.arcade.overlap(this, this.game_state.groups.players, this.show_score, null, this);

    this.game_state.game.physics.arcade.overlap(this, this.game_state.groups.players, this.reach_goal, null, this);
};

Bomberman.Goal.prototype.reach_goal = function () {
    "use strict";
    this.game_state.next_level();

};
Bomberman.Goal.prototype.show_score = function () {
    "use strict";
    this.game_state.show_score();
};

