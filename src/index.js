import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Early from './components/early';
import Battle from './components/battle.js';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      yourBoard: Array(10).fill(Array(10).fill(null)),
      enemyBoard: Array(100).fill("hide"),
      log: "В ожидании вашего хода",
      scene: "early"
    }
  }
 
	handleClick(index) {
		if(this.state.enemyBoard[index] === "hide") {
			let newBoard = this.state.enemyBoard;
            newBoard[index] = "miss";
            this.setState({
            	enemyBoard: newBoard
            })
            return
        }
        if(this.state.enemyBoard[index] === "miss") {
			let newBoard = this.state.enemyBoard;
            newBoard[index] = "alive";
            this.setState({
            	enemyBoard: newBoard
            })
            return
        }
        if(this.state.enemyBoard[index] === "alive") {
			let newBoard = this.state.enemyBoard;
            newBoard[index] = "hit";
            this.setState({
            	enemyBoard: newBoard
            })
        }
    }

  renderYCells() {
    return this.state.yourBoard.map(
      (cell, index) =>
        <div className="cell " key={index}></div>
    )
  }

  sendBoard = (next,board) => {
  	this.setState({
  		scene: next,
  		yourBoard: board
  	})
  }

  renderECells() {
    return this.state.enemyBoard.map(
      (cell, index) =>
        this.state.enemyBoard[index] === "hide" ? 
        (<div className="cell" key={index} onClick={() => this.handleClick(index)}></div>) : 
        this.state.enemyBoard[index] === "miss" ?
        (<div className="cell miss" key={index} onClick={() => this.handleClick(index)}></div>) : 
        this.state.enemyBoard[index] === "alive" ?
        (<div className="cell alive" key={index} onClick={() => this.handleClick(index)}></div>) :
        (<div className="cell hit" key={index} onClick={() => this.handleClick(index)}></div>)
    )
  }

  render() {
  	let scene = this.state.scene === "early" ? true : false;
    return (
    <div className="container">
      {scene ? <Early sendBoard={this.sendBoard}/> : <Battle yBoard={this.state.yourBoard}/>}
    </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
