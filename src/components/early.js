import React from 'react';
export default class Early extends React.Component {
constructor(props) {
    super(props)
    this.state = {
      enemyBoard: Array(100).fill(null),
      enemyShips: Array(100).fill(null),
      ships: [4,3,3,2,2,2,1,1,1,1],
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
// current.toString().slice(-1) - last char console

  around(current,newBoard) {
    let firstChar = Number(current[0].toString().slice(0,1));
    let lastChar = Number(current[0].toString().slice(-1));
    console.log("cur "+current[0]+" first "+firstChar+" last "+lastChar);
    for (var j = -1; j < 2; j++) {
      for (var k = -1; k < 2; k++) {
//-----------------------------------------------------------------------------------------------        
        if (firstChar == 0 && j == -1) {
          return false
        }
        if (lastChar == 9 && j == 1) {
          return false
        }
//-----------------------------------------------------------------------------------------------
        let cur = (firstChar+j)*10 + (lastChar+k);
        if (current[0].toString().length == 1) {cur = firstChar}
        if (newBoard[cur] != null) {
          console.log("wrong");
          return false
        }
        console.log("ship "+current+" current "+current[0]+" cur "+cur+" length "+current[0].toString().length)
        if (cur < 0 || cur > 99) {continue}
        if (cur == current[0]) {continue}
        console.log("ship "+current+" current "+current[0]+" cur "+cur+" length "+current[0].toString().length)
      }
    } 
    console.log("yes")
    return true
  }

  randomPosition(size,direction,newBoard) {
    console.log("cd "+size+' '+direction);
    let ship = [Math.floor(Math.random()*100)];
    let firstChar = Number(ship[0].toString().slice(0,1));
    let lastChar = Number(ship[0].toString().slice(-1));   
    if (newBoard[ship[0]] != null) {ship = this.randomPosition(size,direction,newBoard)}
    if (direction == 0 && lastChar > 10-size) {ship = this.randomPosition(size,direction,newBoard)}
    if (direction == 1 && firstChar > 10-size && ship[0]>9) {ship = this.randomPosition(size,direction,newBoard)}    
    for (var i = 1; i < size; i++) {
      if (direction == 0) {
       ship.push(ship[0]+i);
      } 
      else if (direction == 1) {
       let cur = (firstChar+i)*10 + (lastChar);
       if (ship[0].toString().length == 1) {cur = firstChar*i*10}
       ship.push(cur);
      }
    }
    if (this.around(ship,newBoard) == false) {ship = this.randomPosition(size,direction,newBoard)}  
    return ship
  }

  randomPositioning() {
    let newBoard = Array(100).fill(null);
    let b = 0;
    for (var i = 0; i < this.state.ships.length; i++) {
      let direction = Math.floor(Math.random()*2);
      let currentShip = this.randomPosition(this.state.ships[i],direction,newBoard);
      for (var i = 0; i < currentShip.length; i++) {
       //newBoard[currentShip[i]] = this.state.ships[b] + " "+ direction; 
      }
      newBoard[currentShip[0]] = this.state.ships[b] + " "+ direction;
      b++;
    }
    this.setState({
      enemyBoard: newBoard,
     })
  }

  kekw() {
    this.setState({
      enemyBoard: Array(100).fill(null),
      enemyShips: Array(100).fill(null),
    },this.randomPositioning)
  }

  reset() {
    this.setState({
      enemyBoard: Array(100).fill(null),
      enemyShips: Array(100).fill(null),
    })
  }

render() {
    return (
      <div className="container">
        <h1>Random Numb App</h1>
        <div className="yourboard">
        <button onClick={() => this.kekw()}>Random</button>
        <button onClick={() => this.reset()}>Reset</button>
        <div className="text">some</div>
        <div> {this.renderCells()} </div>
        </div>
        <div className="footer"></div>
      </div>
    );
  }
}