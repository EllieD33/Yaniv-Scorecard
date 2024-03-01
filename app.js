// Add player names
function setPlayerName(playerNumber) {
  const playerName = document.getElementById(`player${playerNumber}Name`);
  const addPlayerName = document.getElementById(`addPlayer${playerNumber}Name`);
  const playerNameOutput = document.getElementById(`player${playerNumber}NameOutput`);

  function updatePlayerName() {
    playerNameOutput.innerHTML = playerName.value;
    document.querySelector(`#player${playerNumber}Name`).value = '';
  }

  addPlayerName.addEventListener('click', updatePlayerName);
}

setPlayerName(1);
setPlayerName(2);
setPlayerName(3);
setPlayerName(4);

// Add scores
function addScore(player) {
  const scoreInput = document.getElementById(player + 'ScoreInput');
  const score = document.getElementById(player + 'Score');
  score.innerHTML = parseInt(score.innerHTML) + parseInt(scoreInput.value);
  scoreInput.value = '';
  
  //points halve at 100
  halveScore(player);

  //player bust 
  playerBust(player);

  //decalre winner
  declareWinner();
}

//if a players score lands on 100 exactly, score is set to 50
function halveScore(player) {
  const scoreElement = document.getElementById(player + 'Score');
  const currentScore = scoreElement.innerHTML;
  if (currentScore === '100') {
    scoreElement.innerHTML = '50';
  }
}

//player goes bust if points exceed 100
function playerBust(player) {
  const scoreElement = document.getElementById(player + 'Score');
  const currentScore = scoreElement.innerHTML;
    if (parseInt(currentScore) > 100) {
    document.getElementById(player + 'Score').style.textDecoration = 'line-through';
    document.getElementById(player + 'Btn').disabled = true;
    document.getElementById(player + 'Btn').innerHTML = 'BUST';
    document.getElementById(player + 'Btn').style.backgroundColor = '#2c3e50'
  }
}

//declare a winner
  //when all but one player is bust, the remaining player is the winner
function declareWinner(){
  const players = [1, 2, 3, 4];
  const activePlayers = players.filter(player => {
    const score = parseInt(document.getElementById(`player${player}Score`).innerHTML);
    return score < 100;
  });
  if (activePlayers.length === 1) {
    const winnerPlayerNumber = activePlayers[0];
    const winnerName = document.getElementById(`player${winnerPlayerNumber}NameOutput`).innerHTML;
    const winner = document.getElementById('winner')
    winner.innerText = `${winnerName} wins!`
    document.getElementById('winner-container').style.backgroundColor = '#2ecc71';
    document.getElementById('winner').style.backgroundColor = '#2ecc71';
  }
}

// reset
const resetBtn = document.querySelector("#resetBtn");

resetBtn.addEventListener("click", resetCounter);

function resetCounter(){ 
  for (let player = 1; player <= 4; player++) {
    const playerScore = document.getElementById(`player${player}Score`);
    const playerBtn = document.getElementById(`player${player}Btn`);

    if (playerScore) {
      playerScore.innerHTML = 0;
      playerScore.style.textDecoration = 'none';
    }

    if (playerBtn) {
      playerBtn.disabled = false;
      playerBtn.innerHTML = 'Add score';
      playerBtn.style.backgroundColor = '#2ecc71';
    }
  }

  const winner = document.getElementById('winner');
  const winnerContainer = document.getElementById('winner-container');

  if (winner) {
    winner.innerText = 'No winner yet. Keep playing!'
    winner.style.backgroundColor = '#3498db';
  }

  if (winnerContainer) {
    winnerContainer.style.backgroundColor = '#3498db';
  }
}