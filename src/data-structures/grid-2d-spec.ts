import { Grid2D } from "./grid-2d";

describe('Grid2D', () => {
  let testGrid: Grid2D;

  let gridRows: number = 5;
  let gridCols: number = 5;

  let sampleGrid = 'ooobo\nobobo\nooooo\nbobbb\nooooo';
  // ooobo
  // obobo 
  // ooooo 
  // bobbb 
  // ooooo

  beforeEach(() => {
    testGrid = new Grid2D();
    testGrid.initializeGrid(gridRows, gridCols);
  });

  describe('initialization', () => {
    it('has a size rows * cols', () => {
      expect(testGrid.grid.length).toEqual(gridRows * gridCols);
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
      expect(testGrid.grid[0].cellType).toEqual('open', 'Index 0');
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
      expect(testGrid.grid[24].cellType).toEqual('open', 'Index 24');
    });

    it('loads a more complex maze from a string', () => {
      // ooobb
      // obooo
      // ooobo
      // obboo
      // oooob
      let sampleGrid = 'ooobb\nobooo\nooobo\nobboo\noooob';

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
      expect(testGrid.grid[12].cellType).toEqual('open', 'Index 12'); // start
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
      expect(testGrid.grid[23].cellType).toEqual('open', 'Index 23');
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

  describe('serializeGrid', () => {
    it('serializes the grid array, number of rows and cols', () => {
      const expectedGridString = sampleGrid;
      const expectedGridRows = gridRows;
      const expectedGridCols = gridCols;
      testGrid.loadGrid(sampleGrid);
      const actualSerializedGrid = testGrid.serializeGrid();
      expect(actualSerializedGrid.gridString).toEqual(expectedGridString);
      expect(actualSerializedGrid.gridRows).toEqual(expectedGridRows);
      expect(actualSerializedGrid.gridCols).toEqual(expectedGridCols);
    });
  });
});