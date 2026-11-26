/**
 * HTML template of the home page.
 */

import { IMG_PATH } from '../constants';

/**
 * Returns the HTML of the home page (US1).
 * @returns HTML string for the main container.
 */
export function getHomeTemplate(): string {
  return `
    <section class="home">
      <div class="container home__content">
        <hgroup class="home__titles">
          <p class="home__subline">It's play time.</p>
          <h1 class="home__headline">Ready to play?</h1>
        </hgroup>
        <button class="button button--play" id="play-button" type="button">
          <img class="button__icon" src="${IMG_PATH}icons/controller.svg" alt="">
          Play
          <svg class="button__arrow" viewBox="0 0 40 30" aria-hidden="true">
          <path d="M2 15 H35 M26 6 L35 15 L26 24" />
          </svg>
        </button>
      </div>
      <img class="home__controller" src="${IMG_PATH}illustrations/controller-large.svg" alt="">
    </section>
  `;
}
