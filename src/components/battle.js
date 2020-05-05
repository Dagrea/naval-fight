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
      yourBoard: this.props.yBoard,
      enemyBoard: this.props.eBoard,
      enemyShots: []
    }
}

  renderYCells() {
      let board =[];
      for (let j = 0; j < this.state.yourBoard.length; j++) {
        board[j] = (this.state.yourBoard[j].map(
          (cell,index) =>
          this.state.yourBoard[j][index] === null ? 
          <div className="cell " key={index}></div> :
          this.state.yourBoard[j][index] === "hide" ? 
          <div className="cell alive" key={index}></div> :
          this.state.yourBoard[j][index] === "miss" ? 
          <div className="cell miss" key={index}></div> :
          <div className="cell hit" key={index}></div>



          ));
      }
      return board;
  }

  renderECells() {
      let board =[];
      for (let j = 0; j < this.state.enemyBoard.length; j++) {
        board[j] = (this.state.enemyBoard[j].map(
          (cell,index) =>
          this.state.enemyBoard[j][index] === null ? 
          <div className="cell" key={index} onClick={() => this.handleClick(j+index.toString())}></div> :
          this.state.enemyBoard[j][index] === "hide" ? 
          <div className="cell" key={index} onClick={() => this.handleClick(j+index.toString())}></div> :
          this.state.enemyBoard[j][index] === "miss" ? 
          <div className="cell miss" key={index} onClick={() => this.handleClick(j+index.toString())}></div> :
          <div className="cell hit" key={index} onClick={() => this.handleClick(j+index.toString())}></div>
          )
        );  
      }
      return board;
  }

  handleClick(index) {
    let firstChar = Number(index.toString().slice(0,1));
    let secondChar = Number(index.toString().slice(-1));
    let newBoard = this.state.enemyBoard;
    if (this.state.enemyBoard[firstChar][secondChar] === "hide"){
      newBoard[firstChar][secondChar] = "kill";
      this.setState({
        enemyBoard: newBoard,
      })
      return
    }
    newBoard[firstChar][secondChar] = "miss";
      this.setState({
        enemyBoard: newBoard,
      })
    this.enemyShot()
  }

  enemyShot() {
    let target = Math.floor(Math.random()*100);
    if (target.toString().length === 1) {target = "0" + target}
    let firstChar = Number(target.toString().slice(0,1));
    let secondChar = Number(target.toString().slice(-1));
    if (this.state.enemyShots.includes(target)) {this.enemyShot();return}
    let newBoard = this.state.yourBoard;
    if (this.state.yourBoard[firstChar][secondChar] === null) {
      newBoard[firstChar][secondChar] = "miss";
      this.setState({
        yourBoard: newBoard,
      })
    }
    if (this.state.yourBoard[firstChar][secondChar] === "hide") {
      newBoard[firstChar][secondChar] = "kill";
      let shots = this.state.enemyShots;
      shots.push(target);
      this.setState({
        yourBoard: newBoard,
        enemyShots:shots
      })
      this.enemyShot();
    }
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