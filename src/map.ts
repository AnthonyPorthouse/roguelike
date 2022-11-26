import Cell, { EmptyCell } from "./cell.js";
import Vector2 from "./utils/vector2.js";
import TileType from "./tileType.js";
import WallTiles from "./assets/WallTiles.js";

export default class Map {
  public readonly width: number;
  public readonly height: number;
  public cells: {
    [key: string]: Cell;
  };
  constructor(width: number, height: number, cells: { [key: string]: Cell }) {
    this.width = width;
    this.height = height;

    this.cells = {};

    for (const y of Array(height).keys()) {
      for (const x of Array(width).keys()) {
        const point = new Vector2(x, y).toString();
        if (cells[point]) {
          this.cells[point] = cells[point];
        }
      }
    }

    for (const coord of Object.keys(this.cells)) {
      this.calculateWallSprite(Vector2.fromCoords(coord));
    }
  }

  getCell(position: Vector2) {
    if (position.toString() in this.cells) {
      return this.cells[position.toString()];
    }

    return EmptyCell();
  }

  public digCell(position: Vector2) {
    const cell = this.getCell(position);
    this.cells[position.toString()] = cell.dig();

    for (let cellPos of position.getSurrounding()) {
      const sCell = this.getCell(cellPos);
      sCell.reveal();

      if (sCell.getType() === TileType.WALL) {
        sCell.setSprite(this.calculateWallSprite(cellPos));
      }

      this.cells[cellPos.toString()] = sCell;
    }
  }

  private calculateWallSprite(cellPos: Vector2) {
    const up = this.getCell(cellPos.add(Vector2.UP()));
    const down = this.getCell(cellPos.add(Vector2.DOWN()));
    const left = this.getCell(cellPos.add(Vector2.LEFT()));
    const right = this.getCell(cellPos.add(Vector2.RIGHT()));

    const topLeft = this.getCell(cellPos.add(Vector2.UP()).add(Vector2.LEFT()));
    const topRight = this.getCell(
      cellPos.add(Vector2.UP()).add(Vector2.RIGHT())
    );
    const bottomLeft = this.getCell(
      cellPos.add(Vector2.DOWN()).add(Vector2.LEFT())
    );
    const bottomRight = this.getCell(
      cellPos.add(Vector2.DOWN()).add(Vector2.RIGHT())
    );

    const isUpFloor = up.getType() === TileType.FLOOR;
    const isDownFloor = down.getType() === TileType.FLOOR;
    const isLeftFloor = left.getType() === TileType.FLOOR;
    const isRightFloor = right.getType() === TileType.FLOOR;
    const isTLFloor = topLeft.getType() === TileType.FLOOR;
    const isTRFloor = topRight.getType() === TileType.FLOOR;
    const isBLFloor = bottomLeft.getType() === TileType.FLOOR;
    const isBRFloor = bottomRight.getType() === TileType.FLOOR;

    // all
    // isTLFloor && isUpFloor && isTRFloor && isLeftFloor && isRightFloor && isBLFloor && isDownFloor && isBRFloor

    // No surrounding Walls
    if (
      isTLFloor &&
      isUpFloor &&
      isTRFloor &&
      isLeftFloor &&
      isRightFloor &&
      isBLFloor &&
      isDownFloor &&
      isBRFloor
    )
      return WallTiles.COLUMN;

    // Opposite Diagonals or all corners
    if (
      isTLFloor &&
      !isUpFloor &&
      !isTRFloor &&
      !isLeftFloor &&
      !isRightFloor &&
      !isBLFloor &&
      !isDownFloor &&
      isBRFloor
    )
      return WallTiles.CROSS;
    if (
      !isTLFloor &&
      !isUpFloor &&
      isTRFloor &&
      !isLeftFloor &&
      !isRightFloor &&
      isBLFloor &&
      !isDownFloor &&
      !isBRFloor
    )
      return WallTiles.CROSS;
    if (
      isTLFloor &&
      !isUpFloor &&
      isTRFloor &&
      !isLeftFloor &&
      !isRightFloor &&
      isBLFloor &&
      !isDownFloor &&
      isBRFloor
    )
      return WallTiles.CROSS;

    // Inside Corners
    if (
      isTLFloor &&
      !isUpFloor &&
      !isTRFloor &&
      !isLeftFloor &&
      !isRightFloor &&
      !isBLFloor &&
      !isDownFloor &&
      !isBRFloor
    )
      return WallTiles.DOWN_LEFT;
    if (
      !isTLFloor &&
      !isUpFloor &&
      isTRFloor &&
      !isLeftFloor &&
      !isRightFloor &&
      !isBLFloor &&
      !isDownFloor &&
      !isBRFloor
    )
      return WallTiles.DOWN_RIGHT;
    if (
      !isTLFloor &&
      !isUpFloor &&
      !isTRFloor &&
      !isLeftFloor &&
      !isRightFloor &&
      isBLFloor &&
      !isDownFloor &&
      !isBRFloor
    )
      return WallTiles.UP_LEFT;
    if (
      !isTLFloor &&
      !isUpFloor &&
      !isTRFloor &&
      !isLeftFloor &&
      !isRightFloor &&
      !isBLFloor &&
      !isDownFloor &&
      isBRFloor
    )
      return WallTiles.UP_RIGHT;

    // Only wall in one cardinal direction
    if (
      isTLFloor &&
      isUpFloor &&
      isTRFloor &&
      isLeftFloor &&
      isRightFloor &&
      !isDownFloor
    )
      return WallTiles.DOWN;
    if (
      !isUpFloor &&
      isLeftFloor &&
      isRightFloor &&
      isBLFloor &&
      isDownFloor &&
      isBRFloor
    )
      return WallTiles.UP;
    if (
      isUpFloor &&
      isTRFloor &&
      !isLeftFloor &&
      isRightFloor &&
      isDownFloor &&
      isBRFloor
    )
      return WallTiles.LEFT;
    if (
      isTLFloor &&
      isUpFloor &&
      isLeftFloor &&
      !isRightFloor &&
      isBLFloor &&
      isDownFloor
    )
      return WallTiles.RIGHT;

    // Walls protruding
    if (
      isTLFloor &&
      isTRFloor &&
      !isUpFloor &&
      up.isRevealed() &&
      !isLeftFloor &&
      !isRightFloor
    )
      return WallTiles.HORIZONTAL_UP;
    if (
      isBLFloor &&
      isBRFloor &&
      !isDownFloor &&
      down.isRevealed() &&
      !isLeftFloor &&
      !isRightFloor
    )
      return WallTiles.HORIZONTAL_DOWN;
    if (
      isTLFloor &&
      isBLFloor &&
      !isLeftFloor &&
      left.isRevealed() &&
      !isUpFloor &&
      !isDownFloor
    )
      return WallTiles.VERTICAL_LEFT;
    if (
      isTRFloor &&
      isBRFloor &&
      !isRightFloor &&
      right.isRevealed() &&
      !isUpFloor &&
      !isDownFloor
    )
      return WallTiles.VERTICAL_RIGHT;

    if (
      !isUpFloor &&
      up.isRevealed() &&
      isDownFloor &&
      !isRightFloor &&
      !isLeftFloor
    )
      return WallTiles.HORIZONTAL_UP;
    if (
      isUpFloor &&
      !isDownFloor &&
      down.isRevealed() &&
      !isRightFloor &&
      !isLeftFloor
    )
      return WallTiles.HORIZONTAL_DOWN;
    if (
      !isUpFloor &&
      !isDownFloor &&
      isRightFloor &&
      !isLeftFloor &&
      left.isRevealed()
    )
      return WallTiles.VERTICAL_LEFT;
    if (
      !isUpFloor &&
      !isDownFloor &&
      !isRightFloor &&
      right.isRevealed() &&
      isLeftFloor
    )
      return WallTiles.VERTICAL_RIGHT;

    // Outside Corners
    if (isUpFloor && isTRFloor && isRightFloor) return WallTiles.UP_LEFT;
    if (isTLFloor && isUpFloor && isLeftFloor) return WallTiles.UP_RIGHT;
    if (isRightFloor && isDownFloor && isBRFloor) return WallTiles.DOWN_LEFT;
    if (isLeftFloor && isBLFloor && isDownFloor) return WallTiles.DOWN_RIGHT;

    // Horizontal / Vertical
    if (isLeftFloor || (isRightFloor && !isUpFloor && !isDownFloor))
      return WallTiles.VERTICAL;
    if (isUpFloor || (isDownFloor && !isLeftFloor && !isRightFloor))
      return WallTiles.HORIZONTAL;

    return "?";
  }
}
