import tk from "terminal-kit";
import Map from "./map.js";
import Cell, { EmptyCell, FloorCell } from "./cell.js";
import TileType from "./tileType.js";
import Player from "./player.js";
import Game from "./game.js";
import Vector2 from "./utils/vector2.js";

const { terminal } = tk;

terminal.windowTitle("Test Title");
export function terminate() {
  terminal.fullscreen(false);
  terminal.hideCursor(false);
  terminal.grabInput(false);

  setTimeout(() => {
    terminal.moveTo(1, terminal.height, "\n\n");
    process.exit();
  }, 100);
}

const map = new Map(20, 20, {
  [new Vector2(1, 1).toString()]: EmptyCell().reveal(),
  [new Vector2(2, 1).toString()]: EmptyCell().reveal(),
  [new Vector2(3, 1).toString()]: EmptyCell().reveal(),
  [new Vector2(1, 2).toString()]: EmptyCell().reveal(),
  [new Vector2(2, 2).toString()]: FloorCell().reveal(),
  [new Vector2(3, 2).toString()]: EmptyCell().reveal(),
  [new Vector2(1, 3).toString()]: EmptyCell().reveal(),
  [new Vector2(2, 3).toString()]: EmptyCell().reveal(),
  [new Vector2(3, 3).toString()]: EmptyCell().reveal(),
});

const player = new Player(new Vector2(2, 2));

const game = new Game(map, player);

function init(callback: () => void) {
  terminal.hideCursor(true);
  terminal.grabInput(true);
  terminal.on("key", game.handleInput.bind(game));

  callback();
}

init(game.tick.bind(game));
