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
        moneyDown: 0,
        bet: 0,
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
    }
}

/* ----- APP STATES VARIABLES ----*/
let bet;
let totalGamble;

/* ----- CACHED ELEMENT REFERENCE ----*/
let budget = document.querySelector("#budget");
let beforeWager = document.querySelector("#beforeWager");
let total = document.querySelector("#total");
let instructions = document.querySelector('#instructions');
let imageEl = "<img src='' alt=''>";
let chips = TABLE.chips;
let bet500 = TABLE.bets.bet500.firstElementChild;
let bet100 = TABLE.bets.bet100.firstElementChild;
let bet10 = TABLE.bets.bet10.firstElementChild;
let bet1 = TABLE.bets.bet1.firstElementChild;
let readyBet = document.querySelector('.sub-table');

/* ----- EVENT LISTENERS ----*/
beforeWager.addEventListener('click', buyChips);
readyBet.addEventListener('click', deal);

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
        TABLE.moves[moves].style.cssText = "display: none";
    }

    // for(let images in TABLE.bets){
    //     readyBet = TABLE.bets[images];
    // }
    
}

function deal(e){
    let bet = e.target.value;
    if(e.targeet.tagName !== 'BUTTON') return;
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
    total.innerHTML = Math.ceil((Math.round(moneyDown/10))*10);
    total.style.cssText = "color: white; font-size:40px; padding:0 2vmin 0 3vmin;";
    $(instructions).fadeOut(500);
    placeBet();
}