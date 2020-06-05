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

/*
var startTime = 0
var start = 0
var end = 0
var diff = 0
var timerID = 0
var chronoTimer
//window.onload = chronoStart;


function chrono(){
    end = new Date()
    diff = end - start
    diff = new Date(diff)
    var msec = diff.getMilliseconds()
    var sec = diff.getSeconds()
    var min = diff.getMinutes()


    if (min < 10){
        min = "0" + min
    }
    if (sec < 10){
        sec = "0" + sec
    }
    if(msec < 10){
        msec = "00" +msec
    }
    else if(msec < 100){
        msec = "0" +msec
    }
    chronoTimer = document.getElementById("chronotime").value =  min + ":" + sec + ":" + msec
    timerID = setTimeout("chrono()", 10)
}
function chronoStart(){
   // document.chronoForm.startstop.value = "stop!"
   // document.chronoForm.startstop.onclick = chronoStop
    //document.chronoForm.reset.onclick = chronoReset
    start = new Date()
    chrono()

}

function chronoStop() {
    clearInterval(chronoTimer)
}*/



