import React, { Component } from 'react';
import Paper from 'material-ui/Paper'
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import header from '../../images/header.png'

const styles = theme => ({
      root: {
              flexGrow: 1,
            },
      paper: {
            textAlign: 'center',
            height: '100%'
        },
      header: {
          position: 'relative'
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
    grid: {
        flexGrow: 1,
        marginTop:'20px',
        height:512
    },
    gridItem_xs_12: {
        minWidth:'300px'
    },
    gridItem_xs_8: {
        minWidth:'300px',
    },
    gridItem_xs_4: {
        minWidth:'250px'
    }
});

class Home extends Component {
    classes=this.props.classes;

    render() {
    return(
    <div className={this.classes.root}>
        <div className={this.classes.header}>
            <img className={this.classes.headerImage} src={header} alt="header"/>
            <h4 className={this.classes.headerText}>
                <span>Now Playing: </span>
            </h4>
        </div>
        <Grid className={this.classes.grid} container align='stretch' justify='center'  spacing={24}>
            <Grid item xs={8} className={this.classes.gridItem_xs_8}>
                <Paper className={this.classes.paper} >
                Blog
                </Paper>
            </Grid>
            <Grid item xs={4}>
                <Paper className={this.classes.paper} >
                    Playing
                </Paper>
            </Grid>
        </Grid>
    </div>
    );
    }
}

export default withStyles(styles)(Home);

