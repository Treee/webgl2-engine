import { AStar } from './a-star';
import { Grid2D } from '../data-structures/grid-2d';
import { Grid2DCell } from '../data-structures/grid-2d-cell';

describe('A Star', () => {
  let testAStar: AStar;
  let testGrid: Grid2D;

  let gridRows: number = 5;
  let gridCols: number = 5;

  let sampleGrid = 'sooxo\noxoxo\nooooo\nxoxxx\noooof';
  // sooxo
  // oxoxo 
  // ooooo 
  // xoxxx 
  // oooof

  beforeEach(() => {
    testAStar = new AStar();
    testGrid = new Grid2D();
    testGrid.initializeGrid(gridRows, gridCols);
  });
  
  describe('findPath', () => {
    it('finds a path between two cells', () => {
      testGrid.loadGrid(sampleGrid);
      testGrid.connectGridCells();
      const expectedPath: Grid2DCell[] = [testGrid.grid[24], testGrid.grid[23], testGrid.grid[22], testGrid.grid[21], testGrid.grid[16], testGrid.grid[11], testGrid.grid[10], testGrid.grid[5], testGrid.grid[0]];
      const actualPath = testAStar.findPath(testGrid.grid[0], testGrid.grid[(gridRows * gridCols) - 1], gridRows, gridCols);
      expect(actualPath).toEqual(expectedPath);
    });

    it('finds a path between two other cells', () => {
      testGrid.loadGrid(sampleGrid);
      testGrid.connectGridCells();
      const expectedPath: Grid2DCell[] = [testGrid.grid[21], testGrid.grid[16], testGrid.grid[11], testGrid.grid[10], testGrid.grid[5], testGrid.grid[0]];
      const actualPath = testAStar.findPath(testGrid.grid[0], testGrid.grid[21], gridRows, gridCols);
      expect(actualPath).toEqual(expectedPath);
    });
  });
  
  describe('getBestCellOption', () => {
    it('knows the best option to take out of a list', () => {
      const cell0 = new Grid2DCell(0, 'blocked');
      const cell1 = new Grid2DCell(1, 'blocked');
      const cell2 = new Grid2DCell(2, 'blocked');
      const expectedBestOption = new Grid2DCell(3, 'open');
      const cell4 = new Grid2DCell(4, 'blocked');
      const cell5 = new Grid2DCell(5, 'blocked');
      const cell6 = new Grid2DCell(6, 'blocked');
      const openCells = [cell0, cell1, cell2, expectedBestOption, cell4, cell5, cell6]
      const actualBestOption = testAStar.getBestCellOption(openCells);
      expect(actualBestOption).toEqual(expectedBestOption);
    });

  });

  describe('heuristicCostEstimate', () => {
    it('shows the heuristic cost estimate (straight path to target)', () => {
      let expectedEstimate = 5;
      let actualEstimate = testAStar.heuristicCostEstimate(testGrid.grid[1], testGrid.grid[14], gridRows, gridCols);
      expect(actualEstimate).toEqual(expectedEstimate);
    });

    it('shows the heuristic cost estimate for an upside down path', () => {
      let expectedEstimate = 5;
      let actualEstimate = testAStar.heuristicCostEstimate(testGrid.grid[21], testGrid.grid[14], gridRows, gridCols);
      expect(actualEstimate).toEqual(expectedEstimate);

    });

    it('shows the heuristic cost estimate for an equilateral path', () => {
      let expectedEstimate = 4.242640687119285;
      let actualEstimate = testAStar.heuristicCostEstimate(testGrid.grid[10], testGrid.grid[22], gridRows, gridCols);
      expect(actualEstimate).toEqual(expectedEstimate);
    });
  });

});
