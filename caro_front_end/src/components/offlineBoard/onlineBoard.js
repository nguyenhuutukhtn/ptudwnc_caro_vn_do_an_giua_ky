import React, { Component } from 'react';
import './Game.css';
import './Board.css';

import Utils from './Utils';
import * as calculate from './CalculateWinner';
import Board from './Board';
import Moves from './Moves';
import PlusMinus from './UserControl';
import socketIOClient from 'socket.io-client';
import { connect } from 'react-redux';
import { socketSocket, socket } from '../../apis/socket.api';

class OnlineBoard extends React.Component {
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
      noOfPiece: 0,
      ranNum: 0,
      joinRoom: false,
      typingMessage: '',
      listMessage: ''
    };
    this.jumpTo = this.jumpTo.bind(this);
    this.updateBoard = this.updateBoard.bind(this);
    this.joinRoom = this.joinRoom.bind(this);
    this.typingMessage = this.typingMessage.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.updateMessage = this.updateMessage.bind(this);
    // socket = socketIOClient('http://127.0.0.1:1234');
  }

  send = () => {
    // socket = socketIOClient('http://127.0.0.1:1234');
    // socket.emit('change color', this.state.color); // change 'red' to this.state.color
  };

  updateBoard(msg) {
    const { xIsNext, bestMove } = this.state;

    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[this.state.stepNumber];
    const squares = current.squares.slice();
    const squares2Direct = current.squares2Direct.slice();

    const clickAt = this.state.clickAt.slice(0, this.state.stepNumber + 1);
    const index = msg.x * Utils.column + msg.y;

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

  joinRoom(msg) {
    const { xIsNext, joinRoom } = this.state;
    this.setState({ joinRoom: !joinRoom });
    console.log(msg);
    if (this.state.ranNum != msg.firstPlayer) {
      this.setState({
        xIsNext: !xIsNext
      });
    }
  }

  updateMessage(msg) {
    var { listMessage } = this.state;
    listMessage = listMessage + 'Đối thủ: ' + msg + '\n';
    console.log(listMessage);
    this.setState({ listMessage: listMessage });
  }

  componentDidMount = () => {
    socket.on('join table', this.joinRoom);
    // const socket = socketIOClient('http://127.0.0.1:1234');
    // setInterval(this.send(), 1000);
    // socket.on('change color', col => {
    //   document.body.style.backgroundColor = col;
    // });
    socket.on('make a move', this.updateBoard);
    socket.on('chat message', this.updateMessage);
  };

  handleClick(i, j) {
    console.log('click at ' + (i - 1) + ' &' + (j - 1));
    const { xIsNext, bestMove, joinRoom } = this.state;

    if (xIsNext && joinRoom) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1);
      const current = history[this.state.stepNumber];
      const squares = current.squares.slice();
      const squares2Direct = current.squares2Direct.slice();

      const clickAt = this.state.clickAt.slice(0, this.state.stepNumber + 1);
      const index = (i - 1) * Utils.column + (j - 1);

      if (calculate.calculateWinner(squares) || squares[index]) {
        return;
      }
      socket.emit('make a move', { x: i - 1, y: j - 1 }, function(msg) {
        if (!msg.ok) {
          alert('ERROR: CANNOT MAKE A MOVE');
        }
      });

      squares[index] = this.state.xIsNext ? 'X' : 'O';
      squares2Direct[i - 1][j - 1] = this.state.xIsNext ? 1 : 2;
      // console.log(squares2Direct)

      this.setState({
        history: history.concat([
          {
            squares: squares,
            squares2Direct: squares2Direct
          }
        ]),

        clickAt: clickAt.concat([{ posX: i, posY: j }]),
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext
      });
    }
  }

  jumpTo() {
    var ranNum = Math.floor(Math.random() * 101);
    this.setState({ ranNum: ranNum }, () => {
      socket.emit('join queue', ranNum);
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

  sendMessage() {
    var { listMessage, typingMessage } = this.state;
    listMessage = listMessage + 'Bạn: ' + typingMessage + '\n';
    this.setState({ listMessage: listMessage, typingMessage: '' }, () => {
      console.log(this.state.listMessage);
      socket.emit('chat message', typingMessage);
    });
  }

  typingMessage(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  startOver() {
    this.jumpTo(0);
    this.setState({
      clickAt: ['Game Start']
    });
  }

  render() {
    const { history, listMessage, typingMessage } = this.state;
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
            <button type="button" onClick={this.jumpTo}>
              Bắt đầu
            </button>
            <div>
              <div id="messagePanel" class="panel panel-default">
                <div class="panel-heading">
                  <h3 class="panel-title">Chat</h3>
                </div>
                <div class="panel-body">
                  <form role="form">
                    <div class="form-group">
                      <textarea
                        id="logPanel"
                        class="form-control"
                        rows="10"
                        disabled="disabled"
                        value={listMessage}
                      ></textarea>
                    </div>
                    <div class="input-group">
                      <input
                        type="text"
                        class="form-control"
                        placeholder="type your message..."
                        id="messageTxt"
                        name="typingMessage"
                        value={typingMessage}
                        onChange={this.typingMessage}
                      ></input>
                      <span class="input-group-btn">
                        <button
                          class="btn btn-default"
                          type="button"
                          id="sendBtn"
                          onClick={this.sendMessage}
                        >
                          send
                        </button>
                      </span>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapState(state) {
  // const { loggingIn } = state.login;
  // return { loggingIn };
}

const actionCreators = {
  // login: userActions.login
  // logout: userActions.logout
};

const connectedOnlinePage = connect(
  mapState,
  actionCreators
)(OnlineBoard);

export default connectedOnlinePage;
