// Require node modules
let Word = require("./word.js");
var fs = require('fs');
var inquirer = require("inquirer");

// Load the words the user can guess
var obj = JSON.parse(fs.readFileSync('words.json', 'utf8')).words;

// Initialize variables and reference alphabet
let word, guessesLeft, playing, guessed;
let alphabet = "abcedfghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

/**
 * Runs the game
 */
let playGame = function () {
    // Only prompt for letter if the user hasn't guessed the word
    if (playing) {
        inquirer.prompt([
            {
                name: "letter",
                message: "Guess a letter! "
            }
        ]).then(function (answers) {
            // Can only guess one letter (hence the letter[0])
            let guessedLetter = answers.letter[0];

            // Checking for 3 things:
            // * If they haven't guessed this letter yet
            // * If the guess is a letter
            // * If the word doesn't contain the letter 
            // * Note that if the word does contain the letter it will still update
            if (!guessed.includes(guessedLetter) && alphabet.includes(guessedLetter) && !word.update(guessedLetter)) {
                guessesLeft--;
                guessed += guessedLetter;
                console.log("You have " + guessesLeft + " guesses left!");
            }

            // Display the updated word
            word.displayWord();

            //Check to see if the user lost
            if (guessesLeft < 1) {
                playing = false;
                console.log("You lost!");
                afterGame();
            }

            // Check to see if the user won
            if (word.win()) {
                playing = false;
                console.log("You got it right! Good job!");
                afterGame();
            }

            // If the user hasn't won or lost, keep playing
            if (playing) {
                playGame();
            }
        });
    }
}

/**
 * Asks the user if they would like to play again
 */
function afterGame() {
    inquirer.prompt([
        {
            name: "response",
            message: "Would you like to play again? (y/n) "
        }
    ]).then(function (answers) {
        // If the user answered "y" or "Y" then start another run, using the updated stats
        if (answers.response.toLowerCase() === "y") {
            playing = true;
            setUp();
        }
    });
}

/**
 * Sets up the game
 */
function setUp() {
    // Select a random word
    let random = Math.floor(obj.length * Math.random());
    word = new Word(obj[random]);
    //console.log("***** Word: " + obj[random]); // Debugging purposes
    //Reset variables
    guessesLeft = 10;
    playing = true;
    guessed = "";
    word.displayWord();

    playGame();
}

// Initial set up
setUp();