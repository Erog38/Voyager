import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from 'material-ui/Dialog';
import { MenuItem } from 'material-ui/Menu';

class TrackSelect extends Component {
    constructor(props){
        super(props)
        this.state={
            open: false
        }
    }

     handleClick = () => {
        this.setState({open: true });
     }

     handleRequestClose = () => {
         this.setState({open: false});
     };

     addToPlaylist = () => {
                       
        var track = {
            track_id: this.props.track.track_id
        }
        const URL = "https://enterprise.philgore.net/add";
        fetch(URL, { 
            method: 'POST',
            headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
            },
            body: JSON.stringify(track)
        }).then( function(payload){
                 if (payload.success) {
                    console.log("successfully added song to the playlist")
                 }
             }).catch(function(error){
                 console.log(error);
             });
        this.handleRequestClose()
     };
  render(){
  const {track, fullScreen } = this.props;
    return (
        <div>
           <MenuItem key={track.track_id} onClick={this.handleClick}>
             {track.title}
           </MenuItem>
           <Dialog
             fullScreen={fullScreen}
             open={this.state.open}
             onRequestClose={this.handleRequestClose}
           >
             <DialogTitle>{"Request Song?"}</DialogTitle>
             <DialogContent>
               <DialogContentText>
                Would you like to request that {track.title} by {track.artist} 
                gets added to the playlist?
               </DialogContentText>
             </DialogContent>
             <DialogActions>
               <Button onClick={this.addToPlaylist} color="primary">
                 Damn Straight!
               </Button>
               <Button onClick={this.handleRequestClose} color="primary" autoFocus>
                 Nah
               </Button>
             </DialogActions>
           </Dialog>
        </div>
      )};
}

export default TrackSelect;
