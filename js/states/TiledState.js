var Bomberman = Bomberman || {};

Bomberman.TiledState = function () {
    "use strict";
    Phaser.State.call(this);
    
    this.prefab_classes = {
        "player": Bomberman.Player.prototype.constructor,
        "enemy": Bomberman.Enemy.prototype.constructor,
        "target": Bomberman.Target.prototype.constructor,
        "life_item": Bomberman.LifeItem.prototype.constructor,
        "bomb_item": Bomberman.BombItem.prototype.constructor
    };
    
    // define available items
    this.items = {
        life_item: {probability: 0.1, properties: {texture: "life_item_image", group: "items"}},
        bomb_item: {probability: 0.3, properties: {texture: "bomb_item_image", group: "items"}}
    };
};

Bomberman.TiledState.prototype = Object.create(Phaser.State.prototype);
Bomberman.TiledState.prototype.constructor = Bomberman.TiledState;

Bomberman.TiledState.prototype.init = function (level_data) {

    "use strict";
    var tileset_index;
    this.level_data = level_data;




    this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    
    // start physics system
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 0;
    
    // create map and set tileset
    this.map = this.game.add.tilemap(level_data.map.key);
    tileset_index = 0;
    this.map.tilesets.forEach(function (tileset) {
        this.map.addTilesetImage(tileset.name, level_data.map.tilesets[tileset_index]);
        tileset_index += 1;
    }, this);
    
    if (this.level_data.first_level) {
        localStorage.clear();
    }
};

Bomberman.TiledState.prototype.create = function () {
    "use strict";
    var group_name, object_layer, collision_tiles;
    
    // create map layers
    this.layers = {};
    this.map.layers.forEach(function (layer) {
        this.layers[layer.name] = this.map.createLayer(layer.name);
        if (layer.properties.collision) { // collision layer
            collision_tiles = [];
            layer.data.forEach(function (data_row) { // find tiles used in the layer
                data_row.forEach(function (tile) {
                    // check if it's a valid tile index and isn't already in the list
                    if (tile.index > 0 && collision_tiles.indexOf(tile.index) === -1) {
                        collision_tiles.push(tile.index);
                    }
                }, this);
            }, this);
            this.map.setCollision(collision_tiles, true, layer.name);
        }
    }, this);
    // resize the world to be the size of the current layer
    this.layers[this.map.layer.name].resizeWorld();
    
    // create groups
    this.groups = {};
    this.level_data.groups.forEach(function (group_name) {
        this.groups[group_name] = this.game.add.group();
    }, this);
    
    this.prefabs = {};
    
    for (object_layer in this.map.objects) {
        if (this.map.objects.hasOwnProperty(object_layer)) {
            // create layer objects
            this.map.objects[object_layer].forEach(this.create_object, this);
        }
    }
    
    this.init_hud();
};

Bomberman.TiledState.prototype.create_object = function (object) {
    "use strict";
    var object_y, position, prefab;
    // tiled coordinates starts in the bottom left corner
    object_y = (object.gid) ? object.y - (this.map.tileHeight / 2) : object.y + (object.height / 2);
    position = {"x": object.x + (this.map.tileHeight / 2), "y": object_y};
    // create object according to its type
    if (this.prefab_classes.hasOwnProperty(object.type)) {
        prefab = new this.prefab_classes[object.type](this, object.name, position, object.properties);
    }
    this.prefabs[object.name] = prefab;
};

Bomberman.TiledState.prototype.init_hud = function () {
    "use strict";
    var lives_position, lives_properties, lives;

    // create the lives prefab
    lives_position = new Phaser.Point(0.9 * this.game.world.width, 0.07 * this.game.world.height);
    lives_properties = {group: "hud", texture: "heart_image", number_of_lives: 3};
    lives = new Bomberman.Lives(this, "lives", lives_position, lives_properties);

    var chrono, chrono_properties, chrono_position;
    chrono_position = new Phaser.Point(this.game.world.width/2, 4)
    chrono_properties = {group: "hud"};
    chrono = new Bomberman.Chrono(this, "chrono", chrono_position, chrono_properties);

};

Bomberman.TiledState.prototype.next_level = function () {
    "use strict";
    localStorage.number_of_lives = this.prefabs.player.number_of_lives;
    localStorage.number_of_bombs = this.prefabs.player.number_of_bombs;
    this.game.state.start("BootState", true, false, this.level_data.next_level, "TiledState");
};

Bomberman.TiledState.prototype.game_over = function () {
    "use strict";
    window.open("gameOver.html");
};

Bomberman.TiledState.prototype.show_score = function () {
    "use strict";
    window.open("score.html", "_self");
};

