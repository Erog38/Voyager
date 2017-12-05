import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import MenuIcon from 'material-ui-icons/Menu';
import IconButton from 'material-ui/IconButton';
import Drawer from 'material-ui/Drawer';
import Logo from '../Logo';
import Chat from 'material-ui-icons/Chat';
import Home from 'material-ui-icons/Home';
import LibraryMusic from 'material-ui-icons/LibraryMusic';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import { setPage } from '../../actions';

const menuStyle = theme => ({
    appBar: {
        backgroundColor: 'rgba(33,33,33,0.8)',
    },
    audioControls: {
        position:'fixed',
        right:0
    }
});


class Menu extends Component {
    constructor(props){
        super(props);
        this.toggleDrawer = this.toggleDrawer.bind(this);
        this.setHomePage = this.setHomePage.bind(this);
        this.setLibraryPage = this.setLibraryPage.bind(this);
        this.setAboutPage = this.setAboutPage.bind(this);
    };

    state = {
        open: false,
    };

    toggleDrawer() {
        this.setState({
            open: !this.state.open,
        });
    };
    
    setHomePage() {
        this.props.setPage('HOME');
    }
    setLibraryPage() {
        this.props.setPage('LIBRARY');
    }
    setAboutPage() {
        this.props.setPage('ABOUT');
    }

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
                    </Toolbar>
                </AppBar>
                <Drawer open={this.state.open} onRequestClose={this.toggleDrawer}>
                    <div tabIndex={0} role="button" onClick={this.toggleDrawer} >
                        <Logo title={this.props.title}/>
                <List style={{width:250}}>
                        <ListItem button onClick={this.setHomePage}>
                            <ListItemIcon >
                                <Home/>
                            </ListItemIcon>
                            <ListItemText primary="Home"/>
                        </ListItem>
                        <ListItem button onClick={this.setLibraryPage}>
                            <ListItemIcon>
                                <LibraryMusic/>
                            </ListItemIcon>
                            <ListItemText primary="Library"/>
                        </ListItem>
                        <ListItem button component="a" href="https://blog.philgore.net">
                            <ListItemIcon>
                                <Chat/>
                            </ListItemIcon>
                            <ListItemText primary="Blog"/>
                        </ListItem>
                </List>
                    </div>
               </Drawer>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        page: state.pageStore.page
    }
}

export default compose(withStyles(menuStyle),connect(mapStateToProps, {setPage}))(Menu);
