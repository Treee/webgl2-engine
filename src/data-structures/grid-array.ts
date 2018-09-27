export class GridArray {

  rows: number;
  columns: number;
  grid: any[];
  constructor(rows = 10, columns = 10) {
    this.rows = rows;
    this.columns = columns;
    this.grid = [];
  }

  initializeGrid(predefinedLayout?: string): void {
    const gridSize = this.rows * this.columns;

    let gridToLoad = predefinedLayout ? predefinedLayout.replace(/\r?\n/g, '') : '';
    if (gridToLoad !== '') {
      console.assert(gridToLoad.length === gridSize, 'Attempting to upload a grid that does not have the same number of grid cells as the grid');
    }
    for (let index = 0; index < gridSize; index++) {
      if (gridToLoad) {
        // console.log(`grid cell ${index}: ${gridToLoad[index]}`);
        if (gridToLoad[index] === 'x') {
          this.grid.push(`blocked ${index}`);
        } else if (gridToLoad[index] === '-') {
          this.grid.push(`filled ${index}`);
        }
      } else {
        this.grid.push('filled');
      }
    }
  }

  blockNode(row: number, column: number): void {
    const index = (this.rows * row) + column;
    this.grid[index] = 'blocked';
  }

  getNode(row: number, column: number): string {
    const index = (this.rows * row) + column;
    return this.grid[index];
  }

  loadGridFromJson(storedDataString: string): GridArray {
    const storedData = JSON.parse(storedDataString);
    const newGrid = new GridArray(storedData.rows, storedData.columns);
    newGrid.initializeGrid(storedData.layout);

    return newGrid;
  }
}