function drawCard(location, from) {
    console.log("drawCard(location = " + location + " from = " + from + ")");
    var i = 0;
    while (i < 1) {
        num = Math.floor(Math.random() * 30);
        console.log("from = " + from);
        if (getCardLocation(num) == from) {
            setCardLocation(num, location);
            return (num);
        }
    }
}

function getCardInLocation(from) {
    console.log("getCardInLocation(from = " + from + ")");
    console.log(cardCount());
    for (var i = 0; i < cardCount(); i++) {
        if (getCardLocation(i) == from) {
            return i;
        } else if ((i + 1) == cardCount()) {
            return null;
        }
    }
}

function loadCards() {
    console.log("loadCards()");
    for (var i = 0; i < cardCount(); i++) {
        if (getCardLocation(i) != "deck" && getCardLocation(i) != "start") {
            makeCard(i);
        }
    }
}

function getTurn() {
    console.log("getTurn()");
    var turns = Number(getTurns());
    if (turns < (25 - players)) {
        setTurns(++turns);
        setSelectable(true);
    }

    if ((turns % players) == 0) {
        var playerTurn = players;
    } else {
        var playerTurn = turns % players;
    }
    console.log(playerTurn);
    document.getElementById("playerTurn").innerHTML = "Player " + playerTurn;
}

function reloadDrawPile() {
    console.log("reloadDrawPile()");
    var draw0 = getCardInLocation("draw0");
    console.log(draw0);
    var draw1 = getCardInLocation("draw1");
    console.log(draw1);
    var draw2 = getCardInLocation("draw2");
    console.log(draw2);
    var draw3 = getCardInLocation("draw3");
    console.log(draw3);
    if (draw3 == null) {
        draw3 = draw2;
        setCardLocation(draw2, "draw3")
        dropCard(document.getElementById("draw3"), draw2);
        draw2 = null;
    }

    if (draw2 == null) {
        draw2 = draw1;
        setCardLocation(draw1, "draw2")
        dropCard(document.getElementById("draw2"), draw1);
        draw1 = null;
    }

    if (draw1 == null) {
        draw1 = draw0;
        setCardLocation(draw0, "draw1")
        dropCard(document.getElementById("draw1"), draw0);
        draw0 = null;
    }

    if (draw0 == null) {
        console.log("null");
        drawCard("draw0", "deck");
        makeCard(getCardInLocation("draw0"));
    }
}

function rotateCard(id, top = null) {
    console.log("rotateCard(id = " + id + " top = " + top + ")");
    //in game rotation
    if (top == null) {
        if (getCardTop(id) > 2) {
            setCardTop(id, 0);
        } else {
            setCardTop(id, Number(getCardTop(id)) + 1);
        }
    } else {
        setCardTop(id, top);
    }

    //in game rotation
    if (top == null) {
        reloadBonusSides(id);
    }
}

function cancelLocation(id) {
    console.log("cancelLocation(id = " + id + ")");
    var element = document.getElementById(getCardLocation(id));
    var parent = document.getElementById(id).parentNode.id;
    dropCard(element, id);
    document.getElementById(parent).innerHTML = "";
    document.getElementById(parent).classList.add("empty");
    setSelectable(true);
}

function confirmLocation(id) {
    console.log("confirmLocation(id = " + id + ")");
    var location = document.getElementById(id).parentNode;
    setCardLocation(id, location.id);
    location.removeChild(location.lastChild);
    location.firstChild.removeAttribute("onclick");
    location.removeEventListener("click", allowDrop, true);
    setSelected(-1);
    reloadDrawPile();
    getTurn();
    for (var i = 0; i < cardCount(); i++) {
        if (getCardPlayer(i) != "") {
            checkCardsAround(i);
        }
    }
    getScore();
}

function allowDrop(ev) {
    console.log("allowDrop(ev.target.id = " + ev.target.id + ")");
    if (getSelectable() == "true") {
        dropCard(ev.target, getSelected());
        addCardButtons(ev.target, getSelected());
        setSelectable(false);
    }
}

function dropCard(element, id) {
    console.log("dropCard(element.id = " + element.id + " id = " + id + ")");
    element.appendChild(document.getElementById(id));
    element.classList.remove("empty");
    selected(document.getElementById(id));
}

function selected(element) {
    console.log("selected(element.id = " + element.id + ")");
    if (getSelectable() == "true") {
        var id = getSelected();
        console.log(id);
        console.log(element.id);
        if (element.id != id && id != null && id != -1) {
            document.getElementById(id).style.boxShadow = "";
        }
        playerColor(element);
        setSelected(element.id);
    }
}

function reloadBonusSides(id) {
    console.log("reloadBonusSides(id = " + id + ")");
    var element = document.getElementById(id);
    var bonus = parseInt(getCardTop(id));
    var sides = getBonusSides(id);

    var sideNum = [1, 5, 7, 3];
    for (var i = 0; i < 4; i++) {
        if (sides[i] == "+" || sides[i] == "-") {
            element.children[sideNum[i]].innerHTML = sides[i];
            element.children[sideNum[i]].style.backgroundColor = "white";
        } else {
            element.children[sideNum[i]].style.backgroundColor = sides[i];
            element.children[sideNum[i]].innerHTML = "";
        }
    }
}

function getBonusSides(id) {
    var bonus = getCardTop(id);
    console.log(bonus);
    var sides = [];
    for (var i = 0; i < 4; i++) {
        sides[i] = getCardBonus(id, bonus);

        if (bonus == 3) {
            bonus = 0;
        } else {
            bonus++;
        }
    }
    return sides;
}

function checkCardsAround(id) {
    console.log("checkCardsAround(id: " + id + ")");
    var score = Number(getCardBasenum(id));
    var sides = getBonusSides(id);
    var parent = getCardLocation(id);
    var parent1 = Number(parent[1]);
    var parent2 = Number(parent[2]);
    var top = "b" + (parent1 - 1) + parent2;
    var right = "b" + parent1 + (parent2 + 1);
    var bottom = "b" + (parent1 + 1) + parent2;
    var left = "b" + parent1 + (parent2 - 1);
    
    if (top == "b22") {
        if (sides[0] == "+") {
            score += 1;
        } else if (sides[0] == "-") {
            score -= 1;
        }
    } else if (right == "b22") {
        if (sides[1] == "+") {
            score += 1;
        } else if (sides[1] == "-") {
            score -= 1;
        }
    } else if (bottom == "b22") {
        if (sides[2] == "+") {
            score += 1;
        } else if (sides[2] == "-") {
            score -= 1;
        }
    } else if (left == "b22") {
        if (sides[3] == "+") {
            score += 1;
        } else if (sides[3] == "-") {
            score -= 1;
        }
    }
    
    for (var i = 0; i < cardCount(); i++) {
        if (getCardLocation(i) == top) {
            if (sides[0] == "+") {
                score += Number(getCardBasenum(i));
            } else if (sides[0] == "-") {
                score -= Number(getCardBasenum(i));
            } else if (sides[0] == getCardBasecolor(i)) {
                score += Number(getCardBasenum(i)) * 2;
            }

            if (getCardBonuscard(id) == getCardName(i)) {
                score += 5;
            }
        } else if (getCardLocation(i) == right) {
            if (sides[1] == "+") {
                score += Number(getCardBasenum(i));
            } else if (sides[1] == "-") {
                score -= Number(getCardBasenum(i));
            } else if (sides[1] == getCardBasecolor(i)) {
                score += Number(getCardBasenum(i)) * 2;
            }

            if (getCardBonuscard(id) == getCardName(i)) {
                score += 5;
            }

        } else if (getCardLocation(i) == bottom) {
            if (sides[2] == "+") {
                score += Number(getCardBasenum(i));
            } else if (sides[2] == "-") {
                score -= Number(getCardBasenum(i));
            } else if (sides[2] == getCardBasecolor(i)) {
                score += Number(getCardBasenum(i)) * 2;
            }

            if (getCardBonuscard(id) == getCardName(i)) {
                score += 5;
            }

        } else if (getCardLocation(i) == left) {
            if (sides[3] == "+") {
                score += Number(getCardBasenum(i));
            } else if (sides[3] == "-") {
                score -= Number(getCardBasenum(i));
            } else if (sides[3] == getCardBasecolor(i)) {
                score += Number(getCardBasenum(i)) * 2;
            }

            if (getCardBonuscard(id) == getCardName(i)) {
                score += 5;
            }

        }
    }
    setCardScore(id, score);
}

function getScore() {
    var player1 = 0;
    var player2 = 0;
    var player3 = 0;
    var player4 = 0;
    for (var i = 0; i < cardCount(); i++) {
        switch (getCardPlayer(i)) {
            case 1:
                player1 += getCardScore(i);
                break;
            case 2:
                player2 += getCardScore(i);
                break;
            case 3:
                player3 += getCardScore(i);
                break;
            case 4:
                player4 += getCardScore(i);
                break;
        }
    }

    switch (players) {
        case 4:
            document.getElementById("player4").innerHTML = "Player 4: " + player4;
        case 3:
            document.getElementById("player3").innerHTML = "Player 3: " + player3;
        case 2:
            document.getElementById("player2").innerHTML = "Player 2: " + player2;
            document.getElementById("player1").innerHTML = "Player 1: " + player1;
    }
}

function resetGame() {
    console.log("resetGame()");
    localStorage.clear();
    location.reload();
}
