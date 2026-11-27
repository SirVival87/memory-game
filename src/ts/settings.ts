/**
 * Event handling of the settings page: store the selection, swap the preview, enable the start button.
 */

import { IMG_PATH, SETTINGS_COUNT } from './constants';
import { state } from './state';
import type { BoardSize, Player, Theme } from './types';

/** Name of a settings group, equals the name attribute of its radio buttons. */
type SettingName = 'theme' | 'player' | 'boardSize';

/** Text shown in the bar for each theme. */
const THEME_LABELS: Record<Theme, string> = {
  'code-vibes': 'Code vibes theme',
  'gaming': 'Gaming theme',
  'da-projects': 'DA Projects theme',
  'food': 'Foods theme',
};

/** Text shown in the bar for each player. */
const PLAYER_LABELS: Record<Player, string> = {
  blue: 'Blue Player',
  orange: 'Orange Player',
};

/** Text shown in the bar while nothing is chosen in a group. */
const BAR_PLACEHOLDERS: Record<SettingName, string> = {
  theme: 'Game theme',
  player: 'Player',
  boardSize: 'Board size',
};

/** Id of the bar entry for each group. */
const BAR_IDS: Record<SettingName, string> = {
  theme: 'bar-theme',
  player: 'bar-player',
  boardSize: 'bar-board-size',
};

/** Theme whose preview is shown while no theme is chosen. */
const DEFAULT_PREVIEW: Theme = 'code-vibes';

/**
 * Connects the settings form: clicks select or deselect options, submit starts the game.
 * @param onStart - Called when the start button is clicked and all settings are chosen.
 */
export function initSettings(onStart: () => void): void {
  const form = document.getElementById('settings-form') as HTMLFormElement;
  form.addEventListener('click', handleOptionClick);
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (countSelections() === SETTINGS_COUNT) {
      onStart();
    }
  });
  updateSettingsView();
}

/**
 * Selects the clicked option, or deselects it when it was already selected.
 * @param event - Click inside the form; only clicks on radio inputs are handled.
 */
function handleOptionClick(event: MouseEvent): void {
  if (!(event.target instanceof HTMLInputElement)) {
    return;
  }
  const input = event.target;
  const name = input.name as SettingName;
  const wasSelected = String(state[name]) === input.value;
  input.checked = !wasSelected;
  if (wasSelected) {
    pauseHoverPreview(input);
  }
  selectSetting(name, wasSelected ? null : input.value);
  updateSettingsView();
}

/**
 * Hides the hover preview of a just deselected option until the mouse leaves it,
 * so the arrow can run its deselect animation although the mouse is still on the option.
 * @param input - Radio input that was deselected.
 */
function pauseHoverPreview(input: HTMLInputElement): void {
  const option = input.closest('.radio') as HTMLElement;
  option.classList.add('radio--deselected');
  option.addEventListener('mouseleave', () => {
    option.classList.remove('radio--deselected');
  }, { once: true });
}

/**
 * Stores a setting in the state. Null clears it.
 * @param name - Settings group.
 * @param value - Value of the radio input, or null to deselect.
 */
function selectSetting(name: SettingName, value: string | null): void {
  switch (name) {
    case 'theme':
      state.theme = value as Theme | null;
      break;
    case 'player':
      state.player = value as Player | null;
      break;
    case 'boardSize':
      state.boardSize = value === null ? null : (Number(value) as BoardSize);
      break;
  }
}

/**
 * Updates everything that depends on the selection: bar texts, preview, squares and start button.
 */
function updateSettingsView(): void {
  updateBar();
  updatePreview();
  updateProgress();
}

/**
 * Writes the current selection into the bar, or the placeholder if a group is not chosen.
 */
function updateBar(): void {
  setBarText('theme', state.theme ? THEME_LABELS[state.theme] : null);
  setBarText('player', state.player ? PLAYER_LABELS[state.player] : null);
  setBarText('boardSize', state.boardSize ? `Board-${state.boardSize} Cards` : null);
}

/**
 * Sets the text of one bar entry.
 * @param name - Settings group.
 * @param text - Text to show, or null for the placeholder.
 */
function setBarText(name: SettingName, text: string | null): void {
  const entry = document.getElementById(BAR_IDS[name]) as HTMLElement;
  entry.textContent = text ?? BAR_PLACEHOLDERS[name];
}

/**
 * Shows the preview image of the chosen theme.
 */
function updatePreview(): void {
  const preview = document.getElementById('settings-preview') as HTMLImageElement;
  preview.src = `${IMG_PATH}previews/${state.theme ?? DEFAULT_PREVIEW}.png`;
}

/**
 * Shows one square per chosen group and enables the start button once all groups are chosen.
 */
function updateProgress(): void {
  const count = countSelections();
  document.querySelectorAll('.settings__divider').forEach((divider, index) => {
    divider.classList.toggle('settings__divider--active', index < count);
  });
  const startButton = document.querySelector('.button--start') as HTMLButtonElement;
  startButton.disabled = count < SETTINGS_COUNT;
}

/**
 * Counts how many settings groups are chosen.
 * @returns Number between 0 and SETTINGS_COUNT.
 */
function countSelections(): number {
  return [state.theme, state.player, state.boardSize].filter((value) => value !== null).length;
}
