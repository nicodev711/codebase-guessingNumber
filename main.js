// using building DOM manipulation to fetch the HTML
const startGameButton = document.getElementById("startGame");
const rulesDiv = document.getElementById("rules");
const gameDiv = document.getElementById("game");
const guessButton = document.getElementById("guessButton");
const timerDisplay = document.getElementById("chrono");
const hintDisplay = document.getElementById("hint");
const roundsDisplay = document.getElementById('rounds');
const userGuessInt = document.getElementById('userNumber');
const timeRecord = document.getElementById("timeRecord");
const successDiv = document.getElementById("success");
const restartButton = document.getElementById("restartButton");
const menuButton = document.getElementById("menuButton");

// Setting up main variables to reach them on every scopes
let rounds = 1;
let timer;
let maxNumber = 10;
let numberToGuess;

//add event listeners in order to react with user
startGameButton.addEventListener("click", () => {
    initialiseGame();
});

restartButton.addEventListener("click", () => {
    initialiseGame();
});

menuButton.addEventListener("click", () => {
    rulesDiv.hidden = false;
    gameDiv.hidden = true;
});

guessButton.addEventListener("click", () => {
    userGuess = parseInt(userGuessInt.value);
    checkGuess();
});

//initialise the game to change to remove #rules div, and display #game div.
function initialiseGame() {
    rulesDiv.hidden = true;
    gameDiv.hidden = false;
    rounds = 1;
    maxNumber = 10;
    startTimer();
    numberToGuess = generateRandomNumber(maxNumber);
    roundsDisplay.innerHTML = `${rounds}`;
    hintDisplay.innerHTML = '';
}

// add a couple of struggle here with time formating. Using % hasn't really been easy as i don't fully understand the concept yet.
// so it took me a bit of googling, stackoverflow to make it work.
function startTimer() {
    let time = 0;
    timer = setInterval(() => {
        time++;
        let hours = Math.floor(time / 3600);
        let minutes = Math.floor((time % 3600) / 60);
        let seconds = time % 60;
        let formattedHours = hours < 10 ? '0' + hours : hours; // past from stackoverflow
        let formattedMinutes = minutes < 10 ? '0' + minutes : minutes; // past from stackoverflow
        let formattedSeconds = seconds < 10 ? '0' + seconds : seconds; // past from stackoverflow
        timerDisplay.innerHTML = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    }, 1000);
}

// then need to generate a random number
function generateRandomNumber(max) {
    return Math.floor(Math.random() * max) + 1;
}
//and check with the input of the users. As i already have few games under my belt, i've been able to work it around to make it "more fun" to play.
function checkGuess() {
    if (userGuess === numberToGuess) {
        rounds++;
        roundsDisplay.innerHTML = `${rounds}`;
        userGuessInt.value = "";
        if (rounds === 2) {
            maxNumber = 100;
            hintDisplay.innerHTML = "Well Done! You passed to round 2!";
        } else if (rounds === 3) {
            maxNumber = 1000;
            hintDisplay.innerHTML = "Well Done! You passed to round 3!";
        } else {
            finishGame();
            return;
        }
        numberToGuess = generateRandomNumber(maxNumber);
    } else if (userGuess < numberToGuess) {
        userGuessInt.value = "";
        hintDisplay.innerHTML = "Too low";
    } else {
        userGuessInt.value = "";
        hintDisplay.innerHTML = "Too high";
    }
}
// and finally the end game screen that display #success div. 
function finishGame() {
    clearInterval(timer);
    gameDiv.hidden = true;
    successDiv.hidden = false;
    timeRecord.innerHTML = timerDisplay.innerHTML;
    hintDisplay.innerHTML = "Congratulations! You've completed the game!";
}

/* for me, the real challenge has been to Dry my code, and as i tried to do so, i broke it a couple of time so had to restart pretty much from 0 every time.
* Time manipulation hasn't been easy either as creating a timer from scratch isn't something i do every day.
* */
