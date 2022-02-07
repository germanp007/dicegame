"use strict";

//Seleccion de elementos

const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const diceEl = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
// comenzando condiciones

let scores, activePlayer, currentScore, playing;
// reiniciar Juego
const init = function () {
  scores = [0, 0];
  activePlayer = 0;
  currentScore = 0;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
};
init();
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};
// funcionalidad dado
btnRoll.addEventListener("click", function () {
  if (playing) {
    //genedar numero aleatorio
    const dice = Math.trunc(Math.random() * 6) + 1;

    // mostrar numero
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;
    //check si dado es 1 cambiar al siguiente player
    if (dice !== 1) {
      // agregar el valor de dado al score actual
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // cambiar de jugador
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      switchPlayer();
      // if (player0El === document.querySelector(".player--active")) {
      //   player0El.classList.remove("player--active");
      //   player1El.classList.add("player--active");
      // } else {
      //   player1El.classList.remove("player--active");
      //   player0El.classList.add("player--active");
      // }
    }
  }
});

btnHold.addEventListener("click", function () {
  // agregar el score del jugador al score actual
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // score >= 100
    if (scores[activePlayer] >= 20) {
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      //cambio de turno
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);
