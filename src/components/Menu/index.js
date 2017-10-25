import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import MenuIcon from 'material-ui-icons/Menu';
import IconButton from 'material-ui/IconButton';
import Drawer from 'material-ui/Drawer';
import Logo from '../Logo';
import Chat from 'material-ui-icons/Chat';
import Home from 'material-ui-icons/Home';
import Info from 'material-ui-icons/Info';
import LibraryMusic from 'material-ui-icons/LibraryMusic';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { withStyles } from 'material-ui/styles';

const menuStyle = theme => ({
    appBar: {
        backgroundColor: 'rgba(33,33,33,0.8)',
    },
    audioControls: {
        position:'fixed',
        right:0
    }
});


var buttons = function (){
    return(
        <List style={{width:250}}>
                <ListItem button component="a" href="/">
                    <ListItemIcon >
                        <Home/>
                    </ListItemIcon>
                    <ListItemText primary="Home"/>
                </ListItem>
                <ListItem button component="a" href="library">
                    <ListItemIcon>
                        <LibraryMusic/>
                    </ListItemIcon>
                    <ListItemText primary="Library"/>
                </ListItem>
                <ListItem button component="a" href="about">
                    <ListItemIcon>
                        <Info/>
                    </ListItemIcon>
                    <ListItemText primary="About"/>
                </ListItem>
                <ListItem button component="a" href="blog">
                    <ListItemIcon>
                        <Chat/>
                    </ListItemIcon>
                    <ListItemText primary="Blog"/>
                </ListItem>
        </List>
    )
}

class Menu extends Component {
    constructor(props){
        super(props);
        this.toggleDrawer = this.toggleDrawer.bind(this);
    };

    state = {
        open: false,
    };

    toggleDrawer() {
        this.setState({
            open: !this.state.open,
        });
    };

       render() {
        return (
            <div>
                <AppBar className={this.props.classes.appBar}  position="fixed" >
                  <Toolbar>
                      <IconButton onClick={this.toggleDrawer} color="contrast" aria-label="Menu">
                          <MenuIcon />
                      </IconButton>
                    <div>
                        <Typography type="title" color="inherit">
                            {this.props.title}
                        </Typography>
                    </div>
                <audio controls className={this.props.classes.audioControls}>
                  <source src="https://streaming.shoutcast.com/VoyagerElectronicRadio" type="audio/mpeg"/>
                  Your browser does not support the audio element.
                </audio>
                    </Toolbar>
                </AppBar>
                <Drawer open={this.state.open} onRequestClose={this.toggleDrawer}>
                    <div tabIndex={0} role="button" onClick={this.toggleDrawer} >
                        <Logo title={this.props.title}/>
                        {buttons()}
                    </div>
               </Drawer>
            </div>
        )
    }
}

export default withStyles(menuStyle)(Menu);
