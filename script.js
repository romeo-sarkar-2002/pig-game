'use strict';

let gameFlagGameStart;
let gameFlagGameOver;
let gameCurrentPlayer;

let gameDocDice = document.querySelector('.dice');
let gameDocRollDice = document.querySelector('.btn-roll-dice');
let gameDocHold = document.querySelector('.btn-hold');

const gamePlayer1 =
{
    docPlayer: document.querySelector('.player-1'),
    docCurrentScore: document.getElementById('current-1'),
    docTotalScore: document.getElementById('score-1'),

    currentScore: 0,
    totalScore: 0,
    setTotalScore: function (score)
    {
        this.totalScore = score;
        this.docTotalScore.textContent = String(score);
    },
    setCurrentScore: function (score)
    {
        this.currentScore = score;
        this.docCurrentScore.textContent = String(score);
    }
}
const gamePlayer2 = 
{
    docPlayer: document.querySelector('.player-2'),
    docCurrentScore: document.getElementById('current-2'),
    docTotalScore: document.getElementById('score-2'),

    currentScore: 0,
    totalScore: 0,
    setTotalScore: function (score)
    {
        this.totalScore = score;
        this.docTotalScore.textContent = String(score);
    },
    setCurrentScore: function (score)
    {
        this.currentScore = score;
        this.docCurrentScore.textContent = String(score);
    }
}



const gameInitialize = function ()
{
    gameFlagGameOver = true;
    gameFlagGameStart = true;

    document.querySelector('.btn-hold').addEventListener('click', gameEventHold);
    document.querySelector('.btn-roll-dice').addEventListener('click', gameEventRollDice);
    document.querySelector('.btn-new-game').addEventListener('click', gameEventNewGame);


    // gameBtnHold.addEventListener('click', gameEventSwitchPlayer);
    // gameBtnRollDice.addEventListener('click', gameEventRollDice);
    // gameBtnNewGame.addEventListener('click', gameEventNewGame);
};

const gameClear = function()
{
    if(!gameFlagGameStart)
    {
        return;
    }

    gamePlayer1.setTotalScore(0);
    gamePlayer1.setCurrentScore(0);

    gamePlayer2.setTotalScore(0);
    gamePlayer2.setCurrentScore(0);

    gameFlagGameOver = false;
    gameFlagGameStart = false;

    gameSetActivePlayer(gamePlayer1);

    gameDocDice.classList.add('hidden');
    gameDocHold.classList.remove('hidden');
    gameDocRollDice.classList.remove('hidden');
};

const gameSetActivePlayer = function (player)
{
    gameCurrentPlayer = player;
    let gameNextPlayer;
    switch(gameCurrentPlayer)
    {
        case gamePlayer1:
            gameNextPlayer = gamePlayer2;
            break;
        case gamePlayer2:
            gameNextPlayer = gamePlayer1;
            break;
        default:
            break;
    }

    gameCurrentPlayer.docPlayer.classList.add('player-active');
    gameNextPlayer.docPlayer.classList.remove('player-active');
};
const gameEventHold = function ()
{
    if(gameFlagGameOver)
    {
        return;
    }

    gameHold();
}

const gameEventRollDice = function ()
{
    if(gameFlagGameOver)
    {
        return;
    }

    if(!gameFlagGameStart)
    {
        gameDocDice.classList.remove('hidden');
        gameFlagGameStart = true;
    }

    gameRollDice();
}

const gameEventNewGame = function ()
{
    gameNewGame();
}


const gameRandom = function() // random number between 1 to 6
{
    return Math.floor(6 * Math.random()) + 1;
};


const gameHold = function ()
{
    let totalScore = gameCurrentPlayer.totalScore;
    let currentScore = gameCurrentPlayer.currentScore;
    let newTotalScore = totalScore + currentScore;
    
    gameCurrentPlayer.setTotalScore(newTotalScore);
    gameCurrentPlayer.setCurrentScore(0);

    if(newTotalScore >= 100)
    {
        gameWon();
        return;
    }

    gameSwitchActivePlayer();
}

const gameWon = function ()
{

    gameFlagGameOver = true;
    
    gameDocDice.classList.add('hidden');
    gameDocRollDice.classList.add('hidden');
    gameDocHold.classList.add('hidden');


    let str = '';
    switch(gameCurrentPlayer)
    {
        case gamePlayer1:
            str += 'player1';
            break;
        case gamePlayer2:
            str += 'player2';
            break;
        default:
            break;
    }

    alert(str + ' has won the game.');
}

const gameSwitchActivePlayer = function()
{
    let gameNextPlayer;
    switch(gameCurrentPlayer)
    {
        case gamePlayer1:
            gameSetActivePlayer(gamePlayer2);
            break;
        case gamePlayer2:
            gameSetActivePlayer(gamePlayer1);
            break;
        default:
            break;
    }
};

const gameRollDice = function ()
{
    let num = gameRandom();
    console.log(num);
    
    // gameDocDice
    gameWindowRollDice(num);

    if(1 == num)
    {
        gameCurrentPlayer.setCurrentScore(0);
        gameSwitchActivePlayer();
        return;
    }

    let currentScore = gameCurrentPlayer.currentScore;
    let newCurrentScore = currentScore + num;
    gameCurrentPlayer.setCurrentScore(newCurrentScore);
}

const gameWindowRollDice = function (num)
{
    let src = 'dice-';
    src += String(num);
    src += '.png';
    gameDocDice.src = src;
}

const gameNewGame = function ()
{
    gameClear();
}

gameInitialize();
gameClear();