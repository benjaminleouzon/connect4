import React from 'react';

export default class Controls extends React.Component {
	render() {
      const currentPlayer = this.props.currentPlayer;

	    return (
	      <div className="connect4-grid-control">
	      	<div className="connect4-grid-control-player" style={{ backgroundColor: currentPlayer }}></div>
	        <a onClick={this.props.onReset} className="connect4-grid-control-button">Rejouer?</a>
	      </div>
	    );
  	}
}