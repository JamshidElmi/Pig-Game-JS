/**
*  @project   Pig Game
*  @author    Jamshid Elmi
*  @created   2022-07-11 17:47:00
*  @tutorial  https://www.youtube.com/c/codingplay
*  @demo      https://JamshidElmi.github.io/Pig-Game-JS
*/
'use strict';
// get elements
const score0Element = document.getElementById('score--0');
const score1Element = document.getElementById('score--1');
const current0Element = document.getElementById('current--0');
const current1Element = document.getElementById('current--1');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const diceImg = document.querySelector('.dice');

const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

let currentDice, playerScores, player, playing;

// reset function
const reset = function () {
  currentDice = 0;
  playerScores = [0, 0];
  player = 0;
  playing = true;

  score0Element.textContent = 0;
  score1Element.textContent = 0;
  diceImg.classList.add('hidden');

  score0Element.textContent = 0;
  score1Element.textContent = 0;
  current0Element.textContent = 0;
  current1Element.textContent = 0;

  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  document.querySelector(`.player--0 .current`).style.backgroundColor =
    '#2e9dbf';
  document.querySelector(`.player--1 .current`).style.backgroundColor =
    '#2e9dbf';
  player0.classList.add('player--active');
  player1.classList.remove('player--active');
};

// reset
reset();

// reset btn click 
btnNew.addEventListener('click', reset);

// roll dice btn click
btnRoll.addEventListener('click', function () {
  if (playing)
  {
    let dice = Math.ceil(Math.random() * 6);
    diceRolling();
    // delay after rolling
    setTimeout(function () {
      diceImg.src = `dice-${dice}.png`;

      diceImg.classList.remove('hidden');
      currentDice += dice;
      // if dice is 1 change player
      if (dice == 1) {
        currentDice = 0;
        player0.classList.toggle('player--active');
        player1.classList.toggle('player--active');
        document.getElementById(`current--${player}`).textContent = 0;
        player = player === 0 ? 1 : 0;
      }
      document.getElementById(`current--${player}`).textContent = currentDice;
    }, 600);
  }
}); 

// rolling animation function
const diceRolling = function() {
    setTimeout(function() {
      diceImg.src = `dice-1.png`;
    }, 200);
    setTimeout(function () {
      diceImg.src = `dice-4.png`;
    }, 300);
    setTimeout(function () {
      diceImg.src = `dice-6.png`;
    }, 400);
    setTimeout(function () {
      diceImg.src = `dice-2.png`;
    }, 500);
};

// hold btn click
btnHold.addEventListener('click', function () {
  playerScores[player] += currentDice;
  document.getElementById(`score--${player}`).textContent =
  playerScores[player];
  currentDice = 0;
  document.getElementById(`current--${player}`).textContent = currentDice;
  // winner
  if (playerScores[player] >= 100) {
    playing = false;
    diceImg.classList.add('hidden');
    document
      .querySelector(`.player--${player}`)
      .classList.add('player--winner');
    document.querySelector(
      `.player--${player} .current`
    ).style.backgroundColor = '#0d9839';
  }
});