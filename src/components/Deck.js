import React from 'react';
import Row from 'components/Row';
import Disc from 'components/Disc';

export default class Deck extends React.Component {
	render() {
    let cells = null, splash = null;

    cells = this.props.gameboard.grid.map((row, y) => {
      return (
        <Row key={y}>
          {row.map((cell, x) => {
            const pos = { 
              row: y, 
              col: x
            };
            return (
              <Disc 
                key={x} 
                pos={pos} 
                player={cell} 
                onAddDisc={() => { this.props.onAddDisc(pos); }}/>
            );
          })}
        </Row>
      );
    });

    if (this.props.gameboard.gameOver) {
      splash = (
        <div className="connect4-grid-splash">
          <p> 
            ¯\_(ツ)_/¯
            <br/><br/>
            {this.props.gameboard.winner && 
              <span>Player {this.props.gameboard.winner} won!</span>} 
            <br/>
            The game is over.
            <br/><br/>
            <a onClick={this.props.onReset} className="button">Play again?</a>
          </p>
        </div>
      );
    }

    return (
      <div className="connect4-grid">
        {cells}
        {splash}
      </div>
    );
  }
}