let alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
function Letter(char) {
    this.char = char;
    this.guess = false;
    // If the character isn't a letter, leave it alone
    if (!(alphabet.includes(char))) {
        this.guess = true;
    };
}

/**
 * If the user has already guessed the letter, display the letter; otherwise just display an underscore
 */
Letter.prototype.toString = function () {
    if (this.guess) {
        return this.char;
    }
    return "_";
};

/**
 * Checks to 
 * @param {String} check The letter that the user guessed
 */
Letter.prototype.checkGuess = function (check) {
    if (check.toLowerCase() === this.char || check.toUpperCase() === this.char) {
        this.guess = true;
        return true;
    }
    return false;
};
module.exports = Letter;
