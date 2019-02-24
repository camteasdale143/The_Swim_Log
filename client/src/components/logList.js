import React, { Component } from 'react';
import { colors } from '../global';

class Loglist extends Component {
  constructor(props) {
    super(props);
    this.formatLogs.bind(this);
  }

  formatLogs() {
    return this.props.logData.map((data, idx) => (
      <div style={styles.logStyles} key={idx}>
        <h3 style={styles.logTitleStyle}>{data.type}</h3>
        <p style={styles.logTextStyle}>{data.value} Hours of sleep</p>
        <p style={styles.logTextStyle}>{data.created} L of water</p>
      </div>
    ));
  }
  render() {
    console.log(this.props.logData);
    const { logListStyles } = styles;

    const formattedLogs = this.formatLogs();

    return <div style={logListStyles}>{formattedLogs}</div>;
  }
}

const styles = {
  logListStyles: {
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column'
  },
  logStyles: {
    backgroundColor: colors.primaryDark,
    width: '75%',
    marginBottom: 10,
    marginTop: 10
  },
  logTitleStyle: {
    fontFamily: 'Titillium Web, sans-serif',
    marginLeft: 10
  },
  logTextStyle: {
    fontFamily: 'Noto Serif, serif',
    paddingLeft: 30
  }
};

export default Loglist;
