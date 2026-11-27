/**
 * Game logic: create and shuffle cards, handle clicks, check pairs, switch players, end the game.
 */

import { state } from './state';

/**
 * Prepares a new round with the options chosen in the settings:
 * the chosen player starts, scores and flipped cards are reset and the theme is applied.
 * The card deck is created here as well in phase 5.
 */
export function prepareGame(): void {
  if (!state.theme || !state.player || !state.boardSize) {
    return;
  }
  state.currentPlayer = state.player;
  resetRound();
  document.body.dataset.theme = state.theme;
}

/**
 * Clears everything left over from a previous round, the settings stay untouched.
 */
function resetRound(): void {
  state.scores = { blue: 0, orange: 0 };
  state.cards = [];
  state.flippedCards = [];
  state.lockBoard = false;
}
