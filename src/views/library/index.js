import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight';
import MobileStepper from 'material-ui/MobileStepper';
import DocumentTitle from 'react-document-title';
import AlbumCard from '../../components/AlbumCard';
import { compose } from 'redux';
import {connect} from 'react-redux';
import {fetchLibrary} from '../../actions';

const styles = theme => ({
      root: {
            overflow: 'hidden',
            width: '100%',
            position: 'relative'
            },
        container: {
            display: 'flex',
            height: 565,
            position: 'relative',
            flexWrap: 'wrap',
            overflowY: 'scroll',
            justifyContent: 'space-around',
            width: '100%',
            paddingRight: 20,
          },
      albumCard: {
          minWidth: 200,
          width: '33%'
      },
    gridList: {
        width: '100%',
        overflowY: 'scroll',
        height: 565,
    },
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
                <AlbumCard album={album} clasName={classes.albumCard}/>
            </div>
        )
    })


    return(
        <div className={classes.root}>
            <DocumentTitle title="Voyager Library"/>
                <div className={classes.container}>
                    <Grid container spacing={24}>
                        {libItems}
                    </Grid>
                </div>
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
