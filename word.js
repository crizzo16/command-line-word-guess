let Letter = require("./letter.js");
let alphabet = "abcdefghijklmnopqrstuvwxyz";

function Word(word) {
    this.letters = [];
    for (let i = 0; i < word.length; i++) {
        this.letters.push(new Letter(word[i]));

    };
};
Word.prototype.win = function () {
    for (let k = 0; k < this.letters.length; k++) {
        if (!this.letters[k].guess) {
            return false;
        }
    }
    return true;
}
Word.prototype.update = function (char) {
    let worked = false;
    for (let j = 0; j < this.letters.length; j++) {
        if (this.letters[j].checkGuess(char)) {
            worked = true;
        }
    }

    if (worked) {
        console.log("CORRECT!!!");
        return true;
    }
    else {
        console.log("INCORRECT!!!");
        return false;
    }
}
Word.prototype.displayWord = function () {
    console.log("\n" + this.letters.join(" ") + "\n");
};

module.exports = Word;