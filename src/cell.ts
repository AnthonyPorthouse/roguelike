import TileType from "./tileType.js";

export default class Cell {
  public passable: boolean;
  public diggable: boolean;
  private revealed: boolean = false;

  private opaque: boolean;

  private sprite?: string;
  private type: TileType;

  constructor(
    passable: boolean,
    diggable: boolean,
    opaque: boolean = true,
    type: TileType
  ) {
    this.passable = passable;
    this.diggable = diggable;
    this.opaque = opaque;
    this.type = type;
  }

  public dig() {
    if (this.diggable) {
      this.passable = true;
      this.diggable = false;
      this.type = TileType.FLOOR;
      this.sprite = TileType.FLOOR;
    }

    return this;
  }

  public reveal() {
    this.revealed = true;

    return this;
  }

  public isRevealed() {
    return this.revealed;
  }

  public getType() {
    return this.type;
  }

  public getTile() {
    if (!this.revealed) {
      return TileType.UNKNOWN;
    }

    return this.type;
  }

  public setSprite(sprite: string) {
    this.sprite = sprite;
  }

  public getSprite() {
    if (this.sprite) {
      return this.sprite;
    }

    return this.type;
  }
}

export const WallCell = () => new Cell(false, true, true, TileType.WALL);

export const FloorCell = () => new Cell(true, false, false, TileType.FLOOR);
