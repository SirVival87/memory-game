/**
 * Event handling of the game page: card clicks, turn flow, header updates and the exit dialog.
 */

import { FLIP_DELAY } from './constants';
import {
  canFlip,
  findCard,
  flipCard,
  isGameOver,
  isPair,
  isTurnComplete,
  missPair,
  scorePair,
  setBoardLock,
} from './game-logic';
import { state } from './state';
import type { Card } from './types';

/**
 * Connects the game page: card clicks, exit button and dialog.
 * @param onExit - Called when the player leaves the game.
 * @param onGameOver - Called when all pairs are found.
 */
export function initGame(onExit: () => void, onGameOver: () => void): void {
  const board = getElement('board');
  board.addEventListener('click', (event) => handleCardClick(event, onGameOver));
  addExitListeners(onExit);
  renderScore();
  renderCurrentPlayer();
}

/**
 * Handles a click on the board: turns the card over and evaluates the turn when two are open.
 * @param event - Click inside the board; only clicks on cards are handled.
 * @param onGameOver - Passed on, called when the last pair is found.
 */
function handleCardClick(event: MouseEvent, onGameOver: () => void): void {
  const card = getClickedCard(event);
  if (!card || !canFlip(card)) {
    return;
  }
  flipCard(card);
  renderCard(card);
  if (isTurnComplete()) {
    resolveTurn(onGameOver);
  }
}

/**
 * Finds the card in the state that belongs to the clicked element.
 * @param event - Click inside the board.
 * @returns The card, or null if no card was clicked.
 */
function getClickedCard(event: MouseEvent): Card | null {
  const element = (event.target as HTMLElement).closest<HTMLElement>('.card');
  if (!element) {
    return null;
  }
  return findCard(Number(element.dataset.id)) ?? null;
}

/**
 * Evaluates the two face-up cards: keeps a pair open, otherwise turns them back after FLIP_DELAY.
 * @param onGameOver - Called when the last pair is found.
 */
function resolveTurn(onGameOver: () => void): void {
  if (isPair()) {
    handleMatch(onGameOver);
  } else {
    handleMismatch();
  }
}

/**
 * Handles a found pair: score, header update and check for the end of the game.
 * @param onGameOver - Called when the last pair is found.
 */
function handleMatch(onGameOver: () => void): void {
  const pair = [...state.flippedCards];
  scorePair();
  pair.forEach(renderCard);
  renderScore();
  if (isGameOver()) {
    onGameOver();
  }
}

/**
 * Handles a miss: locks the board, turns the cards back after FLIP_DELAY and changes the player.
 */
function handleMismatch(): void {
  const pair = [...state.flippedCards];
  setBoardLock(true);
  setTimeout(() => {
    missPair();
    pair.forEach(renderCard);
    renderCurrentPlayer();
    setBoardLock(false);
  }, FLIP_DELAY);
}

/**
 * Shows or hides the front of a card on the board and marks found pairs.
 * @param card - Card whose element is updated.
 */
function renderCard(card: Card): void {
  const element = document.querySelector<HTMLElement>(`.card[data-id="${card.id}"]`);
  if (!element) {
    return; // the game page was left in the meantime
  }
  element.classList.toggle('is-flipped', card.isFlipped);
  element.classList.toggle('is-matched', card.isMatched);
}

/**
 * Writes the scores of both players into the header.
 */
function renderScore(): void {
  getElement('score-blue').textContent = String(state.scores.blue);
  getElement('score-orange').textContent = String(state.scores.orange);
}

/**
 * Shows whose turn it is in the header.
 */
function renderCurrentPlayer(): void {
  const tag = document.getElementById('current-player');
  if (!tag) {
    return; // the game page was left in the meantime
  }
  tag.dataset.player = state.currentPlayer;
  tag.setAttribute('aria-label', state.currentPlayer);
}

/**
 * Connects the exit button and the two buttons of the exit dialog.
 * @param onExit - Called when the player confirms leaving the game.
 */
function addExitListeners(onExit: () => void): void {
  getElement('exit-button').addEventListener('click', openExitDialog);
  getElement('back-to-game').addEventListener('click', closeExitDialog);
  getElement('confirm-exit').addEventListener('click', onExit);
}

/**
 * Opens the dialog "Are you sure you want to quit the game?".
 */
function openExitDialog(): void {
  (getElement('exit-dialog') as HTMLDialogElement).showModal();
}

/**
 * Closes the exit dialog and returns to the game.
 */
function closeExitDialog(): void {
  (getElement('exit-dialog') as HTMLDialogElement).close();
}

/**
 * Returns an element of the game page by its id.
 * @param id - Id from the game template.
 * @returns The element; it always exists while the game page is shown.
 */
function getElement(id: string): HTMLElement {
  return document.getElementById(id) as HTMLElement;
}
