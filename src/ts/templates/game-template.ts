/**
 * HTML templates for the game page: header, board, cards and the exit dialog.
 */

import { IMG_PATH } from '../constants';
import { state } from '../state';
import type { Card } from '../types';
import { getExitDialogTemplate } from './popup-template';

/** Digits of the motif number in the file name, e.g. card-07.svg. */
const FILE_NUMBER_DIGITS = 2;

/**
 * Returns the HTML of the game page: header, board and exit dialog.
 * @returns HTML string for the main container.
 */
export function getGameTemplate(): string {
  return `
    <section class="game">
      <div class="container">
        ${getHeaderTemplate()}
        ${getBoardTemplate()}
      </div>
      ${getExitDialogTemplate()}
    </section>
  `;
}

/**
 * Returns the header with scores, current player and exit button.
 * @returns HTML string of the header.
 */
function getHeaderTemplate(): string {
  return `
    <header class="game__header">
      <div class="game__scores">
        ${getScoreTemplate('orange')}
        ${getScoreTemplate('blue')}
      </div>
      <p class="game__current">
        Current player: <span class="game__player-tag" id="current-player" role="img"></span>
      </p>
      <button class="game__exit" id="exit-button" type="button">
        <span class="game__exit-icon" aria-hidden="true"></span> Exit game
      </button>
    </header>
  `;
}

/**
 * Returns the score of one player: pawn icon and number of found pairs.
 * @param player - Player color, used for the color and the id of the number.
 * @returns HTML string of the score.
 */
function getScoreTemplate(player: 'blue' | 'orange'): string {
  return `
    <span class="game__score game__score--${player}" aria-label="${player} score">
      <span class="game__pawn" aria-hidden="true"></span>
      <span id="score-${player}">0</span>
    </span>
  `;
}

/**
 * Returns the board with all cards of the deck, laid out for the chosen board size.
 * @returns HTML string of the board.
 */
function getBoardTemplate(): string {
  return `
    <div class="game__board game__board--${state.boardSize}" id="board">
      ${state.cards.map(getCardTemplate).join('')}
    </div>
  `;
}

/**
 * Returns the HTML of one card with back and front side.
 * @param card - Card of the deck.
 * @returns HTML string of the card.
 */
function getCardTemplate(card: Card): string {
  return `
    <button class="card" type="button" data-id="${card.id}" aria-label="Memory card">
      <span class="card__inner">
        <img class="card__face card__face--back" src="${IMG_PATH}themes/${state.theme}/card-back.svg" alt="">
        <img class="card__face card__face--front" src="${getCardImage(card.motif)}" alt="">
      </span>
    </button>
  `;
}

/**
 * Builds the image path of a motif for the chosen theme.
 * @param motif - Motif number between 1 and CARD_MOTIF_COUNT.
 * @returns Path like ".../themes/gaming/card-07.svg".
 */
function getCardImage(motif: number): string {
  const number = String(motif).padStart(FILE_NUMBER_DIGITS, '0');
  return `${IMG_PATH}themes/${state.theme}/card-${number}.svg`;
}
