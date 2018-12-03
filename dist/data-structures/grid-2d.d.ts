import { Grid2DCell } from './grid-2d-cell';
export declare class Grid2D {
    grid: Grid2DCell[];
    gridRows: number;
    gridCols: number;
    totalCells: number;
    constructor();
    loadGrid(newGrid: string): void;
    initializeGrid(rows: number, cols: number): void;
    connectGridCells(): void;
    serializeGrid(): {
        gridString: string;
        gridRows: number;
        gridCols: number;
    };
    indexWithinLimits(index: number): boolean;
    mapCellType(cellMapping: string): string;
}
