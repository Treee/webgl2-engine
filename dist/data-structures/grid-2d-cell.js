"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../core/core");
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
        let weight = 10000000; // a very large number since there is no movement weight associated with this block
        const foundCell = core_1.CoreMod["data-structures"]["grid-2d-cells"].find((cell) => {
            return cell.type === this.cellType;
        });
        if (foundCell) {
            weight = foundCell["movement-weight"];
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
//# sourceMappingURL=grid-2d-cell.js.map