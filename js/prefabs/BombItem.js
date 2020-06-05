var Bomberman = Bomberman || {};

Bomberman.BombItem = function (game_state, name, position, properties) {
    "use strict";
    Bomberman.Item.call(this, game_state, name, position, properties);

};

Bomberman.BombItem.prototype = Object.create(Bomberman.Item.prototype);
Bomberman.BombItem.prototype.constructor = Bomberman.BombItem;

Bomberman.BombItem.prototype.collect_item = function (item, player) {
    "use strict";
    Bomberman.Item.prototype.collect_item.call(this);
    // increases the player number of bombs, limited by a maximum
    player.number_of_bombs ++;
};