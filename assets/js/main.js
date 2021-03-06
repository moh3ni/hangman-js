"use strict";

/***********************
 ** GLOBAL VARIABLES ***
 ***********************/
const alphabets = "abcdefghijklmnopqrstuvwxyz";
const keyboard = document.querySelector(".keyboard");
const wonGameContainer = document.querySelector(".won-game");
const lostGameContainer = document.querySelector(".lost-game");
const continueBtn = document.querySelectorAll(".continue-btn");
const resetBtn = document.querySelectorAll(".reset-btn");
let secretWord;
let guessedSecretWord;
let guessedAlphabets;
let totalGuesses;
let wrongGuesses;
const totalWords = country_list.length;
let wonTheGame;
let lostTheGame;

/***********************
 *** EVENT LISTENERS ***
 ***********************/
// Generated Keyboard Press
keyboard.addEventListener("click", handleKeyPressed);

// Continue and Reset buttons
continueBtn.forEach((button) =>
  button.addEventListener("click", continueTheGame)
);
resetBtn.forEach((button) => button.addEventListener("click", resetTheGame));

// Keyboard
document.addEventListener("keyup", (event) => {
  const key = event.key;
  handleKeyPressed(key);
});

/***********************
 ***** FUNCTIONS *******
 ***********************/
// Generate Random Word
const randomWord = () => {
  secretWord = country_list[
    Math.floor(Math.random() * country_list.length)
  ].toLowerCase();
};

// Handle the Random Word :)
const handleGuessedWord = () => {
  guessedSecretWord = secretWord
    .split("")
    .map((letter) => {
      if (guessedAlphabets.indexOf(letter) >= 0) {
        if (letter === " ") {
          return " ";
        } else {
          return letter;
        }
      } else {
        if (letter === " ") {
          return " ";
        } else {
          return "*";
        }
      }
    })
    .join("");

  displayRandomWord();
};

// Display the Random Word
const displayRandomWord = () => {
  const secretWordContainer = document.querySelector(".secretword");

  const formatedWord = guessedSecretWord
    .split("")
    .map((letter) => {
      if (letter === " ") {
        return `<li>-</li>`;
      } else {
        return `<li>${letter.toUpperCase()}</li>`;
      }
    })
    .join("");

  secretWordContainer.innerHTML = `<ul>${formatedWord}</ul>`;
};

// Generate and display keyboard
const generateKeyboard = () => {
  const keyboardAlphabets = alphabets
    .split("")
    .map(
      (alphabet) =>
        `<li><button class="btn-${alphabet}" title="${alphabet}" value="${alphabet}">${alphabet.toUpperCase()}</button></li>`
    )
    .join("");
  keyboard.innerHTML = `<ul>${keyboardAlphabets}</ul>`;
};

// Keyboard press
function handleKeyPressed(event) {
  const eventValue =
    event.type == "click"
      ? event.target.getAttribute("value")
      : event.toLowerCase();
  const justAlphabets = alphabets.split("").includes(eventValue);

  if (eventValue && justAlphabets && !guessedAlphabets.includes(eventValue)) {
    if (
      secretWord.toLowerCase() !== guessedSecretWord.toLowerCase() &&
      wrongGuesses !== totalGuesses
    ) {
      guessedAlphabets.push(eventValue);
      handleGuessedWord();
      handleDisablingKeyboard(eventValue);
      checkGameStatus();
    }
  }

  displayGameInfo();
}

// Handle disabling buttons
const handleDisablingKeyboard = (keyValue) => {
  const btn = document.querySelector(`.btn-${keyValue}`);
  const secretWordArray = secretWord.split("");

  if (secretWordArray.includes(keyValue)) {
    btn.disabled = true;
    btn.classList.add("right-guess");
    changeHangmanGuyColor(true);
  } else {
    btn.disabled = true;
    btn.classList.add("wrong-guess");
    wrongGuesses++;
    drawHangman();
    changeHangmanGuyColor(false);
  }
};

// Check Game Status
const checkGameStatus = () => {
  // Won the Game
  if (secretWord.toLowerCase() === guessedSecretWord.toLowerCase()) {
    wonTheGame++;
    keyboard.classList.add("display-none");
    wonGameContainer.classList.remove("display-none");
  }

  // Lost the Game
  if (wrongGuesses === totalGuesses) {
    lostTheGame++;
    keyboard.classList.add("display-none");
    lostGameContainer.classList.remove("display-none");
    lostGameHeadingMsg();
  }
};

// Display Info
const displayGameInfo = () => {
  const totLives = document.querySelector(".lives-left");
  const score = document.querySelector(".score");
  const lost = document.querySelector(".lost");

  // display score
  score.innerHTML = `Score: <span class="info-value">${wonTheGame}</span>`;

  // display guesses
  totLives.innerHTML = `Lives: <span class="info-value">${
    totalGuesses - wrongGuesses
  }</span>`;

  // display lost
  lost.innerHTML = `Lost <span class="info-value">${lostTheGame}</span> ${
    lostTheGame >= 2 ? "times" : "time"
  }`;
};

// Draw Hangman
const drawHangman = () => {
  const hangmanContainer = document.querySelector("#hangman-container");
  const hangmanImgUrl = "./assets/images/";

  // Set the attribute for Hangman img
  hangmanContainer.setAttribute(
    "src",
    `${hangmanImgUrl}hangman-${wrongGuesses}.png`
  );
};

// Lost Game Heading Msg
const lostGameHeadingMsg = () => {
  const lostGameHeading = document.querySelector(".lost-game-heading");
  let lostGameHeadingMsg;

  if (lostTheGame >= 30) {
    lostGameHeadingMsg = `You Hanged Him ${lostTheGame} times!`;
  } else if (lostTheGame >= 20) {
    lostGameHeadingMsg = "Wow, You Can Nothing!";
  } else if (lostTheGame >= 10) {
    lostGameHeadingMsg = "You Really Suck!";
  } else if (lostTheGame >= 5) {
    lostGameHeadingMsg = "You Suck!";
  } else {
    lostGameHeadingMsg = "Ooh No!";
  }

  lostGameHeading.innerHTML = lostGameHeadingMsg;
};

// Hangman Guy on the side
const changeHangmanGuyColor = (rightGuess) => {
  const hangmanImg = document.querySelector(".hangman-guy-img");

  if (rightGuess) {
    hangmanImg.setAttribute("src", "./assets/images/hangman-guy-green.png");
  } else {
    hangmanImg.setAttribute("src", "./assets/images/hangman-guy-red.png");
  }
};

// Reset Keyboard
const resetKeyboard = () => {
  keyboard.classList.remove("display-none");
  wonGameContainer.classList.add("display-none");
  lostGameContainer.classList.add("display-none");
};

// Continue Game
function continueTheGame() {
  guessedAlphabets = [];
  wrongGuesses = 0;
  randomWord();
  generateKeyboard();
  handleGuessedWord();
  displayGameInfo();
  drawHangman();
  resetKeyboard();
  changeHangmanGuyColor(true);
}

// Reset Game
function resetTheGame() {
  init();
}

// Init Hangman
function init() {
  secretWord = "";
  guessedSecretWord = "";
  guessedAlphabets = [];
  totalGuesses = 10;
  wrongGuesses = 0;
  wonTheGame = 0;
  lostTheGame = 0;
  generateKeyboard();
  randomWord();
  handleGuessedWord();
  displayGameInfo();
  drawHangman();
  resetKeyboard();
  changeHangmanGuyColor(true);
}

// Initializing the Game
init();
