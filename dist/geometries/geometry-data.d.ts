export declare class GeometryData {
    isNormalized: boolean;
    size: number;
    dataType: number;
    drawMode: number;
    stride: number;
    offset: number;
    count: number;
    constructor();
    setData(dataType: number, drawMode: number, isNormalized: boolean, size: number, stride: number, offset: number, count: number): void;
}
