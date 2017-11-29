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
                <Paper className={this.classes.paper} >
                News and Updates
                </Paper>
    </div>
    );
    }
}

export default withStyles(styles)(Home);
