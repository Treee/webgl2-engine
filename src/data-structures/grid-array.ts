export class GridPersistanceTemplate {
  rows: number = 0;
  columns: number = 0;
  layout: string = '';
  constructor(rows: number, columns: number, layout: string) {
    this.rows = rows;
    this.columns = columns;
    this.layout = layout;
  }

  getRawLayout(): string {
    return this.layout.replace(/\r?\n/g, '');
  }
}

export class GridArray {

  rows: number;
  columns: number;
  grid: any[];
  startingNode: number;
  finishingNode: number;

  constructor(rows: number = 10, columns: number = 10, startingNode: number = 0, finishingNode: number = (rows * columns)) {
    this.rows = rows;
    this.columns = columns;
    this.grid = [];
    this.startingNode = startingNode;
    this.finishingNode = finishingNode;
  }

  initializeGrid(predefinedLayout?: GridPersistanceTemplate): void {
    const gridSize = this.rows * this.columns;

    if (predefinedLayout) {
      console.assert(predefinedLayout.getRawLayout().length === gridSize, `Attempting to upload a grid: ${predefinedLayout.layout} with ${predefinedLayout.getRawLayout().length} cells. Expecting ${gridSize}.`);
    }
    for (let index = 0; index < gridSize; index++) {
      if (predefinedLayout) {
        // console.log(`grid cell ${index}: ${gridToLoad[index]}`);
        if (predefinedLayout.getRawLayout()[index] === 'x') {
          this.grid.push(`blocked ${index}`);
        } else if (predefinedLayout.getRawLayout()[index] === '-') {
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

  initializeGridFromJson(storedDataString: string): void {
    const storedData = JSON.parse(storedDataString);
    const newGrid = new GridArray(storedData.rows, storedData.columns);
    this.initializeGrid(storedData.layout);
  }
}