import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper'
import Grid from 'material-ui/Grid';
import DocumentTitle from 'react-document-title';

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
    gridItem_xs_4: {
        minWidth:'250px',
        minHeight:'250px'
    }
});


class Library extends Component {
    classes = this.props.classes
    render() {
    return(
        <div className={this.classes.root}>
        <DocumentTitle title="Voyager Library"/>
        <Grid className={this.classes.grid} container spacing={24}>
            <Grid item xs={4} className={this.classes.gridItem_xs_4}>
                <Paper className={this.classes.paper} >
                    Artist 1
                </Paper>
            </Grid>
            <Grid item xs={4}>
                <Paper className={this.classes.paper} >
                    Artist 2
                </Paper>
            </Grid>
        </Grid>
        </div>
    );
    }
}

export default withStyles(styles)(Library);
