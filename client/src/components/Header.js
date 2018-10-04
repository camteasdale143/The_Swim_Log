import React, { Component } from 'react';
import { colors } from '../global';

class Header extends Component {
  render() {
    return(
      <div style={ this.props.style }>
        <div>
          <h1 style={styles.textStyle}>{ this.props.title }</h1>
        </div>
      </div>
    );
  }
}

const styles = {
  textStyle: {
    color: colors.secondary,
  },

};

export default Header;
