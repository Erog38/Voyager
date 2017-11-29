
import React, { Component } from 'react';
import Paper from 'material-ui/Paper'
import Grid from 'material-ui/Grid';
import { withStyles } from 'material-ui/styles';
import DocumentTitle from 'react-document-title';
import Divider from 'material-ui/Divider';
import Player from '../../components/Player'
import History from '../../components/History'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { setPage } from '../../actions';
import Library from '../library';
import About from '../about';


const styles = theme => ({
      root: {
              flexGrow: 1,
              marginTop:30,
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

class Main extends Component {
    constructor(props){
        super(props)
        this.props.setPage('HOME');
    }

    render() {
        var { classes } = this.props;

       const inside = (page) => {
              switch(true){
        case (page === 'ABOUT'):
               return <About/>
        case (page === 'HOME'):
               return <About/>
        case (page === 'LIBRARY'):
                      console.log("Returning  library component")
               return <Library/>
        default:
               return <About/>
       }
       }

    return(
    <div className={classes.root}>
        <DocumentTitle title="Voyager Home"/>
        <Grid container spacing={24}>
            <Grid item className={classes.gridItem_xs_8} xs={12} sm={8}  >
                   {inside(this.props.page)}
            </Grid>
            <Grid item  className={classes.gridItem_xs_4} xs={12} sm={4}>
                <Paper className={classes.paper} >
                    <Player/>
                </Paper>
                <Divider/>
                <Paper className={classes.paper} >
                    <History/>
                </Paper>
            </Grid>
        </Grid>
    </div>
    );
    }
}

function mapStateToProps(state) {
    return {
        page: state.pageStore.currentPage
    }
}

export default compose(withStyles(styles),connect(mapStateToProps, {setPage}))(Main);
