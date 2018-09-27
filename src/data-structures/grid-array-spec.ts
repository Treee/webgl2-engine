import { GridArray } from './grid-array';

describe('Grid Array', () => {
  let testGridArray: GridArray;

  beforeEach(() => {
    testGridArray = new GridArray();
    // default private values
    expect(testGridArray.rows).toEqual(10);
    expect(testGridArray.columns).toEqual(10);
    expect(testGridArray.grid).toEqual([]);
  });

  describe('initialization', () => {
    it('sets the rows and columns to passed in values', () => {
      testGridArray = new GridArray(5, 9);
      expect(testGridArray.rows).toEqual(5);
      expect(testGridArray.columns).toEqual(9);
    });
  });

  describe('initializeGrid', () => {
    it('fills the grid with nodes', () => {
      testGridArray.initializeGrid();
      testGridArray.grid.forEach(node => {
        expect(node).toEqual('filled');
      });
      expect(testGridArray.grid.length).toEqual(testGridArray.rows * testGridArray.columns);
    });
  });

  describe('getNodeByRowColumn', () => {
    it('returns the correct node based on row and column input', () => {
      // use a special 3x3 box for this so the math is easy
      testGridArray = new GridArray(3, 3);
      const row = 1;
      const column = 2;
      const expectedNode = testGridArray.grid[5];
      const returnedNode = testGridArray.getNode(row, column);
      expect(returnedNode).toEqual(expectedNode);
    });
  });

  describe('blockNode', () => {
    it('fills the node with the text blocked', () => {
      // use a special 3x3 box for this so the math is easy
      testGridArray = new GridArray(3, 3);
      const row = 1;
      const column = 2;
      testGridArray.blockNode(row, column);
      expect(testGridArray.grid[5]).toEqual('blocked');
    });
  });

  describe('loadGridFromJson', () => {
    it('creates a new grid array from a json string', () => {
      // use a special 3x3 box for this so the math is easy
      testGridArray = new GridArray(3, 3);
      const gridToLoad = {
        rows: 3,
        columns: 3,
        layout: 'x--\n-x-\n--x'
      };
      const newGrid = testGridArray.loadGridFromJson(JSON.stringify(gridToLoad));
      expect(newGrid.grid[0]).toEqual('blocked 0');
      expect(newGrid.grid[1]).toEqual('filled 1');
      expect(newGrid.grid[2]).toEqual('filled 2');
      expect(newGrid.grid[3]).toEqual('filled 3');
      expect(newGrid.grid[4]).toEqual('blocked 4');
      expect(newGrid.grid[5]).toEqual('filled 5');
      expect(newGrid.grid[6]).toEqual('filled 6');
      expect(newGrid.grid[7]).toEqual('filled 7');
      expect(newGrid.grid[8]).toEqual('blocked 8');
    });
  });

});