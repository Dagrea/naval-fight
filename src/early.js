export default class Early extends React.Component {
constructor(props) {
    super(props)
      enemyBoard: Array(100).fill(null),
      enemyShips: Array(100).fill(null)
    }

  renderCells() {
    return this.state.enemyShips.map(
      (cell, index) =>
        <div className="cell" key={index}
        onClick={() => this.handleClick(index)}>
          {cell} </div>
    )
  }

  randomPosition() {

  }
  
render() {
    return (
      <div className="container">
        <h1>Naval Battle App</h1>
        <div className="yourboard">
        <div className="text">Ваша доска</div>
          {this.renderCells()}
        </div>
        <div className="footer"></div>
      </div>
    );
  }
}