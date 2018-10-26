import { Grid2D, Grid2DCell } from "./grid-2d";

describe('Grid2D', () => {
  let testGrid: Grid2D;

  let gridRows: number = 5;
  let gridCols: number = 5;

  let sampleMaze = 'sooxo\noxoxo\nooooo\nxoxxx\noooof';
  // sooxo
  // oxoxo 
  // ooooo 
  // xoxxx 
  // oooof

  beforeEach(() => {
    testGrid = new Grid2D();
    testGrid.initializeGrid(gridRows, gridCols);
  });

  describe('initialization', () => {
    it('has a size rows * cols', () => {
      expect(testGrid.grid.length).toEqual(gridRows * gridCols);
    });

    it('has at least one starting point', () => {
      let expectedStartingPoint = new Grid2DCell(0, 'start');
      expect(testGrid.startingPoint).toEqual(expectedStartingPoint);
      expect(testGrid.startingPoint.gridIndex).toEqual(0);
    });

    it('has at least one finishing point', () => {
      let expectedFinishingPoint = new Grid2DCell(24, 'finish');
      expect(testGrid.finishingPoint).toEqual(expectedFinishingPoint);
      expect(testGrid.finishingPoint.gridIndex).toEqual(24);
    });
  });

  describe('loadMaze', () => {

  });
});

describe('Grid2DCell', () => {
  let testGridCell: Grid2DCell;

  beforeEach(() => {
    testGridCell = new Grid2DCell();
  });

  describe('initilization', () => {
    it('starts as an impasasble block', () => {
      expect(testGridCell.cellType).toEqual('blocked');
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
});