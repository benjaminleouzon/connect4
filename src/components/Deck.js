import React from 'react';
import Row from 'components/Row';
import Disc from 'components/Disc';

const Splash = (props) => {
  const { winner, onReset } = props;

  return (
    <div className="connect4-grid-splash">
      <p> 
        ¯\_(ツ)_/¯
        <br/><br/>
        {winner && <span>Player {winner} won!</span>} 
        <br/>
        The game is over.
        <br/><br/>
        <a onClick={onReset} className="button">Play again?</a>
      </p>
    </div>
  );
};

export default class Deck extends React.Component {
  render() {
    const { grid, gameOver, winner, onReset, onAddDisc } = this.props;

    let deck = grid.map((row, x) => {
      return (
        <Row key={x}>
          {row.map((cell, y) => {
            const pos = { x, y };
            return (
              <Disc 
                key={y} 
                pos={pos} 
                player={cell} 
                onAddDisc={() => { this.props.onAddDisc(pos); }}/>
            );
          })}
        </Row>
      );
    });

    return (
      <div className="connect4-grid">
        {deck}
        {gameOver &&
          <Splash  
            winner={winner} 
            onReset={onReset}/>}
      </div>
    );
  }
}