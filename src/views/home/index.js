import React, { Component } from 'react';
import Paper from 'material-ui/Paper'
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import Header from '../../components/Header';

const styles = theme => ({
      root: {
              flexGrow: 1,
            },
      paper: {
            textAlign: 'center',
            height: '100%'
        },
    grid: {
        flexGrow: 1,
        marginTop:'20px',
        height:512,
        width: '100%',
        margin: 0,
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
        <Header/>
        <Grid className={this.classes.grid} container spacing={24}>
            <Grid item xs={8} className={this.classes.gridItem_xs_8}>
                <Paper className={this.classes.paper} >
                News and Updates
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
