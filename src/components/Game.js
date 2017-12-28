import React from 'react';
import Deck from 'components/Deck';
import Controls from 'components/Controls';
import Connect4 from 'lib/Connect4';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      connect4: new Connect4()
    };
  }

  startOrRestartGame() {
    this.setState({
      connect4: new Connect4()
    });
  } 

  addDisc(pos) {
    this.state.connect4.addDisc(pos);
    this.refs.clickSound.play();
    this.forceUpdate();
  }

  render() {
    const { grid, isOver, currentPlayer, winner } = this.state.connect4;

    return (
      <React.Fragment>
        <h1>Puissance 4 - GoJob</h1>
        <h3>Click on a column to start the game</h3>
        <Deck 
          grid={grid}
          gameOver={isOver}
          winner={winner}
          onAddDisc={this.addDisc.bind(this)} 
          onReset={this.startOrRestartGame.bind(this)}/>
        <Controls currentPlayer={currentPlayer} onReset={this.startOrRestartGame.bind(this)}/>
        <audio ref="clickSound" src="assets/click.mp3"/>
      </React.Fragment>
    );
  }
}