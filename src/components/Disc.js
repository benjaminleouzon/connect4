import React from 'react';
import classNames from 'classnames';

export default class Disc extends React.Component {
  addDisc() {
    this.props.onAddDisc(this.props.pos);
  }

	render() {
    let discClasses = classNames({
      'connect4-disc': true,
      [`connect4-disc-${this.props.player}`]: !!this.props.player
    });

    return (
      <div ref="disc" className={discClasses} onClick={this.addDisc.bind(this)}/>
    );
  }
}