/**
 * Types for the game: Theme, Player, BoardSize, Card, GameState.
 */

/** Player color. */
export type Player = 'blue' | 'orange';

/** Name of a color theme, matches the folder in public/img/themes and the data-theme value. */
export type Theme = 'code-vibes' | 'gaming' | 'da-projects' | 'food';

/** Number of cards on the board. */
export type BoardSize = 16 | 24 | 36;

/** A single memory card. */
export interface Card {
  /** Unique id, differs for the two cards of a pair. */
  id: number;
  /** Image number (1–18), equal for the two cards of a pair. */
  motif: number;
  /** True while the card shows its front. */
  isFlipped: boolean;
  /** True once the pair has been found. */
  isMatched: boolean;
}

/** Everything the game needs to remember. */
export interface GameState {
  /** Selected theme, null until chosen in the settings. */
  theme: Theme | null;
  /** Player who starts, null until chosen in the settings. */
  player: Player | null;
  /** Selected board size, null until chosen in the settings. */
  boardSize: BoardSize | null;
  /** Player whose turn it is. */
  currentPlayer: Player;
  /** Found pairs per player. */
  scores: Record<Player, number>;
  /** All cards on the board. */
  cards: Card[];
  /** Cards that are currently face up, at most two. */
  flippedCards: Card[];
  /** Blocks clicks while two cards are being compared. */
  lockBoard: boolean;
}
