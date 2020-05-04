import React from 'react';
export default class Early extends React.Component {
constructor(props) {
    super(props)
    this.state = {
      enemyBoard: Array(10).fill(Array(10).fill(null)),
      enemyShips: Array(100).fill(null),
      ships: [4,3,3,2,2,2,1,1,1,1],
      errLog:""
    }
}
	renderCells() {
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
//-----------------------------------------------------------------------------------------------  
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
				newBoard[firstChar][secondChar] = ship[i];
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
			newBoard[firstChar][secondChar] = ship[i];
		}
	    return newBoard
	}

	around(ship,newBoard) {
		console.log(ship);
		for (let i = 0; i < ship.length; i++) {
			let current =  ship[i];
			let firstChar = Number(current.toString().slice(0,1));
    		let lastChar = Number(current.toString().slice(-1));
    		console.log(current,ship[i].toString().length);
//-----------------------------------------------------------------------------------------------
    		if (ship[i].toString().length === 1) {
    			if (ship[i] === 0) {
					for (let j = 0; j < 2; j++) {
		      			for (let k = 0; k < 2; k++) {
		      				let cur = current+j*10+k;
		      				if (cur.toString().length === 1) {
		      					firstChar = 0;
		      				}
		      				if (newBoard[firstChar+j][lastChar+k] != null) {
		      					console.log("end1");return false
		      				}
		      				if (cur === current) {console.log("end2");continue}
		      			}
		      		}
					console.log("end3");continue
				}
				if (ship[i] === 9) {
					for (let j = 0; j < 2; j++) {
		      			for (let k = -1; k < 1; k++) {
		      				let cur = current+j*10+k;
		      				if (cur.toString().length === 1) {
		      					firstChar = 0;
		      				}
		      				if (newBoard[firstChar+j][lastChar+k] != null) {
		      					console.log("end4");return false
		      				}
		      				if (cur === current) {console.log("end5");continue}
		      			}
		      		}
					console.log("end6");continue
				}
				for (let j = 0; j < 2; j++) {
	      			for (let k = -1; k < 2; k++) {
	      				let cur = current+j*10+k;
	      				if (cur.toString().length === 1) {
	      					firstChar = 0;
	      				}
	      				if (newBoard[firstChar+j][lastChar+k] != null) {
	      					console.log("end7");return false
	      				}
	      				if (cur === current) {console.log("end8");continue}
	      			}
	      		}
	      		console.log("end9");continue
    		}
			if (lastChar === 0) {
				for (let j = -1; j < 2; j++) {
	      			for (let k = 0; k < 2; k++) {
	      				let cur = (firstChar+j)*10+(lastChar+k);
	      				if (cur > 99) {console.log("end10");continue}
	      				console.log(current,cur,firstChar,lastChar,j,k);
	      				if (newBoard[firstChar+j][lastChar+k] != null) {
	      					return false
	      				}
	      				if (cur === current) {console.log("end11");continue}
	      			}
      			}
      			console.log("end12");continue
			}
			if (lastChar === 9) {
				for (let j = -1; j < 2; j++) {
	      			for (let k = -1; k < 1; k++) {
	      				let cur = (firstChar+j)*10+(lastChar+k);
	      				if (cur > 99) {console.log("end13");continue}
	      				if (newBoard[firstChar+j][lastChar+k] != null) {
	      					console.log("end14");return false
	      				}
	      				if (cur === current) {console.log("end15");continue}
	      			}
      			}
      			console.log("end16");continue
			}
			for (let j = -1; j < 2; j++) {
      			for (let k = -1; k < 2; k++) {
      				let cur = (firstChar+j)*10+(lastChar+k);
      				if (cur > 99) {console.log("end17");continue}
      				if (newBoard[firstChar+j][lastChar+k] != null) {
      					console.log("end18");return false
      				}
      				if (cur === current) {console.log("end19");continue}
      			}
      		}
		}
		console.log("end20");return true
	}

	randomPositioning() {
		let newBoard = [];
		for (let i = 0; i < 10; i++) {
			newBoard.push(Array(10).fill(null));
		}
		let b = 0;
		for (let i = 0; i < 10; i++) {
			newBoard = this.randomShip(this.state.ships[b],newBoard);
			b++
		}
		this.setState({
	    	enemyBoard: newBoard,
	    })
	}
//-----------------------------------------------------------------------------------------------  
 	render() {
    return (
      <div className="container">
        <h1>Random Numb App</h1>
        <div className="yourboard">
        <button onClick={() => this.randomPositioning()}>Random</button>
        <button onClick={() => this.reset()}>Reset</button>
        <div> {this.renderCells()} </div>
        </div>
        <div className="footer"></div>
      </div>
    );
	}
}