/**
 * HTML template for the exit dialog.
 */

/**
 * Returns the exit dialog "Are you sure you want to quit the game?".
 * @returns HTML string of the dialog.
 */
export function getExitDialogTemplate(): string {
  return `
    <dialog class="popup" id="exit-dialog" aria-labelledby="exit-question">
      <p class="popup__question" id="exit-question">Are you sure you want to quit the game?</p>
      <div class="popup__buttons">
        <button class="popup__button popup__button--back" id="back-to-game" type="button">Back to game</button>
        <button class="popup__button popup__button--exit" id="confirm-exit" type="button">Exit game</button>
      </div>
    </dialog>
  `;
}
