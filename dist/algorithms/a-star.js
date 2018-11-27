"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AStar {
    constructor() {
    }
    findPath(startingCell, destinationCell, totalRows, totalCols, isDebugMode) {
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
        fScore.set(startingCell, this.heuristicCostEstimate(startingCell, destinationCell, totalRows, totalCols));
        let current;
        // while there are nodes to be looked at
        while (openSet.length > 0) {
            // console.log('``````````````````````Looooooooop begin ```````````````````````');
            // console.log(`open set is still populated`, openSet);
            // best cell in the open set to move too
            current = this.getBestCellOption(openSet);
            if (current === destinationCell) {
                console.log('finished');
                // if (isDebugMode) {
                //   return this.everythingAStar(this.reconstructPath(cameFrom, current), gScore, fScore);
                // }
                return this.reconstructPath(cameFrom, current, startingCell.gridIndex);
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
                fScore.set(connectedCell, gScore.get(connectedCell) + this.heuristicCostEstimate(connectedCell, destinationCell, totalRows, totalCols));
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
    // this is the birds eye view of distance to a target
    heuristicCostEstimate(from, to, totalRows, totalCols) {
        const fromRow = Math.trunc(from.gridIndex / totalRows);
        const fromCol = Math.trunc(from.gridIndex % totalCols);
        const toRow = Math.trunc(to.gridIndex / totalRows);
        const toCol = Math.trunc(to.gridIndex % totalCols);
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
    reconstructPath(cameFrom, current, startIndex) {
        // console.log('camefrom', cameFrom);
        let total_path = [current];
        while (cameFrom.has(current)) {
            current = cameFrom.get(current);
            total_path.push(current);
            if (current.gridIndex === startIndex) {
                break;
            }
        }
        return total_path;
    }
    everythingAStar(reconstructedPath, gScore, fScore) {
        return {
            path: reconstructedPath,
            gScore: gScore,
            fScore: fScore
        };
    }
}
exports.AStar = AStar;
//# sourceMappingURL=a-star.js.map