import React from 'react';
export default class Early extends React.Component {
constructor(props) {
    super(props)
    this.state = {
      yourBoard: Array(10).fill(Array(10).fill(null)),
      enemyBoard: Array(10).fill(Array(10).fill(null)),
      ships: [4,3,3,2,2,2,1,1,1,1],
      next:"battle"
    }
}
  renderCells() {
      let board =[];
      for (var j = 0; j < this.state.yourBoard.length; j++) {
        board[j] = (this.state.yourBoard[j].map(
          (cell,index) =>
          this.state.enemyBoard[j][index] === "hide" ? 
          <div className="cell alive" key={index} ></div> :
          <div className="cell " key={index}></div>))
      }
      return board;
  }
  reset() {
    this.setState({
      enemyBoard: Array(10).fill(Array(10).fill(null)),
      yourBoard: Array(10).fill(Array(10).fill(null))
    })
    }
    
  randomShip(size,newBoard) {
    let startOfShip = Math.floor(Math.random()*100);
    let direction = Math.floor(Math.random()*2);
    if (startOfShip < 10 ) {
      if (newBoard[0][startOfShip] != null) {newBoard = this.randomShip(size,newBoard);return newBoard}
      if (direction === 1 && startOfShip > 10-size) {newBoard = this.randomShip(size,newBoard);return newBoard}
      let ship = [];
      for (let i = 0; i < size; i++) {
        if (direction === 0) {
              ship.push(startOfShip+10*i);
        }
        if (direction === 1) {
          ship.push(startOfShip+i);
        }
      }
      if (!this.around(ship,newBoard)) {newBoard = this.randomShip(size,newBoard);return newBoard}
      for (let i = 0; i < ship.length; i++) {
        let firstChar = Number(ship[i].toString().slice(0,1));
        let secondChar = Number(ship[i].toString().slice(-1));
        if (ship[i].toString().length === 1) {firstChar = 0}
        newBoard[firstChar][secondChar] = "hide";
      }
      return newBoard
    }
    let firstChar = Number(startOfShip.toString().slice(0,1));
    let secondChar = Number(startOfShip.toString().slice(-1));
    if (newBoard[firstChar][secondChar] != null) {newBoard = this.randomShip(size,newBoard);return newBoard}
    if (direction === 0 &&  firstChar > 10-size) {newBoard = this.randomShip(size,newBoard);return newBoard}
      if (direction === 1 &&  secondChar > 10-size) {newBoard = this.randomShip(size,newBoard);return newBoard}
      let ship = [];
    for (let i = 0; i < size; i++) {
      if (direction === 0) {
            ship.push(startOfShip+10*i);
      }
      if (direction === 1) {
        ship.push(startOfShip+i);
      }
    }
    if (!this.around(ship,newBoard)) {newBoard = this.randomShip(size,newBoard);return newBoard}
    for (let i = 0; i < ship.length; i++) {
      let firstChar = Number(ship[i].toString().slice(0,1));
      let secondChar = Number(ship[i].toString().slice(-1));
      newBoard[firstChar][secondChar] = "hide";
    }
      return newBoard
  }

  around(ship,newBoard) {
    for (let i = 0; i < ship.length; i++) {
      let current =  ship[i];
      let firstChar = Number(current.toString().slice(0,1));
        let lastChar = Number(current.toString().slice(-1));
        if (ship[i].toString().length === 1) {
          if (ship[i] === 0) {
          for (let j = 0; j < 2; j++) {
                for (let k = 0; k < 2; k++) {
                  let cur = current+j*10+k;
                  if (cur.toString().length === 1) {
                    firstChar = 0;
                  }
                  if (newBoard[firstChar+j][lastChar+k] != null) {
                    return false
                  }
                  if (cur === current) {continue}
                }
              }
          continue
        }
        if (ship[i] === 9) {
          for (let j = 0; j < 2; j++) {
                for (let k = -1; k < 1; k++) {
                  let cur = current+j*10+k;
                  if (cur.toString().length === 1) {
                    firstChar = 0;
                  }
                  if (newBoard[firstChar+j][lastChar+k] != null) {
                    return false
                  }
                  if (cur === current) {continue}
                }
              }
          continue
        }
        for (let j = 0; j < 2; j++) {
              for (let k = -1; k < 2; k++) {
                let cur = current+j*10+k;
                if (cur.toString().length === 1) {
                  firstChar = 0;
                }
                if (newBoard[firstChar+j][lastChar+k] != null) {
                  return false
                }
                if (cur === current) {continue}
              }
            }
            continue
        }
      if (lastChar === 0) {
        for (let j = -1; j < 2; j++) {
              for (let k = 0; k < 2; k++) {
                let cur = (firstChar+j)*10+(lastChar+k);
                if (cur > 99) {continue}
                if (newBoard[firstChar+j][lastChar+k] != null) {
                  return false
                }
                if (cur === current) {continue}
              }
            }
            continue
      }
      if (lastChar === 9) {
        for (let j = -1; j < 2; j++) {
              for (let k = -1; k < 1; k++) {
                let cur = (firstChar+j)*10+(lastChar+k);
                if (cur > 99) {continue}
                if (newBoard[firstChar+j][lastChar+k] != null) {
                  return false
                }
                if (cur === current) {continue}
              }
            }
            continue
      }
      for (let j = -1; j < 2; j++) {
            for (let k = -1; k < 2; k++) {
              let cur = (firstChar+j)*10+(lastChar+k);
              if (cur > 99) {continue}
              if (newBoard[firstChar+j][lastChar+k] != null) {
                return false
              }
              if (cur === current) {continue}
            }
          }
    }
    return true
  }

  randomPositioning() {
    let newBoard1 = [];
    for (let i = 0; i < 10; i++) {
      newBoard1.push(Array(10).fill(null));
    }
    let b = 0;
    for (let i = 0; i < 10; i++) {
      newBoard1 = this.randomShip(this.state.ships[b],newBoard1);
      b++;
    }
    let newBoard2 = [];
    for (let i = 0; i < 10; i++) {
      newBoard2.push(Array(10).fill(null));
    }
    b = 0;
    for (let i = 0; i < 10; i++) {
      newBoard2 = this.randomShip(this.state.ships[b],newBoard2);
      b++;
    }
    this.setState({
      yourBoard: newBoard1,
      enemyBoard: newBoard2
    })
  }

  render() {
    return (
        <div className="wrapper">
        <h1>Random Numb App</h1>
        <div className="yourboard">
        <button onClick={() => this.randomPositioning()}>Random</button>
        <button onClick={() => this.reset()}>Reset</button>
        <button onClick={() => {this.props.sendBoard(this.state.next,this.state.yourBoard,this.state.enemyBoard)}}>Battle</button>
        <div> {this.renderCells()} </div>
        </div>
        <div className="footer"></div>
        </div>
    );
  }
}