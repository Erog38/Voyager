import React, { Component } from 'react';
import header from '../../images/header.png';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
      header: {
          position: 'relative',
          paddingTop: 64,
          backgroundColor: '#212121'
      },
      headerImage: {
              width: '100%'
      },
      headerText: {
        position: 'absolute',
        bottom: 0,
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
                <span>Now Playing: </span>
            </h4>
        </div>
        );
    }
}

export default withStyles(styles)(Header);
