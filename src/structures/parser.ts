import Cell, { FloorCell, WallCell } from "../cell.js";
import Vector2 from "../utils/vector2.js";

export default class Parser {
  public parse(blueprint: string) {
    const cells: {[key:string]: Cell} = {}

    blueprint.split('\n').forEach((row, y) => {
      row.split('').forEach((char, x) => {
        if (char === ' ') {
          cells[new Vector2(x, y).toString()] = FloorCell()
        }
      })
    })

    return cells
  }
}
