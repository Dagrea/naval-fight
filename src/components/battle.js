import React from 'react';
class Logs extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      logs : "Ожидается ваш ход"
    }
  }
  render() {
    return(<h2>{this.state.logs}</h2>)
  }
}
export default class Battle extends React.Component {
constructor(props) {
    super(props)
    this.state = {
      yourBoard: Array(10).fill(Array(10).fill(null)),
      enemyBoard: Array(10).fill(Array(10).fill(null))
    }
}

  renderYCells() {
      let board =[];
      console.log(this.props.yBoard);
      for (var j = 0; j < this.props.yBoard.length; j++) {
        board[j] = (this.props.yBoard[j].map(
          (cell,index) =>
          <div className="cell " key={index}>{cell}</div>));
      }
      return board;
  }

  renderECells() {
      let board =[];
      for (var j = 0; j < this.state.enemyBoard.length; j++) {
        board[j] = (this.state.enemyBoard[j].map(
          (cell,index) =>
          <div className="cell " key={index}>{cell}</div>));
      }
      return board;
  }

  reset() {
    this.setState({
      enemyBoard: Array(10).fill(Array(10).fill(null)),
      enemyShips: Array(100).fill(null),
    })
  }

  render() {
    return (
        <div className="wrapper">
        <h1>Naval Battle App</h1>
        <Logs />
        <div className="yourboard">
          <div className="text">Ваша доска</div>
            {this.renderYCells()}
          </div>
          <div className="enemyboard">
            <div className="text">Доска противника</div>
            {this.renderECells()}
            </div>
        <div className="footer"></div>
        </div>
    );
  }
}