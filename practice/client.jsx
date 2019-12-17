// jsx 
const React = require('react');
const ReactDom = require('react-dom');
const { hot } = require('react-hot-loader/root')

const WordChain = require('./WordChain.jsx');
const Hot = hot(WordChain);

ReactDom.render(<Hot />, document.getElementById('root'));

// export default Hot;