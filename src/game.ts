import Map from "./map.js";
import Player from "./player.js";
import { terminate } from "./index.js";
import Screen from "./screen.js";
import Vector2 from "./utils/vector2.js";

export default class Game {
  private screen: Screen;
  public map: Map;
  public player: Player;

  constructor(map: Map, player: Player) {
    this.map = map;
    this.player = player;
    this.screen = new Screen();
  }

  public tick() {
    this.screen.redraw(this.map, this.player);

    setTimeout(this.tick.bind(this), 16);
  }

  private movePlayer(direction: Vector2) {
    const map = this.map;
    const player = this.player;

    const nextCellPos = player.position.add(direction);
    const nextCell = map.getCell(nextCellPos);

    if (nextCell.diggable) {
      this.map.digCell(nextCellPos);
      this.screen.writeMessage(`Dug ${nextCellPos}`);
      return;
    }

    this.screen.writeMessage(`Moved to ${nextCellPos}`);
    this.player.move(direction);
  }

  public handleInput(key: string) {
    switch (key) {
      case "q":
      case "CTRL_C":
        terminate();
        break;
      case "UP":
        this.movePlayer(new Vector2(0, -1));
        break;
      case "DOWN":
        this.movePlayer(new Vector2(0, 1));
        break;
      case "LEFT":
        this.movePlayer(new Vector2(-1, 0));
        break;
      case "RIGHT":
        this.movePlayer(new Vector2(1, 0));
        break;
    }
  }
}
