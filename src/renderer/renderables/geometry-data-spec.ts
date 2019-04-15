import { GeometryData } from './geometry-data';
describe('Box Geometry', () => {
  let testBoxGeometryData: GeometryData;
  let dataType: number;
  let drawMode: number;
  let isNormalized: boolean;
  let size: number; // number of items that composes a single unit
  let stride: number; // how large of a swath of vertices to we pick up this time
  let offset: number;
  let count: number; // how many individual verticies are there


  beforeEach(() => {
    dataType = 0;
    drawMode = 1;
    isNormalized = false;
    size = 2;
    stride = 0;
    offset = 0;
    count = 6;
    testBoxGeometryData = new GeometryData();
    testBoxGeometryData.setData(dataType, drawMode, isNormalized, size, stride, offset, count);
    expect(testBoxGeometryData).not.toBeNull();
  });
});