import { Grid2DCell } from "./grid-2d-cell";

describe('Grid2DCell', () => {
  let testGridCell: Grid2DCell;

  beforeEach(() => {
    testGridCell = new Grid2DCell();
  });

  describe('initilization', () => {
    it('starts as an impasasble block', () => {
      expect(testGridCell.cellType).toEqual('open');
    });
  });

  describe('linking cells', () => {
    let north: Grid2DCell, south: Grid2DCell, east: Grid2DCell, west: Grid2DCell;

    beforeEach(() => {
      testGridCell = new Grid2DCell(4, 'open')
      north = new Grid2DCell(1, 'open');
      south = new Grid2DCell(7, 'open');
      east = new Grid2DCell(5, 'open');
      west = new Grid2DCell(3, 'open');
    });

    it('can link cells together in all directions', () => {
      testGridCell.connectCells([north, south, east, west]);
      expect(testGridCell.connectedCells).toEqual([north, south, east, west]);
    });

    it('links cells bidirectionally', () => {
      testGridCell.connectCells([north, south, east, west]);
      expect(testGridCell.connectedCells).toEqual([north, south, east, west]);
      expect(north.connectedCells).toEqual([testGridCell]);
      expect(south.connectedCells).toEqual([testGridCell]);
      expect(east.connectedCells).toEqual([testGridCell]);
      expect(west.connectedCells).toEqual([testGridCell]);
    });

    it('does nnot duplicate links', () => {
      testGridCell.connectCells([north, south, east, west]);
      testGridCell.connectCells([north, south, east, west]);
      testGridCell.connectCells([north, south, east, west]);
      expect(testGridCell.connectedCells).toEqual([north, south, east, west]);
      expect(north.connectedCells).toEqual([testGridCell]);
      expect(south.connectedCells).toEqual([testGridCell]);
      expect(east.connectedCells).toEqual([testGridCell]);
      expect(west.connectedCells).toEqual([testGridCell]);
    });
  });

  describe('cell types', () => {
    it('has a starting cell', () => {
      testGridCell.setCellType('start');
      expect(testGridCell.cellType).toEqual('start');
    });
    it('has a finishing cell', () => {
      testGridCell.setCellType('finish');
      expect(testGridCell.cellType).toEqual('finish');
    });
    it('has a blocked cell', () => {
      testGridCell.setCellType('blocked');
      expect(testGridCell.cellType).toEqual('blocked');
    });
    it('has an open cell', () => {
      testGridCell.setCellType('open');
      expect(testGridCell.cellType).toEqual('open');
    });
  });

  describe('getMovementWeight', () => {

    it('returns a large value for blocked cells', () => {
      const expectedWeight = 50;
      testGridCell = new Grid2DCell(5, 'blocked');
      const actualWeight = testGridCell.getMovementWeight();
      expect(actualWeight).toEqual(expectedWeight);
    });

    it('returns 0 for starting cells', () => {
      const expectedWeight = 0;
      testGridCell = new Grid2DCell(5, 'start');
      const actualWeight = testGridCell.getMovementWeight();
      expect(actualWeight).toEqual(expectedWeight);
    });

    it('returns 0 for finishing cells', () => {
      const expectedWeight = 0;
      testGridCell = new Grid2DCell(5, 'finish');
      const actualWeight = testGridCell.getMovementWeight();
      expect(actualWeight).toEqual(expectedWeight);
    });

    it('returns 1 for standard movement cells', () => {
      const expectedWeight = 1;
      testGridCell = new Grid2DCell(5, 'open');
      const actualWeight = testGridCell.getMovementWeight();
      expect(actualWeight).toEqual(expectedWeight);
    });

  });

});