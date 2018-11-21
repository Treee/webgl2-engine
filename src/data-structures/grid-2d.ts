import { Grid2DCell } from './grid-2d-cell';
import { CoreMod } from '../core/core';

export class Grid2D {

  grid: Grid2DCell[] = [];
  // startingPoint: Grid2DCell = new Grid2DCell();
  // finishingPoint: Grid2DCell = new Grid2DCell();

  gridRows: number = 0;
  gridCols: number = 0;
  totalCells: number = 0;

  constructor() {
  }

  public loadGrid(newGrid: string) {
    this.initializeGrid(this.gridRows, this.gridCols);
    newGrid.replace(/\r?\n/g, '').split('').forEach((cell, cellIndex) => {
      this.grid[cellIndex].setCellType(this.mapCellType(cell));
    });
  }

  public initializeGrid(rows: number, cols: number) {
    if (rows < 1 || cols < 1) {
      throw new Error(`Row (${rows}) and Column (${cols}) values must be greater than 0.`);
    }
    this.grid = [];
    this.gridRows = rows;
    this.gridCols = cols;
    this.totalCells = rows * cols;
    for (let cellNumber = 0; cellNumber < this.totalCells; cellNumber++) {
      let newCell = new Grid2DCell(cellNumber);
      this.grid.push(newCell);
    }
  }

  public connectGridCells() {
    const totalCells = this.gridRows * this.gridCols;
    for (let cellNumber = 0; cellNumber < totalCells; cellNumber++) {
      let connectedCells: Grid2DCell[] = [];
      // check north, south, east, west cells to add them.
      let northCellIndex = cellNumber - this.gridCols;
      let southCellIndex = cellNumber + this.gridCols;
      let eastCellIndex = cellNumber + 1;
      let westCellIndex = cellNumber - 1;

      if (this.indexWithinLimits(northCellIndex)) {
        connectedCells.push(this.grid[northCellIndex]);
      }
      if (this.indexWithinLimits(westCellIndex) && cellNumber % this.gridCols !== 0) {
        connectedCells.push(this.grid[westCellIndex]);
      }
      if (this.indexWithinLimits(eastCellIndex) && cellNumber % this.gridCols !== (this.gridCols - 1)) {
        connectedCells.push(this.grid[eastCellIndex]);
      }
      if (this.indexWithinLimits(southCellIndex)) {
        connectedCells.push(this.grid[southCellIndex]);
      }

      this.grid[cellNumber].connectCells(connectedCells);
    }
  }

  indexWithinLimits(index: number): boolean {
    return (index > -1 && index < this.totalCells)
  }

  mapCellType(cellMapping: string): string {
    let cellTypeMapping = '';
    let found = CoreMod["data-structures"]["grid-2d-cells"].find((cell) => {
      return cell.typeMap === cellMapping;
    });
    if (found) {
      cellTypeMapping = found.type;
    }
    return cellTypeMapping;
  }
}