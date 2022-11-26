import Map from "./map.js";
import Player from "./player.js";
import tk from "terminal-kit";
import Vector2 from "./utils/vector2.js";
const { terminal, ScreenBuffer } = tk;

export default class Screen {
  buffer: tk.ScreenBuffer;

  mapBuffer: tk.ScreenBuffer;
  playerBuffer: tk.ScreenBuffer;

  messageBuffer: tk.ScreenBuffer;

  constructor() {
    const buffer = new ScreenBuffer({
      dst: terminal,
    });
    buffer.fill({
      attr: {},
    });

    this.buffer = buffer;

    this.mapBuffer = new ScreenBuffer({
      dst: this.buffer,
      blending: true,
    });
    this.playerBuffer = new ScreenBuffer({
      dst: this.buffer,
      blending: true,
    });
    this.messageBuffer = new ScreenBuffer({
      dst: this.buffer,
      blending: true,
      width: this.buffer.width,
    });
  }

  writeMessage(message: string) {
    this.messageBuffer.fill();
    this.messageBuffer.put(
      {
        x: 0,
        y: this.buffer.height - 1,
        attr: {},
        wrap: true,
        dx: 1,
        dy: 0,
      },
      message
    );
  }

  redraw(map: Map, player: Player) {
    this.mapBuffer.clear();
    for (const [point, cell] of Object.entries(map.cells)) {
      const pos = Vector2.fromCoords(point);

      this.mapBuffer.put(
        {
          x: pos.x,
          y: pos.y,
          attr: {},
          dx: 0,
          dy: 0,
          direction: null,
          wrap: false,
        },
        cell.getSprite()
      );
    }

    this.mapBuffer.draw();

    this.playerBuffer.clear();
    this.playerBuffer.put(
      {
        x: player.position.x,
        y: player.position.y,
        attr: {},
        dx: 0,
        dy: 0,
        direction: null,
        wrap: false,
      },
      player.icon
    );

    this.playerBuffer.draw();

    this.messageBuffer.draw();

    this.buffer.draw({ delta: true });
  }
}
