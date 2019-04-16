"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GridPersistanceTemplate {
    constructor(rows, columns, layout) {
        this.rows = 0;
        this.columns = 0;
        this.layout = '';
        this.rows = rows;
        this.columns = columns;
        this.layout = layout;
    }
    getRawLayout() {
        return this.layout.replace(/\r?\n/g, '');
    }
}
exports.GridPersistanceTemplate = GridPersistanceTemplate;
class GridArray {
    constructor(rows = 10, columns = 10, startingNode = 0, finishingNode = (rows * columns)) {
        this.rows = rows;
        this.columns = columns;
        this.grid = [];
        this.startingNode = startingNode;
        this.finishingNode = finishingNode;
    }
    initializeGrid(predefinedLayout) {
        const gridSize = this.rows * this.columns;
        if (predefinedLayout) {
            console.assert(predefinedLayout.getRawLayout().length === gridSize, `Attempting to upload a grid: ${predefinedLayout.layout} with ${predefinedLayout.getRawLayout().length} cells. Expecting ${gridSize}.`);
        }
        for (let index = 0; index < gridSize; index++) {
            if (predefinedLayout) {
                // console.log(`grid cell ${index}: ${gridToLoad[index]}`);
                if (predefinedLayout.getRawLayout()[index] === 'x') {
                    this.grid.push(`blocked ${index}`);
                }
                else if (predefinedLayout.getRawLayout()[index] === 's') {
                    this.grid.push(`start ${index}`);
                }
                else if (predefinedLayout.getRawLayout()[index] === 'f') {
                    this.grid.push(`finish ${index}`);
                }
                else if (predefinedLayout.getRawLayout()[index] === '-') {
                    this.grid.push(`filled ${index}`);
                }
            }
            else {
                this.grid.push('filled');
            }
        }
    }
    blockNode(row, column) {
        const index = (this.rows * row) + column;
        this.grid[index] = 'blocked';
    }
    getNode(row, column) {
        const index = (this.rows * row) + column;
        return this.grid[index];
    }
    initializeGridFromJson(storedDataString) {
        const storedData = JSON.parse(storedDataString);
        const newGrid = new GridArray(storedData.rows, storedData.columns);
        this.initializeGrid(storedData.layout);
    }
}
exports.GridArray = GridArray;
//# sourceMappingURL=grid-array.js.map