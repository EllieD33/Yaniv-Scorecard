const numberOfPlayers = 4;

// Add player names
function setPlayerName(playerNumber) {
  const playerNameInput = document.getElementById(`player${playerNumber}Name`);
  const playerNameOutput = document.getElementById(`player${playerNumber}NameOutput`);
  const addPlayerNameBtn = document.getElementById(`addPlayer${playerNumber}Name`);

  addPlayerNameBtn.addEventListener('click', () => {
    playerNameOutput.textContent = playerNameInput.value;
    playerNameInput.value = '';
  });
}

// Add scores
function addScore(player) {
  const scoreInput = document.getElementById(player + 'ScoreInput');
  const scoreElement = document.getElementById(player + 'Score');
  const currentScore = +scoreElement.textContent;
  const newScore = currentScore + +scoreInput.value;

  scoreElement.textContent = newScore;
  halveScore(player);
  playerBust(player);
  declareWinner();
  scoreInput.value = '';
  
}

// reset scores
function resetPlayer(playerNumber) {
  const scoreElement = document.getElementById(`player${playerNumber}Score`);
  const playerBtn = document.getElementById(`player${playerNumber}Btn`);

  scoreElement.textContent = '0';
  scoreElement.style.textDecoration = 'none';
  playerBtn.disabled = false;
  playerBtn.textContent = '+';
  playerBtn.style.backgroundColor = '#2ecc71';
}


//if a players score lands on 100 exactly, score is set to 50
function halveScore(player) {
  const scoreElement = document.getElementById(player + 'Score');
  console.log(scoreElement);
  if (+scoreElement.innerText === 100) {
    scoreElement.textContent = '50';
  }
}

//player goes bust if points exceed 100
function playerBust(player) {
  const scoreElement = document.getElementById(player + 'Score');
  if (+scoreElement.textContent > 100) {
    scoreElement.style.textDecoration = 'line-through';
    const playerBtn = document.getElementById(player + 'Btn');
    playerBtn.disabled = true;
    playerBtn.textContent = 'X';
    playerBtn.style.backgroundColor = '#2c3e50'
  }
}

//declare a winner when only one player remains 
function declareWinner() {
  const activePlayers = Array.from({ length: numberOfPlayers }, (_, i) => i + 1)
    .filter(player => +document.getElementById(`player${player}Score`).textContent < 100);

  if (activePlayers.length === 1) {
    const winnerPlayerNumber = activePlayers[0];
    const winnerName = document.getElementById(`player${winnerPlayerNumber}NameOutput`).innerHTML;
    const winner = document.getElementById('winner')
    winner.textContent = `${winnerName} wins!`
    winner.style.backgroundColor = '#2ecc71';
    document.getElementById('winner-container').style.backgroundColor = '#2ecc71';
  }
}

//Reset all scores and status'
function resetCounter() {
  for (let player = 1; player <= numberOfPlayers; player++) {
    resetPlayer(player);
  }
}

const winner = document.getElementById('winner');
if (winner) {
  winner.textContent = 'No winner yet. Keep playing!'
  winner.style.backgroundColor = '#3498db';
}

const winnerContainer = document.getElementById('winner-container');
if (winnerContainer) {
  winnerContainer.style.backgroundColor = '#3498db';
}

//Initialise player name and score
for (let i = 1; i <= numberOfPlayers; i++) {
  setPlayerName(i);
  document.getElementById(`player${i}Btn`).addEventListener('click', () => addScore(i));
}

//Initialise reset button
const resetBtn = document.getElementById('resetBtn');
resetBtn.addEventListener('click', resetCounter);