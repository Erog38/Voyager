import React, { Component } from 'react';
import Paper from 'material-ui/Paper'
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import DocumentTitle from 'react-document-title';
import Divider from 'material-ui/Divider';
import Player from '../../components/Player'
import History from '../../components/History'

const styles = theme => ({
      root: {
              flexGrow: 1,
              marginTop:30,
              padding:10,
              margin: 'auto',
            },
      paper: {
            textAlign: 'center',
            padding: 16,
        },
    grid: {
    },
    gridItem_sm_12: {
        minWidth:'300px'
    },
    gridItem_sm_8: {
        minHeight: 400,
        minWidth:'300px',
    },
    gridItem_sm_4: {
        minHeight: 200,
        minWidth:'250px'
    }
});

class Home extends Component {
    classes=this.props.classes;

    render() {
    return(
    <div className={this.classes.root}>
        <DocumentTitle title="Voyager Home"/>
        <Grid container spacing={24}>
            <Grid item className={this.classes.gridItem_xs_8} xs={12} sm={8}  >
                <Paper className={this.classes.paper} >
                News and Updates
                </Paper>
            </Grid>
            <Grid item  className={this.classes.gridItem_xs_4} xs={12} sm={4}>
                <Paper className={this.classes.paper} >
                    <Player/>
                </Paper>
                <Divider/>
                <Paper className={this.classes.paper} >
                    <History/>
                </Paper>
            </Grid>
        </Grid>
    </div>
    );
    }
}

export default withStyles(styles)(Home);
