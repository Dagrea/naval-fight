import React from 'react';
class Logs extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      next:"early"
    }
  }
  render() {
    let winCheck = (this.props.score[0] == 10 || this.props.score[1] == 10) ;
    let winner = this.props.score[0] == 10 ?  "You win!" : "Computer win!";
    let lets = this.props.score[0] == 10 ? "do" : "try";

    return(
      winCheck ?
      <div className="log-container">{winner}   <button onClick={() => {this.props.toStart()}}> Let's {lets} it again</button></div> :
      (<div className="log-container"><div className="log">Сбитые корабли: {this.props.score[1]}</div>
       <div className="log">Сбитые корабли: {this.props.score[0]}</div></div>)
      )
  }
}

export default class Battle extends React.Component {
constructor(props) {
    super(props)
    this.state = {
      yourBoard: this.props.yBoard,
      enemyBoard: this.props.eBoard,
      enemyShots: [],
      score: [0,0],
      next:"early"
    }
}

  renderYCells() {
    let board =[];
    for (let j = 0; j < this.state.yourBoard.length; j++) {
      board[j] = (this.state.yourBoard[j].map(
        (cell,index) =>
        this.state.yourBoard[j][index][0] === null || this.state.yourBoard[j][index][0] === undefined ? 
        <div className="cell " key={index}></div> :
        this.state.yourBoard[j][index][0] === "hide" ? 
        <div className="cell alive" key={index}></div> :
        this.state.yourBoard[j][index][0] === "miss" ? 
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
          this.state.enemyBoard[j][index][0] === null || this.state.enemyBoard[j][index][0] === undefined ? 
          <div className="cell" key={index} onClick={() => this.handleClick(j+index.toString())}></div> :
          this.state.enemyBoard[j][index][0] === "hide" ? 
          <div className="cell" key={index} onClick={() => this.handleClick(j+index.toString())}></div> :
          this.state.enemyBoard[j][index][0] === "miss" ? 
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
    if (this.state.enemyBoard[firstChar][secondChar][0] === "kill" || this.state.enemyBoard[firstChar][secondChar][0] === "miss") {return false}
    if (this.state.enemyBoard[firstChar][secondChar][0] === "hide"){
      newBoard[firstChar][secondChar][0] = "kill";
      this.checkKill(this.state.enemyBoard[firstChar][secondChar][1]);
      this.setState({
        enemyBoard: newBoard,
      })
      return
    }
    newBoard[firstChar][secondChar] = Array(2);
    newBoard[firstChar][secondChar][0] = "miss";
    this.setState({
      enemyBoard: newBoard,
    })
    this.enemyShot();
  }

  enemyShot() {
    let target = Math.floor(Math.random()*100);
    if (target.toString().length === 1) {target = "0" + target}
    let firstChar = Number(target.toString().slice(0,1));
    let secondChar = Number(target.toString().slice(-1));
    if (this.state.enemyShots.includes(target)) {this.enemyShot();return}
    let newBoard = this.state.yourBoard;
    if (this.state.yourBoard[firstChar][secondChar][0] === "hide") {
      newBoard[firstChar][secondChar][0] = "kill";
      let shots = this.state.enemyShots;
      shots.push(target);
      this.checkYKill(this.state.yourBoard[firstChar][secondChar][1]);
      this.setState({
        yourBoard: newBoard,
        enemyShots:shots
      })
      this.enemyShot();
      return
    }
    newBoard[firstChar][secondChar] = Array(2);
    newBoard[firstChar][secondChar][0] = "miss";
    let shots = this.state.enemyShots;
    shots.push(target);
    this.setState({
       yourBoard: newBoard,
      enemyShots:shots
    })
  }

  checkKill(ship) {
    let count = 0;
    for (let i = 0; i < ship.length; i++) {
      let firstChar = Number(ship[i].toString().slice(0,1));
      let secondChar = Number(ship[i].toString().slice(-1));
      if (ship[i] < 10) {firstChar = 0}
      if (this.state.enemyBoard[firstChar][secondChar][0] === "kill") {count++}
    }
    if (count === ship.length) {
      let newBoard = this.state.enemyBoard;
      for (let i = 0; i < ship.length; i++) {
        let firstChar = Number(ship[i].toString().slice(0,1));
        let secondChar = Number(ship[i].toString().slice(-1));
        if (ship[i] < 10) {firstChar = 0}
        if (ship[i] < 10) {
          if (ship[i] === 0) {
            for (let j = 0; j < 2; j++) {
              for (let k = 0; k < 2; k++) {
                let cur = secondChar+j*10+k;
                if (ship.includes(cur)) {continue}
                newBoard[firstChar+j][secondChar+k] = Array(2);
                newBoard[firstChar+j][secondChar+k][0] = "miss" 
              }
            }
            continue
          }
          if (ship[i] === 9) {
            for (let j = 0; j < 2; j++) {
              for (let k = -1; k < 1; k++) {
                let cur = secondChar+j*10+k;
                if (ship.includes(cur)) {continue}
                newBoard[firstChar+j][secondChar+k] = Array(2);
                newBoard[firstChar+j][secondChar+k][0] = "miss" 
              }
            }
          continue
          }
          for (let j = 0; j < 2; j++) {
            for (let k = -1; k < 2; k++) {
              let cur = secondChar+j*10+k;
              if (ship.includes(cur)) {continue}
              newBoard[firstChar+j][secondChar+k] = Array(2);
              newBoard[firstChar+j][secondChar+k][0] = "miss" 
            }
          }
          continue
        }
        if (secondChar === 0) {
          for (let j = -1; j < 2; j++) {
            for (let k = 0; k < 2; k++) {
              let cur = (firstChar+j)*10+(secondChar+k);
              if (ship.includes(cur)) {continue}
              if (cur > 99) {continue}
              newBoard[firstChar+j][secondChar+k] = Array(2);
              newBoard[firstChar+j][secondChar+k][0] = "miss" 
            }
          }
          continue
        }
        if (secondChar === 9) {
          for (let j = -1; j < 2; j++) {
            for (let k = -1; k < 1; k++) {
              let cur = (firstChar+j)*10+(secondChar+k);
              if (ship.includes(cur)) {continue}
              if (cur > 99) {continue}
              newBoard[firstChar+j][secondChar+k] = Array(2);
              newBoard[firstChar+j][secondChar+k][0] = "miss" 
            }
          }
          continue
        }
        for (let j = -1; j < 2; j++) {
          for (let k = -1; k < 2; k++) {
            let cur = (firstChar+j)*10+(secondChar+k);
            if (ship.includes(cur)) {continue}
            if (cur > 99) {continue}
            newBoard[firstChar+j][secondChar+k] = Array(2);
            newBoard[firstChar+j][secondChar+k][0] = "miss" 
          }
        }
      }
      let score = this.state.score;
      score[0]++; 
      this.setState({
        enemyBoard: newBoard,
        score:score
      })
    }
  }

  checkYKill(ship) {
    let count = 0;
    for (let i = 0; i < ship.length; i++) {
      let firstChar = Number(ship[i].toString().slice(0,1));
      let secondChar = Number(ship[i].toString().slice(-1));
      if (ship[i] < 10) {firstChar = 0}
      if (this.state.yourBoard[firstChar][secondChar][0] === "kill") {count++}
    }
    if (count === ship.length) {
      let newBoard = this.state.yourBoard;
      for (let i = 0; i < ship.length; i++) {
        let firstChar = Number(ship[i].toString().slice(0,1));
        let secondChar = Number(ship[i].toString().slice(-1));
        if (ship[i] < 10) {firstChar = 0}
        if (ship[i] < 10) {
          if (ship[i] === 0) {
            for (let j = 0; j < 2; j++) {
              for (let k = 0; k < 2; k++) {
                let cur = secondChar+j*10+k;
                if (ship.includes(cur)) {continue}
                newBoard[firstChar+j][secondChar+k] = Array(2);
                newBoard[firstChar+j][secondChar+k][0] = "miss" 
              }
            }
            continue
          }
          if (ship[i] === 9) {
            for (let j = 0; j < 2; j++) {
              for (let k = -1; k < 1; k++) {
                let cur = secondChar+j*10+k;
                if (ship.includes(cur)) {continue}
                newBoard[firstChar+j][secondChar+k] = Array(2);
                newBoard[firstChar+j][secondChar+k][0] = "miss" 
              }
            }
          continue
          }
          for (let j = 0; j < 2; j++) {
            for (let k = -1; k < 2; k++) {
              let cur = secondChar+j*10+k;
              if (ship.includes(cur)) {continue}
              newBoard[firstChar+j][secondChar+k] = Array(2);
              newBoard[firstChar+j][secondChar+k][0] = "miss" 
            }
          }
          continue
        }
        if (secondChar === 0) {
          for (let j = -1; j < 2; j++) {
            for (let k = 0; k < 2; k++) {
              let cur = (firstChar+j)*10+(secondChar+k);
              if (ship.includes(cur)) {continue}
              if (cur > 99) {continue}
              newBoard[firstChar+j][secondChar+k] = Array(2);
              newBoard[firstChar+j][secondChar+k][0] = "miss" 
            }
          }
          continue
        }
        if (secondChar === 9) {
          for (let j = -1; j < 2; j++) {
            for (let k = -1; k < 1; k++) {
              let cur = (firstChar+j)*10+(secondChar+k);
              if (ship.includes(cur)) {continue}
              if (cur > 99) {continue}
              newBoard[firstChar+j][secondChar+k] = Array(2);
              newBoard[firstChar+j][secondChar+k][0] = "miss" 
            }
          }
          continue
        }
        for (let j = -1; j < 2; j++) {
          for (let k = -1; k < 2; k++) {
            let cur = (firstChar+j)*10+(secondChar+k);
            if (ship.includes(cur)) {continue}
            if (cur > 99) {continue}
            newBoard[firstChar+j][secondChar+k] = Array(2);
            newBoard[firstChar+j][secondChar+k][0] = "miss" 
          }
        }
      }
      let score = this.state.score;
      score[1]++; 
      this.setState({
        yourBoard: newBoard,
        score:score
      })
    }
  }

  render() {
    return (
      <div className="wrapper">
        <h1>Naval Battle App</h1>
        <Logs score={this.state.score} toStart={this.props.toStart}/>
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