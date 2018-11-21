"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const grid_2d_cell_1 = require("./grid-2d-cell");
const core_1 = require("../core/core");
class Grid2D {
    constructor() {
        this.grid = [];
        this.gridRows = 0;
        this.gridCols = 0;
        this.totalCells = 0;
    }
    loadGrid(newGrid) {
        this.initializeGrid(this.gridRows, this.gridCols);
        newGrid.replace(/\r?\n/g, '').split('').forEach((cell, cellIndex) => {
            this.grid[cellIndex].setCellType(this.mapCellType(cell));
        });
    }
    initializeGrid(rows, cols) {
        if (rows < 1 || cols < 1) {
            throw new Error(`Row (${rows}) and Column (${cols}) values must be greater than 0.`);
        }
        this.grid = [];
        this.gridRows = rows;
        this.gridCols = cols;
        this.totalCells = rows * cols;
        for (let cellNumber = 0; cellNumber < this.totalCells; cellNumber++) {
            let newCell = new grid_2d_cell_1.Grid2DCell(cellNumber);
            this.grid.push(newCell);
        }
    }
    connectGridCells() {
        const totalCells = this.gridRows * this.gridCols;
        for (let cellNumber = 0; cellNumber < totalCells; cellNumber++) {
            let connectedCells = [];
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
    indexWithinLimits(index) {
        return (index > -1 && index < this.totalCells);
    }
    mapCellType(cellMapping) {
        let cellTypeMapping = '';
        let found = core_1.CoreMod["data-structures"]["grid-2d-cells"].find((cell) => {
            return cell.typeMap === cellMapping;
        });
        if (found) {
            cellTypeMapping = found.type;
        }
        return cellTypeMapping;
    }
}
exports.Grid2D = Grid2D;
//# sourceMappingURL=grid-2d.js.map