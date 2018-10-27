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
    const totalCells = rows * cols;
    for (let cellNumber = 0; cellNumber < totalCells; cellNumber++) {
      let newCell = new Grid2DCell(cellNumber);
      this.grid.push(newCell);
    }
    this.startingPoint = this.grid[0];
    this.startingPoint.setCellType('start');
    this.finishingPoint = this.grid[totalCells - 1];
    this.finishingPoint.setCellType('finish');
  }

  public loadGrid(newGrid: string) {
    this.initializeGrid(this.gridRows, this.gridCols);
    console.log(newGrid.split('\n'));
  }

}