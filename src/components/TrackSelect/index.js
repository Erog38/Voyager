import React, { Component } from 'react';
import { withStyles  } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia  } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';
import Typography from 'material-ui/Typography';

const styles = {
    link: {
        textDecoration: 'none',
    },
    card: {
      width: 200,
      height: 350,
      position: 'relative'
    },
    media: {
        height: 200,
    },
    cardActions: {
        bottom:5,
        position:'absolute'
    }
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
        <div>
          <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              image={this.props.album.album_art}
              title={this.props.album.title}
            />
            <CardContent>
              <Typography type="subheading" >
                  {this.props.album.title}
              </Typography>
              <Typography component="p">
                  {this.props.album.artist}
              </Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
              <a key={this.props.album.album_id} href={this.props.album.url} className={classes.link}>
                  <Button dense color="primary">
                    Info
                  </Button>
              </a>
              <Button dense color="primary" onClick={this.handleClick}>
                Tracklist
              </Button>
            </CardActions>
          </Card>                             
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
                              <MenuItem key={track.track_id} onClick={this.handleRequestClose}>
                                {track.title}
                              </MenuItem>
                            ))}
                </Menu>

        </div>
      )};
}

export default withStyles(styles)(AlbumCard);
