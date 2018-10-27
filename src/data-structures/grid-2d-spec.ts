import { Grid2D, Grid2DCell } from "./grid-2d";

fdescribe('Grid2D', () => {
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

  describe('connect grid cells', () => {
    it('', () => {

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
});