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
      enemyBoard: Array(10).fill(Array(10).fill(null)),
      emptyBoard: Array(10).fill(Array(10).fill(null)),
      log: "В ожидании вашего хода",
      scene: "early"
    }
  }

  sendBoard = (next,yourBoard,enemyBoard,epmtyBoard) => {
  	this.setState({
  		scene: next,
  		yourBoard: yourBoard,
      enemyBoard: enemyBoard,
      epmtyBoard: epmtyBoard
  	})
  }

  toStart = () => {
    this.setState({
      scene: "early"
    })
  }

  render() {
  	let scene = this.state.scene === "early" ? true : false;
    return (
    <div className="container">
      {scene ? <Early sendBoard={this.sendBoard}/> : <Battle yBoard={this.state.yourBoard} 
      eBoard={this.state.enemyBoard} emBoard={this.state.emptyBoard} toStart={this.toStart}/>}
    </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
