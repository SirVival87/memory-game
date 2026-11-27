/**
 * Constants instead of magic numbers, e.g. FLIP_DELAY, GAME_OVER_DELAY, BOARD_SIZES, image paths.
 */

/** Base path of the images in public/img. Respects `base` from vite.config.ts. */
export const IMG_PATH = `${import.meta.env.BASE_URL}img/`;

/** Number of settings groups (theme, player, board size) that must be chosen before the game can start. */
export const SETTINGS_COUNT = 3;
