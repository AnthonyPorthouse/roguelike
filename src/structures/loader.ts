import Cell from "../cell.js";
import * as fs from "fs";
import Parser from "./parser.js";

export default class Loader {
  private structures: {[key: string]: Cell}[] = []
  private parser: Parser

  constructor(structureDirectory: string) {
    this.parser = new Parser()
    this.loadStructuresFromDirectory(structureDirectory)
  }

  private loadStructuresFromDirectory(structureDirectory: string) {
    const files = fs.readdirSync(structureDirectory)
    for (const file of files) {
      const path = `${structureDirectory}/${file}`

      const blueprint = fs.readFileSync(path, { encoding: 'utf-8'})
      this.structures.push(this.parser.parse(blueprint))
    }
  }

  public getStructures() {
    return this.structures
  }
}
