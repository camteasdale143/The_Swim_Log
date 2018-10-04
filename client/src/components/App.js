import React, { Component } from 'react';
//import { colors } from '../global'

import Header from './Header';
import LogList from './logList.js';

const logData = [
  {
    date: 'March 27',
    sleep: 5,
    water: 5,
  },
  {
    date: 'March 26',
    sleep: 5,
    water: 5,
  },
  {
    date: 'March 25',
    sleep: 5,
    water: 5,
  }
];

class App extends Component {
  render() {
    return (
      <div className="App" style={ styles.appStyles }>
        <Header title="Log History" style={ styles.headerStyles }/>
        <LogList logData={logData} />
      </div>
    );
  }
}

const styles = {
  appStyles: {

  },
  headerStyles: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column'
  }
};


export default App;
