/**
 * Game logic: create and shuffle cards, handle clicks, check pairs, switch players, end the game.
 */

import { CARD_MOTIF_COUNT, CARDS_PER_TURN } from './constants';
import { state } from './state';
import type { BoardSize, Card } from './types';

/**
 * Prepares a new round with the options chosen in the settings:
 * the chosen player starts, scores and flipped cards are reset, a shuffled deck is created
 * and the theme is applied.
 */
export function prepareGame(): void {
  if (!state.theme || !state.player || !state.boardSize) {
    return;
  }
  state.currentPlayer = state.player;
  resetRound();
  createDeck(state.boardSize);
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

/**
 * Creates a shuffled deck for the chosen board size and stores it in the state.
 * @param boardSize - Number of cards on the board.
 */
function createDeck(boardSize: BoardSize): void {
  const motifs = pickMotifs(boardSize / 2);
  const cards = createCards(motifs);
  state.cards = shuffle(cards);
}

/**
 * Picks random, different motifs for the deck.
 * @param count - Number of motifs, half the board size.
 * @returns Motif numbers between 1 and CARD_MOTIF_COUNT.
 */
function pickMotifs(count: number): number[] {
  const allMotifs: number[] = [];
  for (let motif = 1; motif <= CARD_MOTIF_COUNT; motif++) {
    allMotifs.push(motif);
  }
  return shuffle(allMotifs).slice(0, count);
}

/**
 * Creates two cards per motif.
 * @param motifs - Motif numbers of the deck.
 * @returns Unshuffled cards, each motif twice, every card with its own id.
 */
function createCards(motifs: number[]): Card[] {
  const cards: Card[] = [];
  for (const motif of motifs) {
    cards.push({ id: cards.length, motif, isFlipped: false, isMatched: false });
    cards.push({ id: cards.length, motif, isFlipped: false, isMatched: false });
  }
  return cards;
}

/**
 * Returns a shuffled copy of the given items (Fisher-Yates).
 * @param items - Items to shuffle, the array itself stays unchanged.
 * @returns New array in random order.
 */
function shuffle<T>(items: T[]): T[] {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = result[i];
    result[i] = result[j];
    result[j] = temp;
  }
  return result;
}

/**
 * Finds a card of the deck by its id.
 * @param id - Id of the card.
 * @returns The card, or undefined if there is none with this id.
 */
export function findCard(id: number): Card | undefined {
  return state.cards.find((card) => card.id === id);
}

/**
 * Checks whether a card may be turned over right now.
 * @param card - Clicked card.
 * @returns False while the board is locked or the card is already face up or matched.
 */
export function canFlip(card: Card): boolean {
  return !state.lockBoard && !card.isFlipped && !card.isMatched;
}

/**
 * Turns a card face up and remembers it for the current turn.
 * @param card - Card to turn over.
 */
export function flipCard(card: Card): void {
  card.isFlipped = true;
  state.flippedCards.push(card);
}

/**
 * Checks whether two cards are face up in the current turn.
 * @returns True as soon as the turn can be evaluated.
 */
export function isTurnComplete(): boolean {
  return state.flippedCards.length === CARDS_PER_TURN;
}

/**
 * Checks whether the two face-up cards show the same motif.
 * @returns True for a pair.
 */
export function isPair(): boolean {
  const [first, second] = state.flippedCards;
  return first.motif === second.motif;
}

/**
 * Marks both face-up cards as found and gives the current player a point.
 */
export function scorePair(): void {
  state.flippedCards.forEach((card) => {
    card.isMatched = true;
  });
  state.scores[state.currentPlayer]++;
  clearFlippedCards();
}

/**
 * Turns both face-up cards back and passes the turn to the other player.
 */
export function missPair(): void {
  state.flippedCards.forEach((card) => {
    card.isFlipped = false;
  });
  clearFlippedCards();
  changePlayer();
}

/**
 * Empties the list of face-up cards of the current turn.
 */
export function clearFlippedCards(): void {
  state.flippedCards = [];
}

/**
 * Switches the current player.
 */
function changePlayer(): void {
  state.currentPlayer = state.currentPlayer === 'blue' ? 'orange' : 'blue';
}

/**
 * Blocks or allows clicks on the board.
 * @param locked - True while two cards are being compared.
 */
export function setBoardLock(locked: boolean): void {
  state.lockBoard = locked;
}

/**
 * Checks whether all pairs are found.
 * @returns True when the game is over.
 */
export function isGameOver(): boolean {
  return state.cards.every((card) => card.isMatched);
}
