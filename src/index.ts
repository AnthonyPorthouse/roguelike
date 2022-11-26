import tk from "terminal-kit";
import Map from "./map.js";
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

const map = new Map(terminal.width, terminal.height, {});

const floorCells = Object.entries(map.getCells()).filter(([_, cell]) => {
  return cell.getType() === TileType.FLOOR
})

const [startingPoint] = floorCells[Math.floor(Math.random() * floorCells.length)]


const player = new Player(Vector2.fromCoords(startingPoint));

const game = new Game(map, player);

function init(callback: () => void) {
  terminal.hideCursor(true);
  terminal.grabInput(true);
  terminal.on("key", game.handleInput.bind(game));

  callback();
}

init(game.tick.bind(game));
