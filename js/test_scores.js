var names = ["Liam", "Marc", "Mathieu"];
var scores = [1, 1500, 1];

var $ = function (id) {
    return document.getElementById(id);
};

var addScore = function () {
    names.push($("name").value);
    scores.push($("score").value);
};

var displayScores = function () {
    var table = $("scores_table");
    var tBody = table.tBodies[0];
    if (tBody == undefined) {
        tBody = document.createElement("tBody");
        table.appendChild(tBody);
    }
    for (i = 0; i < scores.length; i++) {
        var row = tBody.insertRow(-1);
        var textNode = document.createTextNode(names[i]);
        var cellNode = row.insertCell(-1);
        cellNode.appendChild(textNode);
        var scoreNode = document.createTextNode(scores[i]);
        var cellNode2 = row.insertCell(-1);
        cellNode2.appendChild(scoreNode);
    }

};

window.onload = function () {
    $("add").onclick = addScore;
    $("display_scores").onclick = displayScores;
};
