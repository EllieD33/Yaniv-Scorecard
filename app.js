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
    document.getElementById('winner-containter').style.backgroundColor = '#2ecc71';
    document.getElementById('winner').style.backgroundColor = '#2ecc71';
  }
}

// reset
const resetBtn = document.querySelector("#resetBtn");

resetBtn.addEventListener("click", resetCounter);

//To do - bug fix - use a loop to make sure below changes take effect as player not defined in this function
function resetCounter(){ 
  document.getElementById('player1Score').innerHTML = 0; 
  document.getElementById('player2Score').innerHTML = 0;
  document.getElementById('player3Score').innerHTML = 0;
  document.getElementById('player4Score').innerHTML = 0;
  winner.innerText = 'No winner yet. Keep playing!'
  document.getElementById('winner-containter').style.backgroundColor = '#3498db';
  document.getElementById('winner').style.backgroundColor = '#3498db';
  document.getElementById(player + 'Score').style.textDecoration = 'none';
  document.getElementById(player + 'Btn').disabled = false;
  document.getElementById(player + 'Btn').innerHTML = 'Add score';
  document.getElementById(player + 'Btn').style.backgroundColor = '#2ecc71'
}