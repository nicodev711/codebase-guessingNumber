//In order to simplify the reading of the code, i have isolated all the DOM Fetching in here, so at the glance i know what name to use or call.
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

//Next i've grouped the general variables.
let rounds = 1;
let timer;
let maxNumber = 10;
let numberToGuess;


//Then I've created a function to start the game which is re-initialise all the variables. Hides and display different divs. Then it calls different function such
//as starting the timer and generating random numbers.
function startGame() {
    rulesDiv.hidden = true;
    gameDiv.hidden = false;
    rounds = 1;
    maxNumber = 10;
    startTimer();
    numberToGuess = generateRandomNumber(maxNumber);
    roundsDisplay.innerHTML = `${rounds}`;
    hintDisplay.innerHTML = '';
}

// So then in the logic was to create the timer and generate the random number.
// i've created a variable called time, which using setInterval will be incremented 1 every seconds.
// then it's time formatting.
function startTimer() {
    let time = 0;

    timer = setInterval(() => {
        time++;
        //Math floor is used to get INT on decimal numbers if any,
        let hours = Math.floor(time / 3600);
        let minutes = Math.floor((time % 3600) / 60);
        //% is used to display the seconds since if time > 60, it is incremented as a minute.
        let seconds = time % 60;

        // in order to have a nice looking timer formated as 00:00:00 i had to do some formating here as well. As if a number is lower than 10, it will add a 0 in front of it.
        //I have copied past this 3 lines from stackOverflow, because they gave me a much consided if statement.
        let formattedHours = hours < 10 ? '0' + hours : hours; // past from stackoverflow
        let formattedMinutes = minutes < 10 ? '0' + minutes : minutes; // past from stackoverflow
        let formattedSeconds = seconds < 10 ? '0' + seconds : seconds; // past from stackoverflow
        //Once the timer is counting and being formatted, we need to display it on the html using DOM.
        timerDisplay.innerHTML = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    }, 1000);
}

function generateRandomNumber(max) {
    return Math.floor(Math.random() * max) + 1;
}


//next we need to check the user input and check it with the generated number.
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

// The finish Game function stops the game, hide the div game and display the success div. Where the score is shown to the user.
function finishGame() {
    clearInterval(timer);
    gameDiv.hidden = true;
    successDiv.hidden = false;
    timeRecord.innerHTML = timerDisplay.innerHTML;
    hintDisplay.innerHTML = "Congratulations! You've completed the game!";
}


//then we find the event listeners where everything is linked together, up and running.
startGameButton.addEventListener("click", () => {
    startGame();
});

restartButton.addEventListener("click", () => {
    startGame();
});

menuButton.addEventListener("click", () => {
    rulesDiv.hidden = false;
    gameDiv.hidden = true;
});

guessButton.addEventListener("click", () => {
    userGuess = parseInt(userGuessInt.value);
    checkGuess();
});



/* for me, the real challenge has been to Dry my code. the challenge itself isn't hard to complete. What is hard is to not repeat yourself, and how to build reusable functions efficiently.
* the HTML i took inspiration from React, and just used the "hidden" option to do so.
*
* Time manipulation hasn't been easy either as creating a timer from scratch involve number manipulation on a base of 60. So it took me a bit of thinking to solve this issue.
*
* As for the challenge itself it has been really easy to complete, i took some freedom to turn this challenge into a game. To keep the player engaged i've created the timer so
* the player is actually competing against himself.
*
* github: https://github.com/nicodev711/codebase-guessingNumber
* to play it: https://nicodev711.github.io/codebase-guessingNumber/
* */
