import React from 'react';
import classNames from 'classnames';

export default class Disc extends React.Component {
  addDisc() {
    this.props.onAddDisc(this.props.pos);
  }

	render() {
    const { player } = this.props;

    let discClasses = classNames({
      'connect4-disc': true,
      [`connect4-disc-${player}`]: !!player
    });

    return (
      <div ref="disc" className={discClasses} onClick={this.addDisc.bind(this)}/>
    );
  }
}