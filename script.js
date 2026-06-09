let randomNumber = Math.floor(Math.random() * 100 + 1);
const submit = document.querySelector("#subt");
const userInput = document.querySelector("#guessField");
const guessSlot = document.querySelector(".guesses");
const remaining = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");
const startOver = document.querySelector(".resultParas");

const p = document.createElement('p');

let prevGuess = [];
let numGuess = 1;
let playGame = true;

if (playGame) {
    submit.addEventListener("click", (e) => {
        e.preventDefault();
        const guess = parseInt(userInput.value);
        validateGuess(guess);
    });
}

function validateGuess(guess) {
    if (isNaN(guess)) {
        alert("Please enter a valid number");
    } else if (guess < 1) {
        alert("Please enter a number more than 1");
    } else if (guess > 100) {
        alert("Please enter a number less than 100");
    } else {
        if (numGuess <= 10) {
            prevGuess.push(guess);
            displayGuess(guess);
            checkGuess(guess);
        }

        if (numGuess > 10) {
            displayMessage(`Game Over. Random Number was ${randomNumber}`);
            endGame();
        }
    }
}

function checkGuess(guess) {
    if (guess === randomNumber) {
        displayMessage("🎉 You guessed it right!");
        endGame();
    } else if (guess < randomNumber) {
        displayMessage("📉 Number is too low");
    } else if (guess > randomNumber) {
        displayMessage("📈 Number is too high");
    }
}

function displayGuess(guess) {
    userInput.value = '';
    guessSlot.textContent = prevGuess.join(', ');
    remaining.textContent = `${10 - numGuess}`;
    numGuess++;
}

function displayMessage(message) {
    lowOrHi.textContent = message;
}

function endGame() {
    userInput.value = '';
    userInput.setAttribute('disabled', '');
    p.classList.add('button');
  p.innerHTML = `<button id="newGame">Start New Game</button>`;
    startOver.appendChild(p);
    playGame = false;
    newGame();
}

function newGame() {
    const newGameBtn = document.querySelector("#newGame");
    newGameBtn.addEventListener("click", () => {
        randomNumber = Math.floor(Math.random() * 100 + 1);
        prevGuess = [];
        numGuess = 1;
        guessSlot.textContent = '';
        remaining.textContent = '10';
        lowOrHi.textContent = '';
        userInput.removeAttribute('disabled');
        startOver.removeChild(p);
        playGame = true;
    });
}
