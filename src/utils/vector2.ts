export default class Vector2 {
  public readonly x: number;
  public readonly y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public static fromCoords(point: string) {
    const vals = point.split(", ").map(Number);
    return new this(vals[0], vals[1]);
  }

  public static UP() {
    return new this(0, -1);
  }

  public static DOWN() {
    return new this(0, 1);
  }

  public static LEFT() {
    return new this(-1, 0);
  }

  public static RIGHT() {
    return new this(1, 0);
  }

  public add(other: Vector2) {
    return new Vector2(this.x + other.x, this.y + other.y);
  }

  public getSurrounding() {
    const surrounding: Vector2[] = [];

    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        if (x === 0 && y === 0) {
          continue;
        }

        surrounding.push(this.add(new Vector2(x, y)));
      }
    }

    return surrounding;
  }

  public toString() {
    return `${this.x}, ${this.y}`;
  }
}
