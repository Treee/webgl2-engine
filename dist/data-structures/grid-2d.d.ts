export declare class Grid2DCell {
    cellType: string;
    gridIndex: number;
    connectedCells: Grid2DCell[];
    constructor(index?: number, cellType?: string);
    setCellType(type: string): void;
    connectCells(cells: Grid2DCell[]): void;
    getMovementWeight(): number;
    connectionExists(cellIndex: number): boolean;
}
export declare class Grid2D {
    grid: Grid2DCell[];
    startingPoint: Grid2DCell;
    finishingPoint: Grid2DCell;
    gridRows: number;
    gridCols: number;
    totalCells: number;
    constructor();
    initializeGrid(rows: number, cols: number): void;
    loadGrid(newGrid: string): void;
    connectGridCells(): void;
    aStar(startingCell: Grid2DCell, finishingCell: Grid2DCell): Grid2DCell[] | undefined;
    getBestCellOption(openCells: Grid2DCell[]): Grid2DCell;
    reconstructPath(cameFrom: Map<Grid2DCell, any>, current: Grid2DCell): Grid2DCell[];
    heuristicCostEstimate(from: Grid2DCell, to: Grid2DCell): number;
    indexWithinLimits(index: number): boolean;
    mapCellType(cellType: string): string;
}
