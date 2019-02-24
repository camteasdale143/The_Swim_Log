import React, { Component } from 'react';
//import { colors } from '../global'

import Header from './Header';
import LogList from './logList.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }
  componentDidMount() {
    fetch('http://localhost:8081/data')
      .then(res => res.json())
      .then(res => {
        this.setState({
          data: res.data
        });
      });
  }
  renderLogList() {
    if (this.state.data.length > 0) {
      // prettier-ignore
      return (<LogList logData={this.state.data} />);
    } else {
      console.log(this.state.data.length);
      return null;
    }
  }
  render() {
    console.log(this.state.data);
    return (
      <div className="App" style={styles.appStyles}>
        <Header title="Log History" style={styles.headerStyles} />
        {this.renderLogList()}
      </div>
    );
  }
}

const styles = {
  appStyles: {},
  headerStyles: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column'
  }
};

export default App;
