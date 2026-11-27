/**
 * Render functions per screen: renderHome, renderSettings, renderGame, renderResult.
 */

import { getHomeTemplate } from './templates/home-template';
import { getSettingsTemplate } from './templates/settings-template';
import { initSettings } from './settings';
import { prepareGame } from './game-logic';

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
  };
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
 * Inserts the game board into the main container (placeholder until phase 5).
 */
export function renderGame(): void {
  if (APP) {
    APP.innerHTML = '<h1>Game</h1>';
  }
}

/**
 * Inserts the result page into the main container (placeholder until phase 6).
 */
export function renderResult(): void {
  if (APP) {
    APP.innerHTML = '<h1>Result</h1>';
  }
}
