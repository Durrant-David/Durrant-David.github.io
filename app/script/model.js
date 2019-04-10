// Load api
function loadFiles(url, callback) {
    //    console.log("loadFiles(url = " + url + " callback = " + callback + ")");
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.open("GET", url, true);
    xmlhttp.onload = function () {
        var data = this.responseText;
        callback(data);
    };
    xmlhttp.send();
}

/*****START CARD*****/
// GETTERS/SETTERS for card api
function getCards() {
    console.log("getCards()");
    return JSON.parse(localStorage.cards);
}

function setCards(cards) {
    console.log("setCards()");
    localStorage.setItem("cards", JSON.stringify(cards));
}

function getCardName(id) {
    console.log("getCardName(id = " + id + ")");
    var cards = getCards();
    return cards[id].name;
}

function setCardName(id, name) {
    console.log("setCardName()");
    var cards = getCards();
    cards[id].name = name;
    setCards(cards);
}

function getCardLocation(id) {
    console.log("getCardLocation(id = " + id + ")");
    var cards = getCards();
    return cards[id].location;
}

function setCardLocation(id, location) {
    console.log("setCardLocation(id = " + id + " location = " + location + ")");
    var cards = getCards();
    cards[id].location = location;
    setCards(cards);
}

function getCardBasenum(id) {
    console.log("getCardBasenum(id = " + id + ")");
    var cards = getCards();
    return cards[id].basenum;
}

function setCardBasenum(id, basenum) {
    console.log("setCardBasenum()");
    var cards = getCards();
    cards[id].basenum = basenum;
    setCards(cards);
}

function getCardScore(id) {
    console.log("getCardScore(id = " + id + ")");
    var cards = getCards();
    return cards[id].score;
}

function setCardScore(id, score) {
    console.log("setCardScore()");
    var cards = getCards();
    cards[id].score = score;
    setCards(cards);
}

function getCardPlayer(id) {
    console.log("getCardPlayer(id = " + id + ")");
    var cards = getCards();
    return cards[id].player;
}

function setCardPlayer(id, player) {
    console.log("setCardPlayer()");
    var cards = getCards();
    cards[id].player = player;
    setCards(cards);
}

function getCardBasecolor(id) {
    console.log("getCardBasecolor(id = " + id + ")");
    var cards = getCards();
    return cards[id].basecolor;
}

function setCardBasecolor(id, basecolor) {
    console.log("setCardBasecolor()");
    var cards = getCards();
    cards[id].basecolor = basecolor;
    setCards(cards);
}

function getCardTop(id) {
    console.log("getCardTop(id = " + id + ")");
    var cards = getCards();
    return cards[id].top;
}

function setCardTop(id, top) {
    console.log("setCardTop(id = " + id + " top = " + top + ")");
    var cards = getCards();
    cards[id].top = top;
    setCards(cards);
}

function getCardBonus(id, side = null) {
    console.log("getCardBonus(id = " + id + " side = " + side + ")");
    var cards = getCards();
    if (side == null) {
        return cards[id].bonus;
    } else {
        return cards[id].bonus[side];
    }
}

function setCardBonus(id, bonus) {
    console.log("setCardBonus()");
    var cards = getCards();
    cards[id].bonus = bonus;
    setCards(cards);
}

function getCardBonuscard(id) {
    console.log("getCardBonuscard(id = " + id + ")");
    var cards = getCards();
    return cards[id].bonuscard;
}

function setCardBonuscard(id, bonuscard) {
    console.log("setCardBonuscard()");
    var cards = getCards();
    cards[id].bonuscard = bonuscard;
    setCards(cards);
}

function cardCount() {
    console.log("cardCount()");
    var cards = getCards();
    return cards.length;
}
/*****END CARD*****/


/*****START TURNS*****/
function getTurns() {
    console.log("getTurns()");
    return localStorage.turns;
}

function setTurns(turns) {
    console.log("setTurns()");
    localStorage.setItem("turns", turns);
}
/*****END TURNs*****/

/*****START SELECTABLE*****/
function getSelectable() {
    console.log("getSelectable()");
    return localStorage.selectable;
}

function setSelectable(selectable) {
    console.log("setSelectable()");
    localStorage.setItem("selectable", selectable);
}
/*****END SELECTABLE*****/

/*****START SELECTED*****/
function getSelected() {
    console.log("getSelected()");
    return localStorage.selected;
}

function setSelected(id) {
    console.log("setSelected(id = " + id + ")");
    localStorage.setItem("selected", id);
}
/*****END SELECTED*****/
