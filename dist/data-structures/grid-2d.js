"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Grid2DCell {
    constructor(index = -1, cellType = 'open') {
        this.cellType = cellType;
        this.gridIndex = index;
        this.connectedCells = [];
    }
    // cell types blocked, start, finish, open
    setCellType(type) {
        this.cellType = type;
    }
    connectCells(cells) {
        cells.forEach(cell => {
            if (!this.connectionExists(cell.gridIndex)) {
                this.connectedCells.push(cell);
            }
            if (!cell.connectionExists(this.gridIndex)) {
                cell.connectedCells.push(this);
            }
        });
    }
    getMovementWeight() {
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
    connectionExists(cellIndex) {
        return this.connectedCells.filter((cell) => {
            return cell.gridIndex === cellIndex;
        }).length > 0;
    }
}
exports.Grid2DCell = Grid2DCell;
class Grid2D {
    constructor() {
        this.grid = [];
        this.startingPoint = new Grid2DCell();
        this.finishingPoint = new Grid2DCell();
        this.gridRows = 0;
        this.gridCols = 0;
        this.totalCells = 0;
    }
    initializeGrid(rows, cols) {
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
    loadGrid(newGrid) {
        this.initializeGrid(this.gridRows, this.gridCols);
        newGrid.replace(/\r?\n/g, '').split('').forEach((cell, cellIndex) => {
            this.grid[cellIndex].setCellType(this.mapCellType(cell));
        });
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
    aStar(startingCell, finishingCell) {
        // The set of nodes already evaluated
        let closedSet = [];
        // The set of currently discovered nodes that are not evaluated yet.
        // Initially, only the start node is known.
        let openSet = [startingCell];
        // For each node, which node it can most efficiently be reached from.
        // If a node can be reached from many nodes, cameFrom will eventually contain the
        // most efficient previous step.
        let cameFrom = new Map();
        // For each node, the cost of getting from the start node to that node.
        let gScore = new Map();
        // The cost of going from start to start is zero.
        gScore.set(startingCell, 0);
        // For each node, the total cost of getting from the start node to the goal
        // by passing by that node. That value is partly known, partly heuristic.
        let fScore = new Map();
        // For the first node, that value is completely heuristic.
        fScore.set(startingCell, this.heuristicCostEstimate(startingCell, finishingCell));
        let current;
        // while there are nodes to be looked at
        while (openSet.length > 0) {
            // console.log('``````````````````````Looooooooop begin ```````````````````````');
            // console.log(`open set is still populated`, openSet);
            // best cell in the open set to move too
            current = this.getBestCellOption(openSet);
            if (current === finishingCell) {
                console.log('finished');
                return this.reconstructPath(cameFrom, current);
                // break;
            }
            let currentIndex = openSet.indexOf(current);
            openSet.splice(currentIndex, 1);
            closedSet.push(current);
            // for each neighbor
            current.connectedCells.forEach((connectedCell) => {
                // remove any neighbors that have already been evaluated
                if (closedSet.indexOf(connectedCell) > 0) {
                    return;
                }
                // remove any neighbors that are blocked
                if (connectedCell.cellType === 'blocked') {
                    return;
                }
                // The distance from start to a neighbor
                let tentative_gScore = gScore.get(current) + connectedCell.getMovementWeight();
                // Discover a new node
                if (openSet.indexOf(connectedCell) < 0) {
                    openSet.push(connectedCell);
                }
                else if (tentative_gScore >= gScore.get(connectedCell)) {
                    return; // This is not a better path.
                }
                // This path is the best until now. Record it!
                cameFrom.set(connectedCell, current);
                gScore.set(connectedCell, tentative_gScore);
                fScore.set(connectedCell, gScore.get(connectedCell) + this.heuristicCostEstimate(connectedCell, finishingCell));
            });
            // console.log('``````````````````````Looooooooop iteration end ```````````````````````');
        }
    }
    getBestCellOption(openCells) {
        openCells.sort((a, b) => {
            return a.getMovementWeight() - b.getMovementWeight();
        });
        return openCells[0];
    }
    reconstructPath(cameFrom, current) {
        let total_path = [current];
        while (cameFrom.has(current)) {
            current = cameFrom.get(current);
            total_path.push(current);
            if (current.cellType === 'start') {
                break;
            }
        }
        return total_path;
    }
    // this is the birds eye view of distance to a target
    heuristicCostEstimate(from, to) {
        const fromRow = Math.trunc(from.gridIndex / this.gridRows);
        const fromCol = Math.trunc(from.gridIndex % this.gridCols);
        const toRow = Math.trunc(to.gridIndex / this.gridRows);
        const toCol = Math.trunc(to.gridIndex % this.gridCols);
        // console.log(`from rows: ${fromRow}, from cols: ${fromCol}`);
        // console.log(`to rows: ${toRow}, yo cols: ${toCol}`);
        // add 1 since indicies are 0 based and pythag requires n > 0
        const computedRow = Math.abs(fromRow - toRow) + 1;
        const computedCol = Math.abs(fromCol - toCol) + 1;
        // console.log(`comp rows: ${computedRow}, comp cols: ${computedCol}`);
        // use pythagorean theorem to compute straight distance
        const distanceTo = Math.sqrt((computedRow * computedRow) + (computedCol * computedCol));
        return distanceTo;
    }
    indexWithinLimits(index) {
        return (index > -1 && index < this.totalCells);
    }
    mapCellType(cellType) {
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
exports.Grid2D = Grid2D;
//# sourceMappingURL=grid-2d.js.map