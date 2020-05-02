import React from 'react';
export default class Early extends React.Component {
constructor(props) {
    super(props)
    this.state = {
      enemyBoard: Array(100).fill(null),
      enemyShips: Array(100).fill(null),
      ships: [4,3,3,2,2,2,1,1,1,1],
      brrr: 0,
      errLog:""
    }
    }

  renderCells() {
    return this.state.enemyBoard.map(
      (cell, index) =>
        <div className="cell" key={index}>
          {cell} </div>
    )
  }

// current.toString().slice(-1) - first char
// current.toString().slice(-1) - last char

  around(current) {
    let firstChar = Number(current.toString().slice(0,1));
    let lastChar = Number(current.toString().slice(-1));
    if (firstChar == 0 || firstChar == 9) {
      return false
    } 
    if (lastChar == 0 || lastChar == 9) {
      return false
    } 
    let roundUp = Array();
    for (var j = -1; j < 2; j++) {
      for (var k = -1; k < 2; k++) {
        let cur = (firstChar+j)*10 + (lastChar+k);
        if (current.toString().length == 1) {let cur = firstChar}
        if (cur == current) {continue}
        if (this.state.enemyBoard[cur] != null) {
          return false
        }
      }
    } 
    return true
  }

  randomPosition(size,direction) {
    let current = Math.floor(Math.random()*100);
    if (direction == 0) {
      if (current.toString().slice(-1) > 10-size) {current = this.randomPosition(size,direction)}
    }
    if (direction == 1) {
      if (current.toString().slice(0,1) > 10-size) {current = this.randomPosition(size,direction)}
    }
    if (this.state.enemyBoard[current] != null) {current = this.randomPosition(size,direction)}

    if (!this.around(current)) {current = this.randomPosition(size,direction)}
    return current
  }
  
  randomPositioning() {
    for (var i = 0; i < this.state.ships.length; i++) {//i < 1;i++){
      let direction = Math.floor(Math.random()*2);
      let current = this.randomPosition(this.state.ships[i],direction);
      this.around(current);
      let newBoard = this.state.enemyBoard;
      newBoard[current] = this.state.ships[this.state.brrr] + " "+ direction;
      this.setState({
        enemyBoard: newBoard,
        brrr: this.state.brrr++
      })
    }
  }

  reset() {
    this.setState({
      enemyBoard: Array(100).fill(null),
      enemyShips: Array(100).fill(null),
      brrr: 0
      })
  }
  
render() {
    return (
      <div className="container">
        <h1>Random Numb App</h1>
        <div className="yourboard">
        <button onClick={() => this.randomPositioning()}>Random</button>
        <button onClick={() => this.reset()}>Reset</button>
        <div className="text">some</div>
         {this.renderCells()}
        </div>
        <div className="footer"></div>
      </div>
    );
  }
}