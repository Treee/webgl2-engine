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

  describe('cell types', () => {
    it('has a starting cell', () => {
      testGridCell.setCellType('start');
      expect(testGridCell.cellType).toEqual('start');
    });
    it('has a finishing cell', () => {
      testGridCell.setCellType('finish');
      expect(testGridCell.cellType).toEqual('finish');
    });
  });
});