import React, { Component } from 'react';
import './App.css';
import Header from './Header';
class App extends Component {
  render() {
    return (
      <div className="App" style={styles.appStyles}>
        <Header title="TITLE"/>
      </div>
    );
  }
}

const styles = {
  appStyles: {

  }
}


export default App;
