/**
 * Render functions per screen: renderHome, renderSettings, renderGame, renderResult.
 */

import { getHomeTemplate } from './templates/home-template';
import { getSettingsTemplate } from './templates/settings-template';
import { initSettings } from './settings';
import { prepareGame } from './game-logic';
import { getGameTemplate } from './templates/game-template';
import { initGame } from './game';
import { resetState } from './state';

const APP = document.getElementById('app');

/**
 * Inserts the home page template into the main container.
 */
export function renderHome(): void {
  if (APP) {
    APP.innerHTML = getHomeTemplate();
  }
  addPlayButtonListener();
}

/**
 * Opens the settings page when the play button is clicked.
 */
function addPlayButtonListener(): void {
  const playButton = document.getElementById('play-button');
  if (playButton) {
    playButton.addEventListener('click', renderSettings);
  }
}

/**
 * Inserts the settings page into the main container. Start opens the game board.
 */
export function renderSettings(): void {
  if (APP) {
    APP.innerHTML = getSettingsTemplate();
  }
  initSettings(startGame);
}

/**
 * Starts a new round with the chosen settings and shows the game board.
 */
function startGame(): void {
  prepareGame();
  renderGame();
}

/**
 * Inserts the game page into the main container and connects cards, header and exit dialog.
 */
export function renderGame(): void {
  if (APP) {
    APP.innerHTML = getGameTemplate();
  }
  initGame(leaveGame, renderResult);
}

/**
 * Leaves the game: resets the state, removes the theme and shows the home page.
 */
function leaveGame(): void {
  resetState();
  delete document.body.dataset.theme;
  renderHome();
}

/**
 * Inserts the result page into the main container (placeholder until phase 6).
 */
export function renderResult(): void {
  if (APP) {
    APP.innerHTML = '<h1>Result</h1>';
  }
}
