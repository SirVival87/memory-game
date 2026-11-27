/**
 * Entry point: loads the styles and starts the app.
 */

import './styles/style.scss';
import { renderHome } from './ts/navigation';

init();

/**
 * Starts the app and renders the home page.
 */
function init(): void {
  renderHome();
}
