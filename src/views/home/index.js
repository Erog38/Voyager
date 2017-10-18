import React, { Component } from 'react';
import Paper from 'material-ui/Paper'
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import DocumentTitle from 'react-document-title';
const styles = theme => ({
      root: {
              flexGrow: 1,
              marginTop:30,
              padding:10,
              margin: 'auto',
              maxWidth: 800
            },
      paper: {
            textAlign: 'center',
            padding: 16,
        },
    grid: {
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
        <DocumentTitle title="Voyager Home"/>
        <Grid container spacing={24}>
            <Grid item xs={12} sm={8}  >
                <Paper className={this.classes.paper} >
                News and Updates
                </Paper>
            </Grid>
            <Grid item xs={12} sm={4}>
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
