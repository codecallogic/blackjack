/* ----- CONSTANTS ----*/
const PLAYERS = {
    dealer: {
        hands: 0,
        hit: 0,
        stand: 0,
        cardsAtPlay: [],
    },
    playerHands: {
        hands: 0,
        hit: 0,
        stand: 0,
        cardsAtPlay: [],
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
let count = [1, 7];
let unavailableCards = [];

/* ----- CACHED ELEMENT REFERENCE ----*/
let chips = TABLE.chips;
let bet500 = TABLE.bets.bet500.firstElementChild;
let bet100 = TABLE.bets.bet100.firstElementChild;
let bet10 = TABLE.bets.bet10.firstElementChild;
let bet1 = TABLE.bets.bet1.firstElementChild;
let dealerHandsCards = PLAYERS.dealer.cardsAtPlay;
let playerHandsCards = PLAYERS.playerHands.cardsAtPlay;
let dealerHandsValue = PLAYERS.dealer.hands;
let playerHandsValue = PLAYERS.playerHands.hands;
let budget = document.querySelector("#budget");
let beforeWager = document.querySelector("#beforeWager");
let range = document.querySelector('#range');
let total = document.querySelector("#total");
let totalBet = document.querySelector("#totalBet");
let doubleDown = document.querySelector("#doubleDown");
let instructions = document.querySelector('#instructions');
let imageEl = "<img src='' alt=''>";
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
    for(let moves in TABLE.moves){TABLE.moves[moves].style.cssText = "display:none;";}
    // console.log(count)
    // for(let i = 0; i < count.length; i++)
    // {
    //     let countGroupOne = count[1] ? count[0] + count[1] : count[0];
    //     let countGroupTwo = count[1] ? count[0] + count[1] : count[0];
    //     console.log(countGroupOne);
    //     let check = count.forEach(function(x){return x === 1});
    //     console.log(check);
    //     countGroupOne < 21 || countGroupTwo < 21 ? aces = 11 : false;
    // }
    // console.log(count);
}

function hit(){
    // Add additional card if player presses hit
    randomCards();
    playerHandsCards.push(cardsGenerated);
    setValues();
    playerHandsValue += count[0];
    playerCountTotal.innerHTML = playerHandsValue;
    document.querySelector('#playerCards').appendChild(newCard);
    let newPlayerCards = document.querySelectorAll('#playerCards > img');
    newPlayerCards[newPlayerCards.length - 1].src = `images/${playerHandsCards[playerHandsCards.length - 1]}.png`;
    $(newPlayerCards).fadeIn(1500);
    console.log(cardsGenerated);
    console.log(count);
    console.log(playerHandsValue);
}

function deal(e){
    // On click of event fade in play buttons and fade out deal button amount placed from betting stage
    for(let moves in TABLE.moves){$(TABLE.moves[moves]).fadeIn(1500); $(instructions).fadeOut(300);}
    $(TABLE.moves.deal).fadeOut(300);

    // Disable click for chips after deal is set and game is in motion
    for(let images in TABLE.bets){$(TABLE.bets[images].firstElementChild).click(false);}

    // generate random cards
    for(let i = 0; i < 4; i++){randomCards();}

    dealerHandsCards.push(cardsGenerated[0], cardsGenerated[1]);
    playerHandsCards.push(cardsGenerated[2], cardsGenerated[3]);
    
    // Arrange table with random selected cards
    setTimeout(function(){
            dealerCards[0].src = `images/seekers.png`;
            dealerCards[1].src = `images/${dealerHandsCards[1]}.png`;
            playerCards[0].src = `images/${playerHandsCards[0]}.png`;
            playerCards[1].src = `images/${playerHandsCards[1]}.png`;
            $(dealerCards).fadeIn(1500);
            $(playerCards).fadeIn(1500);
    }, 200);

    setValues();

    playerHandsValue += count[2]+count[3];
    dealerHandsValue += count[1];
    dealerCountTotal.innerHTML = dealerHandsValue;
    playerCountTotal.innerHTML = playerHandsValue;
    $(playerCountTotal).fadeIn(2000);
    $(dealerCountTotal).fadeIn(2000);
    cardsGenerated = [];
    count = [];
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
    for(let i = 0; i < count.length; i++){count[i] === 11 || count[i] === 12 || count[i] === 13 ? count[i] = 10: false;}
    for(let i = 0; i < count.length; i++)
    {
        let countGroupOne = count[1] ? count[0] + count[1] : count[0];
        let countGroupTwo = count[1] ? count[0] + count[1] : count[0];
        count[i] === 1 ? count[i] = 11: false;
        countGroupOne >= 21 || countGroupTwo >= 21 ? count[i] === 1 ? count[i] = 1: false : false;
    }
    

    // if (playerHand.length === 2) {
    //     ace = 11
    // }

    // var currentPlayerHandValue = 15
    // var playerHand = [10,5, 5]
    

    // playerHand.forEach(value => currentPlayerHandValue += value)

    // if (ace needs to be 11) {
    //     aceValue = 11
    // } else {
    //     aceValue = 1
    // }

    // playerHand.push(aceValue)

    // continous
}

function placeBet(e){
    let bet = parseInt(e.target.id);
    if(e.target.tagName !== 'IMG' || tableMoneyDown === 0) return;
    totalBet.style.cssText = "color: white; font-size:40px; padding:0 2vmin 0 3vmin;";
    tableBet += tableMoneyDown - bet <= 0 ? (tableMoneyDown - bet) + bet: bet;
    tableMoneyDown -= bet;
    tableMoneyDown <= 0 ? tableMoneyDown = 0: tableMoneyDown;
    if(tableMoneyDown <= 0)
    {
        for(let bets in TABLE.bets)
        { 
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
    setTimeout(function()
    {
        instructions.innerHTML = 'Place your bets...';
        $(instructions).slideDown(600);
    }, 700);
    bet500.src = chips.chips500;
    bet100.src = chips.chips100;
    bet10.src = chips.chips10;
    bet1.src = chips.chips1;
    for(let images in TABLE.bets)
    {
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