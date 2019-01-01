import React from 'react';

class App extends React.Component {
  render() {
    return <h1>Hello world</h1>
  }
}

App.propTypes = {
  txt: React.PropTypes.string,
  cat: React.PropTypes.number.isRequired
}

export default App;
