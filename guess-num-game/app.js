class GameState {
    _randomNumber;
    _totalGuesses = 0;

    constructor () {
        if(GameState.instance) {
            return GameState.instance; // If an instance is created already it will be refrenced in the instance property.
        }
        GameState.instance = this; // Set new property named instance and reference it to this object.
        this.setRandomNumber();
    }
    setRandomNumber() {
        this._randomNumber = (Math.floor(Math.random() * 100) + 1);
    }
    getRandomNumber() {
        return this._randomNumber;
    }
    incrementTotalGuesses() {
        this._totalGuesses++;
    }
    getTotalguesses() {
        return this._totalGuesses;
    }
} 
const gameState = new GameState(); // Singleton

const giveUserFeedBack = (feedback) => document.getElementById('feedback').textContent = feedback;

const addGuessHistoryInDom = (guess) => {
    const guessElement = document.createElement('li');
    guessElement.textContent = guess;
    const guessHistory = document.getElementById('guess-history');
    guessHistory.appendChild(guessElement);
}
const clearGuessHistoryInDom = () => {
    const guessHistory = document.getElementById('guess-history');
    while (guessHistory.firstChild) {
        guessHistory.removeChild(guessHistory.lastChild);
    }
}
const getUserinput = () => {
    return document.getElementById('user-input').value; 
}
const validateInput = (value) => {
    const isValid = Number(value) > 0 && Number(value) <= 100;
    if(!isValid) {
        giveUserFeedBack('Enter a number between 1 and 100');
        return 0;
    }
    return 1;
}
const checkGuess = () => {
    const guess = Number(getUserinput());
    const correctAnswer  = gameState.getRandomNumber();

    if(guess === correctAnswer) {
        const totalGuesses = gameState.getTotalguesses();
        giveUserFeedBack(`congrats, you got it right! It took you ${totalGuesses} ${totalGuesses === 1 ? ' attempt.' : ' attempts.'}`);
        gameState.setRandomNumber();
        clearGuessHistoryInDom();
        return;
    }
    if(guess < correctAnswer) giveUserFeedBack('Bigger');
    if(guess > correctAnswer) giveUserFeedBack('smaller');

    addGuessHistoryInDom(guess);
    gameState.incrementTotalGuesses();
}
document.getElementById('submit-guess').addEventListener('click', () => {
    if(!validateInput(getUserinput())) return;
    checkGuess();
});
