//create array of dice images
let imageArray = [];
for (var i = 1;  i <= 6; i++) {
    // imageArray[i] = "url('./img/dice" + i + ".png')";
    imageArray[i] = `img/dice${i}.png`;
}

//Declare global variables
let playerOneCurrentScore = 0;
let playerTwoCurrentScore = 0;
let playerOneTotalScore = 0;
let playerTwoTotalScore = 0;
let gameWon = false;

let playerOneActive =  true;
document.getElementById('player-1-section').classList.add('activePlayer');



const newGame = () => {
    document.getElementById('reset').style.visibility = 'hidden';
    document.getElementById('roll').style.visibility = 'visible';
    playerOneActive = true;
    playerOneCurrentScore = 0;   //reset scores for new game
    playerTwoCurrentScore = 0;
    playerOneTotalScore = 0;
    playerTwoTotalScore = 0;
    document.getElementById('player-1-section').classList.add('activePlayer');
    document.getElementById('player-2-section').classList.remove('activePlayer');
    document.getElementById('score-1').textContent = playerTwoTotalScore;

    
    rollDice();

}

const rollDice = () => {
    let currentRoll = Math.floor(Math.random() *6) +1;

    document.getElementById('img').src =  imageArray[currentRoll];

    if (currentRoll == 1) {
         let hold = false;  //end turn if 1 is rolled
        switchPlayer(hold);
    }else {
        updateScore(currentRoll);
    }

}

const holdScore = () => {

    let hold = true;

    if ((playerOneTotalScore >= 20) || (playerTwoTotalScore >= 20)) {
        checkScore(hold);
    } else {
    switchPlayer(hold);
    }
}

const switchPlayer = (hold) => {

   console.log(playerOneActive);
   console.log(hold);
    if(playerOneActive && hold) {


            playerOneActive = false;
            playerOneCurrentScore = 0;

            document.getElementById('current-score-0').textContent = playerOneCurrentScore;
            document.getElementById('player-1-section').classList.toggle('activePlayer');
            document.getElementById('player-2-section').classList.add('activePlayer');



        } else if((playerOneActive == true) && (hold == false)) {
        playerOneActive = false;
            playerOneCurrentScore = 0;
            playerOneTotalScore = 0;
            document.getElementById('current-score-0').textContent = playerOneCurrentScore;
            document.getElementById('score-0').textContent = playerOneTotalScore;

            document.getElementById('player-1-section').classList.remove('activePlayer');
            document.getElementById('player-2-section').classList.add('activePlayer');

    }else if((playerOneActive == false) && (hold == true)) {
        playerOneActive = true;
            playerTwoCurrentScore = 0;
            document.getElementById('current-score-1').textContent = playerTwoCurrentScore;
            document.getElementById('player-1-section').classList.add('activePlayer');
            document.getElementById('player-2-section').classList.remove('activePlayer');

    }else if((playerOneActive == false) && (hold == false)) {
        playerOneActive = true;
            playerTwoCurrentScore = 0;
            playerTwoTotalScore = 0;
            document.getElementById('current-score-1').textContent = playerTwoCurrentScore;
            document.getElementById('score-1').textContent = playerTwoTotalScore;

            document.getElementById('player-1-section').classList.add('activePlayer');
            document.getElementById('player-2-section').classList.remove('activePlayer');


    }

}

const updateScore = (diceScore) => {
// console.log(playerOneActive);
    if(playerOneActive == true) {
        playerOneCurrentScore += diceScore;
        playerOneTotalScore += diceScore;
        document.getElementById('current-score-0').textContent = playerOneCurrentScore;
        document.getElementById('score-0').textContent = playerOneTotalScore;
        checkScore();
    } else {
        playerTwoCurrentScore += diceScore;
        playerTwoTotalScore += diceScore;
        document.getElementById('current-score-1').textContent = playerTwoCurrentScore;

        document.getElementById('score-1').textContent = playerTwoTotalScore;
        checkScore();

    }

}

const checkScore = (hold) => {

    if((playerOneActive == true) && (playerOneTotalScore>=20) && (hold == true)) { //if the game is won, hide roll button and display message with restart button

        gameWon = true;

        document.getElementById('roll').style.visibility = 'hidden';
        document.getElementById('reset').style.visibility = 'visible';

        document.getElementById('score-0').textContent = `Winner!`;

    }else if((playerOneActive == false) && (playerTwoTotalScore>=20) && (hold == true)) { //if the game is won, hide roll button and display message with restart button

        gameWon = true;

        document.getElementById('roll').style.visibility = 'hidden';
        document.getElementById('reset').style.visibility = 'visible';

        document.getElementById('score-1').textContent = `Winner!`;

    }


}

//add event listeners to buttons
document.getElementById('reset').addEventListener('click', ()=>{
    newGame(); //calls function to start new game
})


document.getElementById('roll').addEventListener('click', ()=>{
    rollDice(); //calls function to roll the dice
})

document.getElementById('hold').addEventListener('click', ()=>{
    holdScore(); //calls the function to hold current score
})
