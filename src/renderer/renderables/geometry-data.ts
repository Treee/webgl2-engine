export class GeometryData {

  isNormalized!: boolean;
  size!: number; // number if items that composes a single unit
  dataType!: number; // WebGLRenderingContextBase;
  drawMode!: number; // WebGLRenderingContextBase;
  stride!: number; // how large of a swath of vertices to we pick up this time
  offset!: number;
  count!: number; // how many individual verticies are there

  constructor() {
  }

  setData(dataType: number, drawMode: number, isNormalized: boolean, size: number,
    stride: number, offset: number, count: number) {
    this.dataType = dataType;
    this.drawMode = drawMode;
    this.isNormalized = isNormalized;
    this.size = size;
    this.stride = stride;
    this.offset = offset;
    this.count = count;
  }
}