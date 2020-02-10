/* ----- CONSTANTS ----*/
const PLAYERS = {
    dealer: {
        hands: 0,
        hit: 0,
        stand: 0,
    },
    playerHands: {
        hands: 0,
        hit: 0,
        stand: 0,
    }
}

const TABLE = {
    chips: {
        chips500: "images/500chip.png",
        chips100: "images/100chip.png",
        chips10: "images/10chip.png",
        chips1: "images/1chip.png"
    },
    moves: {
        hit: document.querySelector("#hit"),
        deal: document.querySelector("#deal"),
        insure: document.querySelector("#insure"),
        stand: document.querySelector("#stand")
    },
    bets: {
        bet500: document.querySelector('#bet500'),
        bet100: document.querySelector('#bet100'),
        bet10: document.querySelector('#bet10'),
        bet1: document.querySelector('#bet1')
    },
    suits: ['C','S','D','H'],
}

/* ----- APP STATES VARIABLES ----*/
let tableBet = 0;
let tableMoneyDown = 0;
let cardsGenerated = [];
let dealerHiddenCard;
let count = [];
let unavailableCards = [];

/* ----- CACHED ELEMENT REFERENCE ----*/
let budget = document.querySelector("#budget");
let beforeWager = document.querySelector("#beforeWager");
let range = document.querySelector('#range');
let total = document.querySelector("#total");
let totalBet = document.querySelector("#totalBet");
let doubleDown = document.querySelector("#doubleDown");
let instructions = document.querySelector('#instructions');
let imageEl = "<img src='' alt=''>";
let chips = TABLE.chips;
let bet500 = TABLE.bets.bet500.firstElementChild;
let bet100 = TABLE.bets.bet100.firstElementChild;
let bet10 = TABLE.bets.bet10.firstElementChild;
let bet1 = TABLE.bets.bet1.firstElementChild;
let readyBet = document.querySelector('.sub-table');
let dealerCards = document.querySelectorAll('#dealerCards > img');
let playerCards = document.querySelectorAll('#playerCards > img');
let dealerCountTotal = document.querySelector('#dealerCount');
let playerCountTotal = document.querySelector('#playerCount');
let newCard = document.createElement('img');

/* ----- EVENT LISTENERS ----*/
beforeWager.addEventListener('click', buyChips);
readyBet.addEventListener('click', placeBet);
TABLE.moves.deal.addEventListener('click', deal);
budget.addEventListener('keyup', function(e){
    if(e.keyCode === 13){
        e.preventDefault();
        beforeWager.click();
    }
})
TABLE.moves.hit.addEventListener('click', hit);

/* ----- FUNCTIONS ----*/

init();

function init(){
    budget.focus();
    render();    
}

function render(){

    document.querySelector("#table").style.cssText = "background-color:#3A7B28!important; box-shadow: 0 0 200px rgba(0,0,0,0.9) inset; height:85vmin; width:100%; border-radius:10px; margin-top:6vmin;";
    instructions.innerHTML = "Set your bankroll...";
    $(instructions).slideDown(600);
    $(range).slideDown(1500);
    for(let moves in TABLE.moves){
        TABLE.moves[moves].style.cssText = "display:none;";
    }
    
    // for(let images in TABLE.bets){
    //     readyBet = TABLE.bets[images];
    // }
}

function hit(){
    // Check if flip is black jack or hit
    let cardType = Math.ceil(Math.random()*13);
    count.push(cardType);
    let suit = Math.floor(Math.random()*TABLE.suits.length);
    let newCard = generateCard(cardType, suit);
    cardsGenerated.push(newCard);
    unavailableCards.push(newCard);
    document.querySelector('#playerCards').appendChild(newCard);
    let newPlayerCards = document.querySelectorAll('#playerCards > img');
    newPlayerCards[2].src = `images/${cardsGenerated[0]}.png`;
    $(newPlayerCards).fadeIn(1500);

    // dealerCards[0].src = `images/${cardsGenerated[0]}.png`;
    // dealerCountTotal.innerHTML = count[0] + count[1];
    console.log(count[0] + count[1]);
}

function deal(e){
    // On click of event fade in play buttons and fade out deal button amount placed from betting stage
    for(let moves in TABLE.moves){
        $(TABLE.moves[moves]).fadeIn(1500);
        $(instructions).fadeOut(300);
    }
    $(TABLE.moves.deal).fadeOut(300);

    // Disable click for chips after deal is set and game is in motion
    for(let images in TABLE.bets){
        $(TABLE.bets[images].firstElementChild).click(false);
    }

    // Create array and define file directory for each randomly generated cards for dealer and player
    for(let i = 0; i < 4; i++){
        randomCards();
    }

    PLAYERS.playerHands.hands += count[2]+count[3];
    console.log(PLAYERS.playerHands.hands);
    console.log(count);
    
    // Arrange table for dealer with random selected cards
    setTimeout(function(){
        for(let i = 0; i < 2; i++){
            dealerCards[0].id = 'one';
            dealerCards[1].id = 'two';
            dealerHiddenCard = `images/${cardsGenerated[0]}.png`
            dealerCards[0].src = `images/seekers.png`;
            dealerCards[1].src = `images/${cardsGenerated[1]}.png`;
        }
        $(dealerCards).fadeIn(1500);
    }, 200);

    count.splice(0,2);
    console.log(count);
    
    // Arrange table for player with random selected cards
    setTimeout(function(){
        for(let i = 0; i < 2; i++){
            playerCards[0].id = 'three';
            playerCards[1].id = 'four';
            playerCards[0].src = `images/${cardsGenerated[2]}.png`;
            playerCards[1].src = `images/${cardsGenerated[3]}.png`;
        }
        $(playerCards).fadeIn(1500);
    }, 200);

    count.splice(0,2);

    // Setting value of cards based on cards selected

    setValues();

    PLAYERS.playerHands.hands += count[2]+count[3];
    PLAYERS.dealer.hands += count[0]+count[1];

    dealerCountTotal.innerHTML = count[1];
    $(dealerCountTotal).fadeIn(2000);

    playerCountTotal.innerHTML = count[2]+count[3];
    $(playerCountTotal).fadeIn(2000);

    generateCard = [];

}

function generateCard(a, b){
    let suit = TABLE.suits[b];
    let cardType = a; 
    if(a === 1){cardType = 'A'};
    if(a === 11){cardType = 'J'};
    if(a === 12){cardType = 'Q'};
    if(a === 13){cardType = 'k'};
    let cardSelected = `${cardType}${suit}`;
    return cardSelected;
}

function randomCards(){
    let cardType = Math.ceil(Math.random()*13);
    count.push(cardType);
    let suit = Math.floor(Math.random()*TABLE.suits.length);
    let newCard = generateCard(cardType, suit);
    cardsGenerated.push(newCard);
    unavailableCards.push(newCard);
}

function setValues(){
    let faceValues = [11, 12, 13];
    for(let i = 0; i < faceValues.length; i++){
        
    }
    count[0] === 11 || count[0] === 12 || count[0] === 13 ? count[0] = 10 : count[0];
    count[1] === 11 || count[1] === 12 || count[1] === 13 ? count[1] = 10 : count[1];
    if(count[0] === 1){count[0] + count[1] > 21 ? count[0] = 1: count[0] = 11;}
    if(count[1] === 1){count[0] + count[1] > 21 ? count[1] = 1: count[1] = 11;}

    count[2] === 11 || count[2] === 12 || count[2] === 13 ? count[2] = 10 : count[2];
    count[3] === 11 || count[3] === 12 || count[3] === 13 ? count[3] = 10 : count[3];
    if(count[2] === 1){count[2] + count[3] > 21 ? count[2] = 1: count[2] = 11;}
    if(count[3] === 1){count[2] + count[3] > 21 ? count[3] = 1: count[3] = 11;}
    
}

function placeBet(e){
    let bet = parseInt(e.target.id);
    if(e.target.tagName !== 'IMG' || tableMoneyDown === 0) return;
    totalBet.style.cssText = "color: white; font-size:40px; padding:0 2vmin 0 3vmin;";
    tableBet += tableMoneyDown - bet <= 0 ? (tableMoneyDown - bet) + bet: bet;
    tableMoneyDown -= bet;
    tableMoneyDown <= 0 ? tableMoneyDown = 0: tableMoneyDown;
    if(tableMoneyDown <= 0){
        for(let bets in TABLE.bets){ 
            TABLE.bets[bets].firstElementChild.style.cssText = "display:none;";
            total.style.cssText = "display:none;";
        }
    }
    total.innerHTML = tableMoneyDown;
    totalBet.innerHTML = tableBet;
    let parentChild = e.target.parentNode;
    let src = parentChild.firstElementChild.src;
    doubleDown.firstElementChild.src = src;
    $(doubleDown.firstElementChild).fadeIn(1500);
    $(TABLE.moves.deal).fadeIn(1000);

}

function setTable(){
    setTimeout(function(){
        instructions.innerHTML = 'Place your bets...';
        $(instructions).slideDown(600);
    }, 700);
    bet500.src = chips.chips500;
    bet100.src = chips.chips100;
    bet10.src = chips.chips10;
    bet1.src = chips.chips1;
    for(let images in TABLE.bets){
        $(TABLE.bets[images].firstElementChild).fadeIn(1500);
        $(total).fadeIn(1500);
        TABLE.bets[images].firstElementChild.className += 'readyBet';
    }
    
}

function buyChips(e){
    if(isNaN(budget.value)) return;
    if(budget.value <= 100 || budget.value >= 50000) return;
    let moneyDown = PLAYERS.playerHands.moneyDown = budget.value;
    budget.style.cssText = "display:none";
    beforeWager.style.cssText = "display:none";
    range.style.cssText = "display:none";
    tableMoneyDown = Math.ceil((Math.round(moneyDown/10))*10);
    total.innerHTML = tableMoneyDown;
    total.style.cssText = "color: white; font-size:40px; padding:0 2vmin 0 3vmin;";
    $(instructions).fadeOut(500);
    setTable();
}