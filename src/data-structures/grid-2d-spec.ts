import { Grid2D, Grid2DCell } from "./grid-2d";

describe('Grid2D', () => {
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

    it('cannot accept rows or column values less than 1', () => {
      expect(() => { testGrid.initializeGrid(0, 1) }).toThrow(new Error('Row (0) and Column (1) values must be greater than 0.'));
      expect(() => { testGrid.initializeGrid(1, 0) }).toThrow(new Error('Row (1) and Column (0) values must be greater than 0.'));
      expect(() => { testGrid.initializeGrid(0, 0) }).toThrow(new Error('Row (0) and Column (0) values must be greater than 0.'));
    });
  });

  describe('loadGrid', () => {
    it('loads a maze from a string', () => {
      testGrid.loadGrid(sampleGrid);
      expect(testGrid.grid[0].cellType).toEqual('start', 'Index 0');
      expect(testGrid.grid[1].cellType).toEqual('open', 'Index 1');
      expect(testGrid.grid[2].cellType).toEqual('open', 'Index 2');
      expect(testGrid.grid[3].cellType).toEqual('blocked', 'Index 3');
      expect(testGrid.grid[4].cellType).toEqual('open', 'Index 4');
      expect(testGrid.grid[5].cellType).toEqual('open', 'Index 5');
      expect(testGrid.grid[6].cellType).toEqual('blocked', 'Index 6');
      expect(testGrid.grid[7].cellType).toEqual('open', 'Index 7');
      expect(testGrid.grid[8].cellType).toEqual('blocked', 'Index 8');
      expect(testGrid.grid[9].cellType).toEqual('open', 'Index 9');
      expect(testGrid.grid[10].cellType).toEqual('open', 'Index 10');
      expect(testGrid.grid[11].cellType).toEqual('open', 'Index 11');
      expect(testGrid.grid[12].cellType).toEqual('open', 'Index 12');
      expect(testGrid.grid[13].cellType).toEqual('open', 'Index 13');
      expect(testGrid.grid[14].cellType).toEqual('open', 'Index 14');
      expect(testGrid.grid[15].cellType).toEqual('blocked', 'Index 15');
      expect(testGrid.grid[16].cellType).toEqual('open', 'Index 16');
      expect(testGrid.grid[17].cellType).toEqual('blocked', 'Index 17');
      expect(testGrid.grid[18].cellType).toEqual('blocked', 'Index 18');
      expect(testGrid.grid[19].cellType).toEqual('blocked', 'Index 19');
      expect(testGrid.grid[20].cellType).toEqual('open', 'Index 20');
      expect(testGrid.grid[21].cellType).toEqual('open', 'Index 21');
      expect(testGrid.grid[22].cellType).toEqual('open', 'Index 22');
      expect(testGrid.grid[23].cellType).toEqual('open', 'Index 23');
      expect(testGrid.grid[24].cellType).toEqual('finish', 'Index 24');
    });

    it('loads a more complex maze from a string', () => {
      // oooxx
      // oxooo
      // oosxo
      // oxxoo
      // ooofx
      let sampleGrid = 'oooxx\noxooo\noosxo\noxxoo\nooofx';

      testGrid.loadGrid(sampleGrid);
      expect(testGrid.grid[0].cellType).toEqual('open', 'Index 0');
      expect(testGrid.grid[1].cellType).toEqual('open', 'Index 1');
      expect(testGrid.grid[2].cellType).toEqual('open', 'Index 2');
      expect(testGrid.grid[3].cellType).toEqual('blocked', 'Index 3');
      expect(testGrid.grid[4].cellType).toEqual('blocked', 'Index 4');
      expect(testGrid.grid[5].cellType).toEqual('open', 'Index 5');
      expect(testGrid.grid[6].cellType).toEqual('blocked', 'Index 6');
      expect(testGrid.grid[7].cellType).toEqual('open', 'Index 7');
      expect(testGrid.grid[8].cellType).toEqual('open', 'Index 8');
      expect(testGrid.grid[9].cellType).toEqual('open', 'Index 9');
      expect(testGrid.grid[10].cellType).toEqual('open', 'Index 10');
      expect(testGrid.grid[11].cellType).toEqual('open', 'Index 11');
      expect(testGrid.grid[12].cellType).toEqual('start', 'Index 12');
      expect(testGrid.grid[13].cellType).toEqual('blocked', 'Index 13');
      expect(testGrid.grid[14].cellType).toEqual('open', 'Index 14');
      expect(testGrid.grid[15].cellType).toEqual('open', 'Index 15');
      expect(testGrid.grid[16].cellType).toEqual('blocked', 'Index 16');
      expect(testGrid.grid[17].cellType).toEqual('blocked', 'Index 17');
      expect(testGrid.grid[18].cellType).toEqual('open', 'Index 18');
      expect(testGrid.grid[19].cellType).toEqual('open', 'Index 19');
      expect(testGrid.grid[20].cellType).toEqual('open', 'Index 20');
      expect(testGrid.grid[21].cellType).toEqual('open', 'Index 21');
      expect(testGrid.grid[22].cellType).toEqual('open', 'Index 22');
      expect(testGrid.grid[23].cellType).toEqual('finish', 'Index 23');
      expect(testGrid.grid[24].cellType).toEqual('blocked', 'Index 24');
    });
  });

  describe('connectGridCells', () => {
    it('connects adjacent grid cells in the order North, West, East, South', () => {
      testGrid.connectGridCells();
      // row one
      expect(testGrid.grid[0].connectedCells).toEqual([testGrid.grid[1], testGrid.grid[5]]);
      expect(testGrid.grid[1].connectedCells).toEqual([testGrid.grid[0], testGrid.grid[2], testGrid.grid[6]]);
      expect(testGrid.grid[2].connectedCells).toEqual([testGrid.grid[1], testGrid.grid[3], testGrid.grid[7]]);
      expect(testGrid.grid[3].connectedCells).toEqual([testGrid.grid[2], testGrid.grid[4], testGrid.grid[8]]);
      expect(testGrid.grid[4].connectedCells).toEqual([testGrid.grid[3], testGrid.grid[9]]);
      // row two
      expect(testGrid.grid[5].connectedCells).toEqual([testGrid.grid[0], testGrid.grid[6], testGrid.grid[10]]);
      expect(testGrid.grid[6].connectedCells).toEqual([testGrid.grid[1], testGrid.grid[5], testGrid.grid[7], testGrid.grid[11]]);
      expect(testGrid.grid[7].connectedCells).toEqual([testGrid.grid[2], testGrid.grid[6], testGrid.grid[8], testGrid.grid[12]]);
      expect(testGrid.grid[8].connectedCells).toEqual([testGrid.grid[3], testGrid.grid[7], testGrid.grid[9], testGrid.grid[13]]);
      expect(testGrid.grid[9].connectedCells).toEqual([testGrid.grid[4], testGrid.grid[8], testGrid.grid[14]]);
      // row three
      expect(testGrid.grid[10].connectedCells).toEqual([testGrid.grid[5], testGrid.grid[11], testGrid.grid[15]]);
      expect(testGrid.grid[11].connectedCells).toEqual([testGrid.grid[6], testGrid.grid[10], testGrid.grid[12], testGrid.grid[16]]);
      expect(testGrid.grid[12].connectedCells).toEqual([testGrid.grid[7], testGrid.grid[11], testGrid.grid[13], testGrid.grid[17]]);
      expect(testGrid.grid[13].connectedCells).toEqual([testGrid.grid[8], testGrid.grid[12], testGrid.grid[14], testGrid.grid[18]]);
      expect(testGrid.grid[14].connectedCells).toEqual([testGrid.grid[9], testGrid.grid[13], testGrid.grid[19]]);
      // // row four
      expect(testGrid.grid[15].connectedCells).toEqual([testGrid.grid[10], testGrid.grid[16], testGrid.grid[20]]);
      expect(testGrid.grid[16].connectedCells).toEqual([testGrid.grid[11], testGrid.grid[15], testGrid.grid[17], testGrid.grid[21]]);
      expect(testGrid.grid[17].connectedCells).toEqual([testGrid.grid[12], testGrid.grid[16], testGrid.grid[18], testGrid.grid[22]]);
      expect(testGrid.grid[18].connectedCells).toEqual([testGrid.grid[13], testGrid.grid[17], testGrid.grid[19], testGrid.grid[23]]);
      expect(testGrid.grid[19].connectedCells).toEqual([testGrid.grid[14], testGrid.grid[18], testGrid.grid[24]]);
      // // row five
      expect(testGrid.grid[20].connectedCells).toEqual([testGrid.grid[15], testGrid.grid[21]]);
      expect(testGrid.grid[21].connectedCells).toEqual([testGrid.grid[16], testGrid.grid[20], testGrid.grid[22]]);
      expect(testGrid.grid[22].connectedCells).toEqual([testGrid.grid[17], testGrid.grid[21], testGrid.grid[23]]);
      expect(testGrid.grid[23].connectedCells).toEqual([testGrid.grid[18], testGrid.grid[22], testGrid.grid[24]]);
      expect(testGrid.grid[24].connectedCells).toEqual([testGrid.grid[19], testGrid.grid[23]]);
    });
  });

  fdescribe('Pathfinding', () => {
    it('knows the best option to take out of a list', () => {
      const cell0 = new Grid2DCell(0, 'blocked');
      const cell1 = new Grid2DCell(1, 'blocked');
      const cell2 = new Grid2DCell(2, 'blocked');
      const expectedBestOption = new Grid2DCell(3, 'open');
      const cell4 = new Grid2DCell(4, 'blocked');
      const cell5 = new Grid2DCell(5, 'blocked');
      const cell6 = new Grid2DCell(6, 'blocked');
      const openCells = [cell0, cell1, cell2, expectedBestOption, cell4, cell5, cell6]
      const actualBestOption = testGrid.getBestCellOption(openCells);
      expect(actualBestOption).toEqual(expectedBestOption);
    });

    it('shows the heuristic cost estimate (straight path to target)', () => {
      let expectedEstimate = 5;
      let actualEstimate = testGrid.heuristicCostEstimate(testGrid.grid[1], testGrid.grid[14]);
      expect(actualEstimate).toEqual(expectedEstimate);
    });

    it('shows the heuristic cost estimate for an upside down path', () => {
      let expectedEstimate = 5;
      let actualEstimate = testGrid.heuristicCostEstimate(testGrid.grid[21], testGrid.grid[14]);
      expect(actualEstimate).toEqual(expectedEstimate);

    });
    it('shows the heuristic cost estimate for an equilateral path', () => {
      let expectedEstimate = 4.242640687119285;
      let actualEstimate = testGrid.heuristicCostEstimate(testGrid.grid[10], testGrid.grid[22]);
      expect(actualEstimate).toEqual(expectedEstimate);
    });

    it('finds a path between two cells', () => {
      testGrid.loadGrid(sampleGrid);
      testGrid.connectGridCells();
      const expectedPath: Grid2DCell[] = [testGrid.grid[24], testGrid.grid[23], testGrid.grid[22], testGrid.grid[21], testGrid.grid[16], testGrid.grid[11], testGrid.grid[10], testGrid.grid[5], testGrid.grid[0]];
      const actualPath = testGrid.aStar(testGrid.startingPoint, testGrid.finishingPoint);
      expect(actualPath).toEqual(expectedPath);
    });

    it('finds a path between two other cells', () => {
      testGrid.loadGrid(sampleGrid);
      testGrid.connectGridCells();
      const expectedPath: Grid2DCell[] = [testGrid.grid[21], testGrid.grid[16], testGrid.grid[11], testGrid.grid[10], testGrid.grid[5], testGrid.grid[0]];
      const actualPath = testGrid.aStar(testGrid.startingPoint, testGrid.grid[21]);
      expect(actualPath).toEqual(expectedPath);
    });
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