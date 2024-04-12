const numberOfPlayers = 4;

// // Clear input fields on page load
// window.addEventListener('load', function() {
//   for (let i = 1; i <= numberOfPlayers; i++) {
//     const playerName = document.getElementById(`player${i}-name`);
//     playerName.value = ''; // Clear input field value
//   }
// });

//Generate player name input and scorecards
function generatePlayers() {
  const playerInputsContainer = document.getElementById('player-inputs');
  const cardContainer = document.getElementById('card-container');

  for (let i = 1; i <= numberOfPlayers; i++) {
      // Player name input fields
      const inputContainer = document.createElement('div');
      inputContainer.classList.add('name-input-container');
      inputContainer.innerHTML = `
          <input class="name-input" name="player${i}-name" max-length="20" placeholder="Enter player ${i} name" type="text" id="player${i}-name">
          <input class="add-name-btn" type="button" value="Add name" id="add-player${i}-name">
      `;
      playerInputsContainer.appendChild(inputContainer);

      // Player scorecards
      const card = document.createElement('div');
      card.classList.add('card');
      card.id = `player${i}-card`;
      card.innerHTML = `
          <div class="card-inner" id="player${i}-card-inner">
              <div class="card-face card-face-front">
                  <h2 id="player${i}-name-output">Player ${i}</h2>
                  <h2 class="card-score" id="player${i}-card-score">0</h2>
                  <div class="score-adder">
                      <input type="number" id="player${i}-score-input">
                      <button id="player${i}-add-score-btn">+</button>
                  </div>
              </div>
              <div class="card-face card-face-back" id="player${i}-card-face-back">
                  <h2 id="player${i}-name-bust">Player ${i}</h2>
                  <h2>is bust!</h2>
                  <h2 class="card-score" id="player${i}-card-score-bust">0</h2>
              </div>
          </div>
      `;
      cardContainer.appendChild(card);

      // Add event listeners for adding player names and scores
    const addPlayerNameButton = document.getElementById(`add-player${i}-name`);
    const addScoreButton = document.getElementById(`player${i}-add-score-btn`);

    addPlayerNameButton.addEventListener('click', function() {
      setPlayerName(i);
    });

    addScoreButton.addEventListener('click', function() {
      addScore(i);
    });
  }
}

window.addEventListener('load', function() {
  generatePlayers(); 
});

// Add player names
function setPlayerName(playerNumber) {
  const playerName = document.getElementById(`player${playerNumber}-name`);
  const playerNameOutput = document.getElementById(`player${playerNumber}-name-output`);

  function updatePlayerName() {
    if (playerName.value != '') {
    playerNameOutput.textContent = playerName.value;
    playerName.value = '';
    }
  }
  updatePlayerName();
}

// Add scores
function addScore(playerNumber) {
  const scoreInput = document.getElementById(`player${playerNumber}-score-input`);
  const score = document.getElementById(`player${playerNumber}-card-score`);
  
  const inputNumber = parseInt(scoreInput.value);
  if (!isNaN(inputNumber)) {
    score.textContent = parseInt(score.textContent) + inputNumber;
  }
  scoreInput.value = '';
  
  halveScore(playerNumber);
  playerBust(playerNumber);
  declareWinner();
}

//if a players score lands on 100 exactly, score is set to 50
function halveScore(playerNumber) {
  const scoreElement = document.getElementById(`player${playerNumber}-card-score`);
  const currentScore = scoreElement.textContent;
  if (currentScore === '100') {
    scoreElement.textContent = '50';
  }
}

//player goes bust if points exceed 100
function playerBust(playerNumber) {
  const scoreElement = document.getElementById(`player${playerNumber}-card-score`);
  const currentScore = +scoreElement.textContent;
  const bustScoreElement = document.getElementById(`player${playerNumber}-card-score-bust`);
  const playerName = document.getElementById(`player${playerNumber}-name-output`);
  const playerNameBust = document.getElementById(`player${playerNumber}-name-bust`);

  playerNameBust.textContent = playerName.textContent;
  bustScoreElement.textContent = currentScore;

    if (currentScore > 100) {
    const card = document.querySelector(`#player${playerNumber}-card-inner`);
    document.getElementById(`player${playerNumber}-card-face-back`).style.color = 'var(--light)';
    card.classList.add('is-flipped');
    
  }
}

//declare a winner
  //when all but one player is bust, the remaining player is the winner
function declareWinner(){
  const players = [1, 2, 3, 4];
  const activePlayers = players.filter(player => {
    const score = parseInt(document.getElementById(`player${player}-card-score`).textContent);
    return score < 100;
  });
  if (activePlayers.length === 1) {
    const winnerPlayerNumber = activePlayers[0];
    const winnerName = document.getElementById(`player${winnerPlayerNumber}-name-output`).textContent;
    const winner = document.getElementById('winner')
    winner.innerText = `${winnerName} wins!`
  }
}

// reset
const resetBtn = document.querySelector("#reset-btn");

resetBtn.addEventListener("click", resetCounter);

function resetCounter(){ 
  for (let player = 1; player <= 4; player++) {
    const playerScore = document.getElementById(`player${player}-card-score`);
    const playerBtn = document.getElementById(`player${player}-add-score-btn`);

    if (playerScore) {
      playerScore.textContent = 0;
      const card = document.querySelector(`#player${player}-card-inner`);
      card.classList.remove('is-flipped');
    }
  }

  const winner = document.getElementById('winner');
  const winnerContainer = document.getElementById('winner-container');

  if (winner) {
    winner.innerText = 'No winner yet. Keep playing!'
  }
}

//Initialise player names and scores
for (let i = 1; i <= numberOfPlayers; i++) {
  setPlayerName(i);
}

// Add event listeners for adding scores
for (let i = 1; i <= numberOfPlayers; i++) {
  const addScoreButton = document.getElementById(`player${i}-add-score-btn`);
  addScoreButton.addEventListener('click', function() {
    addScore(i);
  });
}