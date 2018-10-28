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

  public getMovementWeight(): number {
    let weight = 100;
    switch (this.cellType) {
      case 'blocked':
        weight = 50;
        break;
      case 'start':
        weight = 0;
        break;
      case 'finish':
        weight = 0;
        break;
      case 'open':
        weight = 1;
        break;
    }
    return weight;
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

  // public aStar(startingCell: Grid2DCell, finishingCell: Grid2DCell) {
  //   // The set of nodes already evaluated
  //   let closedSet = [];

  //   // The set of currently discovered nodes that are not evaluated yet.
  //   // Initially, only the start node is known.
  //   let openSet = [startingCell];

  //   // For each node, which node it can most efficiently be reached from.
  //   // If a node can be reached from many nodes, cameFrom will eventually contain the
  //   // most efficient previous step.
  //   let cameFrom = new Map();

  //   // For each node, the cost of getting from the start node to that node.
  //   let gScore = new Map();

  //   // The cost of going from start to start is zero.
  //   gScore.set(startingCell, 0);

  //   // For each node, the total cost of getting from the start node to the goal
  //   // by passing by that node. That value is partly known, partly heuristic.
  //   let fScore = new Map();

  //   // For the first node, that value is completely heuristic.
  //   fScore.set(startingCell, this.heuristicCostEstimate(startingCell, finishingCell));
  //   let current: Grid2DCell;
  //   // while there are nodes to be looked at
  //   while (openSet.length > 0) {
  //     // best cell in the open set to move too
  //     current = this.getBestCellOption(openSet);
  //     if (current === finishingCell)
  //       return this.reconstructPath(cameFrom, current)

  //     openSet.Remove(current)
  //     closedSet.push(current)

  //     for each neighbor of current
  //     if neighbor in closedSet
  //           continue		// Ignore the neighbor which is already evaluated.

  //     // The distance from start to a neighbor
  //     tentative_gScore:= gScore[current] + dist_between(current, neighbor)

  //     if neighbor not in openSet	// Discover a new node
  //     openSet.Add(neighbor)
  //       else if tentative_gScore >= gScore[neighbor]
  //           continue		// This is not a better path.

  //     // This path is the best until now. Record it!
  //     cameFrom[neighbor] := current
  //     gScore[neighbor] := tentative_gScore
  //     fScore[neighbor] := gScore[neighbor] + this.heuristicCostEstimate(neighbor, finishingCell)
  //   }
  // }

  // getBestCellOption(openCells: any[]): Grid2DCell {
  //   openCells.forEach((openCell) => {

  //   });
  // }

  reconstructPath(cameFrom: Map<any, any>, current: Grid2DCell) {
    // let total_path = [current];
    // while current in cameFrom.Keys:
    //   current:= cameFrom[current]
    // total_path.append(current)
    // return total_path
  }

  heuristicCostEstimate(from: Grid2DCell, to: Grid2DCell) {

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