import _ from 'lodash';

/**
 * List of players
 * @type {Number}
 */
const __players = ['yellow', 'red'];

/**
 * Retrieve a column from a bidimensional grid
 * @param  {Array}  grid  
 * @param  {Number} col    
 * @return {Array}
 */
function retrieveColumn(grid, col) {
  let column = [];

  for (let row in grid) {
    column.push(grid[row][col]);
  }

  return column;
}

/**
 * Find en empty cell index in a column
 * @param  {Array}  column 
 * @return {Number}        
 */
function findEmptyCellIndex(column) {
  let empty = -1;

  _.each(column, (row, index) => {
    if (row === 0) {
      empty = index;
    }
  });

  return empty;
}

/**
 * Check recursively if a disc at a position has 3 siblings
 * in a certain direction
 * @param  {Array}  grid      
 * @param  {Object} pos       
 * @param  {String} disc    
 * @param  {Array}  direction 
 * @return {Boolean}
 */
function matchConnect(grid, pos, disc, direction) {
  let count = 0;
  let row = pos.row, col = pos.col;

  let checkSibling = (x, y) => {
    row = row + x;
    col = col + y;

    let sibling = grid[row] ? grid[row][col] : undefined;

    if (sibling && sibling === disc) {
      count++;
      checkSibling(x, y);
    }
  };

  checkSibling(...direction);

  return (count === 3);
}

/**
 * Connect4 class
 */
export default class Connect4 {
  constructor() {
    /**
     * Grid
     * @type {Array}
     */
    this.grid = [
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0]
    ];

    this.nbCells = _.flatten(this.grid).length;
    /**
     * Number of discs on the grid
     * @type {Number}
     */
    this.nbDiscs = 0;
    /**
     * Current player
     * @type {String}
     */
    this.currentPlayer = 'yellow';
    /**
     * Gameover
     * @type {Boolean}
     */
    this.isOver = false;
    /**
     * Winner
     * @type {String}
     */
    this.winner = null;
  }
  /**
   * Add a disc on the grid
   * @param {Object} pos (x, y)
   */
  addDisc(pos) {
      // retrieve the column
      let column = retrieveColumn(this.grid, pos.y);
      let emptyIndex = findEmptyCellIndex(column);   

      // no cell available
      if (emptyIndex === -1) return;

      // determine disc position
      let discPos = { row: emptyIndex, col: pos.y };

      // affect 
      this.grid[discPos.row][discPos.col] = this.currentPlayer;

      // check for a winner
      if (this.areFourConnected(discPos)) {
        this.isOver = true;
        this.winner = this.currentPlayer;
        return;
      }
      
      // get next player
      this.currentPlayer = __players[++this.nbDiscs % 2];

      // if grid full, game over
      if (this.nbDiscs === this.nbCells) {
        this.isOver = true;
      }
  }
  /**
   * Check if 4 are connected
   * @param  {Object} pos
   * @return {Boolean} 
   */
  areFourConnected(pos) {
    let areFourConnected = false;

    // check in all 8 directions for a connect 4
    _([
      [ 0,  1], // E
      [ 0, -1], // W
      [ 1,  0], // N
      [-1,  0], // S
      [-1,  1], // SE
      [-1, -1], // SW
      [ 1, -1], // NW
      [ 1,  1]  // NE
    ]).each((direction) => {
      if (matchConnect(this.grid, pos, this.currentPlayer, direction)) {
        areFourConnected = true;
        return;
      }
    });

    return areFourConnected;
  } 
}