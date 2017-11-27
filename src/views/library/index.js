import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper'
import Grid from 'material-ui/Grid';
import Divider from 'material-ui/Divider';
import Button from 'material-ui/Button';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight';
import MobileStepper from 'material-ui/MobileStepper';
import DocumentTitle from 'react-document-title';
import Player from '../../components/Player';
import History from '../../components/History';
import AlbumCard from '../../components/AlbumCard';
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
      albumCard: {
        margin: 5,  
      },
    grid: {
    },
    innerGrid: {
        flexGrow: 1,
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

    componentDidMount(){
       this.props.fetchLibrary(this.state.page);
    }

    handleNext = () => {
        this.setState({
           page: this.state.page + 1,
        });
       this.props.fetchLibrary(this.state.page+1);
    }
   

    handleBack = () => {
         this.setState({
           page: this.state.page - 1,
         });
       this.props.fetchLibrary(this.state.page-1);                                           
    }

    render() {
    let { classes } = this.props
    let libItems = this.props.library.map((album) => {
        if (album.album_id === ""){
            return (<div key="nil"/>) 
        }
        return (  
            <div className={classes.albumCard} key={album.album_id}>
                <AlbumCard album={album} />
            </div>
        )
    })


    return(
        <div className={classes.root}>
            <DocumentTitle title="Voyager Library"/>
            <Grid className={classes.grid} container spacing={24}>
                <Grid item className={classes.gridItem_xs_8} xs={12} sm={8}  >
                    <Grid className={classes.innerGrid} container spacing={24} ref={(lib) => this.lib = lib}>
                        {libItems}
                    </Grid>
                  <MobileStepper
                type="dots"
                steps={this.props.total_pages}
                position="static"
                activeStep={this.state.page}
                className={classes.root}
                nextButton={
                          <Button dense onClick={this.handleNext} disabled={this.state.page === this.props.total_pages-1}>
                            Next
                            <KeyboardArrowRight />
                          </Button>
                        }
                backButton={
                          <Button dense onClick={this.handleBack} disabled={this.state.page === 0}>
                            <KeyboardArrowLeft/>
                            Back
                          </Button>}
                />
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
        library: state.libraryStore.library,
        current_page: state.libraryStore.page,
        total_pages: state.libraryStore.total_pages
    }
}

export default compose(withStyles(styles),connect(mapStateToProps, {fetchLibrary}))(Library);
