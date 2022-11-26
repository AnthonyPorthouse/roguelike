import Vector2 from "./utils/vector2.js";

export default class Player {
  position: Vector2;

  public readonly icon: string = "o";

  constructor(position: Vector2) {
    this.position = position;
  }

  move(direction: Vector2) {
    this.position = this.position.add(direction);
  }
}
