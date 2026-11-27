/**
 * HTML template of the settings page.
 */

import { IMG_PATH } from '../constants';

/**
 * Returns the HTML of the settings page (US2, US3).
 * @returns HTML string for the main container.
 */
export function getSettingsTemplate(): string {
  return `
    <section class="settings">
      <div class="container settings__container">
        <h1 class="settings__headline">Settings</h1>
        <form class="settings__form" id="settings-form">
          ${getOptionsTemplate()}
          ${getSummaryTemplate()}
        </form>
      </div>
    </section>
  `;
}

/**
 * Returns the left column with the three option groups.
 * @returns HTML string of the options column.
 */
function getOptionsTemplate(): string {
  return `
    <div class="settings__options">
      ${getThemeGroupTemplate()}
      ${getPlayerGroupTemplate()}
      ${getBoardSizeGroupTemplate()}
    </div>
  `;
}

/**
 * Returns the option group for the game theme.
 * @returns HTML string of the fieldset.
 */
function getThemeGroupTemplate(): string {
  return `
    <fieldset class="settings__group">
      <legend class="settings__legend">
        <img class="settings__legend-icon" src="${IMG_PATH}icons/palette.svg" alt=""> Game themes
      </legend>
      ${getRadioTemplate('theme', 'code-vibes', 'Code vibes theme')}
      ${getRadioTemplate('theme', 'gaming', 'Gaming theme')}
      ${getRadioTemplate('theme', 'da-projects', 'DA Projects theme')}
      ${getRadioTemplate('theme', 'food', 'Foods theme')}
    </fieldset>
  `;
}

/**
 * Returns the option group for the starting player.
 * @returns HTML string of the fieldset.
 */
function getPlayerGroupTemplate(): string {
  return `
    <fieldset class="settings__group">
      <legend class="settings__legend">
        <img class="settings__legend-icon" src="${IMG_PATH}icons/pawn.svg" alt=""> Choose starting player
      </legend>
      ${getRadioTemplate('player', 'blue', 'Blue')}
      ${getRadioTemplate('player', 'orange', 'Orange')}
    </fieldset>
  `;
}

/**
 * Returns the option group for the board size.
 * @returns HTML string of the fieldset.
 */
function getBoardSizeGroupTemplate(): string {
  return `
    <fieldset class="settings__group">
      <legend class="settings__legend">
        <img class="settings__legend-icon" src="${IMG_PATH}icons/cards.svg" alt=""> Board size
      </legend>
      ${getRadioTemplate('boardSize', '16', '16 cards')}
      ${getRadioTemplate('boardSize', '24', '24 cards')}
      ${getRadioTemplate('boardSize', '36', '36 cards')}
    </fieldset>
  `;
}

/**
 * Returns the right column with the theme preview and the bar.
 * @returns HTML string of the summary column.
 */
function getSummaryTemplate(): string {
  return `
    <div class="settings__summary">
      <img class="settings__preview" id="settings-preview" src="${IMG_PATH}previews/code-vibes.png" alt="Preview of the selected theme">
      ${getBarTemplate()}
    </div>
  `;
}

/**
 * Returns the bar with the current selection, the dividers and the start button (disabled until everything is chosen).
 * @returns HTML string of the bar.
 */
function getBarTemplate(): string {
  return `
    <div class="settings__bar">
      <p class="settings__bar-item" id="bar-theme">Game theme</p>
      <span class="settings__divider" aria-hidden="true"></span>
      <p class="settings__bar-item" id="bar-player">Player</p>
      <span class="settings__divider" aria-hidden="true"></span>
      <p class="settings__bar-item" id="bar-board-size">Board size</p>
      <button class="button button--start" type="submit" disabled>
        <img class="button__icon" src="${IMG_PATH}icons/start.svg" alt="">
        Start
      </button>
    </div>
  `;
}

/**
 * Returns the HTML of a single radio option.
 * @param name - Group name, e.g. 'theme'.
 * @param value - Value stored in the state, e.g. 'code-vibes'.
 * @param label - Text shown to the user.
 * @returns HTML string of the option.
 */
function getRadioTemplate(name: string, value: string, label: string): string {
  return `
    <label class="radio">
      <input class="radio__input" type="radio" name="${name}" value="${value}">
      <span class="radio__label">
        <span class="radio__text" data-text="${label}">${label}</span>
      </span>
    </label>
  `;
}
