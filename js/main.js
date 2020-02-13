/* ----- CONSTANTS ----*/
const PLAYERS = {
    dealer: {
        hands: 0,
        cardsAtPlay: [],
    },
    playerHands: {
        hands: 0,
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
    aces: ['AS','AC','AH','AD'],
}

/* ----- APP STATES VARIABLES ----*/
let tableBet = 0;
let tableMoneyDown = 0;
let cardsGenerated = [];
let dealerHiddenCard = 0;
let count = [];
let unavailableCards = [];
let saveTableBet = 0;
let congrats;
let playerTurn = 0;
let checkingHands;
let checkingCards;

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
let expandTable = document.querySelector('#buyChips');
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
let overlay = document.querySelector('.overlay');
let endRound = document.querySelector('.endRound');

/* ----- EVENT LISTENERS ----*/
beforeWager.addEventListener('click', buyChips);
readyBet.addEventListener('click', placeBet);
TABLE.moves.deal.addEventListener('click', deal);
budget.addEventListener('keyup', function(e){if(e.keyCode === 13){e.preventDefault();beforeWager.click();}})
TABLE.moves.hit.addEventListener('click', hit);
TABLE.moves.stand.addEventListener('click', stand);

/* ----- FUNCTIONS ----*/

init();

function init(){
    budget.focus();
    budget.select();
    render();
    // deal();
    // stand();
}

function render(){
    document.querySelector("#table").style.cssText = "background-color:#3A7B28!important; box-shadow: 0 0 200px rgba(0,0,0,0.9) inset; height:85vmin; width:100%; border-radius:10px; margin-top:6vmin;";
    instructions.innerHTML = "Set your bankroll...";
    $(instructions).slideDown(600);
    $(range).slideDown(1500);
    for(let moves in TABLE.moves){TABLE.moves[moves].style.cssText = "display:none;";}
}

function results(play){
    if(play === 'blackjack'){
        // dealerHandsValue += dealerHiddenCard;
        if(playerHandsValue !== dealerHandsValue){
        setTimeout(function(){
            dealerFlips();
        })
        setTimeout(function(){
            saveTableBet = tableBet;
            congrats = (tableBet + tableBet) + (tableBet * 1.5);
            tableMoneyDown += congrats;
            total.innerHTML = tableMoneyDown - saveTableBet;
            endRound.style.cssText = "color: var(--yellow-gold);";
            endRound.innerHTML = `BLACKJACK ${congrats}`;
            addOverlay();
            newRound();
        }, 1500)
        }else if(playerHandsValue === dealerHandsValue){
            dealerFlips();
            push();
        } 
    }
    if(play === 'checkWinner'){
        console.log(playerHandsValue);
        console.log(dealerHandsValue);
        if(dealerHandsValue > playerHandsValue && dealerHandsValue <= 21){
            dealerWins();
        }else if(playerHandsValue > dealerHandsValue && playerHandsValue <= 21){
            console.log(dealerHandsValue);
            console.log(playerHandsValue);
            playerWins();
        }else if(dealerHandsValue > 21 && playerHandsValue <= 21){
            playerWins();
        }else if(playerHandsValue > 21 && dealerHandsValue <= 21){
            dealerWins();
        }else if(playerHandsValue === dealerHandsValue){
            dealerFlips();
            push();
        }
    }
}

function newRound(){
    // On click of event fade out play buttons and fade in deal button amount placed from betting stage
    for(let moves in TABLE.moves){$(TABLE.moves[moves]).fadeOut(1500); $(instructions).fadeOut(300);}
    $(TABLE.moves.deal).fadeIn(300);

    // Enable click for chips after deal is set and game is in motion
    for(let images in TABLE.bets){TABLE.bets[images].firstElementChild.style.pointerEvents = 'auto';};
}

function playerWins(){
    setTimeout(function(){
        saveTableBet = tableBet;
        congrats = tableBet + tableBet;
        tableMoneyDown += congrats;
        total.innerHTML = tableMoneyDown - saveTableBet;
        endRound.style.cssText = "color: var(--yellow-gold);";
        endRound.innerHTML = `WIN ${congrats}`;
        addOverlay();
        newRound();
    }, 1500)
}

function dealerWins(){
    setTimeout(function(){
        saveTableBet = tableBet;
        losses = tableBet;
        tableMoneyDown -= congrats;
        total.innerHTML = tableMoneyDown - saveTableBet;
        endRound.style.cssText = "color:white;";
        endRound.innerHTML = `DEALER WINS`;
        addOverlay();
        newRound();
    }, 1500)
}

function push(){
    setTimeout(function(){
        endRound.style.cssText = "color:white;";
        endRound.innerHTML = `PUSH`;
        addOverlay();
    },1500)
}

function addOverlay(){
    $(overlay).fadeIn(100);
    $(doubleDown.firstElementChild).fadeOut(1500);
    $(TABLE.moves.deal).fadeOut(1000);
    $(totalBet).fadeOut(1500);
    $(overlay).on('click', function(){
        $(totalBet).fadeIn(1500);
        $(doubleDown.firstElementChild).fadeIn(1500);
        $(TABLE.moves.deal).fadeIn(1500);
        endRound.innerHTML = "";
        overlay.style.cssText = "display:none;";
    })
}

function hit(){
    // Add additional card if player presses hit
    randomCards();
    setValues();
    checkScore();
    // console.log(playerHandsCards);
    playerHandsCards.push(cardsGenerated[0]);
    // console.log(playerHandsCards);
    playerCountTotal.innerHTML = playerHandsValue;
    for(let i = 0; i < playerHandsCards.length; i++){document.querySelector('#playerCards').appendChild(newCard.cloneNode());}
    let newPlayerCards = document.querySelectorAll('#playerCards > img');
    newPlayerCards[newPlayerCards.length - 1].src = `images/${playerHandsCards[playerHandsCards.length - 1]}.png`;
    newPlayerCards[newPlayerCards.length - 1].style.cssText = "-ms-transform: rotate(-15deg); transform: rotate(-15deg);";
    $(newPlayerCards).fadeIn(1500);
    cardsGenerated = [];
    count = [];
}

function stand(){
    // Get full dealer hand value
    console.log(dealerHandsValue);
    // Check if player wins Blackjack
    if(playerHandsValue === 21 && dealerHandsValue <= 21){results('blackjack'); return};
    if(playerHandsValue < 21 && dealerHandsValue === 21){dealerFlips(); results('checkWinner'); return};
    // Check if both cards of dealer are aces
    let twoAces; let allAces;
    if(dealerHandsCards.length <= 2){twoAces = dealerHandsCards.every(r => TABLE.aces.includes(r));}
    if(dealerHandsCards.length <= 4 && dealerHandsCards.length > 2){allAces = dealerHandsCards.every(r => TABLE.aces.includes(r));}
    if(twoAces){dealerHandsValue = 12}; if(allAces){dealerHandsValue = 4};
    dealerFlips();
    dealerCountTotal.innerHTML = dealerHandsValue;
    console.log(dealerHandsValue);
    if(dealerHandsValue <= 17){
        if(playerHandsValue < 21){
        dealerHit(); return;
        }else{
        results('checkWinner');
        }}
    dealerHandsValue > 17 ? results('checkWinner') : false;
}

function dealerHit(){
    playerTurn = 1;
    randomCards();
    setValues();
    checkScore();
    dealerHandsCards.push(cardsGenerated[0]);
    dealerCountTotal.innerHTML = dealerHandsValue;
    for(let i = 0; i < dealerHandsCards.length; i++){document.querySelector('#dealerCards').appendChild(newCard.cloneNode());}
    let newDealerCards = document.querySelectorAll('#dealerCards > img');
    newDealerCards[newDealerCards.length - 1].src = `images/${dealerHandsCards[dealerHandsCards.length - 1]}.png`;
    newDealerCards[newDealerCards.length - 1].style.cssText = "-ms-transform: rotate(-15deg); transform: rotate(-15deg);";
    $(newDealerCards).fadeIn(1500);
    console.log(dealerHandsValue);
    cardsGenerated = [];
    count = [];
    dealerHandsValue < 17 ? stand() : results('checkWinner');
}

function dealerFlips(){
    setTimeout(function(){
    dealerCards[0].style.cssText = "display:none;"
    }, 200)
    setTimeout(function(){
        dealerCountTotal.innerHTML = dealerHandsValue;
        dealerCards[0].src = `images/${dealerHandsCards[0]}.png`;
        dealerCards[0].srcset = `images/${dealerHandsCards[0]}.png`;
        $(dealerCards[0]).fadeIn(2000);
    }, 600)
}

function checkScore(){
    playerTurn === 0 ? checkingHands = playerHandsValue: checkingHands = dealerHandsValue;
    playerTurn === 0 ? checkingCards = playerHandsCards: checkingCards = dealerHandsCards;
    let someAces = checkingCards.some(r => TABLE.aces.includes(r)); 
    let handsPlusCard = checkingHands + count[0];
    console.log(handsPlusCard);
    if(handsPlusCard > 21){if(count[0] === 11){count[0] = 1}};
    console.log(count[0]);
    checkingHands = handsPlusCard;
    console.log(checkingHands);
    if(someAces && count[0] !== 1){if(checkingHands > 21){checkingHands = checkingHands - 10;}}
    console.log(checkingHands);
    playerTurn === 0 ? playerHandsValue = checkingHands: dealerHandsValue = checkingHands;
    console.log(dealerHandsValue);
    if(checkingHands >= 21){stand(); return};
}

function deal(e){
    // On click of event fade in play buttons and fade out deal button amount placed from betting stage
    for(let moves in TABLE.moves){$(TABLE.moves[moves]).fadeIn(1500); $(instructions).fadeOut(300);}
    $(TABLE.moves.deal).fadeOut(300);

    // Disable click for chips after deal is set and game is in motion
    for(let images in TABLE.bets){TABLE.bets[images].firstElementChild.style.pointerEvents = 'none';}

    // Generate random cards
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
    });

    setValues();
    // count[2] = 3; count[3] = 2;
    // count[0] = 10; count[1] = 7;

    playerHandsValue += count[2]+count[3];
    dealerHandsValue += count[1];
    dealerHiddenCard += count[0];
    console.log(dealerHandsValue);
    console.log(dealerHiddenCard);
    setValues();
    dealerCountTotal.innerHTML = dealerHandsValue;
    dealerHandsValue = dealerHandsValue + dealerHiddenCard;
    console.log(dealerHandsValue);
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
    for(let i = 0; i < count.length; i++){count[i] === 1 ? count[i] = 11: false;}
    if(count[2] === 11 && count[3] === 11){count[2] = 6; count[3] = 6;};
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
    if(budget.value <= 100 || budget.value > 50000) return;
    let moneyDown = PLAYERS.playerHands.moneyDown = budget.value;
    budget.style.cssText = "display:none";
    beforeWager.style.cssText = "display:none";
    range.style.cssText = "display:none";
    expandTable.style.cssText = "display:none";
    tableMoneyDown = Math.ceil((Math.round(moneyDown/10))*10);
    total.innerHTML = tableMoneyDown;
    total.style.cssText = "color: white; font-size:40px; padding:0 2vmin 0 3vmin;";
    $(instructions).fadeOut(500);
    setTable();
}