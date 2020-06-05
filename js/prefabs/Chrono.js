var Bomberman = Bomberman || {};

Bomberman.Chrono = function (game_state, name, position, properties) {
    "use strict";
    var chrono_text_position, chrono_text_style, chrono_text_properties;
    Bomberman.Prefab.call(this, game_state, name, position, properties);

    this.fixedToCamera = true;

    this.anchor.setTo(0.5);
    this.scale.setTo(0.9);

    // create a text prefab to show the number of lives
    chrono_text_position = new Phaser.Point(this.position.x - 2, this.position.y + 5);
    chrono_text_style = {font: "14px Arial", fill: "#fff"};
    chrono_text_properties = {group: "hud", text: this.game.time.totalElapsedSeconds().toString(), style: chrono_text_style};
    this.chrono_text = new Bomberman.TextPrefab(this.game_state, "lives_text", chrono_text_position, chrono_text_properties);
    this.chrono_text.anchor.setTo(0.5);
};

Bomberman.Chrono.prototype = Object.create(Bomberman.Prefab.prototype);
Bomberman.Chrono.prototype.constructor = Bomberman.Chrono;

Bomberman.Chrono.prototype.update = function () {
    "use strict";
    // update to show current number of lives
    this.chrono_text.text = this.game.time.totalElapsedSeconds().toString();
};


