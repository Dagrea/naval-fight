import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Early from './components/early';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      yourBoard: Array(100).fill("hide"),
      enemyBoard: Array(100).fill("hide"),
      yourShips: Array(100).fill(null),
      enemyShips: Array(100).fill(null)
    }
  }
 
	handleClick(index) {
		if(this.state.enemyBoard[index] == "hide") {
			let newBoard = this.state.enemyBoard;
            newBoard[index] = "miss";
            this.setState({
            	enemyBoard: newBoard
            })
            return
        }
        if(this.state.enemyBoard[index] == "miss") {
			let newBoard = this.state.enemyBoard;
            newBoard[index] = "alive";
            this.setState({
            	enemyBoard: newBoard
            })
            return
        }
        if(this.state.enemyBoard[index] == "alive") {
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

  renderECells() {
    return this.state.enemyBoard.map(
      (cell, index) =>
        this.state.enemyBoard[index] == "hide" ? 
        (<div className="cell" key={index} onClick={() => this.handleClick(index)}></div>) : 
        this.state.enemyBoard[index] == "miss" ?
        (<div className="cell miss" key={index} onClick={() => this.handleClick(index)}></div>) : 
        this.state.enemyBoard[index] == "alive" ?
        (<div className="cell alive" key={index} onClick={() => this.handleClick(index)}></div>) :
        (<div className="cell hit" key={index} onClick={() => this.handleClick(index)}></div>)
    )
  }

  render() {
    return (
      <div className="container">
        <h1>Naval Battle App</h1>
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

ReactDOM.render(<Early />, document.getElementById('root'));
