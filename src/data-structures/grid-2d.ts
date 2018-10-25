export class Grid2DCell {

  cellType: string;
  gridIndex: number;

  constructor(index: number = -1, cellType: string = 'blocked') {
    this.cellType = cellType;
    this.gridIndex = index;
  }
  // cell types blocked, start, finish, open
  public setCellType(type: string) {
    this.cellType = type;
  }

}

export class Grid2D {

  grid: Grid2DCell[];
  startingPoint: Grid2DCell;
  finishingPoint: Grid2DCell;

  constructor() {
    this.grid = [];
    this.startingPoint = new Grid2DCell();
    this.finishingPoint = new Grid2DCell();
  }

  initializeGrid(rows: number, cols: number) {
    const totalCells = rows * cols;
    for (let cellNumber = 0; cellNumber < totalCells; cellNumber++) {
      let newCell = new Grid2DCell(cellNumber);
      this.grid.push(newCell);
    }
    this.startingPoint = this.grid[0];
    console.log(this.startingPoint);
    this.startingPoint.setCellType('start');
    this.finishingPoint = this.grid[totalCells - 1];
    this.finishingPoint.setCellType('finish');
  }

}