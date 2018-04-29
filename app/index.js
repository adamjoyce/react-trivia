var React = require('react');
var ReactDOM = require('react-dom');
require('./reset.scss');
require('./index.scss');

var App = require('./components/App');

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
