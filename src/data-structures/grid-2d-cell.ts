import { CoreMod } from '../core/core';

export class Grid2DCell {

  cellType: string;
  gridIndex: number;

  connectedCells: Grid2DCell[];

  constructor(index: number = -1, cellType: string = 'open') {
    this.cellType = cellType;
    this.gridIndex = index;
    this.connectedCells = [];
  }
  // cell types blocked, start, finish, open
  public setCellType(type: string) {
    this.cellType = type;
  }

  public connectCells(cells: Grid2DCell[]) {
    cells.forEach(cell => {
      if (!this.connectionExists(cell.gridIndex)) {
        this.connectedCells.push(cell);
      }
      if (!cell.connectionExists(this.gridIndex)) {
        cell.connectedCells.push(this);
      }
    });
  }

  public getMovementWeight(): number {
    let weight = 10000000; // a very large number since there is no movement weight associated with this block
    const foundCell = CoreMod["data-structures"]["grid-2d-cells"].find((cell: any) => {
      return cell.type === this.cellType;
    });
    if (foundCell) {
      weight = foundCell["movement-weight"];
    }
    return weight;
  }

  serializeCell() {
    const foundCell = CoreMod["data-structures"]["grid-2d-cells"].find((cell: any) => {
      return cell.type === this.cellType;
    });
    if (!foundCell) {
      throw new Error('Unable to serialize the cell');
    }
    console.log(`found ${foundCell.type} with map ${foundCell.typeMap}`);
    return foundCell.typeMap;
  }

  connectionExists(cellIndex: number): boolean {
    return this.connectedCells.filter((cell) => {
      return cell.gridIndex === cellIndex;
    }).length > 0;
  }
}