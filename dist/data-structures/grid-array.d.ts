export declare class GridPersistanceTemplate {
    rows: number;
    columns: number;
    layout: string;
    constructor(rows: number, columns: number, layout: string);
    getRawLayout(): string;
}
export declare class GridArray {
    rows: number;
    columns: number;
    grid: any[];
    startingNode: number;
    finishingNode: number;
    constructor(rows?: number, columns?: number, startingNode?: number, finishingNode?: number);
    initializeGrid(predefinedLayout?: GridPersistanceTemplate): void;
    blockNode(row: number, column: number): void;
    getNode(row: number, column: number): string;
    initializeGridFromJson(storedDataString: string): void;
}
