# Memory – Projektplan

Grundlage: Figma-Design „Memory“, Checkliste (User Stories 1–5), Coding-Konventionen HTML und TypeScript.

## Vorgaben auf einen Blick

- **HTML:** semantische Tags, sinnvolle Überschriften-Hierarchie, `alt`-Texte, Fließtext in `<p>`, keine div-Suppe, Favicon, eigene Texte statt Lorem Ipsum.
- **TypeScript:**
  - Dateinamen in kebab-case.
  - Funktionen höchstens 14 Zeilen lang, eine Aufgabe pro Funktion.
  - Semikolons, kein `any`, explizite Rückgabetypen.
  - Benennung: camelCase für Funktionen, PascalCase für Typen und Interfaces, UPPER_CASE für Konstanten.
  - 2 Leerzeichen Einrückung, TSDoc an jeder Funktion.
  - Keine Magic Numbers, HTML in Templates auslagern.
- **Fonts:** Google Fonts nur lokal einbinden. Erledigt: Die Dateien liegen in `public/fonts`, die `@font-face`-Regeln in `src/styles/base/_fonts.scss`.
- **Widescreen:** Breakpoint bei 1440px. Die Content-Fläche bleibt gleich breit und zentriert, der Hintergrund geht über die volle Breite. Auf der Winner-Seite ab 1440px den langen Konfettistreifen verwenden.
- **Settings:** Pro Einstellung ist nur eine Option wählbar. Die gewählte Option wird animiert hervorgehoben, Hover-Animation ist gern auch bei Player und Board Size.

## Was im Design steckt

| Screen | Inhalt |
|---|---|
| Home | „It's play time.“ / „Ready to play?“, Play-Button (Controller-Icon kippt beim Hover), großer Controller unten links als Deko (gedreht −37°, 5 % Deckkraft) |
| Settings | Game themes (4), Choose player (Blue/Orange), Board size (16/24/36), Vorschau-Bild je Theme, Leiste „Game theme / Player / Board size“ + Start |
| Spielfeld | Punktestand Blue/Orange, „Current player“, „Exit game“ → Popup „Are you sure you want to quit the game?“ (Back to game / Exit game) |
| Game over | „Game over“ + Final score, wechselt nach **1200ms** automatisch zu Winner oder Draw |
| Winner / Draw | Konfetti, „The winner is … PLAYER“ mit Spielfigur (Gaming: Pokal), Draw mit Waage, „Back to start“ |

## Schriften (lokal)

| Theme | Überschriften | Text |
|---|---|---|
| Home, Settings, Code vibes | Red Rose 700 (h1 140px, Settings 54px) | Almarai 400/700 (48px, 24px, 20px) |
| Gaming | Orbitron 700 | Orbitron |
| DA Projects | Figtree 700/800 | Figtree |
| Foods | Kite One | Delius Unicase 700 |

Die Theme-Farben stehen als CSS-Variablen in `src/styles/themes/`. Werte mit `TODO` stammen nur aus einem Screenshot: Bitte in Figma nachprüfen (Element anklicken → rechts unter *Colors*).

## Assets (`public/`)

```
public/
├─ favicon.svg
├─ fonts/                      8 woff2-Dateien
└─ img/
   ├─ themes/<theme>/          card-01.svg … card-18.svg + card-back.svg
   │                           (code-vibes, gaming, da-projects, food)
   ├─ previews/<theme>.png     Vorschau-Bild für die Settings-Seite
   ├─ icons/                   controller, palette, pawn, cards, start, player-tag, exit
   └─ illustrations/           controller-large, confetti, confetti-long, pawn, scale, trophy.png
```

**Wichtig wegen `base: "/memory-game/"` in `vite.config.ts`:**
- Pfade in HTML und SCSS (`/img/...`, `/fonts/...`) ergänzt Vite beim Build automatisch.
- In TypeScript-Templates nicht. Dort den Pfad so bauen: `` `${import.meta.env.BASE_URL}img/themes/${theme}/card-01.svg` ``.

Die Icons haben feste Farben aus dem Code-vibes-Design. Für andere Themes einfärben geht so:
- Icon per `mask-image` einbinden und mit `background-color: var(--color-primary)` füllen.
- Oder das SVG inline ins Template setzen und `fill="currentColor"` verwenden.

## Architektur

- Eine `index.html` mit `<main id="app">`. Jeder Screen ist eine Render-Funktion, die ein Template einsetzt.
- Ein State-Objekt hält Theme, Spieler, Brettgröße, Punkte, aktuellen Spieler und die aufgedeckten Karten.
- Das Theme kommt per `document.body.dataset.theme = 'gaming'` an den Body. Dadurch wechseln Farben und Schriften über die CSS-Variablen, und die Kartenbilder über den Pfad.

```
src/
├─ main.ts
├─ ts/
│  ├─ types.ts  constants.ts  state.ts
│  ├─ navigation.ts  settings.ts  game-logic.ts
│  └─ templates/  home-, settings-, game-, result-, popup-template.ts
└─ styles/
   ├─ style.scss                 nur @use
   ├─ abstracts/  _variables _functions(px-to-rem) _mixins(widescreen, flex-center) _index
   ├─ base/       _fonts _reset _typography
   ├─ themes/     _code-vibes _gaming _da-projects _food
   ├─ components/ _button _card _radio _scoreboard _popup
   └─ pages/      _home _settings _game _result
```

## Phasen

- [x] **Phase 0 – Vorbereitung:** Assets exportiert, Fonts lokal, Farben und Schriften notiert, Favicon, Ordnerstruktur.
- [x] **Phase 1 – SCSS-Grundgerüst:** Variablen, Reset, Layout-Container, Mixins (widescreen, tablet, mobile), Themes mit vollständiger Farbliste.
- [x] **Phase 2 – US1 Home:** semantisches HTML, Play-Button → Settings, Controller-Icon im Button kippt beim Hover, Pfeil wächst.
- [x] **Phase 3 – Typen, State, Navigation:** `type Theme`, `type BoardSize = 16 | 24 | 36`, `interface GameState`, `render…()`-Funktionen.
- [x] **Phase 4 – US2 + US3 Settings:**
  - Drei `<fieldset>` mit `<legend>` und Radiobuttons.
  - Bei `change`: State setzen, Vorschau-Bild tauschen, Leiste aktualisieren, Auswahl animieren.
  - Start erst aktiv, wenn alles gewählt ist.
  - Bewusste Abweichung vom Design: Überschrift „Choose starting player“ statt „Choose player“, weil die Auswahl festlegt, wer beginnt. Im README erwähnen.
- [ ] **Phase 5 – US4 Spielfeld:**
  - Beim Start: `state.currentPlayer = state.player` (der gewählte Spieler beginnt).
  - Karten erzeugen: `boardSize / 2` Motive nehmen, verdoppeln, mit Fisher-Yates mischen.
  - Grid: 4×4, 6×4 oder 6×6.
  - Klick → Karte umdrehen → Paar prüfen. Bei Treffer Punkt und der Spieler ist nochmal dran, sonst nach `FLIP_DELAY` zurückdrehen und Spieler wechseln.
  - `lockBoard` verhindert, dass während der Verzögerung eine dritte Karte umgedreht wird.
  - Kopfzeile aktualisieren, Exit-Popup als `<dialog>`.
- [ ] **Phase 6 – US5 Spielende:**
  - Game over mit Endstand, nach `GAME_OVER_DELAY` (1200ms) Winner oder Draw zeigen.
  - „Back to start“ setzt den State zurück.
- [ ] **Phase 7 – Widescreen und Responsive:** Breakpoint 1440px, langes Konfetti.
- [ ] **Phase 8 – Abgabe:** Konventionen prüfen, Checkliste abhaken, Extras im README nennen (z. B. 4 Themes, Hover-Animationen).

## Tipps

- Ein Theme komplett fertig bauen, dann erst das nächste.
- Zuerst mit 16 Karten testen.
- Pro Phase einmal committen.
