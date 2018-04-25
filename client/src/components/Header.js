import React, { Component } from 'react';
import { colors } from '../global'

class Header extends Component {
  render() {
    return(
      <div >
        <div>
          <h1 style={styles.textStyle}>{ this.props.title }</h1>
        </div>
      </div>
    )
  }
}

const styles = {
  textStyle: {
    color: colors.primary
  }
}

export default Header
