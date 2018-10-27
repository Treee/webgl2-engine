export class Grid2DCell {

  cellType: string;
  gridIndex: number;

  connectedCells: Grid2DCell[];

  constructor(index: number = -1, cellType: string = 'blocked') {
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

  connectionExists(cellIndex: number): boolean {
    return this.connectedCells.filter((cell) => {
      return cell.gridIndex === cellIndex;
    }).length > 0;
  }

}

export class Grid2D {

  grid: Grid2DCell[] = [];
  startingPoint: Grid2DCell = new Grid2DCell();
  finishingPoint: Grid2DCell = new Grid2DCell();

  gridRows: number = 0;
  gridCols: number = 0;
  totalCells: number = 0;

  constructor() {
  }

  public initializeGrid(rows: number, cols: number) {
    if (rows < 1 || cols < 1) {
      throw new Error(`Row (${rows}) and Column (${cols}) values must be greater than 0.`);
    }
    this.grid = [];
    this.startingPoint = new Grid2DCell();
    this.finishingPoint = new Grid2DCell();
    this.gridRows = rows;
    this.gridCols = cols;
    this.totalCells = rows * cols;
    for (let cellNumber = 0; cellNumber < this.totalCells; cellNumber++) {
      let newCell = new Grid2DCell(cellNumber);
      this.grid.push(newCell);
    }
    this.startingPoint = this.grid[0];
    this.startingPoint.setCellType('start');
    this.finishingPoint = this.grid[this.totalCells - 1];
    this.finishingPoint.setCellType('finish');
  }

  public loadGrid(newGrid: string) {
    this.initializeGrid(this.gridRows, this.gridCols);
    newGrid.replace(/\r?\n/g, '').split('').forEach((cell, cellIndex) => {
      this.grid[cellIndex].setCellType(this.mapCellType(cell));
    });
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

  mapCellType(cellType: string): string {
    let cellTypeMapping = '';
    switch (cellType) {
      case 's':
        cellTypeMapping = 'start';
        break;
      case 'f':
        cellTypeMapping = 'finish';
        break;
      case 'o':
        cellTypeMapping = 'open';
        break;
      case 'x':
        cellTypeMapping = 'blocked';
        break;
    }
    return cellTypeMapping;
  }
}