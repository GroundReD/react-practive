// jsx 
import React from 'react';
import ReactDom from 'react-dom';
import { hot } from 'react-hot-loader/root';
import NumberBaseball from './NumberBaseball';
import Test from './RenderTest'

const Hot = hot(NumberBaseball);

ReactDom.render(<Hot />, document.getElementById('root'));

// export default Hot;