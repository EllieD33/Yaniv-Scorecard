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
  
  halveScore(player);
}

//points halve at 100
  //if a players score lands on 100 exactly, score is set to 50
function halveScore(player) {
  const scoreElement = document.getElementById(player + 'Score');
  const currentScore = scoreElement.innerHTML;
  if (currentScore === '100') {
    scoreElement.innerHTML = '50';
  }
}

//player bust
  //if a players score goes above 100, they are bust

//declare a winner
  //when all but one player is bust, the remaining player is the winner

// reset
const resetBtn = document.querySelector("#resetBtn");

resetBtn.addEventListener("click", resetCounter);

function resetCounter(){ 
  document.getElementById('player1Score').innerHTML = 0; 
  document.getElementById('player2Score').innerHTML = 0;
  document.getElementById('player3Score').innerHTML = 0;
  document.getElementById('player4Score').innerHTML = 0;
}