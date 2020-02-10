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

/* ----- CACHED ELEMENT REFERENCE ----*/
let budget = document.querySelector("#budget");
let beforeWager = document.querySelector("#beforeWager");
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

/* ----- EVENT LISTENERS ----*/
beforeWager.addEventListener('click', buyChips);
readyBet.addEventListener('click', setBet);
TABLE.moves.deal.addEventListener('click', deal);

/* ----- FUNCTIONS ----*/

init();

function init(){
    render();    
}

function render(){

    document.querySelector("#table").style.cssText = "background-color:#3A7B28!important; box-shadow: 0 0 200px rgba(0,0,0,0.9) inset; height:85vmin; width:100%; border-radius:10px; margin-top:6vmin;";
    instructions.innerHTML = "Set your bankroll...";
    $(instructions).slideDown(600);
    for(let moves in TABLE.moves){
        TABLE.moves[moves].style.cssText = "display:none;";
    }

    // for(let images in TABLE.bets){
    //     readyBet = TABLE.bets[images];
    // }
}

function deal(e){
    // On click of event deal amount placed from betting stage
    for(let moves in TABLE.moves){
        $(TABLE.moves[moves]).fadeIn(1500);
        $(instructions).fadeOut(300);
    }
    $(TABLE.moves.deal).fadeOut(300);

    for(let i = 0; i < 4; i++){
        let cardType = Math.ceil(Math.random()*13);
        count.push(cardType);
        let suit = Math.floor(Math.random()*TABLE.suits.length);
        let newCard = generateCard(cardType, suit);
        cardsGenerated.push(newCard);
    }
    
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

    // Setting value of cards based on cards selected

    count[0] === 11 || count[0] === 12 || count[0] === 13 ? count[0] = 10 : count[0];
    count[1] === 11 || count[1] === 12 || count[1] === 13 ? count[1] = 10 : count[1];
    if(count[0] === 1){count[0] + count[1] > 21 ? count[0] = 1: count[0] = 11;}
    if(count[1] === 1){count[0] + count[1] > 21 ? count[1] = 1: count[1] = 11;}

    dealerCountTotal.innerHTML = count[1];
    $(dealerCountTotal).fadeIn(2000);

    count[2] === 11 || count[2] === 12 || count[2] === 13 ? count[2] = 10 : count[2];
    count[3] === 11 || count[3] === 12 || count[3] === 13 ? count[3] = 10 : count[3];
    if(count[2] === 1){count[2] + count[3] > 21 ? count[2] = 1: count[2] = 11;}
    if(count[3] === 1){count[2] + count[3] > 21 ? count[3] = 1: count[3] = 11;}

    playerCountTotal.innerHTML = count[2]+count[3];
    $(playerCountTotal).fadeIn(2000);

    // Setting up blackjack rules for dealer flip

    
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

function setBet(e){
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

function placeBet(){
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
    tableMoneyDown = Math.ceil((Math.round(moneyDown/10))*10);
    total.innerHTML = tableMoneyDown;
    total.style.cssText = "color: white; font-size:40px; padding:0 2vmin 0 3vmin;";
    $(instructions).fadeOut(500);
    placeBet();
}