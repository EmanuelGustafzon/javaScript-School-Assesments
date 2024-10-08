class GameState {
    _randomNumber;

    constructor () {
        this.setRandomNumber();
    }
    setRandomNumber() {
        this._randomNumber = (Math.floor(Math.random() * 100) + 1);
    }
    getRandomNumber() {
        return this._randomNumber;
    }
} 
const gameState = new GameState();

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
        giveUserFeedBack('congrats, you got it right!');
        gameState.setRandomNumber();
        clearGuessHistoryInDom();
        return
    }
    if(guess < correctAnswer) giveUserFeedBack('Bigger');
    if(guess > correctAnswer) giveUserFeedBack('smaller');

    addGuessHistoryInDom(guess)
}
document.getElementById('submit-guess').addEventListener('click', () => {
    if(!validateInput(getUserinput())) return
    checkGuess();
})
