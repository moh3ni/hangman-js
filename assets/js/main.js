'use strict';

/***********************
 ** GLOBAL VARIABLES ***
 ***********************/
const words = ['html', 'css', 'javascript', 'react', 'react native'];
const keyboard = document.querySelector('.keyboard');
let secretWord = '';
let guessedSecretWord = '';
let guessedAlphabets = [];
let totalGuesses = 10;
let wrongGuesses = 0;
const totalWords = country_list.length;
let wonTheGame = 0;
let lostTheGame = 0;

/***********************
 *** EVENT LISTENERS ***
 ***********************/
// Keyboard press
keyboard.addEventListener('click', handleKeyPressed);

/***********************
 ***** FUNCTIONS *******
 ***********************/
// Generate Random Word
function randomWord() {
  secretWord = country_list[
    Math.floor(Math.random() * country_list.length)
  ].toLowerCase();
}

// Handle the Random Word :)
function handleGuessedWord() {
  guessedSecretWord = secretWord
    .split('')
    .map((letter) => {
      if (guessedAlphabets.indexOf(letter) >= 0) {
        if (letter === ' ') {
          return ' ';
        } else {
          return letter;
        }
      } else {
        if (letter === ' ') {
          return ' ';
        } else {
          return '*';
        }
      }
    })
    .join('');

  displayRandomWord();
}

// Display the Random Word
function displayRandomWord() {
  const secretWordContainer = document.querySelector('.secretword');

  const formatedWord = guessedSecretWord
    .split('')
    .map((letter) => {
      if (letter === ' ') {
        return `<li>-</li>`;
      } else {
        return `<li>${letter.toUpperCase()}</li>`;
      }
    })
    .join('');

  secretWordContainer.innerHTML = `<ul>${formatedWord}</ul>`;
}

// Generate and display keyboard
function generateKeyboard() {
  const alphabets = 'abcdefghijklmnopqrstuvwxyz';

  const keyboardAlphabets = alphabets
    .split('')
    .map(
      (alphabet) =>
        `<li><button class="btn-${alphabet}" title="${alphabet}" value="${alphabet}">${alphabet.toUpperCase()}</button></li>`
    )
    .join('');
  keyboard.innerHTML = `<ul>${keyboardAlphabets}</ul>`;
}

// Keyboard press
function handleKeyPressed(e) {
  const keyValue = e.target.getAttribute('value');
  console.log(keyValue);

  if (keyValue) {
    guessedAlphabets.push(keyValue);
    handleGuessedWord();
    disableBtn(keyValue);
  }

  checkGameStatus();
  displayGameInfo();

  console.log(guessedAlphabets);
  console.log(wrongGuesses);
}

// Handle disabling buttons
function disableBtn(keyValue) {
  const btn = document.querySelector(`.btn-${keyValue}`);
  const secretWordArray = secretWord.split('');

  if (secretWordArray.includes(keyValue)) {
    btn.disabled = true;
    btn.classList.add('right-guess');
  } else {
    btn.disabled = true;
    btn.classList.add('wrong-guess');
    wrongGuesses++;
  }
}

// Check Game Status
function checkGameStatus() {
  // Won the Game
  if (secretWord.toLowerCase() === guessedSecretWord.toLowerCase()) {
    console.log('You won!');
    wonTheGame++;
  }

  // Lost the Game
  if (wrongGuesses === totalGuesses) {
    console.log('You lost the game!');
    lostTheGame++;
  }
}

// Display Info
function displayGameInfo() {
  const totGuesses = document.querySelector('.guesses');
  const score = document.querySelector('.score');
  const lost = document.querySelector('.lost');

  // display guesses
  totGuesses.innerHTML = `Guesses: ${wrongGuesses} of ${totalGuesses}`;

  // display score
  score.innerHTML = `Score: ${wonTheGame} of ${totalWords}`;

  // display lost
  lost.innerHTML = `You have lost ${lostTheGame} time(s)`;
}

// Init Hangman
function init() {
  generateKeyboard();
  randomWord();
  handleGuessedWord();
  displayGameInfo();
}

// Initializing the Game
init();
console.log(secretWord);
