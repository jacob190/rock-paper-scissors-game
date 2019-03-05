const gameSummary = {
    numberOfGames: 0,
    numberOfWins: 0,
    numberOfLosses: 0,
    numberOfDraws: 0,
}

const gameChoices = {
    playerChoice: "",
    aiChoice: "",
}

const hands = [...document.querySelectorAll('.wrapper_select img')]

// Player's choice

function handChoose() {
    gameChoices.playerChoice = this.dataset.option
    hands.forEach(hand => hand.style.boxShadow = "")
    this.style.boxShadow = "0 0 0 4px red"
}

hands.forEach(hand => hand.addEventListener('click', handChoose))

//AI's choice
function aiHandChoose() {
    return gameChoices.aiChoice = hands[Math.floor(Math.random() * 3)].dataset.option
}

//Game Result
function checkResult(player, ai) {
    if (player === ai) {
        return 'draw'
    } else if ((player === "rock" && ai === "scissors") || (player === "paper" && ai === "rock") || (player === "scissors" && ai === "paper")) {
        return 'win'
    } else {
        return 'loss'
    }

}

//Show result
function showResult(player, ai, result) {
    document.querySelector('[data-summary="your-choice"]').textContent = gameChoices.playerChoice

    document.querySelector('[data-summary="ai-choice"]').textContent = gameChoices.aiChoice

    gameSummary.numberOfGames++;
    document.querySelector('.numbers span').textContent = gameSummary.numberOfGames

    const whoWin = document.querySelector('[data-summary="who-win"]')
    if (result === 'draw') {
        gameSummary.numberOfDraws++;
        document.querySelector('.draws span').textContent = gameSummary.numberOfDraws
        whoWin.textContent = 'draw'
        whoWin.style.color = 'gray';
    } else if (result === 'win') {
        gameSummary.numberOfWins++;
        document.querySelector('.wins span').textContent = gameSummary.numberOfWins;
        whoWin.textContent = 'player';
        whoWin.style.color = 'green';
    } else {
        gameSummary.numberOfLosses++;
        document.querySelector('.losses span').textContent = gameSummary.numberOfLosses;
        whoWin.textContent = 'ai';
        whoWin.style.color = 'red';
    }

}

//End game
function choiceReset() {
    document.querySelector(`[data-option=${gameChoices.playerChoice}]`).style.boxShadow = "";
    gameChoices.playerChoice = '';
    gameChoices.aiChoice = '';
}

//Start function
function startGame() {
    if (!gameChoices.playerChoice) return alert('Choose hand')

    gameChoices.aiChoice = aiHandChoose();

    const gameResult = checkResult(gameChoices.playerChoice, gameChoices.aiChoice)

    showResult(gameChoices.playerChoice, gameChoices.aiChoice, gameResult);
    choiceReset();
}


document.querySelector(".select_start").addEventListener('click', startGame)