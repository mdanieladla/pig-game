'use strict';

//Seleccionamos los elementos
const player0Elmt = document.querySelector('.js-player--0');
const player1Elmt = document.querySelector('.js-player--1');
const score0Elmt = document.querySelector('#score--0');
const score1Elmt = document.querySelector('#score--1');
const current0Elmt = document.querySelector('#current--0');
const current1Elmt = document.querySelector('#current--1');

const diceElmt = document.querySelector('.js-dice');
const btnNew = document.querySelector('.js-btn-new');
const btnRoll = document.querySelector('.js-btn-roll');
const btnHold = document.querySelector('.js-btn-hold');

//Definimos las variables
let scores, currentScore, activePlayer, playing;

//Starting conditions

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0Elmt.textContent = 0;
  score1Elmt.textContent = 0;
  current0Elmt.textContent = 0;
  current1Elmt.textContent = 0;

  diceElmt.classList.add('hidden');
  player0Elmt.classList.remove('player--winner');
  player1Elmt.classList.remove('player--winner');
  player0Elmt.classList.add('player--active');
  player1Elmt.classList.remove('player--active');
};

init();

const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Elmt.classList.toggle('player--active');
  player1Elmt.classList.toggle('player--active');
};

//Funcionalidad tirar el dado
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generamos una tirada de dado random
    //creamos una constante de dado dentro de la función porque queremos que se tire un nuevo dado cada vez que pulsamos el botón. Usamos math.trunc para quitarle los decimales y con math.random generamos un numero random del 0 al 0.999 y lo multiplicamos x6 y le sumamos 1 porque lo queremos hasta el 6.
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2. Display dado
    diceElmt.classList.remove('hidden');
    diceElmt.src = `./images/dice-${dice}.png`;
    // 3. Check for rolled 1
    if (dice !== 1) {
      // Añadir el dado al current score
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore; //de esta forma seleccionamos dinámicamente el score del elemento del jugador activo
      //current0Elmt.textContent = currentScore; select the score elemt of player 0
    } else {
      //cambiar al siguiente jugador
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Añadir el current score al score del jugador activo
    scores[activePlayer] += currentScore;
    //la línea de encima es lo mismo que escribirlo asi: scores[1] = scores[1] + currentScore
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. Checkear si el score del jugador es por lo menos 100
    if (scores[activePlayer] >= 100) {
      //El jugador ha ganado, finalizamos el juego
      playing = false;
      diceElmt.classList.add('hidden');
      document
        .querySelector(`.js-player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.js-player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Si no, cambiamos de jugador
      switchPlayer();
    }
  }
});

//Resetting the game
btnNew.addEventListener('click', init);
