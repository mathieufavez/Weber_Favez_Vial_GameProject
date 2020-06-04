var Bomberman = Bomberman || {};

Bomberman.Target = function (game_state, name, position, properties) {
    "use strict";
    Bomberman.Prefab.call(this, game_state, name, position, properties);
    
    this.anchor.setTo(0.5);
    
    this.game_state.game.physics.arcade.enable(this);
    this.body.immovable = true;

    this.scale.setTo(0.75);
};


Bomberman.Target.prototype = Object.create(Bomberman.Prefab.prototype);
Bomberman.Target.prototype.constructor = Bomberman.Target;

Bomberman.Target.prototype.update = function () {
    "use strict";
    this.game_state.game.physics.arcade.overlap(this, this.game_state.groups.players, this.collect_item, null, this);
};

Bomberman.Target.prototype.collect_item = function () {
    "use strict";
    // by default, an item is destroyed when collected
    this.kill();
    var goal_position, goal_properties, goal;
    if (this.game_state.groups.targets.countLiving() === 0) {
        // create goal
        if (this.game_state.level_data.last_level === true) {
            goal_position = new Phaser.Point(this.game_state.game.world.width / 2, this.game_state.game.world.height / 2);
            goal_properties = {texture: "final_goal_image", group: "goals"};
            goal = new Bomberman.Goal(this.game_state, "goal", goal_position, goal_properties);
        } else {
        goal_position = new Phaser.Point(this.game_state.game.world.width / 2, this.game_state.game.world.height / 2);
        goal_properties = {texture: "goal_image", group: "goals"};
        goal = new Bomberman.Goal(this.game_state, "goal", goal_position, goal_properties);
        }
    }
};