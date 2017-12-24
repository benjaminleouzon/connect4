import React from 'react';
import { render } from 'react-dom';
import Game from 'components/Game';

import 'less/style.less';

window.onload = () => {
  render(
    <Game/>, 
    document.getElementById('root')
  );
};