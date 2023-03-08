// player 1 name
const player1Name = document.getElementById('player1Name');
const addPlayer1Name = document.getElementById('addPlayer1Name');
const player1NameOutput = document.getElementById('player1NameOutput');

function player1() {
  player1NameOutput.innerHTML = player1Name.value;
  document.querySelector("#player1Name").value = '';
}

addPlayer1Name.addEventListener('click',player1);

// player 2 name
const player2Name = document.getElementById('player2Name');
const addPlayer2Name = document.getElementById('addPlayer2Name');
const player2NameOutput = document.getElementById('player2NameOutput');

function player2() {
  player2NameOutput.innerHTML = player2Name.value;
  document.querySelector("#player2Name").value = '';
}

addPlayer2Name.addEventListener('click',player2);

// player 3 name
const player3Name = document.getElementById('player3Name');
const addPlayer3Name = document.getElementById('addPlayer3Name');
const player3NameOutput = document.getElementById('player3NameOutput');

function player3() {
  player3NameOutput.innerHTML = player3Name.value;
  document.querySelector("#player3Name").value = '';
}

addPlayer3Name.addEventListener('click',player3);

// player 4 name
const player4Name = document.getElementById('player4Name');
const addPlayer4Name = document.getElementById('addPlayer4Name');
const player4NameOutput = document.getElementById('player4NameOutput');

function player4() {
  player4NameOutput.innerHTML = player4Name.value;
  document.querySelector("#player4Name").value = '';
}

addPlayer4Name.addEventListener('click',player4);

// add score
function addScore(team) {
    const scoreInput = document.getElementById(team + 'ScoreInput');
    const score = document.getElementById(team + 'Score');
    score.innerHTML = parseInt(score.innerHTML) + parseInt(scoreInput.value);
    scoreInput.value = '';
  }

  // reset
  const resetBtn = document.querySelector("#resetBtn");

  resetBtn.addEventListener("click", resetCounter);

  function resetCounter(){ 
    document.getElementById('teamAScore').innerHTML = 0;
    document.getElementById('teamBScore').innerHTML = 0;
    document.getElementById('teamCScore').innerHTML = 0;
    document.getElementById('teamDScore').innerHTML = 0;
  }

  // winner

  // var winner = document.querySelector('#winner');

  // function printWinner(name){
  //   if()
  // }