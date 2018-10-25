import { GridArray, GridPersistanceTemplate } from './grid-array';

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

    it('has a start and finish node', () => {
      expect(testGridArray.startingNode).toEqual(0);
      expect(testGridArray.finishingNode).toEqual(100);
    });

    it('start and finish nodes are distinct', () => {
      expect(testGridArray.startingNode).not.toEqual(testGridArray.finishingNode);
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

  describe('initializeGrid', () => {
    it('creates a new grid array from a json string', () => {
      // use a special 3x3 box for this so the math is easy
      testGridArray = new GridArray(3, 3);
      const gridToLoad = new GridPersistanceTemplate(3, 3, 'x--\n-x-\n--x');
      testGridArray.initializeGrid(gridToLoad);
      expect(testGridArray.grid[0]).toEqual('blocked 0');
      expect(testGridArray.grid[1]).toEqual('filled 1');
      expect(testGridArray.grid[2]).toEqual('filled 2');
      expect(testGridArray.grid[3]).toEqual('filled 3');
      expect(testGridArray.grid[4]).toEqual('blocked 4');
      expect(testGridArray.grid[5]).toEqual('filled 5');
      expect(testGridArray.grid[6]).toEqual('filled 6');
      expect(testGridArray.grid[7]).toEqual('filled 7');
      expect(testGridArray.grid[8]).toEqual('blocked 8');
    });

    it('creates a different new grid array from a json string', () => {
      // use a special 3x3 box for this so the math is easy
      testGridArray = new GridArray(3, 3);
      const gridToLoad = new GridPersistanceTemplate(3, 3, 'xx-\n-xx\n-xx');
      testGridArray.initializeGrid(gridToLoad);
      expect(testGridArray.grid[0]).toEqual('blocked 0');
      expect(testGridArray.grid[1]).toEqual('blocked 1');
      expect(testGridArray.grid[2]).toEqual('filled 2');
      expect(testGridArray.grid[3]).toEqual('filled 3');
      expect(testGridArray.grid[4]).toEqual('blocked 4');
      expect(testGridArray.grid[5]).toEqual('blocked 5');
      expect(testGridArray.grid[6]).toEqual('filled 6');
      expect(testGridArray.grid[7]).toEqual('blocked 7');
      expect(testGridArray.grid[8]).toEqual('blocked 8');
    });
  });

  describe('findPath', () => {
    /*
    s-----x-xx
    xxxx-x---x
    ---x-x-x-x
    -x---x-x-x
    -xxxxx-x-x
    -x-----x-x
    ---xxxxx-x
    x-xxx----x
    ------xxxx
    x-xxx----f
    */
    const testLayout = 's-----x-xx\nxxxx-x---x\n---x-x-x-x\n-x---x-x-x\n-xxxxx-x-x\n-x-----x-x\n---xxxxx-x\nx-xxx----x\n------xxxx\nx-xxx----f';
    it('finds the shortest path through the grid array', () => {
      testGridArray = new GridArray(10, 10);
      const gridToLoad = new GridPersistanceTemplate(10, 10, testLayout);
      testGridArray.initializeGrid(gridToLoad);

    });
  });

});