const numberOfPlayers = 4;

// Generate the player inputs and scoreboards
function generatePlayers() {
  const addNamesContainer = document.getElementById('addNamesContainer');
  const scoreboardContainer = document.getElementById('scoreboardContainer');

  for (let i = 1; i <= numberOfPlayers; i++) {
    // Create div to contain player name input and add name button
    const playerDiv = document.createElement('div');
    playerDiv.className = 'player-info';

    // Generate name input
    const playerNameInput = document.createElement('input');
    playerNameInput.className = 'name-input';
    playerNameInput.name = `player${i}Name`;
    playerNameInput.maxLength = 20;
    playerNameInput.placeholder = `Enter player ${i} name`;
    playerNameInput.type = 'text';
    playerNameInput.id = `player${i}Name`;
    playerDiv.appendChild(playerNameInput);

    // Generate add name button
    const addNameBtn = document.createElement('input');
    addNameBtn.className = 'add-name-btn';
    addNameBtn.type = 'button';
    addNameBtn.value = 'Add name';
    addNameBtn.id = `addPlayer${i}Name`;
    addNameBtn.addEventListener('click', () => setPlayerName(i));
    playerDiv.appendChild(addNameBtn);

    // Append player div to addNamesContainer
    addNamesContainer.appendChild(playerDiv);

    // Generate player scoreboard
    const playerScoreDiv = document.createElement('div');
    playerScoreDiv.className = 'player-score';
    scoreboardContainer.appendChild(playerScoreDiv);

    const playerNameOutput = document.createElement('h4');
    playerNameOutput.id = `player${i}NameOutput`;
    playerNameOutput.textContent = `Player ${i}`;
    playerScoreDiv.appendChild(playerNameOutput);

    const playerScoreSpan = document.createElement('span');
    playerScoreSpan.id = `player${i}Score`;
    playerScoreSpan.textContent = '0';
    playerScoreDiv.appendChild(playerScoreSpan);

    const scoreInputDiv = document.createElement('div');
    scoreInputDiv.className = 'score-input';
    playerScoreDiv.appendChild(scoreInputDiv);

    const scoreInput = document.createElement('input');
    scoreInput.id = `player${i}ScoreInput`;
    scoreInput.type = 'number';
    scoreInputDiv.appendChild(scoreInput);

    const addScoreBtn = document.createElement('button');
    addScoreBtn.id = `player${i}Btn`;
    addScoreBtn.textContent = '+';
    addScoreBtn.addEventListener('click', () => {
      addScore(`player${i}`);
    });
    scoreInputDiv.appendChild(addScoreBtn);
  }

  // Initialize reset button after players are generated
  initializeResetButton();
}

// Initialize reset button
function initializeResetButton() {
  const resetBtn = document.getElementById('resetBtn');
  resetBtn.addEventListener('click', resetCounter);
}

// Call the function to generate players when the page loads
window.addEventListener('load', generatePlayers);

// Add player names
function setPlayerName(playerNumber) {
  const playerNameInput = document.getElementById(`player${playerNumber}Name`);
  const playerNameOutput = document.getElementById(`player${playerNumber}NameOutput`);

  playerNameOutput.textContent = playerNameInput.value;
  playerNameInput.value = '';
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

// If a player's score lands on 100 exactly, score is set to 50
function halveScore(player) {
  const scoreElement = document.getElementById(player + 'Score');

  if (+scoreElement.innerText === 100) {
    scoreElement.textContent = '50';
  }
}

// Player goes bust if points exceed 100
function playerBust(player) {
  const scoreElement = document.getElementById(player + 'Score');

  if (+scoreElement.textContent > 100) {
    scoreElement.style.textDecoration = 'line-through';
    const playerBtn = document.getElementById(player + 'Btn');
    playerBtn.disabled = true;
    playerBtn.textContent = 'X';
    playerBtn.style.backgroundColor = '#2c3e50';
  }
}

// Declare a winner when only one player remains 
function declareWinner() {
  const activePlayers = Array.from({ length: numberOfPlayers }, (_, i) => i + 1)
    .filter(player => +document.getElementById(`player${player}Score`).textContent < 100);

  if (activePlayers.length === 1) {
    const winnerPlayerNumber = activePlayers[0];
    const winnerName = document.getElementById(`player${winnerPlayerNumber}NameOutput`).innerHTML;
    const winner = document.getElementById('winner');
    winner.textContent = `${winnerName} wins!`;
    winner.style.backgroundColor = '#2ecc71';
    document.getElementById('winner-container').style.backgroundColor = '#2ecc71';
  }
}

//Reset all scores and status'
function resetCounter() {
  for (let player = 1; player <= numberOfPlayers; player++) {
    resetPlayer(player);
  }
  const winner = document.getElementById('winner');
  winner.textContent = 'No winner yet. Keep playing!'
  winner.style.backgroundColor = 'var(--secondary)';
  const winnerContainer = document.getElementById('winner-container');
  winnerContainer.style.backgroundColor = 'var(--secondary)';
}

// Initialize player name and score
for (let i = 1; i <= numberOfPlayers; i++) {
  setPlayerName(i);
}

// Initialize reset button
const resetBtn = document.getElementById('resetBtn');
resetBtn.addEventListener('click', resetCounter);

