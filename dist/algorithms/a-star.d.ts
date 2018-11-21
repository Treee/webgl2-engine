import { Grid2DCell } from '../data-structures/grid-2d-cell';
export declare class AStar {
    constructor();
    findPath(startingCell: Grid2DCell, destinationCell: Grid2DCell, totalRows: number, totalCols: number, isDebugMode?: boolean): Grid2DCell[] | {
        path: Grid2DCell[];
        gScore: Map<any, any>;
        fScore: Map<any, any>;
    } | undefined;
    getBestCellOption(openCells: Grid2DCell[]): Grid2DCell;
    heuristicCostEstimate(from: Grid2DCell, to: Grid2DCell, totalRows: number, totalCols: number): number;
    reconstructPath(cameFrom: Map<Grid2DCell, any>, current: Grid2DCell): Grid2DCell[];
    everythingAStar(reconstructedPath: Grid2DCell[], gScore: Map<any, any>, fScore: Map<any, any>): {
        path: Grid2DCell[];
        gScore: Map<any, any>;
        fScore: Map<any, any>;
    };
}
