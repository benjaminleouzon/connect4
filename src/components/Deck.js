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
    const { game, onReset, onAddDisc } = this.props;

    let grid = game.grid.map((row, y) => {
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

    return (
      <div className="connect4-grid">
        {grid}
        {game.isOver &&
          <Splash  
            winner={game.winner} 
            onReset={onReset}/>}
      </div>
    );
  }
}