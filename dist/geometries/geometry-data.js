"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class GeometryData {
    constructor() {
    }
    setData(dataType, drawMode, isNormalized, size, stride, offset, count) {
        this.dataType = dataType;
        this.drawMode = drawMode;
        this.isNormalized = isNormalized;
        this.size = size;
        this.stride = stride;
        this.offset = offset;
        this.count = count;
    }
}
exports.GeometryData = GeometryData;
//# sourceMappingURL=geometry-data.js.map