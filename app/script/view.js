function buildDeck(data) {
    //    console.log("buildDeck(data = " + data + ")");
    var cards = JSON.parse(data);
    if (localStorage.getItem("cards") === null) {
        var spent = [
            {
                "spent": 0,
            },
            {
                "spent": 0,
            },
            {
                "spent": 0,
            },
            {
                "spent": 0,
            }];
        setSpent(spent);
        setCards(cards.cards);
        setTurns(0);
        startBoard();
        increaseTurn();
        setTurn(getPlayerTurn());
    }
    loadCards();
    setScore(getScore());

    //Don't allow user to move starting cards
    document.getElementById("b21").firstChild.removeAttribute("onclick");
    document.getElementById("b21").removeEventListener("click", allowDrop, true);
    document.getElementById("b23").firstChild.removeAttribute("onclick");
    document.getElementById("b23").removeEventListener("click", allowDrop, true);
    document.getElementById("b12").firstChild.removeAttribute("onclick");
    document.getElementById("b12").removeEventListener("click", allowDrop, true);
    document.getElementById("b32").firstChild.removeAttribute("onclick");
    document.getElementById("b32").removeEventListener("click", allowDrop, true);
}

function startBoard() {
    console.log("startBoard()");
    drawCard("draw0", "deck");
    drawCard("draw1", "deck");
    drawCard("draw2", "deck");
    drawCard("draw3", "deck");
    switch (players) {
        case 4:
            cardId = drawCard("b32", "start");
            setCardPlayer(cardId, 4);
            rotateCard(cardId, 2);
        case 3:
            cardId = drawCard("b12", "start");
            setCardPlayer(cardId, 3);
        default:
            cardId = drawCard("b23", "start");
            setCardPlayer(cardId, 2);
            rotateCard(cardId, 3);
            cardId = drawCard("b21", "start");
            setCardPlayer(cardId, 1);
            rotateCard(cardId, 1);
    }

    switch (players) {
        case 4:
            document.getElementById("player4").innerHTML = "Player 4: ";
        case 3:
            document.getElementById("player3").innerHTML = "Player 3: ";
        case 2:
            document.getElementById("player2").innerHTML = "Player 2: ";
            document.getElementById("player1").innerHTML = "Player 1: ";
    }

    for (var i = 0; i < cardCount(); i++) {
        console.log(getCardPlayer(i));
        if (getCardPlayer(i) != "") {
            checkCardsAround(i);
        }
    }
}

function addCardButtons(element, id) {
    console.log("addCardButtons(element = " + element + " id = " + id + ")");
    var btnContainer = document.createElement("DIV");
    btnContainer.setAttribute("id", "btnContainer");
    var confirm = document.createElement("BUTTON");
    var confirmImg = document.createElement("IMG");
    confirmImg.setAttribute("src", "https://img.icons8.com/metro/26/000000/checkmark.png")
    confirm.setAttribute("onclick", "confirmLocation(" + id + ")");
    confirm.appendChild(confirmImg);
    var rotate = document.createElement("BUTTON");
    var rotateImg = document.createElement("IMG");
    rotateImg.setAttribute("src", "https://img.icons8.com/metro/26/000000/rotate-left.png")
    rotate.setAttribute("onclick", "rotateCard(" + id + ")");
    rotate.appendChild(rotateImg);
    var cancel = document.createElement("BUTTON");
    var cancelImg = document.createElement("IMG");
    cancelImg.setAttribute("src", "https://img.icons8.com/metro/26/000000/delete-sign.png")
    cancel.setAttribute("onclick", "cancelLocation(" + id + ")");
    cancel.appendChild(cancelImg);

    btnContainer.append(confirm);
    btnContainer.append(rotate);
    btnContainer.append(cancel);
    element.appendChild(btnContainer);
}

function playerColor(element) {
    var turn = Number(getTurns());
    var color;
    if ((turn % players) == 0) {
        var player = players;
    } else {
        var player = turn % players;
    }

    switch (player) {
        case 1:
            color = "red";
            break;
        case 2:
            color = "green";
            break;
        case 3:
            color = "blue";
            break;
        case 4:
            color = "yellow";
            break;
    }

    element.style.boxShadow = "0px 0px 20px " + color;
}

function makeCard(id, location = null) {
    console.log("makeCard(id = " + id + " location = " + location + ")");
    var element;
    if (location == null) {
        element = document.getElementById(getCardLocation(id));
    } else {
        element = document.getElementById(location);
    }
    var container = document.createElement("DIV");
    container.setAttribute("id", id);
    container.setAttribute("class", "grid-card");
    container.setAttribute("onclick", "selected(this)");
    var corner = document.createElement("DIV");
    corner.setAttribute("class", "card-corner");

    var bottom = document.createElement("DIV");
    var left = document.createElement("DIV");
    var right = document.createElement("DIV");
    var sides = getBonusSides(id);

    var top = document.createElement("DIV");
    top.setAttribute("class", "card-vertical");
    if (sides[0] == "+" || sides[0] == "-") {
        top.innerHTML = sides[0];
    } else {
        top.style.backgroundColor = sides[0];
    }

    var bottom = document.createElement("DIV");
    bottom.setAttribute("class", "card-vertical");
    if (sides[2] == "+" || sides[2] == "-") {
        bottom.innerHTML = sides[2];
    } else {
        bottom.style.backgroundColor = sides[2];
    }

    var left = document.createElement("DIV");
    left.setAttribute("class", "card-horizontal");
    if (sides[3] == "+" || sides[3] == "-") {
        left.innerHTML = sides[3];
    } else {
        left.style.backgroundColor = sides[3];
    }

    var right = document.createElement("DIV");
    right.setAttribute("class", "card-horizontal");
    if (sides[1] == "+" || sides[1] == "-") {
        right.innerHTML = sides[1];
    } else {
        right.style.backgroundColor = sides[1];
    }

    var center = document.createElement("DIV");
    center.setAttribute("class", "card-center");
    center.style.backgroundColor = getCardBasecolor(id);
    if (Number(getCardScore(id)) == 0) {
        setCardScore(id, getCardBasenum(id));
    }
    var currentScore = "";
    if (getCardScore(id) != getCardBasenum(id)) {
        currentScore = getCardScore(id) + "<br>";
    }
    center.innerHTML = getCardName(id) + "<br>" + getCardBasenum(id) + "<br><br>" + currentScore + getCardBonuscard(id);

    container.appendChild(corner);
    container.appendChild(top);
    container.appendChild(corner.cloneNode(true));
    container.appendChild(left);
    container.appendChild(center);
    container.appendChild(right);
    container.appendChild(corner.cloneNode(true));
    container.appendChild(bottom);
    container.appendChild(corner.cloneNode(true));
    container.classList.add("player" + getCardPlayer(id));

    element.appendChild(container);
    element.classList.remove("empty");

}

function moveCard(id, location) {
    var element = document.getElementById(id);
    var newElement = document.getElementById(location);
    element.style.width = element.parentElement.clientWidth + "px";
    element.style.position = "absolute";
    var rect = element.getBoundingClientRect();
    var newRect = newElement.getBoundingClientRect();
    console.log(element);
    var top = Math.round(rect.top);
    var left = Math.round(rect.left);
    var interval = setInterval(frame, 10);

    function frame() {
        if (top == Math.round(newRect.top) && left == Math.round(newRect.left)) {
            clearInterval(interval);
            dropCard(newElement, id);
    element.style.position = "";
        } else {
            console.log(newRect.left);
            console.log(left);
            if (top != newRect.top) {
                top++;
            }
            if (left != newRect.left) {
                left++;
            }
            element.style.top = top + 'px';
            element.style.left = left + 'px';
        }
    }
}
