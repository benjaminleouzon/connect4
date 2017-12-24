import React from 'react';

export default class Row extends React.Component {
  render() {
    return (
      <div className="connect4-row">
        {this.props.children}
      </div>
    );
  }
}