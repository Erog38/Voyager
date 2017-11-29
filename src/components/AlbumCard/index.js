import React, { Component } from 'react';
import { withStyles  } from 'material-ui/styles';
import { GridListTile, GridListTileBar  } from 'material-ui/GridList';
import Grid from 'material-ui/Grid';
import IconButton from 'material-ui/IconButton';
import InfoIcon from 'material-ui-icons/Info';
import Menu from 'material-ui/Menu';
import TrackSelect from '../../components/TrackSelect';

const styles = {
    root:{
        height: '100%'
    },
    img: {
        width: '100%',
        height: '100%'
    },
    tile: {
        height: '100%',
        width: '100%'
    },
    link: {
        textDecoration: 'none',
    },
};

class AlbumCard extends Component {
    constructor(props){
        super(props)
        this.state={
            anchor: null
        }
    }

    handleClick = event => {
        this.setState({anchor: event.currentTarget })
    }

     handleRequestClose = () => {
         this.setState({ anchor: null });
     };

  render(){
  const { classes } = this.props;

    return (
        <Grid className={classes.root} item xs>
        <GridListTile classes={{root:classes.tile}}>
            <img className={classes.img} 
                src={this.props.album.album_art} 
                alt={this.props.album.title} onClick={this.handleClick}/>
            <GridListTileBar
                title={this.props.album.title}
                subtitle={<span>by: {this.props.album.artist}</span>}
                actionIcon={
                       <IconButton href={this.props.album.url}>
                            <InfoIcon color="rgba(255, 255, 255, 0.54)" />
                       </IconButton>
                     }
               />
             <Menu
                  id="long-menu"
                  anchorEl={this.state.anchor}
                  open={Boolean(this.state.anchor)}
                  onRequestClose={this.handleRequestClose}
                  PaperProps={{
                            style: {
                                    minWidth: 300
                            },
                            }}>
                    {this.props.album.tracks.map(track => (
                        <TrackSelect key={track.track_id} track={track}/>        
                    ))}
                </Menu>
            </GridListTile>
            </Grid>
      )};
}

export default withStyles(styles)(AlbumCard);
