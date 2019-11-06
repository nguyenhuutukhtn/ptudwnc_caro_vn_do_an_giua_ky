import React, { Component } from 'react';
import './Game.css';
import './Board.css';

import Utils from './Utils';
import * as calculate from './CalculateWinner';
import Board from './Board';
import Moves from './Moves';
import PlusMinus from './UserControl';

class OfflineBoard extends React.Component {
  constructor() {
    super();
    this.state = {
      history: [
        {
          squares: Array(Math.pow(Utils.column, 2)).fill(null),
          squares2Direct: Array(Utils.column)
            .fill(0)
            .map(() => Array(Utils.column).fill(0))
        }
      ],

      clickAt: ['Game Start'],
      stepNumber: 0,
      xIsNext: true,
      buttonState: true,
      bestMove: { row: 0, col: 0 },
      noOfPiece: 0
    };
    this.alphabeta = this.alphabeta.bind(this);
    this.cval = this.cval.bind(this);
    this.isWin = this.isWin.bind(this);
    this.computerPlay = this.computerPlay.bind(this);
  }

  cval() {
    // evaluate the
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[this.state.stepNumber];
    const squares = current.squares.slice();
    const squares2Direct = current.squares2Direct.slice();
    var cval_value = 0;
    var val = function(XO) {
      var mArray = []; //Match [^1][01][01][01][01][01]0
      var value = 0;
      var count = 0; // count the number of pieces
      var regexp =
        XO == 1 ? /[^1][01][01][01][01][01]0/g : /[^2][02][02][02][02][02]0/g;
      var regexp2 =
        XO == 1 ? /0[01][01][01][01][01][^1]/g : /0[02][02][02][02][02][^2]/g;
      var regexp3 = XO == 1 ? /1/g : /2/g;
      mArray = valStr.match(regexp).concat(valStr.match(regexp2));
      var x;
      for (x in mArray) {
        count = (mArray[x].match(regexp3) || []).length; //number of XO;
        switch (count) {
          case 5:
            value += 100000000;
            break;
          case 4:
            value += 1000;
            break;
          case 3:
            value += 10;
            break;
          case 2:
            value += 1;
            break;
        }
      }
      return value;
    };
    // horizontally eval (col +-)
    var valStr = ''; //1:X, 2: O, 0: Empty or Out of Board, 3: concat two line
    for (var i = 0; i < Utils.column; i++) {
      valStr += '0' + squares2Direct[i].join('') + '03';
    }

    // vertically eval (row +-)
    //1:X, 2: O, 0: Empty or Out of Board, 3: concat two line
    for (var j = 0; j < Utils.column; j++) {
      valStr += '0';
      for (var i = 0; i < Utils.column; i++) {
        valStr += squares2Direct[i][j];
      }
      valStr += '03';
    }
    // dia from top
    //1:X, 2: O, 0: Empty or Out of Board, 3: concat two line
    for (var k = 0; k < Utils.column; k++) {
      valStr += '0';
      i = 0;
      j = k;
      while (i < Utils.column && j < Utils.column) {
        valStr += squares2Direct[i][j];
        i++;
        j++;
      }
      valStr += '03';
    }
    for (var k = 0; k < Utils.column; k++) {
      valStr += '0';
      i = 0;
      j = k;
      while (i < Utils.column && j >= 0) {
        valStr += squares2Direct[i][j];
        i++;
        j--;
      }
      valStr += '03';
    }
    // dia from bottom
    for (var k = 0; k < Utils.column; k++) {
      valStr += '0';
      i = Utils.column - 1;
      j = k;
      while (i >= 0 && j >= 0) {
        valStr += squares2Direct[i][j];
        i--;
        j--;
      }
      valStr += '03';
    }
    for (var k = 0; k < Utils.column; k++) {
      valStr += '0';
      i = Utils.column - 1;
      j = k;
      while (i >= 0 && j < Utils.column) {
        valStr += squares2Direct[i][j];
        i--;
        j++;
      }
      valStr += '03';
    }
    cval_value = val(2) - val(1);
    return cval_value;
  }

  isWin() {
    const { noOfPiece } = this.state;
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[this.state.stepNumber];
    const squares2Direct = current.squares2Direct.slice();
    if (noOfPiece == Utils.column * Utils.column) {
      return 3; //Draw
    }
    // horizontally eval (col +-)
    var valStr = ''; //1:X, 2: O, 0: Empty or Out of Board, 3: concat two line
    // console.log(squares2Direct)
    for (var i = 0; i < Utils.column; i++) {
      valStr += '0' + squares2Direct[i].join('') + '03';
    }
    // vertically eval (row +-)
    //1:X, 2: O, 0: Empty or Out of Board, 3: concat two line
    for (var j = 0; j < Utils.column; j++) {
      valStr += '0';
      for (var i = 0; i < Utils.column; i++) {
        valStr += squares2Direct[i][j];
      }
      valStr += '03';
    }
    // dia from top
    //1:X, 2: O, 0: Empty or Out of Board, 3: concat two line
    for (var k = 0; k < Utils.column; k++) {
      valStr += '0';
      i = 0;
      j = k;
      while (i < Utils.column && j < Utils.column) {
        valStr += squares2Direct[i][j];
        i++;
        j++;
      }
      valStr += '03';
    }
    for (var k = 0; k < Utils.column; k++) {
      valStr += '0';
      i = 0;
      j = k;
      while (i < Utils.column && j >= 0) {
        valStr += squares2Direct[i][j];
        i++;
        j--;
      }
      valStr += '03';
    }
    // dia from bottom
    for (var k = 0; k < Utils.column; k++) {
      valStr += '0';
      i = Utils.column - 1;
      j = k;
      while (i >= 0 && j >= 0) {
        valStr += squares2Direct[i][j];
        i--;
        j--;
      }
      valStr += '03';
    }
    for (var k = 0; k < Utils.column; k++) {
      valStr += '0';
      i = Utils.column - 1;
      j = k;
      while (i >= 0 && j < Utils.column) {
        valStr += squares2Direct[i][j];
        i--;
        j++;
      }
      valStr += '03';
    }

    if (
      valStr.search(/[^1]111110/) != -1 ||
      valStr.search(/011111[^1]/) != -1
    ) {
      return 1;
    }
    if (
      valStr.search(/[^2]222220/) != -1 ||
      valStr.search(/022222[^2]/) != -1
    ) {
      return 2;
    }
  }

  alphabeta(XO, alpha, beta, depth) {
    const { bestMove } = this.state;
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[this.state.stepNumber];
    const squares = current.squares.slice();
    const squares2Direct = current.squares2Direct.slice();

    if (depth == 0) {
      return this.cval();
    }
    if (this.isWin() == 1) {
      return -999999999;
    }
    if (this.isWin() == 2) {
      return 999999999;
    }

    var moveGen = function(XO) {
      this.moveRow = new Array();
      this.moveCol = new Array();
      this.noOfMove = 0;
      var possi = new Array(); /* define an array storing possible position */
      for (var i = 0; i < Utils.column; i++) {
        possi[i] = new Array();
        for (var j = 0; j < Utils.column; j++) {
          possi[i][j] = false;
        }
      }
      // console.log(squares2Direct);
      for (var i = 0; i < Utils.column; i++) {
        for (var j = 0; j < Utils.column; j++) {
          if (squares2Direct[i][j] == 0 && !possi[i][j]) {
            for (var stepI = -1; stepI <= 1; stepI++) {
              for (var stepJ = -1; stepJ <= 1; stepJ++) {
                if (
                  i + stepI >= 0 &&
                  i + stepI < Utils.column &&
                  j + stepJ >= 0 &&
                  j + stepJ < Utils.column
                ) {
                  if (squares2Direct[i + stepI][j + stepJ] != 0) {
                    possi[i][j] = true;
                  }
                }
              }
            }
          }
        }
      }
      for (var i = 0; i < Utils.column; i++) {
        for (var j = 0; j < Utils.column; j++) {
          if (possi[i][j]) {
            this.noOfMove++;
            this.moveRow[this.noOfMove] = i;
            this.moveCol[this.noOfMove] = j;
          }
        }
      }
    };
    var makeMove = function(moveBoard, movePointer, XO) {
      squares2Direct[moveBoard.moveRow[movePointer]][
        moveBoard.moveCol[movePointer]
      ] = XO;
    };
    var undoMove = function(moveBoard, movePointer) {
      squares2Direct[moveBoard.moveRow[movePointer]][
        moveBoard.moveCol[movePointer]
      ] = 0;
    };
    var gen = new moveGen(XO);
    var movePointer = 1;
    var score;
    if (XO == 2) {
      //Max's Turn
      while (movePointer <= gen.noOfMove) {
        makeMove(gen, movePointer, XO);
        score = this.alphabeta(1, alpha, beta, depth - 1);
        undoMove(gen, movePointer);
        if (score > alpha) {
          // this.setState({
          //   bestMove: {
          //     row: gen.moveRow[movePointer],
          //     col: gen.moveCol[movePointer]
          //   },
          // });

          Utils.bestMove.row = gen.moveRow[movePointer];
          Utils.bestMove.column = gen.moveCol[movePointer];
          alpha = score; //(we have found a better best move)
        }
        if (alpha >= beta) {
          return alpha; //(cut off);
        }
        movePointer++;
      }
      return alpha; //best move
    } else {
      //Min's Turn
      while (movePointer <= gen.noOfMove) {
        makeMove(gen, movePointer, XO);
        score = this.alphabeta(2, alpha, beta, depth - 1);
        undoMove(gen, movePointer);
        if (score < beta) {
          beta = score; //(opponent has found a better worse move)
        }
        if (alpha >= beta) return beta; //(cut off);
        movePointer++;
      }
      return beta; //(this is the opponent's best move)
    }
  }

  handleClick(i, j) {
    console.log('click at ' + (i - 1) + ' &' + (j - 1));
    const { xIsNext, bestMove } = this.state;

    if (xIsNext) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[this.state.stepNumber];
      const squares = current.squares.slice();
      const squares2Direct = current.squares2Direct.slice();

      const clickAt = this.state.clickAt.slice(0, this.state.stepNumber + 1);
      const index = (i - 1) * Utils.column + (j - 1);

      if (calculate.calculateWinner(squares) || squares[index]) {
        return;
      }

      squares[index] = this.state.xIsNext ? 'X' : 'O';
      squares2Direct[i - 1][j - 1] = this.state.xIsNext ? 1 : 2;
      // console.log(squares2Direct)

      this.setState(
        {
          history: history.concat([
            {
              squares: squares,
              squares2Direct: squares2Direct
            }
          ]),

          clickAt: clickAt.concat([{ posX: i, posY: j }]),
          stepNumber: history.length,
          xIsNext: !this.state.xIsNext
        },
        () => {
          this.computerPlay();
        }
      );
    }
  }

  computerPlay() {
    // console.log('aaaaaaa')
    const { xIsNext, bestMove } = this.state;

    this.alphabeta(2, -Infinity, Infinity, 2);

    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[this.state.stepNumber];
    const squares = current.squares.slice();
    const squares2Direct = current.squares2Direct.slice();

    const clickAt = this.state.clickAt.slice(0, this.state.stepNumber + 1);
    const index = Utils.bestMove.row * Utils.column + Utils.bestMove.column;
    console.log('index = ' + bestMove.row);

    if (calculate.calculateWinner(squares) || squares[index]) {
      return;
    }

    squares[index] = this.state.xIsNext ? 'X' : 'O';
    squares2Direct[Utils.bestMove.row][Utils.bestMove.column] = this.state
      .xIsNext
      ? 1
      : 2;
    console.log(squares2Direct);

    this.setState({
      history: history.concat([
        {
          squares: squares,
          squares2Direct: squares2Direct
        }
      ]),

      clickAt: clickAt.concat([
        { posX: Utils.bestMove.row, posY: Utils.bestMove.column }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 ? false : true
    });
  }

  getStatus(winner) {
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return status;
  }

  flipState() {
    this.setState({
      buttonState: !this.state.buttonState
    });
  }

  startOver() {
    this.jumpTo(0);
    this.setState({
      clickAt: ['Game Start']
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winpieces_g = calculate.calculateWinner(current.squares);
    const winner = winpieces_g ? current.squares[winpieces_g[0]] : null;
    const buttonText = this.state.buttonState ? 'Decrease' : 'Increase';

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            winpieces_b={winpieces_g}
            onClick={(i, j) => this.handleClick(i, j)}
          />
        </div>

        <div className="relative">
          <div className="game-info">
            <h2>{this.getStatus(winner)}</h2>
            <Moves
              moves={this.state.clickAt}
              buttonState={this.state.buttonState}
              onClick={index => this.jumpTo(index)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default OfflineBoard;
