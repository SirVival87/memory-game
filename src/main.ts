import './styles/style.scss';
import { getHomeTemplate } from './ts/templates/home-template';

const APP = document.getElementById('app');

init();

/**
 * Starts the app and renders the home page.
 */
function init(): void {
  renderHome();
}

/**
 * Inserts the home page template into the main container.
 */
function renderHome(): void {
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
    playButton.addEventListener('click', () => {
      console.log('Play button clicked'); //hier muss die funktion rein, aktuell nur log
    });
  }
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