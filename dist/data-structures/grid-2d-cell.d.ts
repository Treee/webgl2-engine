export declare class Grid2DCell {
    cellType: string;
    gridIndex: number;
    connectedCells: Grid2DCell[];
    constructor(index?: number, cellType?: string);
    setCellType(type: string): void;
    connectCells(cells: Grid2DCell[]): void;
    getMovementWeight(): number;
    serializeCell(): string;
    connectionExists(cellIndex: number): boolean;
}
