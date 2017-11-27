import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper'
import Grid from 'material-ui/Grid';
import Divider from 'material-ui/Divider';
import DocumentTitle from 'react-document-title';
import Player from '../../components/Player';
import History from '../../components/History';
import { compose } from 'redux';
import {connect} from 'react-redux';
import {fetchLibrary} from '../../actions';

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
      artistCard: {
            textAlign: 'center',
            height: '100%'
        },
    grid: {
    },
    innerGrid: {
        flexGrow: 1,
        height:512,
        width: '100%',
        margin: 0,
    },
    gridItem_xs_4: {
        minWidth:250,
        minHeight:200
    }
});


class Library extends Component {
    constructor(props){
        super(props)
        this.state = {page: 0}
    }

    classes = this.props.classes
    render() {
        this.props.fetchLibrary(this.state.page);
    return(
        <div className={this.classes.root}>
            <DocumentTitle title="Voyager Library"/>
            <Grid className={this.classes.grid} container spacing={24}>
                <Grid item className={this.classes.gridItem_xs_8} xs={12} sm={8}  >
                    <Grid className={this.classes.innerGrid} container spacing={24}>
                        <Grid item xs={4} className={this.classes.gridItem_xs_4}>
                            <Paper className={this.classes.paper} >
                                Artist 1
                            </Paper>
                        </Grid>
                    </Grid>
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
function mapStateToProps(state) {
    return {
        library: state.libraryStore.albums
    }
}

export default compose(withStyles(styles),connect(mapStateToProps, {fetchLibrary}))(Library);
