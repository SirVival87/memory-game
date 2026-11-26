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

// const fieldRef = document.getElementById('field');
//     if(fieldRef){
//         fieldRef.addEventListener('click', (e: Event) => {
//             const card = (e.target as HTMLElement).closest('.card') as HTMLButtonElement;
//             if(card){
//                 card.classList.toggle("is-flipped");
//             }
//         });
//     }