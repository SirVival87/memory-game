/**
 * Central game state (settings, scores, current player, flipped cards) and reset.
 */

import type { GameState } from './types';

/**
 * Returns the values the game starts with.
 * @returns A fresh game state.
 */
function getInitialState(): GameState {
  return {
    theme: null,
    player: null,
    boardSize: null,
    currentPlayer: 'blue',
    scores: { blue: 0, orange: 0 },
    cards: [],
    flippedCards: [],
    lockBoard: false,
  };
}

/** Current game state, shared by all modules. */
export const state: GameState = getInitialState();

/**
 * Resets the game state to the start values.
 */
export function resetState(): void {
  Object.assign(state, getInitialState());
}
