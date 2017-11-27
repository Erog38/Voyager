import React, { Component } from 'react';
import header from '../../images/header.png';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
      header: {
          position: 'relative',
          overflow: 'hidden'
      },
      headerImage: {
              width: '100%',
              minWidth: '800px',
              right:0,
              position:'sticky'
      },
      headerText: {
        position: 'absolute',
        top: 0,
        left: 10,
        color: 'white',
      },
});

class Header extends Component {
    classes = this.props.classes
    render() {
        return (
        <div className={this.classes.header}>
            <img className={this.classes.headerImage} src={header} alt="header"/>
            <h4 className={this.classes.headerText}>
            </h4>
        </div>
        );
    }
}

export default withStyles(styles)(Header);
